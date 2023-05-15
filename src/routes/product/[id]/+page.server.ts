import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProduct } from '$lib/real_shop';

export const load = (async ({ params }) => {
	const res = await getProduct(params.id);
	if (res.status === 200) {
		const product = res.body;

		if (product) {
			return { product };
		}
		throw error(404);
	} else {
		throw error(res.status);
	}
}) satisfies PageServerLoad;
