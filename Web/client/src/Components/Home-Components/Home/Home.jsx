import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Home = () => {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const autoSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      autoSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="main">
      <div className="flex flex-col md:flex-row">
        {/* Writting some detail for the website */}
        <div className="w-1/2">
          <div style={{ fontFamily: "Dancing Script" }}>
            <h1 className="text-3xl md:text-5xl w-full md:w-96 ml-8 mt-32 md:mt-44 md:ml-16">
              Elevate Your Interview Experience with VisuMeet
            </h1>
          </div>
          <div style={{ fontFamily: "Edu NSW ACT Foundation" }}>
            <h1 className="text-xl md:text-2xl w-[120%] md:w-96 ml-8 md:ml-16 mt-2">
              Unleash the power of Real-Time Sentiment Analysis and Emotion
              Detection.
              {/* <span className="underline">Create</span> ,{" "}
              <span className="underline">Share</span> and{" "}
              <span className="underline">Embed</span> your portfolio with the */}
            </h1>
          </div>
          <div style={{ fontFamily: "Dancing Script" }}>
            <h1 className="md:text-2xl text-lg cursor-pointer inline-block p-3 rounded-xl mt-4 ml-8 md:ml-16 text-white bg-blue-700 hover:bg-blue-900 duration-300">
              <a href="/login">Get Started</a>
            </h1>
          </div>
        </div>

        {/* Adding image for the website */}

        <div className="md:w-1/2 mt-10 mx-4 md:mt-44 group relative">
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="w-full md:w-[90%] h-60 md:h-72 rounded-2xl bg-center bg-cover duration-700"
          ></div>

          {/* left arrow */}
          <div className="hidden group-hover:block absolute -top-10 md:top-1/2 -translate-x-0 -translate-y-1/2 left-1 md:left-5 text-2xl md:ml-0 ml-2 md:mt-0 mt-[10rem] rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={25} />
          </div>

          {/* Right arrow */}
          <div className="hidden group-hover:block absolute -top-10 md:top-1/2 -translate-x-0 -translate-y-1/2 md:right-24 right-0 text-2xl md:mr-0 mr-2 md:mt-0 mt-[10rem] rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={25} />
          </div>

          <div className="flex justify-center py-2 absolute bottom-4 w-full">
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`h-4 w-4 rounded-full mx-1 ${
                  slideIndex === currentIndex ? "bg-blue-500" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
