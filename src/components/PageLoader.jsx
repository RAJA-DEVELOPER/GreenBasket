import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 15;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      {/* Animated logo */}
      <div style={{ position: 'relative' }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            width: 90, height: 90,
            background: 'linear-gradient(135deg, #22c55e, #10b981)',
            borderRadius: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 60px rgba(34,197,94,0.5)',
          }}
        >
          <Leaf size={44} color="#fff" />
        </motion.div>

        {/* Pulsing rings */}
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.4, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 28,
              border: '2px solid rgba(34,197,94,0.4)',
            }}
          />
        ))}
      </div>

      {/* Brand name */}
      <div style={{ textAlign: 'center' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            fontWeight: 800,
            background: 'var(--gradient-text)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          GreenBasket 3D
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}
        >
          Premium Grocery Experience
        </motion.p>
      </div>

      {/* Progress bar */}
      <div style={{ width: 200 }}>
        <div style={{
          height: 3,
          background: 'rgba(34,197,94,0.15)',
          borderRadius: 99,
          overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'linear' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #22c55e, #a3e635)',
              borderRadius: 99,
            }}
          />
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: 11, textAlign: 'center', marginTop: 8 }}>
          Loading {Math.min(Math.round(progress), 100)}%
        </p>
      </div>
    </motion.div>
  );
}
