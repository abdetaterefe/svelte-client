import { error } from '@sveltejs/kit';

export async function getProducts() {
	try {
		const real_shop_key = import.meta.env.VITE_REAL_SHOP_KEY;
		const real_shop_url = import.meta.env.VITE_REAL_SHOP_URL;
		const headersList = {
			Accept: '*/*',
			Authorization: `Bearer ${real_shop_key}`
		};
		const res = await fetch(`${real_shop_url}/api/v1/products`, {
			method: 'GET',
			headers: headersList
		});
		return {
			status: res.status,
			body: await res.json()
		};
	} catch (error) {
		return {
			status: 500,
			error: 'Error receiving data'
		};
	}
}
export async function getProduct(id: string) {
	try {
		const real_shop_key = import.meta.env.VITE_REAL_SHOP_KEY;
		const real_shop_url = import.meta.env.VITE_REAL_SHOP_URL;
		const headersList = {
			Accept: '*/*',
			Authorization: `Bearer ${real_shop_key}`
		};
		const res = await fetch(`${real_shop_url}/api/v1/product?id=${id}`, {
			method: 'GET',
			headers: headersList
		});
		return {
			status: res.status,
			body: await res.json()
		};
	} catch (error) {
		return {
			status: 500,
			error: 'Error receiving data'
		};
	}
}

export async function order({
	id,
	total,
	first_name,
	last_name,
	email,
	phone,
	city,
	region,
	carT
}: {
	id: string;
	total: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	city: string;
	region: string;
	carT: { productId: string; quantity: number }[];
}) {
	const real_shop_key = import.meta.env.VITE_REAL_SHOP_KEY;
	const real_shop_url = import.meta.env.VITE_REAL_SHOP_URL;
	const headersList = {
		Accept: '*/*',
		Authorization: `Bearer ${real_shop_key}`,
		'Content-Type': 'application/json'
	};
	const bodyContent = JSON.stringify({
		total: parseInt(total),
		tx_ref: id,
		name: `${first_name} ${last_name}`,
		email: email,
		phoneNumber: parseInt(phone),
		city: city,
		state: region,
		cart: carT
	});
	const res = await fetch(`${real_shop_url}/api/v1/order`, {
		method: 'POST',
		body: bodyContent,
		headers: headersList
	});
	if (res.status === 200) {
		return {
			status: res.status,
			body: await res.json()
		};
	} else {
		throw error(res.status);
	}
}
