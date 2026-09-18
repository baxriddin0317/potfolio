// Single source of truth for personal info, copy and links.
// Used by the pages, the contact form and the AI chat assistant.

export const EXPERIENCE_START_YEAR = 2019;

export const yearsOfExperience = () =>
  new Date().getFullYear() - EXPERIENCE_START_YEAR;

export const services = [
  {
    title: 'AI SaaS MVP Development',
    description:
      'From idea to a launch-ready MVP in weeks: polished UI, dashboards and AI features your first users will love.',
  },
  {
    title: 'Figma to React & Next.js',
    description:
      'Your Figma or PSD design turned into pixel-perfect, responsive and SEO-friendly code — exactly as you imagined it.',
  },
  {
    title: 'AI Chatbots & LLM Integration',
    description:
      'Smart assistants that answer your customers 24/7, capture leads and save your team hours every week.',
  },
  {
    title: 'Vue.js & Nuxt.js Development',
    description:
      'Fast, scalable Vue and Nuxt applications with clean, maintainable architecture.',
  },
  {
    title: 'Landing Pages & GSAP Animation',
    description:
      'High-converting landing pages with smooth, eye-catching animations that make visitors stay and sign up.',
  },
  {
    title: 'Performance & SEO',
    description:
      'Faster load times, better Core Web Vitals and cleaner code, so your product ranks higher and feels instant.',
  },
];

export const site = {
  name: 'Bakhriddin Khuja',
  fullName: 'Bakhriddinkhuja Akhmadaliyev',
  role: 'AI SaaS MVP & Front-End Developer',
  description:
    'I help founders turn ideas into launch-ready AI SaaS MVPs and pixel-perfect websites — built with React, Next.js, Vue, TypeScript and AI.',
  stats: {
    fiverrRating: '5.0',
  },
  links: {
    upwork: 'https://www.upwork.com/freelancers/axmadaliyevbaxriddin',
    fiverr: 'https://www.fiverr.com/baxriddinxoja',
    telegram: 'https://t.me/Baxriddinxoja_Axmadaliyev',
    instagram: 'https://www.instagram.com/baxriddinxoja17/',
  },
  // Fiverr gigs the chat assistant can recommend.
  // Tip: replace the generic titles with each gig's real title so the
  // assistant can match visitors to the right gig more precisely.
  fiverrGigs: [
    {
      title: 'I will make a website using ReactJS, NextJS, TS, JS with Tailwind CSS (Figma to web)',
      url: 'https://www.fiverr.com/baxriddinxoja/create-responsive-webpage-in-react-js-and-tailwind-css',
    },
    { title: 'Front-end development gig', url: 'https://www.fiverr.com/s/K3eoP7V' },
    { title: 'Front-end development gig', url: 'https://www.fiverr.com/s/L3d0wKQ' },
    { title: 'Front-end development gig', url: 'https://www.fiverr.com/s/61Y4ywL' },
    { title: 'Front-end development gig', url: 'https://www.fiverr.com/s/Zom6808' },
  ],
};
