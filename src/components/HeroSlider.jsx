"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSlider = () => {
  return (
    <section className="w-full overflow-hidden relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "!w-3 !h-3 !rounded-full !bg-white/60",
          bulletActiveClass: "!bg-white",
        }}
        loop={true}
        speed={1000}
        className="w-full h-[70vh] max-h-[700px] !relative"
      >
        {/* SLIDE 1 */}
        <SwiperSlide className="!w-full !h-full relative">
          <div
            className="w-full h-full flex items-center justify-center bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
            }}
          >
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* CONTENT */}
            <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
              <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold drop-shadow-lg mb-4">
                Upgrade Your Skills Today 🚀
              </h1>
              <p className="text-[clamp(1rem,2vw,1.25rem)] max-w-2xl mx-auto mb-8">
                Learn from Industry Experts • Flexible Learning • Lifetime Access
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-all">
                Explore Courses
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide className="!w-full !h-full relative">
          <div
            className="w-full h-full flex items-center justify-center bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
            }}
          >
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* CONTENT */}
            <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
              <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold drop-shadow-lg mb-4">
                Master Web Dev & Design
              </h1>
              <p className="text-[clamp(1rem,2vw,1.25rem)] max-w-2xl mx-auto mb-8">
                50+ Premium Courses • Beginner to Advanced Level
              </p>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-all">
                Join Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroSlider;