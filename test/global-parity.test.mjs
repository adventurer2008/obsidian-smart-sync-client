import assert from 'node:assert/strict';
import {test} from 'node:test';
import {registerHooks} from 'node:module';
import {JSDOM} from 'jsdom';
globalThis.window={open(){},setTimeout,clearTimeout,setInterval,clearInterval};
globalThis.__SMART_SYNC_EDITION__={edition:'global',id:'smart-sync-global',name:'Smart Sync',locale:'en',development:false,serviceOrigin:'https://sync.smartsync.cc'};
registerHooks({resolve(specifier,context,next){return specifier==='obsidian'?{url:new URL('./obsidian-double.mjs',import.meta.url).href,shortCircuit:true}:next(specifier,context);}});
const {messages,englishDraft,missingEnglishKeys,t,localizedFailure}=await import('../src/i18n.js');
const {billingCard,capacityWarning}=await import('../src/billing.js');
const {default:Plugin}=await import('../src/plugin.js');
const {modals,Modal}=await import('./obsidian-double.mjs');

test('Global encryption menus and password dialog use English without changing command identifiers',async()=>{
 const {registerNoteEncryption}=await import('../src/note-encryption.js');
 const {Menu}=await import('./obsidian-double.mjs');
 const events=new Map(),commands=[],intervals=[];
 const owner={app:{vault:{configDir:'.fixture'},workspace:{on:(name,callback)=>{events.set(name,callback);return name;}}},manifest:{id:'smart-sync-global'},
  addCommand:command=>commands.push(command),registerEvent(){},registerInterval:id=>intervals.push(id)};
 const manager=registerNoteEncryption(owner);
 try {
  assert.equal(commands.find(command=>command.id==='encrypt-selected-text').name,'Encrypt selected text');
  assert.equal(commands.find(command=>command.id==='encrypt-whole-note').name,'Encrypt entire note');
  const file={path:'fixture.md'},selectionMenu=new Menu(),fileMenu=new Menu();
  events.get('editor-menu')(selectionMenu,{getSelection:()=> 'fixture'}, {file});events.get('file-menu')(fileMenu,file);
  assert.deepEqual(selectionMenu.items.map(item=>item.title),['Encrypt selected text']);
  assert.deepEqual(fileMenu.items.map(item=>item.title),['Encrypt entire note']);
  manager.encrypt({original:'fixture',from:0,to:7},'text');
  const dialog=modals.at(-1);
  assert.equal(dialog.title,'Encrypt selected text');
  assert.ok(dialog.contentEl.children.some(child=>child.text==='Confirm password'));
  dialog.password.value='first';dialog.confirm.value='second';await dialog.run();
  assert.equal(dialog.status.text,'The passwords do not match.');dialog.close();
  const {createLocked,decodeBox}=await import('../src/note-crypto.js');
  await assert.rejects(createLocked('fixture','x','','text'),/Use a password of 4 to 1024 characters/);
  assert.throws(()=>decodeBox('broken'),/The encrypted content is damaged/);
 } finally {intervals.forEach(clearInterval);}
});

test('Global deletion blocks for cloud vaults and never posts until exact confirmation',async()=>{
 const calls=[];let status={vaults:1,pending:0,requiresReauthentication:false},signedOut=0;
 const plugin={app:{},data:{localId:'delete-fixture',settings:{origin:'https://sync.smartsync.cc'}},secret:()=> 'account-key',stopped:false,
  accountApi:async()=>({request:async(method,path,input)=>{calls.push({method,path,input});return method==='GET'?status:{erased:true};}}),
  exclusive:async work=>work(),signOut:async()=>{signedOut++;},notify(){},manageNotebooks:async()=>{}};
 await Plugin.prototype.deleteGlobalAccount.call(plugin);
 assert.equal(modals.at(-1).contentEl.settings[0].controls[0].text,'Manage cloud vaults');
 assert.equal(calls.some(call=>call.method==='POST'),false);
 status={vaults:0,pending:0,requiresReauthentication:true};
 await Plugin.prototype.deleteGlobalAccount.call(plugin);
	assert.equal(modals.at(-1).contentEl.settings[0].controls[0].text,'Verify identity to continue');
 status={vaults:0,pending:0,requiresReauthentication:false};
 await Plugin.prototype.deleteGlobalAccount.call(plugin);
 await modals.at(-1).contentEl.settings[0].controls[0].click();
 const confirmation=modals.at(-1),field=confirmation.contentEl.settings[0].controls[0],submit=confirmation.contentEl.settings[1].controls[0];
 field.change('delete');await submit.click();assert.equal(calls.some(call=>call.method==='POST'),false);
 field.change('DELETE');await submit.click();
 assert.deepEqual(calls.filter(call=>call.method==='POST'),[{method:'POST',path:'account/close',input:{confirm:'DELETE'}}]);assert.equal(signedOut,1);
});

