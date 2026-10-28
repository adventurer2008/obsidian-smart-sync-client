// Synthetic CPU-only checkpoint capture comparison; no vault/service/disk writes.
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { ConnectionCheckpoints } from '../src/checkpoint.js';

const notes = {}, localIndex = {};
for (let i = 0; i < 2000; i++) {
	notes[i] = { path: `${i}.md`, digest: 'a'.repeat(64), downloaded: true, base: 'synthetic\n'.repeat(400), revision: 1 };
	localIndex[`${i}.md`] = { stamp: `${i}`, digest: 'a'.repeat(64), size: 4000 };
}
const connections = { synthetic: { cursor: 2000, notes, localIndex } };
function baseline() {
	const records = new Map();
	for (const [id, state] of Object.entries(connections)) {
		const { notes, localIndex, ...rest } = state;
		records.set(JSON.stringify([id]), JSON.stringify(rest));
		for (const [kind, values] of [['notes', notes], ['localIndex', localIndex]])
			for (const key of Object.keys(values)) records.set(JSON.stringify([id, kind, key]), JSON.stringify(values[key]));
	}
	return records;
}
const store = new ConnectionCheckpoints({}, '', () => assert.fail('no persistence in CPU benchmark'));
assert.deepEqual(store.encode(connections), baseline());
function measure(capture) {
	const start = performance.now();
	for (let iteration = 0; iteration < 20; iteration++) {
		connections.synthetic.cursor++;
		notes[iteration].revision++;
		capture();
	}
	return performance.now() - start;
}
const baselineMs = measure(baseline), optimizedMs = measure(() => store.encode(connections));
assert.deepEqual(store.encode(connections), baseline());
console.log(JSON.stringify({ workload: '2000 synthetic notes and indexes, 20 captures, one note mutation per capture',
	baselineMs, optimizedMs, ratio: baselineMs / optimizedMs,
	boundary: 'CPU capture only; not end-to-end sync speed or a production guarantee' }, null, 2));
