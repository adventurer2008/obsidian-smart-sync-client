import {test} from 'node:test';
import assert from 'node:assert/strict';
import {registerHooks} from 'node:module';
globalThis.window={setTimeout,clearTimeout,setInterval,clearInterval,open(){}};
globalThis.__SMART_SYNC_EDITION__={edition:'global',id:'smart-sync-global',locale:'en'};
registerHooks({resolve(s,c,n){return s==='obsidian'?{url:new URL('./obsidian-double.mjs',import.meta.url).href,shortCircuit:true}:n(s,c);}});
const {supportedLanguages,resolveLanguage,configureLanguage,englishDraft,t,localizedFailure}=await import('../src/i18n.js');
const {catalogs}=await import('../src/locales/catalogs.js');
const {billingCard,capacityWarning}=await import('../src/billing.js');
const slots=value=>[...value.matchAll(/\{(\w+)\}/g)].map(m=>m[1]).sort();
test('all ten Global locales are complete, retain placeholders and the machine deletion token',()=>{
 assert.equal(Object.keys(supportedLanguages).length,10);
 for(const code of Object.keys(supportedLanguages)){
  configureLanguage(code);
  for(const [key,source] of Object.entries(englishDraft)){
   if(code!=='en'){assert.equal(typeof catalogs[code][key],'string',code+':'+key);assert.deepEqual(slots(catalogs[code][key]),slots(source),code+':'+key);}
   const params=Object.fromEntries(slots(source).map(key=>[key,'SYNTHETIC_VALUE']));
   assert.equal(/\{\w+\}/.test(t(key,params)),false,code+':'+key);
  }
  assert.equal(t('account.closePhrase'),'DELETE');
  assert.ok(localizedFailure({code:'DEVICE_LIMIT_REACHED',limit:12}).includes('12'));
 }
 configureLanguage('en');
});
test('host aliases, unknown locales and explicit per-vault overrides resolve without changing the region',()=>{
 for(const [input,expected]of [['en-GB','en'],['zh_hans','zh-CN'],['zh-Hant-HK','zh-TW'],['zh-HK','zh-TW'],['pt-br','pt-BR'],['pt-PT','pt-BR'],['ja-JP','ja'],['unknown','en'],['__proto__','en']])assert.equal(resolveLanguage(input),expected);
 assert.equal(configureLanguage('ja','de'),'de');assert.equal(configureLanguage('ja','auto'),'ja');assert.equal(globalThis.__SMART_SYNC_EDITION__.edition,'global');configureLanguage('en');
});
test('translated Global billing keeps the actual Global free quota and subscription identity',()=>{
 for(const code of Object.keys(supportedLanguages)){
  configureLanguage(code);
  const data={entitlement:{plan:'global-free',logical:50*1024**2,paid:false},usage:{logicalBytes:1}};
  const model=billingCard(data,true);assert.ok(model.title.includes('50'),code);assert.equal(model.title.includes('100'),false,code);assert.equal(model.free,true);assert.equal(data.entitlement.plan,'global-free');
  const paid={entitlement:{plan:'global-1gb-month',logical:1024**3,paid:true,ends:Date.UTC(2028,0,1)},usage:{logicalBytes:2*1024**3}};
  const paidModel=billingCard(paid,true,Date.UTC(2026,10,6));assert.equal(/\{\w+\}/.test(paidModel.usage+paidModel.expires),false);
  if(code!=='en'){assert.equal(paidModel.usage.startsWith('Used '),false,code);assert.equal(paidModel.expires.startsWith('Access ends:'),false,code);}
  assert.equal(/\{\w+\}/.test(capacityWarning(paid).message),false);
 }
 configureLanguage('en');
});

test('language selection persists outside synchronized settings and applies only after reload',async()=>{
 configureLanguage('en');
 const {IndependentSettings}=await import('../src/plugin.js');
 const settings={origin:'https://sync.smartsync.cc',workspace:'synthetic',direction:'both',interval:60,attachmentMiB:256,excludedExtensions:[],configuration:{}};
 const connection={synthetic:{key:'synthetic'}};let saves=0,changed,notice;
 const owner={data:{localId:'synthetic',settings,connections:connection},manifest:{version:'synthetic'},secret:()=>'',statusListeners:new Set(),status:{textContent:''},lanSummary:()=>'',saveData:async()=>{saves++;},notify:value=>{notice=value;}};
 const definitions=IndependentSettings.prototype.getSettingDefinitions.call({owner,expanded:new Set()});
 const row=definitions.find(item=>item.name===t('language.title'));assert.ok(row);
 row.render({setDesc(){return this;},addDropdown(callback){const input={addOptions(){return this;},setValue(){return this;},onChange(callback){changed=callback;return this;}};callback(input);return this;}});
 await changed('de');assert.equal(owner.data.interfaceLanguage,'de');assert.equal(owner.data.settings,settings);assert.equal(owner.data.connections,connection);assert.equal(settings.direction,'both');assert.equal(saves,1);assert.match(notice,/Reload/);assert.equal(t('language.auto'),'Follow Obsidian');
 await changed('not-a-locale');assert.equal(saves,1);
 owner.saveData=async()=>{throw Error('Synthetic disk full');};await changed('ja');assert.equal(owner.data.interfaceLanguage,'de');assert.equal(settings.origin,'https://sync.smartsync.cc');
 let rejectFirst,attempt=0;owner.saveData=()=>++attempt===1?new Promise((resolve,reject)=>{rejectFirst=reject;}):Promise.resolve();
 const first=changed('fr');await changed('ja');rejectFirst(Error('Synthetic first save failed'));await first;assert.equal(owner.data.interfaceLanguage,'ja','a failed older choice must not roll back a newer saved language');
});
