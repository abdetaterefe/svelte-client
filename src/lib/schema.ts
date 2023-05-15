import { z } from 'zod';

// Name has a default value just to display something in the form.
export const schema = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email: z.string().email(),
	phone: z.string(),
	city: z.string(),
	region: z.string(),
	total: z.string()
});
