// components
import Seo from '../components/Seo';
import ParticlesContainer from '../components/ParticlesContainer';
import ProjectsBtn from '../components/ProjectsBtn';
import { openChat } from '../components/ChatWidget';

// icons
import { HiSparkles } from 'react-icons/hi2';

// framer motion
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../variants';

const Home = () => {
  return (
    <div className='bg-primary/60 h-full'>
      <Seo />
      {/* text */}
      <div className='w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10'>
        <div className='text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto'>
          {/* badge */}
          <motion.div
            variants={fadeIn('down', 0.1)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden sm:flex items-center gap-2 self-center xl:self-start mb-6 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs tracking-wide text-white/80'
          >
            <span className='relative flex w-2 h-2'>
              <span className='absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping' />
              <span className='relative inline-flex w-2 h-2 rounded-full bg-green-400' />
            </span>
            Available for new projects
          </motion.div>
          {/* title */}
          <motion.h1
            variants={fadeIn('down', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h1'
          >
            From idea to <br /> <span className='text-accent'>AI SaaS MVP</span> in weeks
          </motion.h1>
          {/* subtitle */}
          <motion.p
            variants={fadeIn('down', 0.3)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-12'
          >
            I help founders and startups launch beautiful, lightning-fast products — AI-powered web apps, dashboards and landing pages built with React, Next.js and TypeScript. You bring the vision, I turn it into something users love.
          </motion.p>
          {/* btn */}
          <div className='flex justify-center xl:hidden relative'>
            <ProjectsBtn />
          </div>
          <motion.div
            variants={fadeIn('down', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden xl:flex items-center gap-10 relative z-10'
          >
            <ProjectsBtn />
            <button
              onClick={() => openChat()}
              className='group flex items-center gap-3 h-[56px] px-8 rounded-full bg-gradient-to-r from-accent to-[#4a22bd] font-medium shadow-[0_10px_30px_-10px_rgba(241,48,36,0.7)] hover:shadow-[0_10px_40px_-5px_rgba(241,48,36,0.8)] hover:-translate-y-0.5 transition-all duration-300'
            >
              <HiSparkles className='text-xl group-hover:rotate-12 transition-transform duration-300' />
              Discuss your idea with my AI
            </button>
          </motion.div>
        </div>
      </div>
      {/* image */}
      <div className='w-[1200px] h-full absolute right-0 bottom-0'>
        {/* bg img */}
        <div className='bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0'></div>
        {/* particles */}
        <ParticlesContainer />
      </div>
    </div>
  );
};

export default Home;
