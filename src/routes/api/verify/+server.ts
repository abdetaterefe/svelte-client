import type { RequestHandler } from './$types';

export const GET = (async ({ fetch, url }) => {
	const tx_ref = url.searchParams.get('tx_ref');

	if (tx_ref != null) {
		const real_shop_key = import.meta.env.VITE_REAL_SHOP_KEY;
		const real_shop_url = import.meta.env.VITE_REAL_SHOP_URL;
		const headersList = {
			Accept: '*/*',
			Authorization: `Bearer ${real_shop_key}`
		};

		const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
			method: 'GET',
			headers: headersList
		});

		const result = await response.json();
		if (result.status === 'success') {
			await fetch(`${real_shop_url}/api/v1/verify-order?tx_ref=${tx_ref}`);
			return new Response('verified');
		}
	}

	return new Response('not verified');
}) satisfies RequestHandler;
