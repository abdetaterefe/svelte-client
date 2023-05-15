<script lang="ts">
	import type { Product } from '$lib/interfaces';
	import ProductCard from '../components/product-card.svelte';
	import { cart } from '../store';
	import { get } from 'svelte/store';

	export let data;

	const existingItem = (id: string) => {
		return get(cart).find((item) => item.productId === id);
	};

	const addOrRemoveCart = (product: Product) => {
		if (existingItem(product.id)) {
			$cart = $cart.filter(function (value) {
				if (value.productId != product.id) return value;
			});
		} else {
			cart.set([
				...get(cart),
				{
					productId: product.id,
					quantity: 1
				}
			]);
		}
	};
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<h2 class="sr-only">Products</h2>

		<div
			class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
		>
			{#each data.products as product}
				<ProductCard
					id={product.id}
					title={product.title}
					img={product.images[0].url}
					price={product.price.toString()}
					onClick={() => addOrRemoveCart(product)}
				/>
			{/each}
		</div>
	</div>
</div>
