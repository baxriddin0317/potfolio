// links
import Link from 'next/link';

// icons
import {
  RiYoutubeLine,
  RiInstagramLine,
  RiFacebookLine,
  RiDribbbleLine,
  RiBehanceLine,
  RiPinterestLine,
} from 'react-icons/ri';
import { FaTelegramPlane } from "react-icons/fa"
import { TbBrandFiverr, TbBrandUpwork } from "react-icons/tb";

const Socials = () => {
  return (
    <div className='flex items-center gap-x-5 text-lg'>
      <Link href={'https://www.instagram.com/baxriddinxoja17/'} target='_blank' className='hover:text-accent transition-all duration-300'>
        <RiInstagramLine />
      </Link>
      <Link href={'https://t.me/Baxriddinxoja_Axmadaliyev'} target='_blank' className='hover:text-accent transition-all duration-300'>
        <FaTelegramPlane />
      </Link>
      <Link href={'https://www.fiverr.com/baxriddinxoja?up_rollout=true'} target='_blank' className='hover:text-accent transition-all duration-300'>
        <TbBrandFiverr />
      </Link>
      <Link href={'https://www.upwork.com/freelancers/axmadaliyevbaxriddin'} target='_blank' className='hover:text-accent transition-all duration-300'>
        <TbBrandUpwork />
      </Link>
    </div>
  );
};

export default Socials;
