import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProducts } from '$lib/real_shop';

export const load = (async () => {
	const res = await getProducts();
	if (res.status === 200) {
		const products = res.body;

		if (products) {
			return { products };
		}
		throw error(404);
	} else {
		throw error(res.status);
	}
}) satisfies PageServerLoad;
