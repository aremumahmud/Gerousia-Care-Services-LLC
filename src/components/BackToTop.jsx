import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`to-top ${show ? 'show' : ''}`.trim()}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="chevronDown" size={24} style={{ transform: 'rotate(180deg)' }} />
    </button>
  );
}
