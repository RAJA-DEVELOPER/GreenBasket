import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, Plus, Edit2, Trash2, Save,
  X, TrendingUp, ShoppingBag, Users, DollarSign, Search,
  ChevronUp, ChevronDown, Check
} from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const emptyProduct = {
  name: '', category: 'fruits', price: '', originalPrice: '',
  badge: '', unit: 'each', stock: 10, description: '', image: '',
};

export default function Admin() {
  const { products } = useStore();
  const [tab, setTab] = useState('dashboard');
  const [localProducts, setLocalProducts] = useState(products);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyProduct);
  const [search, setSearch] = useState('');

  const stats = [
    { label: 'Total Revenue', value: '$48,295', icon: DollarSign, color: '#22c55e', change: '+12.4%', up: true },
    { label: 'Total Orders', value: '1,842', icon: ShoppingBag, color: '#3b82f6', change: '+8.1%', up: true },
    { label: 'Products', value: localProducts.length, icon: Package, color: '#f97316', change: '+2', up: true },
    { label: 'Customers', value: '4,201', icon: Users, color: '#8b5cf6', change: '+5.3%', up: true },
  ];

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = () => {
    if (!form.name || !form.price) {
      toast.error('Name and price are required', {
        style: { background: 'rgba(10,20,13,0.95)', color: '#f0fdf4', borderRadius: '14px' },
      });
      return;
    }
    if (editingId) {
      setLocalProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...form, price: parseFloat(form.price), rating: p.rating, reviews: p.reviews } : p));
      toast.success('Product updated!', { style: { background: 'rgba(10,20,13,0.95)', color: '#f0fdf4', borderRadius: '14px' }, iconTheme: { primary: '#22c55e', secondary: '#fff' } });
    } else {
      const newProd = { ...form, id: Date.now(), price: parseFloat(form.price), originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null, rating: 4.5, reviews: 0 };
      setLocalProducts(prev => [newProd, ...prev]);
      toast.success('Product added!', { style: { background: 'rgba(10,20,13,0.95)', color: '#f0fdf4', borderRadius: '14px' }, iconTheme: { primary: '#22c55e', secondary: '#fff' } });
    }
    setForm(emptyProduct);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (p) => {
    setForm({ ...p, price: String(p.price), originalPrice: String(p.originalPrice || '') });
    setEditingId(p.id);
    setShowForm(true);
    setTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setLocalProducts(prev => prev.filter(p => p.id !== id));
    toast(`🗑 Product deleted`, { style: { background: 'rgba(10,20,13,0.95)', color: '#f0fdf4', borderRadius: '14px' } });
  };

  const filtered = localProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const tabStyle = (t) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 18px',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    color: tab === t ? 'var(--green-400)' : 'var(--text-muted)',
    background: tab === t ? 'rgba(34,197,94,0.12)' : 'transparent',
    border: `1px solid ${tab === t ? 'var(--border-glow)' : 'transparent'}`,
    transition: 'all 0.2s',
    cursor: 'pointer',
  });

  return (
    <div className="page-enter" style={{ paddingTop: 90, minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 90px)' }}>

        {/* Sidebar */}
        <aside style={{
          width: 220,
          flexShrink: 0,
          borderRight: '1px solid var(--border-glass)',
          padding: '32px 16px',
          background: 'var(--bg-secondary)',
          position: 'sticky',
          top: 90,
          height: 'calc(100vh - 90px)',
          overflow: 'auto',
        }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 16, paddingLeft: 8 }}>
            Admin Panel
          </p>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button style={tabStyle('dashboard')} onClick={() => setTab('dashboard')}>
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button style={tabStyle('products')} onClick={() => setTab('products')}>
              <Package size={16} /> Products
            </button>
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: 40 }}>
            <div style={{
              padding: '16px',
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid var(--border-glass)',
              borderRadius: 14,
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--green-400)', marginBottom: 4 }}>Admin Mode</p>
              <p style={{ fontSize: 11, color: 'var(--text-dim)' }}>All changes are local for this demo</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>

          {/* Dashboard */}
          {tab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Dashboard</h1>
              <p style={{ color: 'var(--text-muted)', marginBottom: 36 }}>Welcome back, Admin 👋</p>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18, marginBottom: 40 }}>
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card"
                    style={{ padding: 22 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: `${s.color}18`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <s.icon size={20} style={{ color: s.color }} />
                      </div>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: s.up ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                        color: s.up ? '#22c55e' : '#ef4444',
                        display: 'flex', alignItems: 'center', gap: 2,
                      }}>
                        {s.up ? <ChevronUp size={10} /> : <ChevronDown size={10} />}{s.change}
                      </span>
                    </div>
                    <p style={{ fontSize: 26, fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{s.value}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent products table */}
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Recent Products</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Product', 'Category', 'Price', 'Stock', 'Rating'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)', borderBottom: '1px solid var(--border-glass)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {localProducts.slice(0, 5).map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid rgba(34,197,94,0.05)' }}>
                        <td style={{ padding: '12px', fontSize: 14, fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img src={p.image} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
                            {p.name}
                          </div>
                        </td>
                        <td style={{ padding: '12px', fontSize: 13, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{p.category}</td>
                        <td style={{ padding: '12px', fontSize: 14, fontWeight: 700, color: 'var(--green-400)' }}>${p.price}</td>
                        <td style={{ padding: '12px', fontSize: 13, color: 'var(--text-muted)' }}>{p.stock}</td>
                        <td style={{ padding: '12px', fontSize: 13, color: '#fbbf24', fontWeight: 700 }}>⭐ {p.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Products tab */}
          {tab === 'products' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Products</h1>
                  <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>{localProducts.length} total products</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setShowForm(true); setForm(emptyProduct); setEditingId(null); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #22c55e, #10b981)',
                    color: '#fff', borderRadius: 12,
                    fontSize: 14, fontWeight: 700,
                    boxShadow: '0 4px 20px rgba(34,197,94,0.35)',
                  }}
                >
                  <Plus size={16} /> Add Product
                </motion.button>
              </div>

              {/* Form */}
              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden', marginBottom: 28 }}
                  >
                    <div className="glass-card" style={{ padding: 28 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                        <h3 style={{ fontWeight: 700 }}>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                        <button onClick={() => { setShowForm(false); setEditingId(null); }}>
                          <X size={18} style={{ color: 'var(--text-muted)' }} />
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                        {[
                          { name: 'name', placeholder: 'Product Name', label: 'Name' },
                          { name: 'price', placeholder: '0.00', label: 'Price ($)', type: 'number' },
                          { name: 'originalPrice', placeholder: '0.00', label: 'Original Price ($)', type: 'number' },
                          { name: 'stock', placeholder: '10', label: 'Stock', type: 'number' },
                          { name: 'unit', placeholder: 'each', label: 'Unit' },
                          { name: 'badge', placeholder: 'e.g. Organic', label: 'Badge' },
                          { name: 'image', placeholder: 'https://...', label: 'Image URL' },
                        ].map(({ name, placeholder, label, type }) => (
                          <div key={name}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', display: 'block', marginBottom: 6 }}>{label}</label>
                            <input
                              name={name} type={type || 'text'}
                              placeholder={placeholder}
                              value={form[name]}
                              onChange={handleChange}
                              className="input-field"
                              style={{ padding: '10px 14px', fontSize: 14 }}
                            />
                          </div>
                        ))}

                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', display: 'block', marginBottom: 6 }}>Category</label>
                          <select name="category" value={form.category} onChange={handleChange} className="input-field" style={{ padding: '10px 14px', fontSize: 14 }}>
                            {['fruits', 'vegetables', 'dairy', 'bakery'].map(c => (
                              <option key={c} value={c} style={{ background: '#0a140d' }}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div style={{ marginTop: 14 }}>
                        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', display: 'block', marginBottom: 6 }}>Description</label>
                        <textarea
                          name="description" value={form.description} onChange={handleChange}
                          placeholder="Product description..."
                          className="input-field"
                          style={{ padding: '10px 14px', fontSize: 14, minHeight: 80, resize: 'vertical' }}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleSave} style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          padding: '10px 22px',
                          background: 'linear-gradient(135deg, #22c55e, #10b981)',
                          color: '#fff', borderRadius: 10,
                          fontSize: 14, fontWeight: 700,
                        }}>
                          <Save size={15} /> {editingId ? 'Update' : 'Save'} Product
                        </motion.button>
                        <button onClick={() => { setShowForm(false); setEditingId(null); }}
                          style={{ padding: '10px 18px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 10, color: 'var(--text-muted)', fontSize: 14 }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Search */}
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--green-500)' }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input-field" style={{ paddingLeft: 42 }} />
              </div>

              {/* Products table */}
              <div className="glass-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filtered.map((p, i) => (
                        <motion.tr
                          key={p.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.03 }}
                          style={{ borderBottom: '1px solid rgba(34,197,94,0.05)' }}
                        >
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <img src={p.image} alt="" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
                              <div>
                                <p style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</p>
                                {p.badge && <span className="badge" style={{ fontSize: 9, padding: '1px 6px' }}>{p.badge}</span>}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{p.category}</td>
                          <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 700, color: 'var(--green-400)' }}>${p.price}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{
                              fontSize: 12, fontWeight: 600, padding: '3px 10px',
                              borderRadius: 'var(--radius-full)',
                              background: p.stock > 20 ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                              color: p.stock > 20 ? '#22c55e' : '#eab308',
                            }}>
                              {p.stock} left
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>⭐ {p.rating}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEdit(p)}
                                style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}
                              >
                                <Edit2 size={13} />
                              </motion.button>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(p.id)}
                                style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171' }}
                              >
                                <Trash2 size={13} />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
