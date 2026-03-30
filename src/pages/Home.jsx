import { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShoppingBag, Star, Truck, Shield, Leaf,
  ChevronRight, Sparkles, Zap, TrendingUp
} from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

import ThreeScene from '../components/ThreeScene';

const categories = [
  { name: 'Fresh Fruits', emoji: '🍎', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', count: '120+ items', to: '/products?cat=fruits' },
  { name: 'Vegetables', emoji: '🥦', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', count: '85+ items', to: '/products?cat=vegetables' },
  { name: 'Dairy & Eggs', emoji: '🥛', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', count: '60+ items', to: '/products?cat=dairy' },
  { name: 'Artisan Bakery', emoji: '🍞', color: '#f97316', bg: 'rgba(249,115,22,0.1)', count: '45+ items', to: '/products?cat=bakery' },
  { name: 'Organic Range', emoji: '🌿', color: '#10b981', bg: 'rgba(16,185,129,0.1)', count: '200+ items', to: '/products' },
  { name: 'Special Offers', emoji: '🔥', color: '#eab308', bg: 'rgba(234,179,8,0.1)', count: 'Up to 50% off', to: '/products?filter=offers' },
];

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '2K+', label: 'Products' },
  { value: '48h', label: 'Delivery' },
  { value: '100%', label: 'Organic' },
];

export default function Home() {
  const { products } = useStore();
  const featured = products.filter((_, i) => i < 8);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const bannerY = useTransform(scrollYProgress, [0.4, 0.8], [60, -60]);

  return (
    <div className="page-enter">
      {/* ====== HERO ====== */}
      <section style={{
        minHeight: '100dvh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 120,
        paddingBottom: 80,
        overflow: 'hidden',
        background: 'var(--gradient-hero)',
      }} className="hero-section">
        {/* Three.js Canvas */}
        <Suspense fallback={null}>
          <ThreeScene height="100vh" />
        </Suspense>

        {/* Glow orbs */}
        <div className="glow-orb" style={{ width: 600, height: 600, background: 'rgba(34,197,94,0.08)', top: -200, right: -200 }} />
        <div className="glow-orb" style={{ width: 400, height: 400, background: 'rgba(16,185,129,0.06)', bottom: -100, left: -100 }} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 2 }}
          className="container"
        >
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}
            >
              <span className="badge-wrapper" style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.25)',
                fontSize: 13, fontWeight: 600,
                color: 'var(--green-400)',
                backdropFilter: 'blur(10px)',
              }}>
                <Sparkles size={14} style={{ flexShrink: 0 }} />
                <span className="badge-text" style={{ whiteSpace: 'normal', lineHeight: 1.4 }}>Now with 3D Experience — Developed by Raja</span>
                <ChevronRight size={14} style={{ flexShrink: 0 }} />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: 24 }}
            >
              Fresh.{' '}
              <span style={{
                background: 'var(--gradient-text)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Organic.</span>
              <br />
              Delivered.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                color: 'var(--text-muted)',
                maxWidth: 520,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              Premium grocery shopping reimagined with cutting-edge 3D technology. Farm-fresh produce, artisan products, delivered in 48 hours.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 60 }}
              className="hero-buttons"
            >
              <Link to="/products" className="hero-btn-link">
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center', width: '100%',
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #22c55e, #10b981)',
                    color: '#fff',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700, fontSize: 16,
                    boxShadow: '0 8px 40px rgba(34,197,94,0.45)',
                  }}
                >
                  <ShoppingBag size={18} /> Shop Now
                  <ArrowRight size={16} />
                </motion.span>
              </Link>

              <Link to="/products?filter=offers" className="hero-btn-link">
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center', width: '100%',
                    padding: '16px 32px',
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(20px)',
                    border: '1.5px solid var(--border-glass)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600, fontSize: 16,
                  }}
                >
                  <Zap size={18} style={{ color: '#fbbf24' }} />
                  Today's Deals
                </motion.span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}
              className="hero-stats"
            >
              {stats.map(stat => (
                <div key={stat.value}>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 28, fontWeight: 800,
                    background: 'var(--gradient-text)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }} className="hero-stat-value">{stat.value}</p>
                  <p style={{ color: 'var(--text-dim)', fontSize: 12, fontWeight: 500, marginTop: 2 }} className="hero-stat-label">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <p style={{ color: 'var(--text-dim)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</p>
          <div style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, rgba(34,197,94,0.5), transparent)',
          }} />
        </motion.div>
      </section>

      {/* ====== FEATURES STRIP ====== */}
      <section style={{
        background: 'rgba(34,197,94,0.04)',
        borderTop: '1px solid var(--border-glass)',
        borderBottom: '1px solid var(--border-glass)',
        padding: '28px 0',
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
            {[
              { icon: Truck, label: 'Free delivery over $50', color: '#22c55e' },
              { icon: Shield, label: '100% Organic Certified', color: '#10b981' },
              { icon: Star, label: '4.9★ Rated Service', color: '#fbbf24' },
              { icon: Leaf, label: 'Carbon Neutral Shipping', color: '#a3e635' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 38, height: 38,
                  borderRadius: 10,
                  background: `${color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CATEGORIES ====== */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Browse Categories</p>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Explore our wide range of premium products, carefully sourced from trusted farms.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 20,
          }}>
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.07 }}
              >
                <Link to={cat.to}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="glass-card"
                    style={{
                      padding: '32px 20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 64, height: 64,
                      borderRadius: 20,
                      background: cat.bg,
                      margin: '0 auto 16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 30,
                    }}>
                      {cat.emoji}
                    </div>
                    <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 4 }}>
                      {cat.name}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>{cat.count}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURED PRODUCTS ====== */}
      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 50, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p className="section-label">Handpicked For You</p>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Featured Products</h2>
            </div>
            <Link to="/products">
              <motion.span
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: 'var(--green-400)',
                  fontWeight: 600, fontSize: 14,
                }}
              >
                View all <ArrowRight size={16} />
              </motion.span>
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 22,
          }}>
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ====== PARALLAX OFFER BANNER ====== */}
      <motion.section
        style={{ y: bannerY }}
        className="section"
      >
        <div className="container">
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'relative',
              borderRadius: 32,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(16,185,129,0.1) 50%, rgba(163,230,53,0.15) 100%)',
              border: '1px solid var(--border-glass)',
              backdropFilter: 'blur(20px)',
            }}
            className="responsive-banner"
          >
            {/* Background Patterns */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0, transparent 50%), radial-gradient(circle at 80% 50%, rgba(163,230,53,0.1) 0, transparent 50%)',
            }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
              <div>
                <div className="badge" style={{ marginBottom: 16 }}>
                  <TrendingUp size={11} /> Limited Time Offer
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: 12 }}>
                  Get <span style={{ background: 'var(--gradient-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>30% Off</span>
                  <br />Your First Order
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 32, maxWidth: 420 }}>
                  Use code <strong style={{ color: 'var(--green-400)', fontFamily: 'monospace', letterSpacing: 1 }}>GREEN30</strong> at checkout and enjoy fresh organics delivered to your door.
                </p>
                <Link to="/products">
                  <motion.span
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '15px 30px',
                      background: 'linear-gradient(135deg, #22c55e, #10b981)',
                      color: '#fff',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700, fontSize: 15,
                      boxShadow: '0 8px 40px rgba(34,197,94,0.5)',
                    }}
                  >
                    Claim Offer <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </div>

              {/* Emoji grid */}
              <div className="responsive-emoji-grid">
                {['🍓', '🥑', '🍋', '🥦', '🍇', '🫐', '🌽', '🍊'].map((e, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 + i * 0.2, delay: i * 0.15 }}
                  >
                    {e}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>Customer Love</p>
            <h2 className="section-title">What People Say</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { name: 'Sarah Mitchell', role: 'Home Chef', quote: 'The 3D interface is mind-blowing! I can see products from every angle, and the quality is just exceptional.', stars: 5, img: 'https://i.pravatar.cc/64?img=1' },
              { name: 'James Rodriguez', role: 'Fitness Coach', quote: 'GreenBasket 3D changed how I shop for organic produce. The freshness guarantee is real — love it!', stars: 5, img: 'https://i.pravatar.cc/64?img=3' },
              { name: 'Aisha Patel', role: 'Food Blogger', quote: 'Stunning website, incredible product range. The delivery is always on time and packaging is eco-friendly.', stars: 5, img: 'https://i.pravatar.cc/64?img=5' },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card"
                style={{ padding: 28 }}
              >
                <div className="stars" style={{ marginBottom: 16 }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={t.img} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
