import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMediaQuery } from './os/os';
import Boot from './components/Boot';
import DesktopOS from './desktop/DesktopOS';
import MobileOS from './mobile/MobileOS';

export default function App() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [booted, setBooted] = useState(false);
  const done = useCallback(() => setBooted(true), []);

  return (
    <>
      <AnimatePresence>{!booted && <Boot key="boot" onDone={done} />}</AnimatePresence>
      {booted && (isMobile ? <MobileOS /> : <DesktopOS />)}
    </>
  );
}
