import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import logo from '../../assets/icon.png';
import './slider.scss'
import kola from "../../assets/kola.png";
import maksa from "../../assets/maksa.png";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);
register();

// Тип для swiper-container
type SwiperContainerElement = HTMLElement & {
  swiper?: unknown;
};

export const Slider: React.FC = () => {
  const swiperElRef = useRef<SwiperContainerElement | null>(null);

  useEffect(() => {
    const swiperEl = swiperElRef.current;
    if (!swiperEl) return;

    const onProgress = (e: Event) => {
      const customEvent = e as CustomEvent<[unknown, number]>;
      const [, progress] = customEvent.detail;
      console.log(progress);
    };

    const onSlideChange = () => {
      console.log('slide changed');
    };

    swiperEl.addEventListener('swiperprogress', onProgress);
    swiperEl.addEventListener('swiperslidechange', onSlideChange);

    return () => {
      swiperEl.removeEventListener('swiperprogress', onProgress);
      swiperEl.removeEventListener('swiperslidechange', onSlideChange);
    };
  }, []);
  const PlayerList = [
    {
      img: kola,
      title: 'Николай',
    },
    {
      img: maksa,
      title: 'Максимка'
    },
    {
      img: logo,
      title: 'Вояка'
    },
    {
      img: logo,
      title: 'Гриша'
    },
    {
      img: logo,
      title: 'Степа'
    },
    {
      img: logo,
      title: 'Алекс'
    },
    {
      img: logo,
      title: 'Клюкин'
    },
    {
      img: logo,
      title: 'Парадоха'
    },
        {
      img: logo,
      title: 'Кауфмо',
    },
    {
      img: logo,
      title: 'Веникус(Гей)'
    },
    {
      img: logo,
      title: 'Курка'
    }
  ];
  return (
    <div className='slider'>
      <Swiper
        navigation={true}
        autoplay={{delay: 6500}}
        loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {PlayerList.map((player, index) => (
          <SwiperSlide key={index}>
            <img src={player.img} alt={player.title} />
            <p>{player.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};