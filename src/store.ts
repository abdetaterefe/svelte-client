import { writable } from 'svelte/store';

export const cart = writable<{ productId: string; quantity: number }[]>([]);
