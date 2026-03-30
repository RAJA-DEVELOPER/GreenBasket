import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Sun, Moon, Search, Menu, X, Leaf, User, Heart, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const { darkMode, toggleDarkMode, getCartCount, user } = useStore();
  const cartCount = getCartCount();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Offers', to: '/products?filter=offers' },
    { label: 'Admin', to: '/admin' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          transition: 'all 0.3s ease',
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled
            ? 'rgba(5, 10, 7, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(34,197,94,0.12)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              style={{
                width: 40, height: 40,
                background: 'linear-gradient(135deg, #22c55e, #10b981)',
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
              }}
            >
              <Leaf size={20} color="#fff" />
            </motion.div>
            <div>
              <span className="nav-brand-title">GreenBasket</span>
              <span className="nav-brand-sub mobile-hide">3D Experience</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            listStyle: 'none',
            margin: 0,
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 14,
                    fontWeight: 500,
                    color: location.pathname === link.to ? 'var(--green-400)' : 'var(--text-muted)',
                    background: location.pathname === link.to ? 'rgba(34,197,94,0.1)' : 'transparent',
                    transition: 'all 0.2s',
                    display: 'block',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--green-400)';
                    e.currentTarget.style.background = 'rgba(34,197,94,0.08)';
                  }}
                  onMouseLeave={e => {
                    if (location.pathname !== link.to) {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Search */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(true)}
              className="nav-action-btn mobile-hide"
            >
              <Search size={17} />
            </motion.button>

            {/* Dark mode */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="nav-action-btn mobile-hide"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={darkMode ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Auth */}
            <Link
              to="/login"
              className="nav-action-btn mobile-hide"
            >
              <User size={17} />
            </Link>

            {/* Cart */}
            <Link to="/cart" style={{ position: 'relative' }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cart-btn"
              >
                <ShoppingCart size={17} />
                <span className="cart-label">Cart</span>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="cart-badge"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-menu-btn"
              style={{
                width: 40, height: 40,
                borderRadius: 12,
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glass)',
                display: 'none',
                alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 72,
              left: 0,
              right: 0,
              zIndex: 998,
              padding: '16px 20px',
              background: 'rgba(5,10,7,0.95)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--border-glass)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={link.to}
                  style={{
                    display: 'block',
                    padding: '14px 16px',
                    borderRadius: 12,
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '15vh',
            }}
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              onSubmit={handleSearch}
              style={{
                width: '100%',
                maxWidth: 600,
                margin: '0 24px',
                position: 'relative',
              }}
            >
              <Search
                size={20}
                style={{
                  position: 'absolute',
                  left: 18,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--green-400)',
                }}
              />
              <input
                ref={searchRef}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search organic produce, dairy, bakery…"
                className="input-field"
                style={{ paddingLeft: 52, paddingRight: 52, fontSize: 18, borderRadius: 20 }}
              />
              {searchVal && (
                <button
                  type="button"
                  onClick={() => setSearchVal('')}
                  style={{
                    position: 'absolute',
                    right: 18,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                  }}
                >
                  <X size={18} />
                </button>
              )}
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-brand-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 20px;
          background: var(--gradient-text);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-brand-sub {
          display: block;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--green-500);
          margin-top: -4px;
          font-weight: 600;
        }
        .nav-action-btn {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted);
          backdrop-filter: blur(10px);
        }
        .cart-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 18px;
          background: linear-gradient(135deg, #22c55e, #10b981);
          border-radius: var(--radius-full);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(34,197,94,0.35);
        }
        .cart-badge {
          background: #fff;
          color: #16a34a;
          border-radius: 50%;
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700;
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .cart-label { display: none; }
          .mobile-hide { display: none !important; }
          .cart-btn { padding: 8px 12px; }
        }
      `}</style>
    </>
  );
}
