<script>
	import '../app.postcss';
	import { cart } from '../store';

	$: total = $cart.reduce((total, cart) => total + cart.quantity, 0);
</script>

<div class="bg-gray-50">
	<header class="relative">
		<nav aria-label="Top">
			<div class="bg-white shadow-sm border-b border-black">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="h-16 flex items-center justify-between">
						<!-- Logo (lg+) -->
						<div class="hidden lg:flex-1 lg:flex lg:items-center">
							<a href="/">
								<span class="sr-only">Workflow</span>
								<img class="h-8 w-auto" src="/favicon.png" alt="" />
							</a>
						</div>

						<!-- Mobile menu and search (lg-) -->
						<div class="flex-1 flex items-center lg:hidden">
							<!-- Search -->
							<a href="/" class="ml-2 p-2 text-gray-400 hover:text-gray-500">
								<span class="sr-only">Search</span>
								<!-- Heroicon name: outline/search -->
								<svg
									class="w-6 h-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</a>
						</div>

						<!-- Logo (lg-) -->
						<a href="/" class="lg:hidden">
							<span class="sr-only">Workflow</span>
							<img src="/favicon.png" alt="" class="h-8 w-auto" />
						</a>

						<div class="flex-1 flex items-center justify-end">
							<a
								href="/"
								class="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
							>
								Search
							</a>

							<div class="flex items-center lg:ml-8">
								<!-- Help -->
								<a href="/" class="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
									<span class="sr-only">Help</span>
									<!-- Heroicon name: outline/question-mark-circle -->
									<svg
										class="w-6 h-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</a>
								<a
									href="/"
									class="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
									>Help</a
								>

								<!-- Cart -->
								<div class="ml-4 flow-root lg:ml-8">
									<a href="/cart" class="group -m-2 p-2 flex items-center">
										<!-- Heroicon name: outline/shopping-bag -->
										<svg
											class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
											/>
										</svg>
										<span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
											>{total}</span
										>
										<span class="sr-only">items in cart, view bag</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
	<slot />
</div>
