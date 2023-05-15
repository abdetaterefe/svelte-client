<script lang="ts">
	import { get } from 'svelte/store';
	import { cart } from '../../../store.js';

	export let data;
	let imageIndex = 0;
	let selectedOptions: any = {};

	const existingItem = (id: string) => {
		return get(cart).find((item) => item.productId === id);
	};

	const addOrRemoveCart = () => {
		if (existingItem(data.product.id)) {
			$cart = $cart.filter(function (value) {
				if (value.productId != data.product.id) return value;
			});
		} else {
			cart.set([
				...get(cart),
				{
					productId: data.product.id,
					quantity: 1
				}
			]);
		}
	};
	$: btn = $cart.find((item) => item.productId === data.product.id)
		? 'Remove From Cart'
		: 'Add To Cart';
</script>

<div class="bg-white">
	<div class="max-w-2xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
		<div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
			<div class="flex flex-col-reverse">
				<div class="border border-black mt-6 p-1 w-full max-w-2xl mx-auto lg:max-w-none">
					<div
						class="grid md:grid-cols-4 gap-6 grid-cols-2"
						aria-orientation="horizontal"
						role="tablist"
					>
						{#each data.product.images as image, index}
							<button
								id="tabs-1-tab-1"
								class="relative h-24 bg-white marker:flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
								aria-controls="tabs-1-panel-1"
								on:click={() => {
									imageIndex = index;
								}}
								type="button"
							>
								<span class="absolute inset-0 overflow-hidden">
									<img
										src={image.url}
										alt={data.product.title}
										class="border border-black w-full h-full object-center object-cover"
									/>
								</span>

								<span
									class="ring-transparent absolute inset-0 ring-2 ring-offset-2 pointer-events-none"
									aria-hidden="true"
								/>
							</button>
						{/each}
					</div>
				</div>

				<div class="w-full aspect-w-1 aspect-h-1 border border-black">
					<div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
						{#key imageIndex}
							<img
								src={data.product.images[imageIndex].url}
								alt={data.product.title}
								class="w-full h-full object-center object-cover"
							/>
						{/key}
					</div>
				</div>
			</div>

			<div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
				<h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{data.product.title}</h1>

				<div class="mt-3">
					<p class="text-3xl text-gray-900">{data.product.price} Birr</p>
				</div>

				<div class="mt-6">
					<div class="text-base text-gray-700 space-y-6">
						<p>{data.product.description}</p>
					</div>
				</div>

				<form>
					<div class="mt-10">
						{#each data.product.options as option}
							<div class="mb-8">
								<div class="mb-4 text-sm uppercase tracking-wide">{option.name}</div>
								<div class="flex">
									{#each option.values as value}
										<button
											on:click={() => {
												selectedOptions = { ...selectedOptions, [option.name]: value };
											}}
											class={`${
												selectedOptions[option.name] === value ? 'opacity-100' : 'opacity-60'
											} px-4 hover:opacity-100 border-black h-12 mr-3 flex items-center justify-center border`}
										>
											{value}
										</button>
									{/each}
								</div>
							</div>
						{/each}
					</div>
					<div class="mt-10 flex sm:flex-col1">
						<button
							on:click={() => addOrRemoveCart()}
							type="submit"
							class="flex-1 bg-red-600 border border-transparent py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500 sm:w-full"
							>{btn}</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
