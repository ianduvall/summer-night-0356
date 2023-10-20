export interface Env {
	MY_BUCKET: R2Bucket;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const key = 'key';
		if (request.method === 'GET') {
			const result = await env.MY_BUCKET.get(key);
			if (!result) {
				return new Response('Not found', { status: 404 });
			}
			return new Response(result?.body, { status: 200 });
		} else if (request.method === 'PUT') {
			const value = request.body;
			const result = await env.MY_BUCKET.put(key, value);
			return new Response('Created', { status: 201 });
		}

		return new Response('Not found', { status: 404 });
	},
};
