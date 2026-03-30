import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    let isVisible = false;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
      }
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    };

    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
      follower.style.transform = `translate(${followerPos.current.x - 16}px, ${followerPos.current.y - 16}px)`;
      raf.current = requestAnimationFrame(animate);
    };

    const onMouseDown = () => {
      cursor.style.transform += ' scale(0.6)';
      follower.style.transform += ' scale(0.7)';
    };
    const onMouseUp = () => {};

    const onEnterLink = () => {
      cursor.style.background = 'transparent';
      cursor.style.border = '2px solid #22c55e';
      follower.style.width = '44px';
      follower.style.height = '44px';
      follower.style.borderColor = 'rgba(34,197,94,0.4)';
    };
    const onLeaveLink = () => {
      cursor.style.background = '#22c55e';
      cursor.style.border = 'none';
      follower.style.width = '32px';
      follower.style.height = '32px';
      follower.style.borderColor = 'rgba(34,197,94,0.3)';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: 12,
          height: 12,
          background: '#22c55e',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'background 0.15s, border 0.15s',
          mixBlendMode: 'difference',
          top: 0, left: 0,
        }}
      />
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          width: 32,
          height: 32,
          border: '1.5px solid rgba(34,197,94,0.3)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          top: 0, left: 0,
        }}
      />
    </>
  );
}
