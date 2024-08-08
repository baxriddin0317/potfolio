// next image
import Image from 'next/image';

// next link
import Link from 'next/link';

// components
import Socials from '../components/Socials';

const Header = () => {
  return (
    <header className='absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px]'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8'>
          {/* logo */}
          <h1 className='font-bold'>
            Bakhriddin <span className='font-normal'>Khuja</span> <span className='text-accent'>.</span>
          </h1>
          {/* socials */}
          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;