test('Global delete confirmation refuses a changed local account context',async()=>{
 const calls=[],plugin={app:{},data:{localId:'original',settings:{origin:'https://sync.smartsync.cc'}},secret:()=> 'account-key',stopped:false,
  accountApi:async()=>({request:async method=>{calls.push(method);return{vaults:0,pending:0,requiresReauthentication:false};}})};
 await Plugin.prototype.deleteGlobalAccount.call(plugin);
 await modals.at(-1).contentEl.settings[0].controls[0].click();
 const confirmation=modals.at(-1);confirmation.contentEl.settings[0].controls[0].change('DELETE');
 plugin.data.localId='different';await confirmation.contentEl.settings[1].controls[0].click();
 assert.deepEqual(calls,['GET']);
});

test('Global reauthentication keeps current credentials and does not enter workspace selection',async()=>{
 const writes=[],flow={id:'f'.repeat(43),verifier:'v'.repeat(43),localId:'same',origin:'https://sync.smartsync.cc',expires:Date.now()+60000,reauth:true};
 const plugin={manifest:{id:'smart-sync-global'},data:{localId:'same',settings:{origin:flow.origin,workspace:'existing'}},app:{secretStorage:{setSecret:(...value)=>writes.push(value)}},billingApi:()=>({request:async()=>({reauthenticated:true})})};
 assert.equal(await Plugin.prototype.finishGlobalSignIn.call(plugin,flow),true);
 assert.deepEqual(writes,[['smart-sync-global-same-oauth','']]);
});

test('deletion verification has dedicated wording and resumes deletion rather than vault selection',async()=>{
 const flow={id:'f'.repeat(43),verifier:'v'.repeat(43),localId:'same',origin:'https://sync.smartsync.cc',expires:Date.now()+60000,reauth:true};
 let deleted=0,selected=0;
 const plugin={app:{},data:{localId:'same',settings:{origin:flow.origin}},stopped:false,
  secret:name=>name==='oauth'?JSON.stringify(flow):'current-account-key',
  billingApi:()=>({request:async()=>({providers:[],emailEnabled:false})}),
  finishGlobalSignIn:async received=>{assert.equal(received.reauth,true);return true;},
  deleteGlobalAccount:async()=>{deleted++;},selectAccountWorkspace:async()=>{selected++;}};
 Plugin.prototype.globalEnrollment.call(plugin,true);
 const dialog=modals.at(-1),area=dialog.contentEl;
 assert.equal(dialog.title,'Verify identity to delete account');
 const text=area.children.map(child=>child.text).join(' ');
 assert.match(text,/does not create an account or connect a vault/);
 assert.doesNotMatch(text,/first sign-in creates|Sign in to connect your vaults/);
 const check=area.children.flatMap(child=>child.settings).flatMap(setting=>setting.controls).find(control=>control.text==='Check verification and continue deletion');
 assert.ok(check);await check.click();assert.equal(deleted,1);assert.equal(selected,0);
});

