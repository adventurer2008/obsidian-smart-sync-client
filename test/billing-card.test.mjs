import assert from 'node:assert/strict';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';
import { billingCard, mountBillingCard, renewalReminderAt } from '../src/billing.js';

const at = Date.UTC(2026, 9, 22), gb = 1024 ** 3;
const paid = ends => ({ everPurchased:true, entitlement:{paid:true,plan:'cn-5gb-year',logical:5*gb,ends}, usage:{logicalBytes:1.2*gb} });
test('purchase and renewal states use one calendar month, including short months and expired plans', () => {
	assert.equal(billingCard(undefined, false, at).label, '购买');
	for (const connected of [false, true]) {
		const unpaid = billingCard({entitlement:{paid:false,logical:10*gb},usage:{logicalBytes:0}}, connected, at);
		assert.equal(unpaid.prominent, true); assert.equal(unpaid.usage, ''); assert.equal(unpaid.ratio, null);
		assert.equal(unpaid.title, ''); assert.equal(unpaid.help, ''); assert.equal(unpaid.badge, '');
	}
	const signedOut = billingCard(paid(Date.UTC(2027,0,1)), false, at);
	assert.equal(signedOut.usage, ''); assert.equal(signedOut.ratio, null);
	const pending = billingCard({entitlement:{paid:false,logical:10*gb},currentOrder:{id:'a'.repeat(32),title:'10GB',status:'pending',purpose:'purchase'}},true,at);
	assert.match(billingCard({currentOrder:{status:'paid',failureCode:'paid_plan_conflict'}},false,at).order,/待核对/);
	assert.equal(pending.order,'等待付款'); assert.equal(pending.title,''); assert.equal(pending.usage,''); assert.equal(pending.label,'购买'); assert.equal(pending.resume,'a'.repeat(32));
	const active = billingCard(paid(Date.UTC(2027,0,1)), true, at);
	assert.equal(active.label, '续费'); assert.equal(active.prominent, false); assert.equal(active.title, '5GB 年付'); assert.equal(active.ratio, .24);
	assert.match(active.usage, /1.2.*5/);
	assert.equal(billingCard(paid(Date.UTC(2026,10,22)), true, at).prominent, true);
	assert.equal(renewalReminderAt(Date.UTC(2027,2,31)), Date.UTC(2027,1,28));
	assert.equal(renewalReminderAt(Date.UTC(2028,2,31)), Date.UTC(2028,1,29));
	const expired = billingCard({everPurchased:true,entitlement:{paid:false,ends:at-1},lastPurchase:{plan:'cn-5gb-year',logical:5*gb,ends:at-1}}, true, at);
	assert.equal(expired.label, '续费'); assert.equal(expired.badge, '已到期'); assert.equal(expired.prominent, true);
	const refunded = billingCard({everPurchased:true,entitlement:{paid:false},lastPurchase:{plan:'cn-5gb-year',status:'refunded',ends:at+86400000}},true,at);
	assert.equal(refunded.badge,'已退款'); assert.equal(refunded.expires,''); assert.equal(refunded.prominent,true);
	assert.equal(billingCard({...paid(at+1),usage:{logicalBytes:null}}, true, at).ratio, null);
	assert.match(billingCard({currentOrder:{title:'联调',purpose:'test',status:'paid'}}, true, at).order, /权益未改变/);
});
test('the mounted purchase action opens plans despite a pending order, refreshes on return and discards responses after identity change/disposal', async () => {
	const dom = new JSDOM('<div id="setting"><div id="info"></div><div id="controls"></div></div>', {pretendToBeVisual:true});
	const doc = dom.window.document;
	const setting = {settingEl:doc.querySelector('#setting'),infoEl:doc.querySelector('#info'),controlEl:doc.querySelector('#controls'),setName() {}};
	let live = true, calls = 0, resolve, opened = 'not-called';
	const value = {...paid(Date.UTC(2026,10,10)),currentOrder:{id:'a'.repeat(32),title:'5GB',status:'pending'}};
	const dispose = mountBillingCard(setting, {connected:true,live:()=>live,now:()=>at,target:dom.window,
		load:async()=>{calls++; if(calls===1) return value; return new Promise(done=>{resolve=done;});}, open:async id=>{opened=id;},onError:error=>{throw error;}});
	await new Promise(done=>setImmediate(done));
	const button = doc.querySelector('button'); assert.equal(button.textContent, '续费'); assert.equal(button.classList.contains('is-prominent'), true);
	button.click(); await new Promise(done=>setImmediate(done)); assert.equal(opened, undefined); assert.equal(calls,2);
	live = false; resolve({entitlement:{paid:false}}); await new Promise(done=>setImmediate(done)); assert.equal(button.textContent,'续费');
	dispose(); dom.window.dispatchEvent(new dom.window.Event('focus')); assert.equal(calls,2);
	assert.doesNotMatch(doc.body.textContent, /订单记录|刷新套餐|压缩|逻辑/); dom.window.close();
});


test('renewal action is hidden for a healthy plan and uses the purchase CTA within one calendar month', async () => {
    for (const [ends,visible] of [[Date.UTC(2027,0,1),false],[Date.UTC(2026,10,22),true],[at-1,true]]) {
        const dom=new JSDOM('<div id="setting"><div id="info"></div><div id="controls"></div></div>',{pretendToBeVisual:true}),doc=dom.window.document;
        const setting={settingEl:doc.querySelector('#setting'),infoEl:doc.querySelector('#info'),controlEl:doc.querySelector('#controls'),setName(){}};
        const dispose=mountBillingCard(setting,{connected:true,live:()=>true,now:()=>at,target:dom.window,load:async()=>paid(ends),open:async()=>{},onError:error=>{throw error;}});
        await new Promise(done=>setImmediate(done));const button=doc.querySelector('button');
        assert.equal(button.hidden,!visible);assert.equal(button.classList.contains('is-prominent'),visible);assert.equal(button.textContent,'续费');
        dispose();dom.window.close();
    }
});
