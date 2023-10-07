import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		categories: z.string(),
		subcategories: z.string(),
	}),
});

export const collections = { 'weekender': blog, 'projects': blog, 'research': blog, 'workshops': blog };