test('Global auth uses the real regional API transport with an exact route allowlist',async context=>{
 const original=globalThis.fetch,seen=[];
 globalThis.fetch=async(url,options)=>{seen.push({url,method:options.method});return Response.json({providers:['google','github'],emailEnabled:true});};
 context.after(()=>{globalThis.fetch=original;});
 const plugin={data:{settings:{origin:'https://sync.smartsync.cc'}},manifest:{version:'1.1.4'}};
 const api=Plugin.prototype.billingApi.call(plugin,'');
 const config=await api.request('GET','auth/config');
 assert.deepEqual(config.providers,['google','github']);assert.equal(config.emailEnabled,true);
 for(const suffix of ['start','claim','ack'])await api.request('POST','auth/'+suffix,{});
 assert.deepEqual(seen.map(value=>value.url),['config','start','claim','ack'].map(suffix=>'https://pay.smartsync.cc/ss2/auth/'+suffix));
 for(const suffix of ['account','operator/billing','auth/unknown','auth/config/extra','auth/config?redirect=1'])await assert.rejects(api.request('GET',suffix),/Invalid payment API/);
 assert.equal(seen.length,4);
});
test('Global has complete English resources, exact parameter parity and English failures without Chinese fallback',()=>{
 assert.deepEqual(missingEnglishKeys,[]);
 for(const[key,value]of Object.entries(messages)){
  const params=Object.fromEntries([...value.matchAll(/\{(\w+)\}/g)].map(m=>[m[1],'sample']));
  const expected=[...new Set(Object.keys(params))].sort(),actual=[...new Set([...englishDraft[key].matchAll(/\{(\w+)\}/g)].map(m=>m[1]))].sort();
  assert.deepEqual(actual,expected,key);assert.equal(/[\u3400-\u9fff]/.test(t(key,params)),false,key);
 }
 for(const error of [{status:401},{status:413},{code:'ACCOUNT_ENCRYPTION_WRONG'},{code:'PLAN_CHANGED',reviewRequired:true},{code:'NOT_KNOWN'},new TypeError()])assert.equal(/[\u3400-\u9fff]/.test(localizedFailure(error)),false);
 assert.notEqual(localizedFailure({code:'PLAN_CHANGED'}),localizedFailure({code:'PLAN_CHANGED',reviewRequired:true}));
});
test('Global reuses the plan card and account-bound entry with its own currency, regional authority and safe handoff',async()=>{
 const now=Date.UTC(2026,10,2),data={entitlement:{paid:true,plan:'global-5gb-month',logical:5*1024**3,ends:now+30*86400000},usage:{logicalBytes:1},testMode:true};
 const model=billingCard(data,true,now);assert.match(model.title,/5 GB.*Monthly/);assert.equal(/[\u3400-\u9fff]/.test(JSON.stringify(model)),false);
 assert.match(capacityWarning({...data,usage:{logicalBytes:6*1024**3}}).action,/storage/);
 const opened=[];window.open=(...args)=>opened.push(args);
 const plugin={data:{localId:'synthetic',settings:{origin:'https://sync.smartsync.cc'}},secret:()=> 'synthetic-key',accountApi:async()=>({accessKey:'synthetic-key'}),billingApi:()=>({request:async()=>({url:'https://pay.smartsync.cc/pay/plans#ticket='+'a'.repeat(43)})})};
 await Plugin.prototype.openBilling.call(plugin);assert.equal(opened[0][0],'https://pay.smartsync.cc/pay/plans#ticket='+'a'.repeat(43));
 plugin.billingApi=()=>({request:async()=>({url:'https://pay.wujiesync.cc/pay/plans#ticket='+'a'.repeat(43)})});
 await assert.rejects(Plugin.prototype.openBilling.call(plugin),/Invalid purchase entry/);
});

test('Global Free card shows the actual 50 MB account capacity and upgrade entry',()=>{
 const card=billingCard({entitlement:{plan:'global-free',logical:50*1024**2,paid:false},usage:{logicalBytes:1024}},true);
 assert.equal(card.free,true);assert.equal(card.title,'Free · 50 MB');assert.equal(card.label,'Get more storage');assert.match(card.usage,/50/);
});

