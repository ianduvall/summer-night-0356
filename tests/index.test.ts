import { type UnstableDevWorker, unstable_dev } from 'wrangler';

describe('worker', () => {
	let worker: UnstableDevWorker;
	beforeAll(async () => {
		worker = await unstable_dev('src/index.ts', {
			logLevel: 'debug',
			experimental: { disableExperimentalWarning: true },
		});
	});
	afterAll(async () => {
		await worker.stop();
	});

	const value = { foo: 'bar' };

	test('PUT request', async () => {
		const url = `http://${worker.address}:${worker.port}`;

		const response = await worker.fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(value),
		});

		expect(response.status).toBe(201);
	});
});
