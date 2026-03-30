import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Heart, Star, ArrowLeft, Plus, Minus,
  Truck, Shield, RefreshCw, Share2, Zap, Check
} from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, wishlist } = useStore();

  const product = products.find(p => p.id === parseInt(id));
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const [qty, setQty] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [added, setAdded] = useState(false);
  const isWished = wishlist.includes(product?.id);

  if (!product) {
    return (
      <div style={{ paddingTop: 120, textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <p style={{ fontSize: 48, marginBottom: 16 }}>😕</p>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Product not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    toast.success(`Added ${qty}x ${product.name}!`, {
      style: {
        background: 'rgba(10,20,13,0.95)',
        color: '#f0fdf4',
        border: '1px solid rgba(34,197,94,0.3)',
        borderRadius: '14px',
        fontSize: '14px',
      },
      iconTheme: { primary: '#22c55e', secondary: '#fff' },
    });
    setTimeout(() => setAdded(false), 2000);
  };

  const handleImageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      <div className="container" style={{ padding: '40px 24px' }}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 36, fontSize: 13, color: 'var(--text-dim)' }}
        >
          <Link to="/" style={{ color: 'var(--text-dim)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--green-400)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>Home</Link>
          <span>/</span>
          <Link to="/products" style={{ color: 'var(--text-dim)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--green-400)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>Products</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-muted)' }}>{product.name}</span>
        </motion.div>

        <div className="responsive-detail-grid">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={handleImageMouseMove}
              style={{
                position: 'relative',
                borderRadius: 28,
                overflow: 'hidden',
                aspectRatio: '1/1',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glass)',
                cursor: 'zoom-in',
              }}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transition: 'transform 0.3s ease',
                  transform: zoomed ? 'scale(1.8)' : 'scale(1)',
                }}
              />

              {/* Badges */}
              <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: 8 }}>
                {product.badge && <span className="badge"><Zap size={10} />{product.badge}</span>}
                {discount && (
                  <span style={{
                    padding: '4px 12px', borderRadius: 'var(--radius-full)',
                    background: 'rgba(239,68,68,0.15)', color: '#f87171',
                    fontSize: 12, fontWeight: 700, border: '1px solid rgba(239,68,68,0.2)',
                  }}>
                    -{discount}% OFF
                  </span>
                )}
              </div>

              {/* Zoom hint */}
              <div style={{
                position: 'absolute', bottom: 16, right: 16,
                padding: '5px 10px', borderRadius: 8,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                fontSize: 11, color: 'rgba(255,255,255,0.6)',
              }}>
                🔍 Hover to zoom
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--green-500)', marginBottom: 6 }}>
                {product.category}
              </p>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 900, marginBottom: 12 }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'} color={i < Math.floor(product.rating) ? '#fbbf24' : '#4b5563'} />
                  ))}
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {product.rating} · {product.reviews} reviews
                </span>
                <span style={{ fontSize: 13, color: 'var(--green-500)', fontWeight: 600 }}>
                  In stock ({product.stock})
                </span>
              </div>
            </div>

            {/* Price */}
            <div style={{
              padding: '20px 24px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-lg)',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{
                  fontSize: 40, fontWeight: 900,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--green-400)',
                }}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: 18, color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>/ {product.unit}</span>
              </div>
              {discount && (
                <p style={{ color: '#f87171', fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                  You save ${(product.originalPrice - product.price).toFixed(2)} ({discount}% off)
                </p>
              )}
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15 }}>
              {product.description}
            </p>

            {/* Qty Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-secondary)' }}>Quantity:</p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 0,
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
              }}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
                >
                  <Minus size={16} />
                </motion.button>
                <span style={{ width: 44, textAlign: 'center', fontWeight: 700, fontSize: 18 }}>{qty}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                style={{
                  flex: 1, padding: '16px',
                  background: added ? '#16a34a' : 'linear-gradient(135deg, #22c55e, #10b981)',
                  color: '#fff',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 16, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 8px 32px rgba(34,197,94,0.4)',
                  transition: 'background 0.3s',
                }}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check size={18} /> Added!
                    </motion.span>
                  ) : (
                    <motion.span key="add" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <ShoppingCart size={18} /> Add to Cart · ${(product.price * qty).toFixed(2)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => { toggleWishlist(product.id); toast(isWished ? 'Removed from wishlist' : '❤️ Saved!'); }}
                style={{
                  width: 54, height: 54,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-glass)',
                  border: `1.5px solid ${isWished ? 'rgba(239,68,68,0.4)' : 'var(--border-glass)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Heart size={20} fill={isWished ? '#ef4444' : 'none'} color={isWished ? '#ef4444' : 'var(--text-muted)'} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: 54, height: 54,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-glass)',
                  border: '1.5px solid var(--border-glass)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Share2 size={18} />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { icon: Truck, label: 'Free delivery over $50' },
                { icon: Shield, label: 'Quality guaranteed' },
                { icon: RefreshCw, label: 'Easy returns' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-dim)' }}>
                  <Icon size={13} style={{ color: 'var(--green-500)' }} />{label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28 }}>You May Also Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
