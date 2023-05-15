import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProducts } from '$lib/real_shop';
import type { Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { schema } from '$lib/schema';

export const load = (async () => {
	const res = await getProducts();
	const form = await superValidate(schema);

	if (res.status === 200) {
		const products = res.body;

		if (products) {
			return { products, form };
		}
		throw error(404);
	} else {
		throw error(res.status);
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const id = crypto.randomUUID();
		const chapa_auth = import.meta.env.VITE_CHASECK_TEST;
		const svelte_client = import.meta.env.VITE_SVELTE_CLIENT_URL

		const headersList = {
			Accept: '*/*',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${chapa_auth}`
		};

		const { first_name, last_name, email, phone, total } = form.data;

		const bodyContent = JSON.stringify({
			amount: total,
			currency: 'ETB',
			email: email,
			first_name: first_name,
			last_name: last_name,
			phone_number: phone,
			tx_ref: id,
			callback_url: `${svelte_client}/api/verify/?tx_ref=${id}`,
			return_url: `${svelte_client}/success`
		});

		const res = await fetch('https://api.chapa.co/v1/transaction/initialize', {
			method: 'POST',
			headers: headersList,
			body: bodyContent,
			mode: 'no-cors'
		});
		const result = await res.json();
		if (result.status === 'success') {
			return { id, form, result };
		} else {
			throw error(400, result.status);
		}
	}
} satisfies Actions;
