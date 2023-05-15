<script lang="ts">
	import { get } from 'svelte/store';
	import type { Product } from '../../lib/interfaces';
	import { cart } from '../../store';
	import { superForm } from 'sveltekit-superforms/client';
	import { error } from '@sveltejs/kit';
	import { order } from '$lib/real_shop';
	import { goto } from '$app/navigation';

	export let data;
	$: total = $cart.reduce((sum, item) => sum + getCart(item.productId)[0].price * item.quantity, 0);
	const { form, errors, constraints, enhance, delayed } = superForm(data.form, {
		onSubmit: ({ data }) => {
			data.set('total', total.toString());
		},
		onResult: async ({ result }) => {
			const carT = get(cart);
			const id = result.data.id;
			try {
				const res = await order({ ...result.data.form.data, id, total, carT });
				if (res.status === 200) {
					goto(result.data.result.data.checkout_url);
				} else {
					throw error(res.status);
				}
			} catch (e) {
				console.log(e);
			}
		}
	});

	const getCart = (productId: string) => {
		return data.products.filter((product: Product) => product.id === productId);
	};

	const existingItem = (id: string) => {
		return get(cart).find((item) => item.productId === id);
	};

	const removeCart = (productId: string) => {
		if (existingItem(productId)) {
			$cart = $cart.filter(function (value) {
				if (value.productId != productId) return value;
			});
		}
	};
	const minusItem = (productId: string) => {
		if (existingItem(productId)) {
			if (existingItem(productId)!.quantity === 1) {
				$cart = $cart.filter(function (value) {
					if (value.productId != productId) return value;
				});
			}
			cart.update((items) => {
				return items.map((item) => {
					if (item.productId === productId) {
						return { ...item, quantity: item.quantity - 1 };
					}
					return item;
				});
			});
		}
	};
	const plusItem = (productId: string) => {
		if (existingItem(productId)) {
			cart.update((items) => {
				return items.map((item) => {
					if (item.productId === productId) {
						return { ...item, quantity: item.quantity + 1 };
					}
					return item;
				});
			});
		}
	};
</script>

<div class="bg-white">
	<div class="max-w-3xl mx-auto py-4 px-4 sm:py-2 sm:px-3 lg:px-0">
		<h1 class="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl mb-10">
			Shopping Cart
		</h1>

		<form method="POST" use:enhance>
			<input type="hidden" name="total" bind:value={total} />
			<div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
				<div class="border-t border-black">
					<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
						<div>
							<label for="first-name" class="block text-sm font-medium text-gray-700"
								>First name</label
							>
							<div class="mt-1">
								<input
									type="text"
									id="first_name"
									name="first_name"
									bind:value={$form.first_name}
									{...$constraints.first_name}
									data-invalid={$errors.first_name}
									autocomplete="given-name"
									class="block w-full border-black shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
								/>
								{#if $errors.first_name}<span class="invalid">{$errors.first_name}</span>{/if}
							</div>
						</div>

						<div>
							<label for="last-name" class="block text-sm font-medium text-gray-700"
								>Last name</label
							>
							<div class="mt-1">
								<input
									type="text"
									id="last_name"
									name="last_name"
									bind:value={$form.last_name}
									{...$constraints.last_name}
									data-invalid={$errors.last_name}
									autocomplete="family-name"
									class="block w-full border-black shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
								/>
								{#if $errors.last_name}<span class="invalid">{$errors.last_name}</span>{/if}
							</div>
						</div>

						<div class="sm:col-span-2">
							<label for="phone" class="block text-sm font-medium text-gray-700">Email</label>
							<div class="mt-1">
								<input
									type="email"
									id="email"
									name="email"
									bind:value={$form.email}
									{...$constraints.email}
									data-invalid={$errors.email}
									autocomplete="email"
									class="block w-full border-black shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
								/>
								{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
							</div>
						</div>

						<div class="sm:col-span-2">
							<label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
							<div class="mt-1">
								<input
									type="text"
									id="phone"
									name="phone"
									bind:value={$form.phone}
									{...$constraints.phone}
									data-invalid={$errors.phone}
									autocomplete="tel"
									class="block w-full border-black shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
								/>
								{#if $errors.phone}<span class="invalid">{$errors.phone}</span>{/if}
							</div>
						</div>

						<div>
							<label for="city" class="block text-sm font-medium text-gray-700">City</label>
							<div class="mt-1">
								<input
									type="text"
									id="city"
									name="city"
									bind:value={$form.city}
									{...$constraints.city}
									data-invalid={$errors.city}
									autocomplete="address-level2"
									class="block w-full border-black shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
								/>
								{#if $errors.city}<span class="invalid">{$errors.city}</span>{/if}
							</div>
						</div>

						<div>
							<label for="region" class="block text-sm font-medium text-gray-700"
								>State / Province</label
							>
							<div class="mt-1">
								<input
									type="text"
									id="region"
									name="region"
									bind:value={$form.region}
									{...$constraints.region}
									data-invalid={$errors.region}
									autocomplete="address-level1"
									class="block w-full border-black shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
								/>
								{#if $errors.region}<span class="invalid">{$errors.region}</span>{/if}
							</div>
						</div>
					</div>
				</div>

				<ul class="border-t border-black divide-y divide-black">
					{#each $cart as item}
						<li class="flex py-6">
							<div class="flex-shrink-0">
								<img
									src={getCart(item.productId)[0].images[0].url}
									alt={getCart(item.productId)[0].title}
									class="w-24 h-24 border border-black object-center object-cover sm:w-32 sm:h-32"
								/>
							</div>

							<div class="ml-4 flex-1 flex flex-col sm:ml-6">
								<div>
									<div class="flex justify-between">
										<h4 class="text-sm">
											<a href="/" class="font-medium text-gray-700 hover:text-gray-800">
												{getCart(item.productId)[0].title}
											</a>
										</h4>
										<p class="ml-4 text-sm font-medium text-gray-900">
											{item.quantity} - {getCart(item.productId)[0].price} Birr
										</p>
									</div>
								</div>

								<div class="mt-4 flex-1 flex items-end justify-end">
									<div class="ml-4 space-x-6">
										<button
											type="button"
											on:click={() => minusItem(item.productId)}
											class="font-medium text-red-600 hover:text-red-500"
										>
											<span>-</span>
										</button>
										<button
											type="button"
											on:click={() => plusItem(item.productId)}
											class="font-medium text-red-600 hover:text-red-500"
										>
											<span>+</span>
										</button>
										<button
											type="button"
											on:click={() => removeCart(item.productId)}
											class="text-sm font-medium text-red-600 hover:text-red-500"
										>
											<span>Remove</span>
										</button>
									</div>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<div class="mt-10 border-t border-black pt-2">
				<div>
					<dl class="space-y-4">
						<div class="flex items-center justify-between">
							<dt class="text-base font-medium text-gray-900">Subtotal</dt>
							<dd class="ml-4 text-base font-medium text-gray-900">{total} Birr</dd>
						</div>
					</dl>
				</div>

				<div class="mt-10">
					<button
						type="submit"
						class="w-full bg-red-600 border border-transparent shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
						>{$delayed ? 'Ordering...' : 'Order'}</button
					>
				</div>

				<div class="mt-6 text-sm text-center">
					<p>
						or <a href="/" class="text-red-600 font-medium hover:text-red-500"
							>Continue Shopping<span aria-hidden="true"> &rarr;</span></a
						>
					</p>
				</div>
			</div>
		</form>
	</div>
</div>
