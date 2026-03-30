import { create } from 'zustand';

const products = [
  { id: 1, name: 'Organic Avocado', category: 'fruits', price: 2.99, originalPrice: 4.99, rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80', badge: 'Organic', unit: 'each', stock: 48, description: 'Perfectly ripe Hass avocados, organically grown. Rich in healthy fats and nutrients.' },
  { id: 2, name: 'Fresh Strawberries', category: 'fruits', price: 4.49, originalPrice: 6.99, rating: 4.9, reviews: 528, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80', badge: 'Fresh', unit: '500g', stock: 30, description: 'Sun-ripened strawberries bursting with sweetness. Perfect for desserts or snacking.' },
  { id: 3, name: 'Baby Spinach', category: 'vegetables', price: 3.29, originalPrice: 4.49, rating: 4.7, reviews: 189, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80', badge: 'Organic', unit: '200g', stock: 60, description: 'Tender baby spinach leaves, triple-washed and ready to eat. Packed with iron and vitamins.' },
  { id: 4, name: 'Heirloom Tomatoes', category: 'vegetables', price: 3.99, originalPrice: 5.49, rating: 4.6, reviews: 234, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=80', badge: 'Farm Fresh', unit: '400g', stock: 25, description: 'Colorful heirloom tomatoes with intense, complex flavors. Grown on local family farms.' },
  { id: 5, name: 'Greek Yogurt', category: 'dairy', price: 5.99, originalPrice: 7.99, rating: 4.8, reviews: 445, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80', badge: 'Probiotic', unit: '500g', stock: 40, description: 'Thick and creamy full-fat Greek yogurt. Live active cultures for gut health.' },
  { id: 6, name: 'Whole Grain Bread', category: 'bakery', price: 4.79, originalPrice: null, rating: 4.5, reviews: 178, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', badge: 'Artisan', unit: 'loaf', stock: 20, description: 'Hand-crafted sourdough whole grain loaf baked fresh daily. No preservatives.' },
  { id: 7, name: 'Wild Blueberries', category: 'fruits', price: 6.49, originalPrice: 8.99, rating: 4.9, reviews: 672, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80', badge: 'Wild', unit: '300g', stock: 35, description: 'Hand-picked wild blueberries with superior antioxidant levels versus cultivated.' },
  { id: 8, name: 'Free Range Eggs', category: 'dairy', price: 7.49, originalPrice: 9.99, rating: 4.7, reviews: 389, image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&q=80', badge: 'Free Range', unit: '12 pack', stock: 55, description: 'Eggs from pasture-raised hens with rich golden yolks and superior flavor.' },
  { id: 9, name: 'Broccoli Florets', category: 'vegetables', price: 2.99, originalPrice: 3.99, rating: 4.5, reviews: 156, image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80', badge: 'Fresh', unit: '400g', stock: 42, description: 'Crisp broccoli florets loaded with vitamins C and K. Harvested at peak freshness.' },
  { id: 10, name: 'Pineapple', category: 'fruits', price: 3.49, originalPrice: null, rating: 4.6, reviews: 203, image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&q=80', badge: null, unit: 'each', stock: 18, description: 'Sweet and juicy golden pineapples imported from Costa Rica. Perfect tropical flavor.' },
  { id: 11, name: 'Almond Milk', category: 'dairy', price: 4.29, originalPrice: 5.79, rating: 4.4, reviews: 298, image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=400&q=80', badge: 'Vegan', unit: '1L', stock: 70, description: 'Unsweetened almond milk with a creamy texture. Fortified with calcium and vitamins.' },
  { id: 12, name: 'Croissant Bundle', category: 'bakery', price: 5.99, originalPrice: 7.49, rating: 4.8, reviews: 421, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80', badge: 'Baked Fresh', unit: '4 pack', stock: 15, description: 'Buttery, flaky croissants baked fresh each morning. Made with European butter.' },
];

const categories = [
  { id: 'all', name: 'All Products', emoji: '🛒' },
  { id: 'fruits', name: 'Fruits', emoji: '🍎' },
  { id: 'vegetables', name: 'Vegetables', emoji: '🥦' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛' },
  { id: 'bakery', name: 'Bakery', emoji: '🍞' },
];

export const useStore = create((set, get) => ({
  // State
  products,
  categories,
  cart: [],
  wishlist: [],
  darkMode: true,
  searchQuery: '',
  activeCategory: 'all',
  isLoading: false,
  user: null,

  // Dark mode
  toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),

  // Search
  setSearchQuery: (q) => set({ searchQuery: q }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),

  // Filtered products
  getFilteredProducts: () => {
    const { products, searchQuery, activeCategory } = get();
    return products.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  },

  // Cart actions
  addToCart: (product, qty = 1) => set(state => {
    const existing = state.cart.find(i => i.id === product.id);
    if (existing) {
      return { cart: state.cart.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i) };
    }
    return { cart: [...state.cart, { ...product, qty }] };
  }),

  removeFromCart: (id) => set(state => ({ cart: state.cart.filter(i => i.id !== id) })),

  updateQty: (id, qty) => set(state => {
    if (qty <= 0) return { cart: state.cart.filter(i => i.id !== id) };
    return { cart: state.cart.map(i => i.id === id ? { ...i, qty } : i) };
  }),

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getCartCount: () => {
    const { cart } = get();
    return cart.reduce((sum, i) => sum + i.qty, 0);
  },

  // Wishlist
  toggleWishlist: (id) => set(state => ({
    wishlist: state.wishlist.includes(id)
      ? state.wishlist.filter(w => w !== id)
      : [...state.wishlist, id]
  })),

  // Auth (simplified)
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));
