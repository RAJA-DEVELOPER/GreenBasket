import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function Cart() {
  const { cart, updateQty, removeFromCart, getCartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [placing, setPlacing] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const discount = promoApplied ? subtotal * 0.3 : 0;
  const total = subtotal - discount + shipping;

  const handleRemove = (item) => {
    removeFromCart(item.id);
    toast(`🗑 ${item.name} removed`, {
      style: {
        background: 'rgba(10,20,13,0.95)',
        color: '#f0fdf4',
        border: '1px solid rgba(34,197,94,0.2)',
        borderRadius: '14px',
        fontSize: '14px',
      },
    });
  };

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'GREEN30') {
      setPromoApplied(true);
      toast.success('30% discount applied! 🎉', {
        style: { background: 'rgba(10,20,13,0.95)', color: '#f0fdf4', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '14px' },
        iconTheme: { primary: '#22c55e', secondary: '#fff' },
      });
    } else {
      toast.error('Invalid promo code', {
        style: { background: 'rgba(10,20,13,0.95)', color: '#f0fdf4', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '14px' },
      });
    }
  };

  const handleCheckout = () => {
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      setPlacing(false);
      toast.success('🛒 Order placed successfully! Thank you!', {
        duration: 4000,
        style: { background: 'rgba(10,20,13,0.95)', color: '#f0fdf4', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '14px' },
        iconTheme: { primary: '#22c55e', secondary: '#fff' },
      });
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: 100, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '60px 20px' }}
        >
          <motion.div
            animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{ fontSize: 80, marginBottom: 24 }}
          >
            🛒
          </motion.div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Add some fresh organic products to get started!</p>
          <Link to="/products">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #22c55e, #10b981)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontWeight: 700, fontSize: 15,
                boxShadow: '0 8px 32px rgba(34,197,94,0.4)',
              }}
            >
              <ShoppingBag size={18} /> Start Shopping
            </motion.span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div className="container" style={{ padding: '40px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(34,197,94,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ShoppingCart size={22} style={{ color: 'var(--green-400)' }} />
            </div>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800 }}>Shopping Cart</h1>
              <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>{cart.reduce((s, i) => s + i.qty, 0)} items</p>
            </div>
          </div>

          <div className="responsive-cart-grid">

            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card cart-item-mobile"
                    style={{ padding: 20, display: 'flex', gap: 18, alignItems: 'center' }}
                  >
                    {/* Image */}
                    <div style={{
                      width: 90, height: 90, flexShrink: 0,
                      borderRadius: 16, overflow: 'hidden',
                      background: 'var(--bg-glass)',
                    }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{item.category}</p>
                      <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{item.name}</p>
                      <p style={{ color: 'var(--green-400)', fontWeight: 800, fontSize: 18 }}>${item.price.toFixed(2)}<span style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 400 }}> /{item.unit}</span></p>
                    </div>

                    {/* Qty */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 0,
                      background: 'var(--bg-secondary)',
                      borderRadius: 12,
                      border: '1px solid var(--border-glass)',
                    }}>
                      <motion.button whileTap={{ scale: 0.8 }} onClick={() => updateQty(item.id, item.qty - 1)}
                        style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        <Minus size={14} />
                      </motion.button>
                      <motion.span
                        key={item.qty}
                        initial={{ scale: 1.3 }}
                        animate={{ scale: 1 }}
                        style={{ width: 36, textAlign: 'center', fontWeight: 700 }}
                      >{item.qty}</motion.span>
                      <motion.button whileTap={{ scale: 0.8 }} onClick={() => updateQty(item.id, item.qty + 1)}
                        style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        <Plus size={14} />
                      </motion.button>
                    </div>

                    {/* Line total */}
                    <div style={{ textAlign: 'right', minWidth: 70 }}>
                      <motion.p
                        key={item.qty * item.price}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        style={{ fontWeight: 800, fontSize: 17, color: 'var(--text-primary)' }}
                      >
                        ${(item.price * item.qty).toFixed(2)}
                      </motion.p>
                    </div>

                    {/* Remove */}
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => handleRemove(item)}
                      style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#f87171',
                      }}
                    >
                      <Trash2 size={15} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card"
                style={{ padding: 28, position: 'sticky', top: 100 }}
              >
                <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Order Summary</h2>

                {/* Promo */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>
                    <Tag size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                    Promo Code
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      placeholder="e.g. GREEN30"
                      className="input-field"
                      style={{ flex: 1, fontSize: 13, padding: '10px 14px', fontFamily: 'monospace', letterSpacing: 1 }}
                      disabled={promoApplied}
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePromo}
                      disabled={promoApplied}
                      style={{
                        padding: '10px 16px',
                        background: promoApplied ? 'rgba(34,197,94,0.2)' : 'rgba(34,197,94,0.15)',
                        border: '1px solid var(--border-glow)',
                        borderRadius: 12,
                        color: 'var(--green-400)',
                        fontSize: 13, fontWeight: 700,
                        opacity: promoApplied ? 0.7 : 1,
                      }}
                    >
                      {promoApplied ? '✓' : 'Apply'}
                    </motion.button>
                  </div>
                  {promoApplied && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#22c55e', fontSize: 12, marginTop: 6, fontWeight: 600 }}>
                      ✓ GREEN30 applied — 30% off!
                    </motion.p>
                  )}
                </div>

                {/* Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {[
                    { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                    { label: 'Shipping', value: shipping === 0 ? 'FREE 🎉' : `$${shipping.toFixed(2)}` },
                    ...(promoApplied ? [{ label: 'Discount (30%)', value: `-$${discount.toFixed(2)}`, color: '#22c55e' }] : []),
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{label}</span>
                      <span style={{ fontWeight: 600, fontSize: 14, color: color || 'var(--text-primary)' }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ height: 1, background: 'var(--border-glass)', margin: '4px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      style={{ fontWeight: 900, fontSize: 22, color: 'var(--green-400)', fontFamily: 'var(--font-display)' }}
                    >
                      ${total.toFixed(2)}
                    </motion.span>
                  </div>
                </div>

                {shipping > 0 && (
                  <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 16, textAlign: 'center' }}>
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={placing}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: placing ? 'rgba(34,197,94,0.5)' : 'linear-gradient(135deg, #22c55e, #10b981)',
                    color: '#fff',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 16, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 8px 32px rgba(34,197,94,0.4)',
                    transition: 'background 0.3s',
                  }}
                >
                  {placing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                    />
                  ) : (
                    <>Place Order <ArrowRight size={18} /></>
                  )}
                </motion.button>

                <Link to="/products" style={{ display: 'block', textAlign: 'center', marginTop: 14, color: 'var(--text-muted)', fontSize: 13, fontWeight: 500 }}>
                  ← Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
