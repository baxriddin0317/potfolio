// icons
import { RiInstagramLine } from 'react-icons/ri';
import { FaTelegramPlane } from 'react-icons/fa';
import { TbBrandFiverr, TbBrandUpwork } from 'react-icons/tb';

import { site } from '../data/site';

const socials = [
  { label: 'Upwork', href: site.links.upwork, icon: <TbBrandUpwork /> },
  { label: 'Fiverr', href: site.links.fiverr, icon: <TbBrandFiverr /> },
  { label: 'Telegram', href: site.links.telegram, icon: <FaTelegramPlane /> },
  { label: 'Instagram', href: site.links.instagram, icon: <RiInstagramLine /> },
];

const Socials = () => {
  return (
    <div className='flex items-center gap-x-5 text-lg'>
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={social.label}
          title={social.label}
          className='hover:text-accent transition-all duration-300'
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default Socials;
