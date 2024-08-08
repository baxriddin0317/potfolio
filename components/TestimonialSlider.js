// testimonial slider data
export const testimonialSlider = [
  {
    image: '/t-avt-1.png',
    name: 'jeytehagaley',
    position: 'United States',
    message:
      'Really happy with the quality of work and effort I received. I`ll be coming back for any of my Frontend needs.',
  },
  {
    image: '/t-avt-2.png',
    name: 'mahomet89',
    position: 'Belgium',
    message:
      'Worked together for the second time. Really nice guy and very quickly in response.',
  },
  {
    image: '/t-avt-3.png',
    name: 'danielfank',
    position: 'Switzerland',
    message:
      'Great service thanks',
  },
  {
    image: '/t-avt-3.png',
    name: 'jbnl85',
    position: 'Netherlands',
    message:
      'Nice and fast reaction. First order, we where very curious about the quality of coding. This was almost perfect (90%). The little amount of feedback fixed the same day in a couple of hours. When we need more we will definitely come back. Thank you!',
  },
  {
    image: '/t-avt-3.png',
    name: 'stuffcoolk',
    position: 'Canada',
    message:
      'Fast and professional delivery while following good code practices & web standards. Highly recommend!',
  },
  {
    image: '/t-avt-3.png',
    name: 'shareef301',
    position: 'Maldives',
    message:
      'easy to work with. it`s like i know him for years. very easy to communicate with. hope to do more projects with the seller.',
  },
];

// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper';

// icons
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className='h-[400px]'
    >
      {testimonialSlider.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='flex flex-col items-center md:flex-row gap-x-8 h-full px-16'>
              {/* avatar, name, position */}
              <div className='w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0'>
                <div className='flex flex-col justify-center text-center'>
                  {/* avatar */}
                  <div className='mb-2 mx-auto w-24 h-24 rounded-full overflow-hidden flex items-center justify-center capitalize text-2xl bg-gray-600'>
                    <span>{person.name.slice(0,1)}</span>
                  </div>
                  {/* name */}
                  <div className='text-lg'>{person.name}</div>
                  {/* position */}
                  <div className='text-[12px] uppercase font-extralight tracking-widest'>
                    {person.position}
                  </div>
                </div>
              </div>
              {/* quote & message */}
              <div className='flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20'>
                {/* quote icon */}
                <div className='mb-4'>
                  <FaQuoteLeft className='text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0' />
                </div>
                {/* message */}
                <div className='xl:text-lg text-center md:text-left'>
                  {person.message}
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;
