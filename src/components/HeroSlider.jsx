import { useEffect, useState } from "react";
import { useStore } from "../Store/StoreContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSlider() {
  const { hero } = useStore();
  const [index, setIndex] = useState(0);

  // Auto-slide every 3.5s
  useEffect(() => {
    if (!hero || hero.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % hero.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [hero]);

  if (!hero || hero.length === 0) {
    return (
      <div className="relative h-[60vh] md:h-[72vh] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No hero banners available</p>
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] md:h-[72vh] hero-gradient overflow-hidden">
      {/* Image transition */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={hero[index]}
          alt={`Hero banner ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

      {/* Dots navigation */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
        {hero.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`h-2 w-8 md:w-10 rounded-full transition-all duration-300 ${
              idx === index ? "bg-brand-accent" : "bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Text content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold drop-shadow-md text-gray-900">
            Wear the Future.
          </h1>
          <p className="mt-3 text-gray-700 text-sm sm:text-base md:text-lg">
            Premium shirts. Smart details. Effortless style.
          </p>
        </div>
      </div>
    </div>
  );
}
