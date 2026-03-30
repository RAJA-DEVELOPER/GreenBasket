import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, ArrowRight, Mail, Lock, User, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    login({ name: form.name || 'Shopper', email: form.email });
    toast.success(tab === 'login' ? 'Welcome back! 👋' : 'Account created! 🎉', {
      style: {
        background: 'rgba(10,20,13,0.95)',
        color: '#f0fdf4',
        border: '1px solid rgba(34,197,94,0.3)',
        borderRadius: '14px',
      },
      iconTheme: { primary: '#22c55e', secondary: '#fff' },
    });
    setLoading(false);
    navigate('/');
  };

  const benefits = ['Free delivery on first order', 'Exclusive member discounts', 'Priority customer support', 'Track all your orders'];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-hero)',
      padding: '100px 20px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div className="glow-orb" style={{ width: 500, height: 500, background: 'rgba(34,197,94,0.07)', top: -150, right: -100 }} />
      <div className="glow-orb" style={{ width: 350, height: 350, background: 'rgba(16,185,129,0.05)', bottom: -100, left: -50 }} />

      <div className="responsive-grid-login">

        {/* Left panel */}
        <div>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <div style={{
              width: 46, height: 46,
              background: 'linear-gradient(135deg, #22c55e, #10b981)',
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
            }}>
              <Leaf size={22} color="#fff" />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800, fontSize: 22,
              background: 'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>GreenBasket 3D</span>
          </div>

          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
            Join the{' '}
            <span style={{
              background: 'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>organic</span>{' '}
            movement
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15, marginBottom: 36 }}>
            Shop fresh, live healthy. Get access to 2,000+ organic products with exclusive member benefits.
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {benefits.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: 8,
                  background: 'rgba(34,197,94,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Check size={13} style={{ color: '#22c55e' }} />
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right panel — form */}
        <div>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-glass)',
            borderRadius: 14,
            padding: 4,
            marginBottom: 36,
            border: '1px solid var(--border-glass)',
          }}>
            {['login', 'signup'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: '10px',
                  borderRadius: 10,
                  fontSize: 14, fontWeight: 600,
                  color: tab === t ? '#fff' : 'var(--text-muted)',
                  background: tab === t ? 'linear-gradient(135deg, #22c55e, #10b981)' : 'transparent',
                  transition: 'all 0.25s',
                  textTransform: 'capitalize',
                }}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {tab === 'signup' && (
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--green-500)' }} />
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="input-field" style={{ paddingLeft: 46 }} required />
                </div>
              )}

              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--green-500)' }} />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address" className="input-field" style={{ paddingLeft: 46 }} required />
              </div>

              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--green-500)' }} />
                <input
                  name="password" type={showPw ? 'text' : 'password'}
                  value={form.password} onChange={handleChange}
                  placeholder="Password"
                  className="input-field"
                  style={{ paddingLeft: 46, paddingRight: 46 }}
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--text-dim)', display: 'flex',
                }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {tab === 'login' && (
                <div style={{ textAlign: 'right' }}>
                  <a href="#" style={{ fontSize: 13, color: 'var(--green-400)', fontWeight: 500 }}>Forgot password?</a>
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                style={{
                  padding: '15px',
                  background: 'linear-gradient(135deg, #22c55e, #10b981)',
                  color: '#fff', borderRadius: 'var(--radius-full)',
                  fontSize: 16, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 8px 32px rgba(34,197,94,0.4)',
                  marginTop: 8,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                  />
                ) : (
                  <>{tab === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={17} /></>
                )}
              </motion.button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border-glass)' }} />
                <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>or continue with</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border-glass)' }} />
              </div>

              {/* Social */}
              <div style={{ display: 'flex', gap: 10 }}>
                {['Google', 'Apple'].map(provider => (
                  <motion.button
                    key={provider}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    style={{
                      flex: 1, padding: '11px',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: 12,
                      fontSize: 13, fontWeight: 600,
                      color: 'var(--text-muted)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    {provider === 'Google' ? '🌐' : '🍎'} {provider}
                  </motion.button>
                ))}
              </div>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