test('Global browser authentication sends only a PKCE challenge, confines the return host and persists verified device access',async()=>{
 const stored=new Map(),opened=[];window.open=(...args)=>opened.push(args);
 const id='f'.repeat(43),device='12345678-1234-1234-1234-123456789abc',key='k'.repeat(43);let sent,acked=false,refreshed=0;
 const plugin={tab:{update(){assert.equal(plugin.accountEmail,'auth@example.invalid');assert.equal(plugin.accountAuthorized,true);assert.equal(stored.get('smart-sync-global-isolated-auth-account'),key);refreshed++;}},manifest:{id:'smart-sync-global'},data:{localId:'isolated-auth',settings:{origin:'https://sync.smartsync.cc'}},stopped:false,deviceDisplayName:()=> 'Synthetic device',app:{secretStorage:{setSecret:(name,value)=>stored.set(name,value)}},billingApi:()=>({request:async(method,path,body)=>{
  if(path==='auth/start'){sent=body;return{id,url:'https://pay.smartsync.cc/auth/login#flow='+id,expires:Date.now()+600000};}
  if(path==='auth/claim')return{id:device,key,email:'auth@example.invalid',owner:'owner'};
  if(path==='auth/ack'){acked=true;return{received:true};}throw Error('Unexpected request');
 }}),workspaceApi:(origin,access)=>{assert.equal(origin,'https://sync.smartsync.cc');assert.equal(access,key);return{request:async()=>({owner:'owner',email:'auth@example.invalid',scope:null,accountDevice:true,deviceId:device})};}};
 const flow=await Plugin.prototype.beginGlobalSignIn.call(plugin,'google');
 const expected=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(flow.verifier))).toString('base64url');
 assert.equal(sent.challenge,expected);assert.equal(sent.verifier,undefined);assert.equal(opened[0][0],'https://pay.smartsync.cc/auth/login#flow='+id+'&method=google');assert.ok(!opened[0][0].includes(flow.verifier));
 await Plugin.prototype.finishGlobalSignIn.call(plugin,flow);
 assert.equal(refreshed,1);
 assert.equal(stored.get('smart-sync-global-isolated-auth-account'),key);assert.equal(stored.get('smart-sync-global-isolated-auth-oauth'),'');assert.equal(acked,true);
 plugin.billingApi=()=>({request:async()=>({id,url:'https://pay.wujiesync.cc/auth/login#flow='+id,expires:Date.now()+600000})});
 await assert.rejects(Plugin.prototype.beginGlobalSignIn.call(plugin,'google'),/Invalid Global sign-in link/);
});

