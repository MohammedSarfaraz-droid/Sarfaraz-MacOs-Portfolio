import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const GREETINGS = ['Hello.', 'Hola.', 'Bonjour.', 'مرحبا.', 'नमस्ते.'];

export default function Boot({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'greeting' | 'name' | 'welcome'>('greeting');
  const [gi, setGi] = useState(0);

  useEffect(() => {
    let alive = true;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      const t = window.setTimeout(() => {
        if (alive) fn();
      }, ms);
      timers.push(t);
    };
    GREETINGS.forEach((_, i) => later(() => setGi(i), 900 + i * 1250));
    const base = 900 + GREETINGS.length * 1250;
    later(() => setPhase('name'), base + 450);
    later(() => setPhase('welcome'), base + 450 + 2400);
    later(() => onDone(), base + 450 + 2400 + 2200);
    return () => {
      alive = false;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(14px)' }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      onClick={() => onDone()}
      className="fixed inset-0 z-400 bg-white flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <AnimatePresence mode="wait">
        {phase === 'greeting' && (
          <motion.h1
            key={gi}
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-6xl md:text-8xl font-semibold tracking-tight text-gray-900"
          >
            {GREETINGS[gi]}
          </motion.h1>
        )}
        {phase === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 26, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
            transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="px-6 text-center"
          >
            <h1 className="text-4xl md:text-7xl font-semibold tracking-tight text-gray-900">
              Hello, I&apos;m{' '}
              <span className="bg-gradient-to-r from-[#2f7cf6] via-[#7a5cff] to-[#1fb6c9] bg-clip-text text-transparent">
                Sarfaraz
              </span>
              .
            </h1>
          </motion.div>
        )}
        {phase === 'welcome' && (
          <motion.p
            key="welcome"
            initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
            transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="px-6 text-center text-2xl md:text-5xl font-medium tracking-tight text-gray-400"
          >
            Welcome to my workspace.
          </motion.p>
        )}
      </AnimatePresence>
      <p className="absolute bottom-10 text-[11px] text-gray-300 font-medium tracking-widest uppercase">
        click anywhere to skip
      </p>
    </motion.div>
  );
}
