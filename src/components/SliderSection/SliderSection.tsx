import React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  scale,
} from "framer-motion";
import "./SliderSection.scss";

type Participant = {
  id: number;
  avatar: string;
};

type Slide = {
  id: number;
  title: string;
  background: string;
  logoPrev: string;
  logoNext: string;
  participants: Participant[];
};

const COLUMNS = 3;

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 30,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: (i % COLUMNS) * 0.15,
      ease: "easeOut",
    },
  }),
};


const slides: Slide[] = [
  {
    id: 0,
    title: "Pivas King",
    background: "/bg/slide-1.png",
    logoPrev: "/icons/slide-1-logo.png",
    logoNext: "/icons/slide-2-logo.png",
    participants: Array.from({ length: 6 }, (_, i) => ({
      id: i,
      avatar: `/avatars/1/${i + 1}.png`,
    })),
  },
  {
    id: 1,
    title: "Rage of the Year",
    background: "/bg/slide-2.png",
    logoPrev: "/icons/slide-2-logo.png",
    logoNext: "/icons/slide-3-logo.png",
    participants: Array.from({ length: 6 }, (_, i) => ({
      id: i,
      avatar: `/avatars/2/${i + 1}.png`,
    })),
  },
  {
    id: 2,
    title: "Dark Order",
    background: "/bg/slide-3.png",
    logoPrev: "/icons/slide-3-logo.png",
    logoNext: "/icons/slide-1-logo.png",
    participants: Array.from({ length: 6 }, (_, i) => ({
      id: i,
      avatar: `/avatars/3/${i + 1}.png`,
    })),
  },
];

export const SliderSection: React.FC = () => {
  const [active, setActive] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [-100, 100], [-5, 5]);
  const bgY = useTransform(mouseY, [-100, 100], [-5, 5]);

  const onMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set(e.clientX - innerWidth / 2);
    mouseY.set(e.clientY - innerHeight / 2);
  };

  const paginate = (dir: 1 | -1) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + slides.length) % slides.length);
  };

  const current = slides[active];

  return (
    // onMouseMove={onMouseMove}
    <section className="slidersection">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="slidersection__bg"
          style={{
            backgroundImage: `url(${current.background})`,
            x: bgX,
            y: bgY,
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </AnimatePresence>

      <div className="slidersection__overlay" />

      <AnimatePresence mode="wait">
        <motion.h1
          key={current.id}
          className="slidersection__title"
          initial={{ opacity: 0, y: direction * 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -direction * 30 }}
          transition={{ duration: 0.4 }}
        >
          {current.title}
        </motion.h1>
      </AnimatePresence>

      <div className="slidersection__nav-left">
        <button className="sarrow" onClick={() => paginate(-1)}>↑</button>
        <div className="icons">
          <div className="icon next" onClick={() => paginate(-1)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-next"}
                className="slidersection__logo"
                initial={{ opacity: 0, y: direction * 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -direction * 5 }}
                transition={{ duration: 0.3 }}
              >
                <img src={current.logoNext} alt={current.title} />
              </motion.div>
            </AnimatePresence>
          </div>
          <hr />
          <div className="icon prev" onClick={() => paginate(1)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-prev"}
                className="slidersection__logo"
                initial={{ opacity: 0, y: -direction * 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * 5 }}
                transition={{ duration: 0.3 }}
              >
                <img src={current.logoPrev} alt={current.title} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <button className="sarrow" onClick={() => paginate(1)}>↓</button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="slidersection__participants"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="grid">
            {current.participants.map((p, index) => (
              <motion.div
                key={p.id}
                className="card"
                style={{ backgroundImage: `url(${p.avatar})`}}
                custom={index}
                variants={cardVariants}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="slidersection__dots">
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
