import assert from 'node:assert/strict';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';
import { billingCard, mountBillingCard, renewalReminderAt } from '../src/billing.js';

const at = Date.UTC(2026, 9, 22), gb = 1024 ** 3;
const paid = ends => ({ everPurchased:true, entitlement:{paid:true,plan:'cn-5gb-year',logical:5*gb,ends}, usage:{logicalBytes:1.2*gb} });
test('purchase and renewal states use one calendar month, including short months and expired plans', () => {
	assert.equal(billingCard(undefined, false, at).label, '购买');
	assert.equal(billingCard({entitlement:{paid:false,logical:gb},usage:{logicalBytes:0}}, true, at).prominent, true);
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
test('the mounted card resumes a pending order, refreshes on return and discards responses after identity change/disposal', async () => {
	const dom = new JSDOM('<div id="setting"><div id="info"></div><div id="controls"></div></div>', {pretendToBeVisual:true});
	const doc = dom.window.document;
	const setting = {settingEl:doc.querySelector('#setting'),infoEl:doc.querySelector('#info'),controlEl:doc.querySelector('#controls'),setName() {}};
	let live = true, calls = 0, resolve, opened;
	const value = {...paid(Date.UTC(2027,0,1)),currentOrder:{id:'a'.repeat(32),title:'5GB',status:'pending'}};
	const dispose = mountBillingCard(setting, {connected:true,live:()=>live,now:()=>at,target:dom.window,
		load:async()=>{calls++; if(calls===1) return value; return new Promise(done=>{resolve=done;});}, open:async id=>{opened=id;},onError:error=>{throw error;}});
	await new Promise(done=>setImmediate(done));
	const button = doc.querySelector('button'); assert.equal(button.textContent, '续费'); assert.equal(button.classList.contains('is-prominent'), false);
	button.click(); await new Promise(done=>setImmediate(done)); assert.equal(opened, 'a'.repeat(32)); assert.equal(calls,2);
	live = false; resolve({entitlement:{paid:false}}); await new Promise(done=>setImmediate(done)); assert.equal(button.textContent,'续费');
	dispose(); dom.window.dispatchEvent(new dom.window.Event('focus')); assert.equal(calls,2);
	assert.doesNotMatch(doc.body.textContent, /订单记录|刷新套餐|压缩|逻辑/); dom.window.close();
});
