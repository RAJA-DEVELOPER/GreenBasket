import { Link } from 'react-router-dom';
import { Leaf, Camera, MessageCircle, Globe, Video, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  Shop: [
    { label: 'Fresh Produce', to: '/products?cat=fruits' },
    { label: 'Vegetables', to: '/products?cat=vegetables' },
    { label: 'Dairy & Eggs', to: '/products?cat=dairy' },
    { label: 'Bakery', to: '/products?cat=bakery' },
    { label: 'Special Offers', to: '/products?filter=offers' },
  ],
  Company: [
    { label: 'About Us', to: '/' },
    { label: 'Our Farms', to: '/' },
    { label: 'Careers', to: '/' },
    { label: 'Press', to: '/' },
    { label: 'Blog', to: '/' },
  ],
  Support: [
    { label: 'Help Center', to: '/' },
    { label: 'Track Order', to: '/' },
    { label: 'Returns', to: '/' },
    { label: 'Contact Us', to: '/' },
    { label: 'Privacy Policy', to: '/' },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-glass)',
      padding: '80px 0 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow orbs */}
      <div className="glow-orb" style={{ width: 400, height: 400, background: 'rgba(34,197,94,0.05)', bottom: -200, left: -100 }} />
      <div className="glow-orb" style={{ width: 300, height: 300, background: 'rgba(16,185,129,0.05)', bottom: -100, right: -50 }} />

      <div className="container">
        <div className="responsive-grid-footer">
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44,
                background: 'linear-gradient(135deg, #22c55e, #10b981)',
                borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(34,197,94,0.35)',
              }}>
                <Leaf size={22} color="#fff" />
              </div>
              <div>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 22,
                  background: 'var(--gradient-text)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>GreenBasket 3D</span>
              </div>
            </Link>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 14, maxWidth: 300, marginBottom: 24 }}>
              The future of grocery shopping. Premium organic products delivered fresh to your door, with cutting-edge 3D technology.
            </p>

            {/* Newsletter */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Stay in the loop</p>
              <form style={{ display: 'flex', gap: 8 }} onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input-field"
                  style={{ flex: 1, padding: '10px 14px', fontSize: 13 }}
                />
                <button className="btn btn-primary" style={{ padding: '10px 16px', borderRadius: 12 }}>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[Camera, MessageCircle, Globe, Video].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 38, height: 38,
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 15, marginBottom: 20 }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      style={{ color: 'var(--text-muted)', fontSize: 14, transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--green-400)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div style={{
          display: 'flex',
          gap: 32,
          marginBottom: 40,
          flexWrap: 'wrap',
        }}>
          {[
            { icon: Mail, text: 'russellraja2@gmail.com' },
            { icon: Phone, text: '+918098381447' },
            { icon: MapPin, text: '66, mettu st cheyyar,chennai,india' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13 }}>
              <Icon size={15} style={{ color: 'var(--green-500)' }} />
              {text}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border-glass)',
          paddingTop: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>
            © 2026 GreenBasket 3D. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
            Made with <Heart size={12} style={{ color: '#ef4444' }} fill="#ef4444" /> by RAJA D
          </p>
        </div>
      </div>

    </footer>
  );
}
