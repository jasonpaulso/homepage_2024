import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ['**/react/*'],
      experimentalReactChildren: true,
    }),
  ],

  // site: 'https://jasonpaulso.github.io',
  // base: '/homepage_2024',
  // trailingSlash: 'never',
});
