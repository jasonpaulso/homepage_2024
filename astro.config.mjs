import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react({
    include: ['**/react/*'],
    experimentalReactChildren: true
  }), tailwind()]

  // site: 'https://jasonpaulso.github.io',
  // base: '/homepage_2024',
  // trailingSlash: 'never',
});