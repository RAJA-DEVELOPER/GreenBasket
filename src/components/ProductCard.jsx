import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const navigate = useNavigate();
  const isWished = wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: 'rgba(10,20,13,0.95)',
        color: '#f0fdf4',
        border: '1px solid rgba(34,197,94,0.3)',
        borderRadius: '14px',
        backdropFilter: 'blur(20px)',
        fontSize: '14px',
      },
      iconTheme: { primary: '#22c55e', secondary: '#fff' },
    });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    toast(isWished ? 'Removed from wishlist' : '❤️ Added to wishlist', {
      style: {
        background: 'rgba(10,20,13,0.95)',
        color: '#f0fdf4',
        border: '1px solid rgba(34,197,94,0.2)',
        borderRadius: '14px',
        fontSize: '14px',
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ padding: 20, position: 'relative' }}
    >
      {/* Badges */}
      <div style={{
        position: 'absolute',
        top: 28,
        left: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        zIndex: 2,
      }}>
        {product.badge && (
          <span className="badge">
            <Zap size={10} />{product.badge}
          </span>
        )}
        {discount && (
          <span style={{
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(239,68,68,0.15)',
            color: '#f87171',
            fontSize: 11,
            fontWeight: 700,
            border: '1px solid rgba(239,68,68,0.2)',
          }}>
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={handleWishlist}
        style={{
          position: 'absolute',
          top: 28,
          right: 28,
          zIndex: 2,
          width: 36, height: 36,
          borderRadius: 10,
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Heart
          size={16}
          fill={isWished ? '#ef4444' : 'none'}
          color={isWished ? '#ef4444' : '#fff'}
        />
      </motion.button>

      {/* Image */}
      <div className="img-wrapper" style={{ marginBottom: 16 }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Quick add overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            style={{
              padding: '10px 22px',
              background: 'linear-gradient(135deg, #22c55e, #10b981)',
              color: '#fff',
              borderRadius: 'var(--radius-full)',
              fontSize: 13,
              fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            <ShoppingCart size={15} /> Quick Add
          </motion.button>
        </motion.div>
      </div>

      {/* Info */}
      <div>
        <p style={{ color: 'var(--text-dim)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
          {product.category}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
          <div className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                color={i < Math.floor(product.rating) ? '#fbbf24' : '#4b5563'}
              />
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{product.rating} ({product.reviews})</span>
        </div>

        {/* Price + Add */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{
              fontSize: 22,
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: 'var(--green-400)',
            }}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: 13,
                color: 'var(--text-dim)',
                textDecoration: 'line-through',
                marginLeft: 6,
              }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span style={{ display: 'block', fontSize: 11, color: 'var(--text-dim)', marginTop: 1 }}>
              per {product.unit}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            style={{
              width: 42, height: 42,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #22c55e, #10b981)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(34,197,94,0.4)',
            }}
          >
            <ShoppingCart size={17} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
