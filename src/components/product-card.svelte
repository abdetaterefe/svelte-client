<script lang="ts">
	import { cart } from '../store';

	export let id = '';
	export let title = '';
	export let img = '';
	export let price = '';
	export let onClick = () => {};

	$: btn = $cart.find((item) => item.productId === id) ? 'Remove From Cart' : 'Add To Cart';
</script>

<div>
	<a href={`product/${id}`} class="group">
		<div
			class="border border-black aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
		>
			<img
				src={img}
				alt={title}
				class="h-full w-full object-cover object-center group-hover:opacity-75"
			/>
		</div>
	</a>
	<a href={`product/${id}`} class="group">
		<h3 class="mt-4 text-sm text-gray-700">{title}</h3>
	</a>

	<p class="mt-1 text-lg font-medium text-gray-900">{price} Birr</p>
	<button
		on:click={onClick}
		class="w-full bg-red-600 border border-transparent hover:bg-red-700 shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
		>{btn}</button
	>
</div>
