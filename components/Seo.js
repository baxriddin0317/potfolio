import Head from 'next/head';

import { site } from '../data/site';

const Seo = ({ title, description = site.description }) => {
  const fullTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} — ${site.role}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
    </Head>
  );
};

export default Seo;
