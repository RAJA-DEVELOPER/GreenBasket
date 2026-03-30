import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name A-Z' },
];

const categoryList = [
  { id: 'all', label: 'All Products', emoji: '🛒' },
  { id: 'fruits', label: 'Fruits', emoji: '🍎' },
  { id: 'vegetables', label: 'Vegetables', emoji: '🥦' },
  { id: 'dairy', label: 'Dairy', emoji: '🥛' },
  { id: 'bakery', label: 'Bakery', emoji: '🍞' },
];

export default function Products() {
  const { products, searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [gridView, setGridView] = useState(true);
  const [localSearch, setLocalSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cat = searchParams.get('cat');
    const q = searchParams.get('q');
    if (cat) setActiveCategory(cat);
    if (q) { setLocalSearch(q); setSearchQuery(q); }
    setTimeout(() => setLoading(false), 500);
  }, [searchParams]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setLocalSearch(val);
    setSearchQuery(val);
  };

  // Filter + sort
  let filtered = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(localSearch.toLowerCase());
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchCat && matchSearch && matchPrice;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="page-enter" style={{ paddingTop: 100 }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-glass)',
        padding: '40px 0',
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="section-label">Our Selection</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 8 }}>
              All Products
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
              {filtered.length} products available
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 24px' }}>
        {/* Search + Toolbar */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginBottom: 32,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={16} style={{
              position: 'absolute', left: 15, top: '50%',
              transform: 'translateY(-50%)', color: 'var(--green-500)',
            }} />
            <input
              value={localSearch}
              onChange={handleSearch}
              placeholder="Search products…"
              className="input-field"
              style={{ paddingLeft: 44 }}
            />
            {localSearch && (
              <button
                onClick={() => { setLocalSearch(''); setSearchQuery(''); }}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div style={{ position: 'relative' }}>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="input-field"
              style={{ paddingRight: 36, minWidth: 180, appearance: 'none' }}
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value} style={{ background: '#0a140d' }}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} style={{
              position: 'absolute', right: 12, top: '50%',
              transform: 'translateY(-50%)', color: 'var(--text-muted)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Filter toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '13px 18px',
              background: showFilters ? 'rgba(34,197,94,0.15)' : 'var(--bg-glass)',
              border: `1.5px solid ${showFilters ? 'var(--border-glow)' : 'var(--border-glass)'}`,
              borderRadius: 'var(--radius-md)',
              color: showFilters ? 'var(--green-400)' : 'var(--text-muted)',
              fontSize: 14, fontWeight: 600,
              backdropFilter: 'blur(10px)',
            }}
          >
            <SlidersHorizontal size={16} /> Filters
          </motion.button>

          {/* Grid/List toggle */}
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { icon: Grid3X3, val: true },
              { icon: LayoutList, val: false },
            ].map(({ icon: Icon, val }) => (
              <motion.button
                key={String(val)}
                whileTap={{ scale: 0.9 }}
                onClick={() => setGridView(val)}
                style={{
                  width: 42, height: 42,
                  borderRadius: 10,
                  background: gridView === val ? 'rgba(34,197,94,0.15)' : 'var(--bg-glass)',
                  border: `1px solid ${gridView === val ? 'var(--border-glow)' : 'var(--border-glass)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: gridView === val ? 'var(--green-400)' : 'var(--text-muted)',
                }}
              >
                <Icon size={16} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', marginBottom: 28 }}
            >
              <div className="glass-card" style={{ padding: 24, display: 'flex', flexWrap: 'wrap', gap: 32 }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>Category</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {categoryList.map(cat => (
                      <motion.button
                        key={cat.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory(cat.id)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 13, fontWeight: 600,
                          background: activeCategory === cat.id ? 'rgba(34,197,94,0.2)' : 'var(--bg-glass)',
                          color: activeCategory === cat.id ? 'var(--green-400)' : 'var(--text-muted)',
                          border: `1px solid ${activeCategory === cat.id ? 'var(--border-glow)' : 'var(--border-glass)'}`,
                        }}
                      >
                        {cat.emoji} {cat.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
                    Max Price: <span style={{ color: 'var(--green-400)' }}>${priceRange[1]}</span>
                  </p>
                  <input
                    type="range"
                    min="0" max="20" step="0.5"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, parseFloat(e.target.value)])}
                    style={{ width: 200, accentColor: '#22c55e' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
          {categoryList.map(cat => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: 13, fontWeight: 600,
                background: activeCategory === cat.id ? 'rgba(34,197,94,0.2)' : 'var(--bg-glass)',
                color: activeCategory === cat.id ? 'var(--green-400)' : 'var(--text-muted)',
                border: `1px solid ${activeCategory === cat.id ? 'var(--border-glow)' : 'var(--border-glass)'}`,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s',
              }}
            >
              {cat.emoji} {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Products grid */}
        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 22,
          }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 380, borderRadius: 24 }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '80px 0' }}
          >
            <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>No products found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search terms.</p>
            <button
              className="btn btn-outline"
              style={{ marginTop: 24 }}
              onClick={() => { setLocalSearch(''); setSearchQuery(''); setActiveCategory('all'); }}
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: gridView
                ? 'repeat(auto-fill, minmax(260px, 1fr))'
                : '1fr',
              gap: 22,
            }}
          >
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductCard product={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
