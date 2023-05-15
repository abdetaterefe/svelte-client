export interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	quantity: number;
	createdAt: string;
	updatedAt: string;
	images: Image[];
	options: Option[];
}

export interface Option {
	id: string;
	name: string;
	values: string[];
}

export interface Image {
	id: string;
	url: string;
}
