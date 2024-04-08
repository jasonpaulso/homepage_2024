import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ['**/react/*'],
      experimentalReactChildren: true,
    }),
    tailwind(),
    db(),
  ],
  prefetch: true,

  // site: 'https://jasonpaulso.github.io',
  // base: '/homepage_2024',
  // trailingSlash: 'never',
});
