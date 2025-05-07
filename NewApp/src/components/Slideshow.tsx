import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "/innovate.jpg",
    alt: "Innovate Slide",
    caption: "Innovating Cardiac Care with AI",
  },
  {
    id: 2,
    image: "/cardiacteklogo.jpg",
    alt: "CardiacTek Logo Slide",
    caption: "Trusted Cardiac Technology",
  },
  {
    id: 3,
    image: "/image.png",
    alt: "Research Slide",
    caption: "Cutting-edge Research and Development",
  },
];

const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
      <img
        src={slides[currentIndex].image}
        alt={slides[currentIndex].alt}
        className="w-full h-64 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
        {slides[currentIndex].caption}
      </div>
    </div>
  );
};

export default Slideshow;
