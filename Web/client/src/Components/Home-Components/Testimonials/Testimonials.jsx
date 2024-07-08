import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import Image from "../../../img/image1.jpg";

SwiperCore.use([Autoplay]);

const Testimonials = () => {
  return (
    <div className="mb-32 mt-32">
      <div>
        <h1
          style={{ fontFamily: "Dancing Script" }}
          className="text-center text-2xl md:text-6xl underline mb-20"
        >
          Testimonials
        </h1>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:h-80 h-60 w-32 md:mb-20 mt-20">
                <img
                  src={Image}
                  alt="person 1"
                  className=" rounded-full mb-32 w-full h-full object-cover object-center"
                />
              </div>
              <div className="md:w-1/2 md:ml-8 md:mt-20">
                <h1
                  style={{ fontFamily: "Dancing Script" }}
                  className="text-6xl heading"
                >
                  InfoBros
                </h1>
                <p
                  style={{ fontFamily: "Edu NSW ACT Foundation" }}
                  className="mt-8 text-2xl subheading"
                >
                  Recruiting through VisuMeet has increased the efficiency of the hiring process.
                </p>
                <p
                  style={{ fontFamily: "Edu NSW ACT Foundation" }}
                  className="mt-10 text-xl signature"
                >
                  Syed Asher Ahmed Kazmi
                </p>
                <p
                  style={{ fontFamily: "Dancing Script" }}
                  className="signature"
                >
                  Founder of InfoBros
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:h-80 h-60 w-32 md:mb-20 mt-20">
                <img
                  src={Image}
                  alt="person 2"
                  className=" rounded-full mb-32 w-full h-full object-cover object-center"
                />
              </div>
              <div className="md:w-1/2 md:ml-8 md:mt-20">
                <h1
                  style={{ fontFamily: "Dancing Script" }}
                  className="text-6xl heading"
                >
                  InfoBros
                </h1>
                <p
                  style={{ fontFamily: "Edu NSW ACT Foundation" }}
                  className="mt-8 text-2xl subheading"
                >
                  Recruiting through VisuMeet has increased the efficiency of the hiring process.
                </p>
                <p
                  style={{ fontFamily: "Edu NSW ACT Foundation" }}
                  className="mt-10 text-xl signature"
                >
                  Syed Asher Ahmed Kazmi
                </p>
                <p
                  style={{ fontFamily: "Dancing Script" }}
                  className="signature"
                >
                  Founder of InfoBros
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:h-80 h-60 w-32 md:mb-20 mt-20">
                <img
                  src={Image}
                  alt="person 3"
                  className=" rounded-full mb-32 w-full h-full object-cover object-center"
                />
              </div>
              <div className="md:w-1/2 md:ml-8 md:mt-20">
                <h1
                  style={{ fontFamily: "Dancing Script" }}
                  className="text-6xl heading"
                >
                  InfoBros
                </h1>
                <p
                  style={{ fontFamily: "Edu NSW ACT Foundation" }}
                  className="mt-8 text-2xl subheading"
                >
                  Recruiting through VisuMeet has increased the efficiency of the hiring process.
                </p>
                <p
                  style={{ fontFamily: "Edu NSW ACT Foundation" }}
                  className="mt-10 text-xl signature"
                >
                  Syed Asher Ahmed Kazmi
                </p>
                <p
                  style={{ fontFamily: "Dancing Script" }}
                  className="signature"
                >
                  Founder of InfoBros
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
