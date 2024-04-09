import { db, Headline, ExperienceCard } from 'astro:db';

import eggImage from '@assets/images/stickers/egg.png';
import boomImage from '@assets/images/stickers/boom.png';
import herbImage from '@assets/images/stickers/herb.png';
import puppyImage from '@assets/images/stickers/puppy.png';
import shipImage from '@assets/images/stickers/ship.png';
import yogaImage from '@assets/images/stickers/yoga.png';
import jasonAboutImage from '@assets/images/stickers/Memoji_About.png';
import helloImage from '@assets/images/stickers/hello.png';

const headlines = [
  { image: herbImage, text: 'Versatile software developer with a green thumb for frontend, cultivating clean code 💻 and thriving houseplants', animation: 'animate-skew', page: 'about' },
  { image: eggImage, text: 'Software engineer specializing in frontend, former professional cook serving up innovative web experiences 🌐', animation: 'animate-sizzle', page: 'about' },
  { image: yogaImage, text: 'Frontend-focused developer, yoga enthusiast, and lifelong learner, embracing flexibility in 🚀 code and life', animation: 'animate-levitate', page: 'about' },
  { image: boomImage, text: 'Software developer by day, Fallout aficionado by night, crafting immersive 👨‍💻 frontend experiences and surviving the Wasteland', animation: 'animate-pulse', page: 'about' },
  { image: puppyImage, text: 'Frontend specialist and proud dog dad, bringing 💡 creativity and enthusiasm to every project', animation: 'animate-pant', page: 'about' },
  { image: shipImage, text: 'Former cruise line coordinator turned frontend developer, ⚓ navigating the high seas of web development', animation: 'animate-rotation', page: 'about' },
  { image: jasonAboutImage, text: 'Driven frontend-focused engineer, fusing technical aptitude and creativity to deliver 🌟 captivating web experiences', animation: '', page: 'about' },
  { image: helloImage, text: 'Hello! I’m Jason Schulz, a frontend developer and software engineer based in Brooklyn, New York', animation: 'animate-rotation', page: 'home' },
];

const cards = [
  {
    headline: 'Front',
    statement:
      'As a frontend developer at Front, I collaborated with a talented team of designers and engineers to plan and build high-performing landing pages for diverse marketing campaigns. Leveraging my expertise in React, TypeScript, Next.js, GraphQL, and Craft CMS, I delivered engaging user experiences that drove successful results.',
    class: 'card-onyx',
  },
  {
    headline: 'Microsoft',
    statement:
      'As a Software Engineer II at Microsoft, I worked on delivering new features for the Microsoft 365 suite. I developed the frontend for Money in Excel, a React-based plugin with a substantial user base, and overhauled the map UI for the Microsoft 365 Accounts homepage. Utilizing React, Angular, TypeScript, and Azure DevOps, I implemented impactful solutions that enhanced user experiences.',
    class: 'card-dark-walnut',
  },
  {
    headline: 'MileIQ by Microsoft',
    statement: `As the sole developer on the Marketing team at MileIQ post-acquisition, I rebuilt the website from legacy stack to Microsoft's infrastructure. Using React, Angular, JavaScript, and TypeScript, I optimized development processes and delivered a seamless user experience across web and mobile platforms, establishing MileIQ as a top-level page on Microsoft.com.`,
    class: 'card-ash-gray',
  },
  {
    headline: 'Previously...',
    statement:
      'As a freelance web developer, I collaborated with design studios, nonprofits, and brands to create websites and email campaigns. I also led digital transformation efforts at a Bay Area design showroom, implementing technologies to support online product catalogs and sales tracking. These experiences honed my adaptability, problem-solving, and communication skills.',
    class: 'card-blue-gray',
  },
];

// https://astro.build/db/seed
export default async function seed() {
  headlines.map(async (headline) => {
    await db.insert(Headline).values([headline]);
  });
  cards.map(async (card) => {
    await db.insert(ExperienceCard).values([card]);
  });
}
