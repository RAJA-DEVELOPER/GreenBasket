import { motion } from 'framer-motion';

export default function ThreeScene({ height = '100vh' }) {
  return (
    <div style={{ width: '100%', height, position: 'absolute', top: 0, left: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      
      {/* Background Gradients */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', top: '-10%', right: '-10%',
          width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}
      />
      
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          y: [0, -100, 0],
          x: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}
      />

      {/* Floating 3D Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, Math.random() * -100 - 50, 0],
            x: [0, Math.random() * 100 - 50, 0],
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * -2
          }}
          style={{
            position: 'absolute',
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            width: 40 + Math.random() * 80,
            height: 40 + Math.random() * 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.2), 0 0 30px rgba(34,197,94,0.2)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255,255,255,0.1)',
            transformStyle: 'preserve-3d',
            zIndex: 1
          }}
        >
          {/* Inner Core for 3D depth */}
          <div style={{
            position: 'absolute',
            inset: '20%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(34,197,94,0.4), transparent)',
            filter: 'blur(4px)'
          }} />
        </motion.div>
      ))}

      {/* Abstract Animated Mesh / Grid lines behind */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
        transformOrigin: 'top',
        opacity: 0.5,
      }} />
    </div>
  );
}
