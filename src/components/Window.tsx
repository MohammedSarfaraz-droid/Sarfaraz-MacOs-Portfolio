import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AppId } from '../os/os';
import { useOS } from '../os/os';
import { AppIcon } from './icons';

export interface Bounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WinState {
  id: string;
  app: AppId;
  title: string;
  icon: string;
  payload?: any;
  z: number;
  minimized: boolean;
  maximized: boolean;
  bounds: Bounds;
  restore?: Bounds;
  k: number;
}

interface Props {
  win: WinState;
  active: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, bounds: Bounds) => void;
  children: React.ReactNode;
}

export default function Window({
  win,
  active,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  children,
}: Props) {
  const { settings } = useOS();
  const [dragging, setDragging] = useState(false);
  const anim = settings.animations && !settings.reduceMotion;

  const startDrag = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;
    if (win.maximized) return;
    onFocus(win.id);
    const sx = e.clientX;
    const sy = e.clientY;
    const bx = win.bounds.x;
    const by = win.bounds.y;
    setDragging(true);
    const move = (ev: PointerEvent) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let x = bx + ev.clientX - sx;
      let y = by + ev.clientY - sy;
      y = Math.max(30, Math.min(y, vh - 70));
      x = Math.max(-win.bounds.w + 150, Math.min(x, vw - 90));
      onMove(win.id, { ...win.bounds, x, y });
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <motion.div
      role="dialog"
      aria-label={win.title}
      initial={anim ? { opacity: 0, scale: 0.92, y: 30 } : false}
      animate={
        win.minimized
          ? { opacity: 0, scale: 0.55, scaleY: 0.3, y: 380 }
          : { opacity: 1, scale: 1, scaleY: 1, y: 0 }
      }
      exit={anim ? { opacity: 0, scale: 0.9, y: 18, filter: 'blur(8px)' } : { opacity: 0 }}
      transition={anim ? { type: 'spring', stiffness: 400, damping: 34 } : { duration: 0 }}
      onPointerDown={() => onFocus(win.id)}
      className={`absolute flex flex-col overflow-hidden bg-white ring-1 ring-black/10 ${
        win.maximized ? 'rounded-none' : 'rounded-[11px]'
      } ${active ? 'window-shadow' : 'window-shadow-inactive'}`}
      style={{
        left: win.bounds.x,
        top: win.bounds.y,
        width: win.bounds.w,
        height: win.bounds.h,
        zIndex: win.z,
        pointerEvents: win.minimized ? 'none' : 'auto',
        transitionProperty: dragging ? 'none' : 'left, top, width, height',
        transitionDuration: '380ms',
        transitionTimingFunction: 'cubic-bezier(.32,.72,0,1)',
      }}
    >
      {/* title bar */}
      <div
        onPointerDown={startDrag}
        onDoubleClick={() => onMaximize(win.id)}
        className={`relative h-11 shrink-0 flex items-center px-3.5 border-b border-black/[0.07] select-none touch-none ${
          active ? 'bg-gradient-to-b from-white to-[#f2f2f4]' : 'bg-[#f8f8fa]'
        }`}
        style={{ cursor: 'default' }}
      >
        <div className="group flex items-center gap-2" onPointerDown={(e) => e.stopPropagation()}>
          <Light
            color="#FF5F57"
            inactive={!active}
            label="Close window"
            onAction={() => onClose(win.id)}
          >
            <path d="M2 2 L6 6 M6 2 L2 6" stroke="rgba(0,0,0,.45)" strokeWidth="1.4" strokeLinecap="round" />
          </Light>
          <Light
            color="#FEBC2E"
            inactive={!active}
            label="Minimize window"
            onAction={() => onMinimize(win.id)}
          >
            <path d="M1.5 4 L6.5 4" stroke="rgba(0,0,0,.45)" strokeWidth="1.4" strokeLinecap="round" />
          </Light>
          <Light
            color="#28C840"
            inactive={!active}
            label="Zoom window"
            onAction={() => onMaximize(win.id)}
          >
            <path d="M2 4 L6 4 M4 2 L4 6" stroke="rgba(0,0,0,.45)" strokeWidth="1.4" strokeLinecap="round" />
          </Light>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none max-w-[62%]">
          <AppIcon kind={win.icon} size={15} className="hidden sm:block" />
          <span
            className={`text-[13px] font-semibold truncate ${
              active ? 'text-gray-700' : 'text-gray-400'
            }`}
          >
            {win.title}
          </span>
        </div>
      </div>

      {/* content */}
      <div className="flex-1 min-h-0 flex flex-col bg-white">{children}</div>
    </motion.div>
  );
}

function Light({
  color,
  inactive,
  label,
  onAction,
  children,
}: {
  color: string;
  inactive: boolean;
  label: string;
  onAction: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onAction();
      }}
      className="w-3 h-3 rounded-full grid place-items-center transition-transform active:scale-90"
      style={{
        background: inactive ? '#DCDCE0' : color,
        boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,.16)',
      }}
    >
      <svg viewBox="0 0 8 8" className="w-2 h-2 opacity-0 group-hover:opacity-100">
        {children}
      </svg>
    </button>
  );
}
