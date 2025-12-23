import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SliderSection.scss";

type Slide = {
  id: number;
  title: string;
  participants: number;
};

const slides: Slide[] = [
  { id: 0, title: "Dras King", participants: 12 },
  { id: 1, title: "Iron Lord", participants: 7 },
  { id: 2, title: "Dark Order", participants: 15 },
  { id: 3, title: "Fallen Crown", participants: 9 },
];

export const SliderSection: React.FC = () => {
  const [active, setActive] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  const paginate = (dir: 1 | -1) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + slides.length) % slides.length);
  };

  const current = slides[active];

  return (
    <section className="slider">
      <div className="slider__overlay" />

      <AnimatePresence mode="wait">
        <motion.h1
          key={current.id}
          className="slider__title"
          initial={{ opacity: 0, y: direction * 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -direction * 20 }}
          transition={{ duration: 0.35 }}
        >
          {current.title}
        </motion.h1>
      </AnimatePresence>

      <div className="slider__nav-left">
        <button className="arrow" onClick={() => paginate(-1)}>↑</button>

        <div className="icons">
          <div className="icon next" />
          <div className="icon prev" />
        </div>

        <button className="arrow" onClick={() => paginate(1)}>↓</button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="slider__participants"
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 40 }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid">
            {Array.from({ length: current.participants }).map((_, i) => (
              <div key={i} className="card" />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="slider__dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === active ? "active" : ""}`}
            onClick={() => {
              setDirection(i > active ? 1 : -1);
              setActive(i);
            }}
          />
        ))}
      </div>
    </section>
  );
};
