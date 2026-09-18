// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// icons
import {
  RxRocket,
  RxDesktop,
  RxChatBubble,
  RxLayers,
  RxMagicWand,
  RxLightningBolt,
  RxArrowTopRight,
} from 'react-icons/rx';

// next link
import Link from 'next/link';

// import required modules
import { FreeMode, Pagination } from 'swiper';

// service data
import { services } from '../data/site';

const icons = [
  <RxRocket key='rocket' />,
  <RxDesktop key='desktop' />,
  <RxChatBubble key='chat' />,
  <RxLayers key='layers' />,
  <RxMagicWand key='magic' />,
  <RxLightningBolt key='bolt' />,
];

export const serviceData = services.map((service, index) => ({
  ...service,
  icon: icons[index % icons.length],
}));

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },

        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className='h-[240px] sm:h-[340px]'
    >
      {serviceData.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Link
              href='/contact'
              className='bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300'
            >
              {/* icon */}
              <div className='text-4xl text-accent mb-4'>{item.icon}</div>
              {/* title & desc */}
              <div className='mb-8'>
                <div className='mb-2 text-lg'>{item.title}</div>
                <p className='max-w-[350px] leading-normal'>
                  {item.description}
                </p>
              </div>
              {/* arrow */}
              <div className='text-3xl'>
                <RxArrowTopRight className='group-hover:rotate-45 group-hover:text-accent transition-all duration-300' />
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ServiceSlider;