test('inline email signs in without opening a browser and shows readable validation and throttling feedback',async()=>{
 const stored=new Map(),opened=[],calls=[];let selected=0,rateLimited=false;
 window.open=(...args)=>opened.push(args);
 const plugin={app:{secretStorage:{setSecret:(name,value)=>stored.set(name,value)}},manifest:{id:'smart-sync-global'},data:{localId:'inline',settings:{origin:'https://sync.smartsync.cc'}},stopped:false,
  secret:name=>stored.get('smart-sync-global-inline-'+name)||'',deviceDisplayName:()=> 'Inline test',
  beginGlobalSignIn:Plugin.prototype.beginGlobalSignIn,globalEmailRequest:Plugin.prototype.globalEmailRequest,
  finishGlobalSignIn:async()=>({}),selectAccountWorkspace:async()=>{selected++;},
  billingApi:()=>({request:async(method,path,body)=>{
   calls.push({path,body});if(path==='auth/config')return{providers:['google','github'],emailEnabled:true};
   if(path==='auth/start')return{id:'f'.repeat(43),url:'https://pay.smartsync.cc/auth/login#flow='+'f'.repeat(43),expires:Date.now()+600000};
   if(path==='auth/email/send'){if(rateLimited)throw{status:429};return{sent:true};}
   if(path==='auth/email/verify')return{ready:true};throw Error('Unexpected request');
  }})};
 Plugin.prototype.globalEnrollment.call(plugin);await new Promise(resolve=>setImmediate(resolve));
 const dialog=modals.at(-1),rows=[];
 const visit=element=>{rows.push(...element.settings);for(const child of element.children)visit(child);};visit(dialog.contentEl);
 const email=rows.find(row=>row.name==='Email address').controls[0],send=rows.flatMap(row=>row.controls).find(control=>control.text==='Send code');
 await send.click();assert.equal(calls.some(call=>call.path==='auth/start'),false);
 email.change('inline@example.invalid');rateLimited=true;await send.click();
 assert.match(dialog.contentEl.children.find(child=>child.classList.contains('smart-sync-auth-status')).text,/Too many requests/);
 rateLimited=false;await send.click();assert.equal(opened.length,0);
 const code=rows.find(row=>row.name==='8-digit code').controls[0],verify=rows.flatMap(row=>row.controls).find(control=>control.text==='Verify and sign in');
 code.change('12');await verify.click();assert.equal(selected,0);
 email.change('other@example.invalid');code.change('12345678');await verify.click();assert.equal(selected,0);
 email.change('inline@example.invalid');await verify.click();assert.equal(selected,1);
 assert.equal(calls.find(call=>call.path==='auth/email/verify').body.code,'12345678');
 assert.equal(JSON.stringify([...stored.values()]).includes('12345678'),false);dialog.close();
});

test('Global sign-in never saves credentials after cancellation or a changed service/vault context',async()=>{
 const writes=[],flow={id:'f'.repeat(43),verifier:'v'.repeat(43),localId:'local',origin:'https://sync.smartsync.cc',expires:Date.now()+60000};
 const plugin={data:{localId:'local',settings:{origin:flow.origin}},manifest:{id:'smart-sync-global'},stopped:false,app:{secretStorage:{setSecret:(...v)=>writes.push(v)}},billingApi:()=>({request:async()=>{plugin.data.localId='another-vault';return{key:'k'.repeat(43),id:'12345678-1234-1234-1234-123456789abc',email:'auth@example.invalid',owner:'owner'};}})};
 await assert.rejects(Plugin.prototype.finishGlobalSignIn.call(plugin,flow,()=>false),/context/);assert.equal(writes.length,0);
 await assert.rejects(Plugin.prototype.finishGlobalSignIn.call(plugin,flow),/context changed/);assert.equal(writes.length,0);
});

test('reopening a pending browser sign-in checks automatically and enters vault selection only once',async()=>{
 const flow={id:'f'.repeat(43),verifier:'v'.repeat(43),localId:'resume',origin:'https://sync.smartsync.cc',expires:Date.now()+60000};
 let checked=0,selected=0;
 const plugin={app:{},data:{localId:'resume',settings:{origin:flow.origin}},secret:()=>JSON.stringify(flow),registerInterval(){},
  billingApi:()=>({request:async()=>({providers:[],emailEnabled:false})}),
  finishGlobalSignIn:async()=>{checked++;return{};},selectAccountWorkspace:async()=>{selected++;}};
 Plugin.prototype.globalEnrollment.call(plugin);
 const dialog=modals.at(-1);
 const check=dialog.contentEl.children.flatMap(child=>child.settings).flatMap(setting=>setting.controls).find(control=>control.text==='Check sign-in');
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(checked,1);assert.equal(selected,1);
 await check.click();assert.equal(checked,1);assert.equal(selected,1);
 dialog.close();
});

