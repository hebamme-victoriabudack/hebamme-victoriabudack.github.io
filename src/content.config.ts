import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const commonFields = {
  title: z.string(),
  description: z.string(),
  meta_title: z.string().optional(),
  date: z.date().optional(),
  image: z.string().optional(),
  draft: z.boolean(),
};

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    ...commonFields,
  }),
});

// contact collection schema
const contactCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    ...commonFields,
    contact_details: z.array(
      z.object({
        label: z.string(),
        info: z.string(),
        icon: z.string(),
        link: z.string().optional()
      })
    )
  }),
});

// Homepage collection schema
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      alt: z.string(),
      buttons: z.array(
        z.object({
          label: z.string(),
          icon: z.string(),
          link: z.string(),
        })
      ),
    }),
    services: z.object({
      title: z.string(),
      id: z.string(),
      description: z.string(),
      features: z.array(
        z.object({
          title: z.string(),
          image: z.string(),
          content: z.string(),
          bulletpoints: z.array(z.string()),
          button: z.object({
            enable: z.boolean(),
            label: z.string(),
            link: z.string(),
          }),
        }),
      ),
    }),
    offers: z.object({
      title: z.string(),
      id: z.string(),
      description: z.string(),
      features: z.array(
        z.object({
          title: z.string(),
          image: z.string(),
          content: z.string(),
          bulletpoints: z.array(z.string()),
          button: z.object({
            enable: z.boolean(),
            label: z.string(),
            link: z.string(),
          }),
        }),
      ),
    })
  }),
});

// Testimonials Section collection schema
const imageTestimonialSectionCollection = defineCollection({
  loader: glob({
    pattern: "image-testimonial.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    testimonials: z.array(
      z.object({
        alt: z.string(),
        image: z.string(),
      }),
    ),
  }),
});

// Export collections
export const collections = {
  // Pages
  homepage: homepageCollection,
  pages: pagesCollection,
  contact: contactCollection,

  // sections
  imageTestimonialSectionCollection: imageTestimonialSectionCollection
};
