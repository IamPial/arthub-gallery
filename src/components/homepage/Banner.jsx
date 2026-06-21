"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import firstBannerImg from "@/assets/banner1.png";
import secondBannerImg from "@/assets/banner2.png";
import thirdBannerImg from "@/assets/banner3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Discover & Buy Original Art",
      description:
        "Explore an exclusive collection of masterpieces from world-class contemporary artists. Start building your personal gallery today.",
      image: firstBannerImg,
    },
    {
      id: 2,
      title: "Empower Your Creative Vision",
      description:
        "Connect directly with independent creators worldwide. Own unique digital and physical art pieces that speak to your soul.",
      image: secondBannerImg,
    },
    {
      id: 3,
      title: "Where Passion Meets Canvas",
      description:
        "Unleash the beauty of visual storytelling. Certified authentic paintings delivered safely to your doorstep.",
      image: thirdBannerImg,
    },
  ];

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-[#131129] overflow-hidden group">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".my-swiper-next",
          prevEl: ".my-swiper-prev",
        }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <>
              <div className="absolute inset-0 w-full h-full relative">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#131129]/60 md:bg-transparent md:bg-linear-to-r md:from-[#131129] md:via-[#131129]/80 md:to-transparent z-10" />
                <div className="absolute inset-0 bg-linear-to-t from-[#131129] via-transparent to-transparent z-10" />
              </div>

              <div className="absolute inset-0 flex items-center z-20">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col gap-5 max-w-xl">
                    <span className="text-xs md:text-sm font-semibold text-[#6f4ff2] tracking-widest uppercase bg-[#6f4ff2]/10 border border-[#6f4ff2]/20 px-3.5 py-1.5 rounded-full w-fit">
                      Curated Masterpieces
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                      {slide.title.split("&").map((text, i) => (
                        <span key={i}>
                          {i > 0 && <span className="text-[#6f4ff2]"> & </span>}
                          {text}
                        </span>
                      ))}
                    </h1>

                    <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
                      {slide.description}
                    </p>

                    <Link href="/artworks" className="mt-4">
                      <Button className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-bold text-base px-8 py-6 rounded-xl transition-all shadow-lg hover:shadow-[#6f4ff2]/20 shadow-[#6f4ff2]/10">
                        Browse Artworks
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        isIconOnly
        className="my-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 min-w-0 w-11 h-11 rounded-xl border border-white/10 bg-[#131129]/40 backdrop-blur-md text-white hover:bg-[#6f4ff2] hover:border-[#6f4ff2] transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="text-2xl" />
      </Button>

      <Button
        isIconOnly
        className="my-swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-30 min-w-0 w-11 h-11 rounded-xl border border-white/10 bg-[#131129]/40 backdrop-blur-md text-white hover:bg-[#6f4ff2] hover:border-[#6f4ff2] transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
        aria-label="Next slide"
      >
        <FiChevronRight className="text-2xl" />
      </Button>
    </div>
  );
};

export default Banner;