function resumeFixture(context, finish) {
 const dom=new JSDOM('',{pretendToBeVisual:true}),timers=new Map();let sequence=0,selected=0,hidden=false;
 const flow={id:'f'.repeat(43),verifier:'v'.repeat(43),localId:'resume-mobile',origin:'https://sync.smartsync.cc',expires:Date.now()+60000};
 Object.defineProperty(dom.window.document,'hidden',{get:()=>hidden});
 const open=Modal.prototype.open;
 context.mock.method(Modal.prototype,'open',function(){this.contentEl.ownerDocument=dom.window.document;open.call(this);});
 context.mock.method(window,'setInterval',callback=>{timers.set(++sequence,callback);return sequence;});
 context.mock.method(window,'clearInterval',id=>timers.delete(id));
 const plugin={app:{},data:{localId:flow.localId,settings:{origin:flow.origin}},secret:()=>JSON.stringify(flow),registerInterval(){},
  billingApi:()=>({request:async()=>({providers:[],emailEnabled:false})}),finishGlobalSignIn:finish,selectAccountWorkspace:async()=>{selected++;}};
 Plugin.prototype.globalEnrollment.call(plugin);const dialog=modals.at(-1);
 context.after(()=>{dialog.close();dom.window.close();});
 return {flow,plugin,dialog,timers,selected:()=>selected,hidden:value=>{hidden=value;},
  event:name=>(name==='visibilitychange'?dom.window.document:dom.window).dispatchEvent(new dom.window.Event(name)),
  tick:async()=>{for(const callback of [...timers.values()])callback();await new Promise(resolve=>setImmediate(resolve));}};
}

test('a temporary sign-in check failure retries automatically without a return event or manual click',async context=>{
 let now=Date.now(),attempts=0;
 context.mock.method(Date,'now',()=>now);
 const f=resumeFixture(context,async()=>{attempts++;if(attempts===1)throw TypeError('Network unavailable');return {};});
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(attempts,1);assert.equal(f.timers.size,1);assert.equal(f.selected(),0);
 await f.tick();assert.equal(attempts,1); // Backoff prevents a request storm.
 now+=2600;await f.tick();assert.equal(attempts,2);assert.equal(f.selected(),1);assert.equal(f.timers.size,0);
});

test('foreground and network return recover sign-in, deduplicate checks and release listeners on close',async context=>{
 let attempts=0,finish;
 const f=resumeFixture(context,async()=>{attempts++;if(attempts===1)throw TypeError('Network unavailable');return new Promise(resolve=>{finish=resolve;});});
 await new Promise(resolve=>setImmediate(resolve));
 f.hidden(true);await f.tick();f.event('focus');assert.equal(attempts,1);
 f.hidden(false);f.event('visibilitychange');f.event('focus');f.event('pageshow');f.event('online');
 assert.equal(attempts,2);assert.equal(f.selected(),0);
 finish({});await new Promise(resolve=>setImmediate(resolve));
 assert.equal(f.selected(),1);assert.equal(f.timers.size,0);
 f.event('visibilitychange');f.event('focus');f.event('pageshow');f.event('online');await f.tick();
 assert.equal(attempts,2);assert.equal(f.selected(),1);
});

test('expired or changed local sign-in contexts stop polling before another claim',async context=>{
 let now=Date.now(),attempts=0;
 context.mock.method(Date,'now',()=>now);
 const f=resumeFixture(context,async()=>{attempts++;return undefined;});
 await new Promise(resolve=>setImmediate(resolve));assert.equal(attempts,1);
 now+=61000;await f.tick();assert.equal(attempts,1);assert.equal(f.timers.size,0);
 f.event('online');await f.tick();assert.equal(attempts,1);
});

test('switching vault identity during browser sign-in rejects foreground recovery',async context=>{
 let attempts=0;
 const f=resumeFixture(context,async()=>{attempts++;return undefined;});
 await new Promise(resolve=>setImmediate(resolve));
 f.plugin.data.localId='other-vault';f.event('focus');await f.tick();
 assert.equal(attempts,1);assert.equal(f.timers.size,0);assert.equal(f.selected(),0);
});

test('a terminal authorization rejection stops automatic sign-in checks',async context=>{
 let attempts=0;
 const f=resumeFixture(context,async()=>{attempts++;throw Object.assign(Error('Rejected'),{status:401});});
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(f.timers.size,0);f.event('online');f.event('focus');await f.tick();assert.equal(attempts,1);
});
