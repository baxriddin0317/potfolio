import { useState } from 'react';

// components
import Seo from '../../components/Seo';
import Circles from '../../components/Circles';

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

// counter
import CountUp from 'react-countup';

// data
import { EXPERIENCE_START_YEAR, yearsOfExperience } from '../../data/site';

// icons
import { FaHtml5, FaCss3, FaJs, FaReact, FaFigma } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
  SiTailwindcss,
  SiOpenai,
  SiVercel,
  SiVuedotjs,
  SiNuxtdotjs,
  SiGreensock,
} from 'react-icons/si';
import { BiLogoTypescript } from 'react-icons/bi';

//  about data
const aboutData = [
  {
    title: 'skills',
    info: [
      {
        title: 'Web Development',
        icons: [
          { id: 1, icon: <FaHtml5 /> },
          { id: 2, icon: <FaCss3 /> },
          { id: 3, icon: <FaJs /> },
          { id: 4, icon: <BiLogoTypescript /> },
          { id: 5, icon: <FaReact /> },
          { id: 6, icon: <SiNextdotjs /> },
          { id: 14, icon: <SiVuedotjs /> },
          { id: 15, icon: <SiNuxtdotjs /> },
        ],
      },
      {
        title: 'AI & SaaS',
        icons: [
          { id: 7, icon: <SiOpenai /> },
          { id: 8, icon: <SiTailwindcss /> },
          { id: 9, icon: <SiFramer /> },
          { id: 16, icon: <SiGreensock /> },
          { id: 10, icon: <SiVercel /> },
        ],
      },
      {
        title: 'UI/UX Design',
        icons: [
          { id: 11, icon: <FaFigma /> },
          { id: 12, icon: <SiAdobexd /> },
          { id: 13, icon: <SiAdobephotoshop /> },
        ],
      },
    ],
  },
  {
    title: 'experience',
    info: [
      {
        title: 'Freelance Front-End Developer - Fiverr & Upwork',
        stage: '2021 - 2024',
      },
      {
        title: "Junior Front-End Developer - Najot Ta'lim",
        stage: `${EXPERIENCE_START_YEAR} - 2021`,
      },
    ],
  },
  {
    title: 'why me',
    info: [
      { title: '🚀 Launch-ready MVPs in weeks, not months' },
      { title: '🎯 Pixel-perfect UI that matches your design' },
      { title: '⚡ Fast, SEO-friendly and scalable code' },
      { title: '💬 Clear communication and quick replies' },
    ],
  },
];

const About = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className='h-full bg-primary/30 py-32 text-center xl:text-left'>
      <Seo title='About' />
      <Circles />
      <div className='container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6'>
        {/* text */}
        <div className='flex-1 flex flex-col justify-center'>
          <motion.h2
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2'
          >
            Turning bold ideas into <span className='text-accent'>products</span> people love.
          </motion.h2>
          <motion.p
            variants={fadeIn('right', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0'
          >
            For {yearsOfExperience()}+ years I&apos;ve been helping founders, startups and agencies around the world bring their ideas to life. Today I focus on AI-powered SaaS MVPs — products that look stunning, feel effortless and are ready for real users from day one. I care about every pixel, every millisecond and every client.
          </motion.p>
          {/* counters */}
          <motion.div
            variants={fadeIn('right', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8'
          >
            <div className='flex flex-1 xl:gap-x-6'>
              {/* experience */}
              <div className='relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-4xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={yearsOfExperience()} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Years of experience
                </div>
              </div>
              {/* clients */}
              <div className='relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-4xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={45} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Satisfied clients
                </div>
              </div>
              {/* projects */}
              <div className='relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-4xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={50} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Projects completed
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* info */}
        <motion.div
          variants={fadeIn('left', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='flex flex-col w-full xl:max-w-[48%] h-[480px]'
        >
          <div className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'>
            {aboutData.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className={`${
                    index === itemIndex
                      ? 'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300'
                      : ''
                  }  cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          <div className='py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start'>
            {aboutData[index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className='flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60'
                >
                  {/* title */}
                  <div className='font-light mb-2 md:mb-0'>{item.title}</div>
                  {item.stage && <div className='hidden md:flex'>-</div>}
                  <div>{item.stage}</div>
                  <div className='flex gap-x-4'>
                    {/* icons */}
                    {item.icons?.map((i) => {
                      return <div key={i.id} className='text-2xl text-white'>{i.icon}</div>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
