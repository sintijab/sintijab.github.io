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

const about = defineCollection({
	schema: z.object({
		layout: z.string(),
		title: z.string(),
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
	}),
});

const contact = defineCollection({
	schema: z.object({
		layout: z.string(),
		title: z.string(),
		heroImage: z.string().optional(),
	}),
});


export const collections = { 'weekender': blog, 'projects': blog, 'research': blog, 'workshops': blog, 'about': about, 'contact': contact };
