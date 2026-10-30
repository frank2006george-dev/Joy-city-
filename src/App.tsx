/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock, MessageCircle, Menu as MenuIcon, X, Utensils, Star, ShoppingBag, ChevronRight } from 'lucide-react';

/* =========================================================================
   >>> EDIT ONLY THIS OBJECT <<<
   ========================================================================= */
const siteConfig = {
  businessName: "Joy City Foods",
  tagline: "Crispy Shawarma, Sizzling Peppered Grills & Creamy Treats",
  rating: "4.1",
  reviewsCount: "28",
  phone: "+234 806 500 0524",
  phoneAlt: "+234 814 228 0321",
  whatsappNumber: "2348065000524",
  address: "11 Azikoro Street, Opposite Sunky Supermarket, Ekeki, Yenagoa 569101, Bayelsa State",
  mapsLink: "https://maps.app.goo.gl/BPztjfZqmjYsj16bA",
  whatsappCatalogLink: "https://wa.me/c/2348065000524",
  
  colors: {
    primary: "#f97316",
    primaryHover: "#ea580c",
    accent: "#10b981",
    accentHover: "#059669",
    background: "#0c0f12",
    surface: "#181d24",
    surfaceLight: "#232934",
    text: "#f8fafc",
    textMuted: "#94a3b8",
    border: "#27303f"
  },

  hours: [
    { days: "Monday - Saturday", time: "8:00 AM – 8:30 PM", status: "Open Daily" },
    { days: "Sunday", time: "12:00 PM – 8:30 PM", status: "Afternoon Service" }
  ],

  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/2348065000524"
  },

  heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80",
  heroBadge: "🔥 Yenagoa's Favorite Street Food & Treats",
  
  aboutTitle: "Serving Flavor, Joy & Fresh Bites Daily in Ekeki",
  aboutText: "Welcome to Joy City Foods, your neighborhood haven for succulent spiced shawarma wraps, tender peppered turkey and chicken, velvety soft-serve ice cream, and fresh hot popcorn. Conveniently located right opposite Sunky Supermarket along Azikoro Street, we bring mouth-watering recipes crafted with premium local ingredients, authentic Nigerian spices, and speedy service directly to your table or doorstep.",
  
  sectionToggles: {
    showAbout: true,
    showMenu: true,
    showGallery: true,
    showTestimonials: true,
    showHoursAndLocation: true
  },

  menuCategories: ["All", "Shawarma", "Peppered Meat", "Ice Cream & Treats"],
  menu: [
    { id: "sh-1", name: "Shawarma (Medium Size)", category: "Shawarma", description: "Juicy marinated meat, fresh veggies, signature cream sauce, and warm toasted flatbread wrap.", price: 3500, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=80", popular: true },
    { id: "sh-2", name: "Shawarma (Big Size)", category: "Shawarma", description: "Double filling with extra seasoned meat, crisp cabbage crunch, and authentic creamy spicy blend.", price: 4000, image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=700&q=80", popular: true },
    { id: "sh-3", name: "Shawarma (Special Wrap)", category: "Shawarma", description: "Premium jumbo wrap loaded with assorted grilled meats, sausages, cheese, and chef special dressing.", price: 4500, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80", popular: false },
    { id: "pm-1", name: "Peppered Turkey", category: "Peppered Meat", description: "Deep fried golden turkey cuts tossed in rich, fiery habanero tomato and onion pepper sauce.", price: 5500, image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=700&q=80", popular: true },
    { id: "pm-2", name: "Peppered Chicken Lap", category: "Peppered Meat", description: "Succulent chicken drumsticks slow-grilled and smothered in spicy native peppered glaze.", price: 3500, image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=700&q=80", popular: false },
    { id: "ic-1", name: "Ice Cream (Cup)", category: "Ice Cream & Treats", description: "Smooth chilled swirl topped with chocolate chips or crunchy sprinkles in a convenient takeaway cup.", price: 2800, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80", popular: false },
    { id: "ic-2", name: "Ice Cream (Cone)", category: "Ice Cream & Treats", description: "Crispy waffle sugar cone packed with creamy soft serve swirl, drizzled with chocolate fudge sauce.", price: 1500, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=700&q=80", popular: true },
    { id: "ic-3", name: "Ice Cream (Plate / Sharing Bowl)", category: "Ice Cream & Treats", description: "Generous family size dessert portion with assorted toppings, chocolate drops, and rich vanilla swirl.", price: 4000, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=700&q=80", popular: false },
    { id: "pc-1", name: "Hot Sunky Popcorn (Butter & Sugar)", category: "Ice Cream & Treats", description: "Freshly popped, warm golden popcorn kettle-cooked for optimal crunch and sweetness.", price: 1200, image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=700&q=80", popular: false }
  ],

  gallery: [
    { url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80", title: "Fresh Hand-Rolled Shawarma" },
    { url: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80", title: "Sizzling Peppered Turkey" },
    { url: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80", title: "Waffle Cone Delights" },
    { url: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80", title: "Spiced Chicken Laps" },
    { url: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80", title: "Golden Fresh Popcorn" },
    { url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80", title: "Chilled Dessert Bowls" }
  ],

  testimonials: [
    { name: "Tariere Ebimo", rating: 5, text: "Best shawarma in Yenagoa hands down! The filling is generous, the meat is properly spiced, and the garlic cream is sensational.", location: "Azikoro Road, Yenagoa" },
    { name: "Chukwudi Nnamdi", rating: 5, text: "Their peppered turkey is fiery and addictive. Ordering on WhatsApp is super fast, it was hot and ready for pickup in 15 minutes.", location: "Ekeki, Yenagoa" },
    { name: "Grace Kalu", rating: 4, text: "My kids always look forward to their ice cream cones and popcorn whenever we pass Sunky Supermarket. Friendly staff!", location: "Swali, Bayelsa" }
  ]
};

const formatNaira = (amt: number) => "₦" + Number(amt).toLocaleString("en-NG");
const getOrderItemWhatsappUrl = (itemName: string, price: number) => {
  const text = `Hello ${siteConfig.businessName}, I'd like to order ${itemName} (${formatNaira(price)})`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
};
const getGeneralWhatsappUrl = () => {
  const text = `Hello ${siteConfig.businessName}, I would like to make an inquiry / place an order.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${siteConfig.businessName} | ${siteConfig.tagline}`;
    // Dynamic CSS variables
    const root = document.documentElement;
    Object.entries(siteConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
  }, []);

  const filteredMenu = useMemo(() => {
    if (activeCategory === "All") return siteConfig.menu;
    return siteConfig.menu.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const handleAddSimulate = (name: string) => {
    setAddedItem(name);
    setTimeout(() => setAddedItem(null), 2500);
  };

  const sectionVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as any } }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans antialiased">
      {/* Toast */}
      {addedItem && (
        <div className="fixed top-20 right-5 z-50 bg-[var(--color-accent)] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span>✓</span>
          <div>
            <p className="font-semibold text-sm">Order Started!</p>
            <p className="text-xs opacity-90">Ready to complete via WhatsApp</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center font-bold text-white">JC</div>
            <span className="text-xl font-extrabold">{siteConfig.businessName}</span>
          </a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[var(--color-text)]">
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
          
          <div className="hidden md:flex gap-6">
            <a href="#menu" className="hover:text-[var(--color-primary)]">Menu</a>
            <a href="#about" className="hover:text-[var(--color-primary)]">About</a>
            <a href="#gallery" className="hover:text-[var(--color-primary)]">Photos</a>
            <a href="#reviews" className="hover:text-[var(--color-primary)]">Reviews</a>
            <a href="#location" className="hover:text-[var(--color-primary)]">Location</a>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4 flex flex-col gap-4">
            <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-primary)]">Menu</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-primary)]">About</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-primary)]">Photos</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-primary)]">Reviews</a>
            <a href="#location" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-primary)]">Location</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4">
        <img src={siteConfig.heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover brightness-50" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{siteConfig.businessName}</h1>
          <p className="text-xl mb-8">{siteConfig.tagline}</p>
          <a href="#menu" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-xl font-bold">View Menu</a>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section id="about" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="py-20 px-4 bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--color-primary)]">{siteConfig.aboutTitle}</h2>
          <p className="text-lg md:text-xl text-[var(--color-text)] leading-relaxed font-light tracking-wide">{siteConfig.aboutText}</p>
        </div>
      </motion.section>

      {/* Menu */}
      <motion.section id="menu" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Our Menu</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-8 px-2">
          {siteConfig.menuCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeCategory === cat ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-light)]'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map(item => (
            <div key={item.id} className="bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-border)] p-4">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--color-primary)]">{formatNaira(item.price)}</span>
                <a href={getOrderItemWhatsappUrl(item.name, item.price)} target="_blank" onClick={() => handleAddSimulate(item.name)} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <ShoppingBag size={16} /> Order
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section id="gallery" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="py-20 px-4 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Visual Showcase</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {siteConfig.gallery.map((img, i) => (
              <img key={i} src={img.url} alt={img.title} className="w-full h-64 object-cover rounded-lg" loading="lazy" />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section id="reviews" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Yenagoa is Saying</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {siteConfig.testimonials.map((t, i) => (
            <div key={i} className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)]">
              <div className="flex text-[var(--color-primary)] mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="mb-4 text-[var(--color-text-muted)] italic">"{t.text}"</p>
              <p className="font-bold text-sm">{t.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{t.location}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Location & Hours */}
      <motion.section id="location" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="py-20 px-4 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">Hours & Location</h2>
            <div className="space-y-4">
              <p className="flex items-center gap-3"><MapPin className="text-[var(--color-primary)]" /> {siteConfig.address}</p>
              {siteConfig.hours.map((h, i) => (
                <p key={i} className="flex items-center gap-3"><Clock className="text-[var(--color-primary)]" /> {h.days}: {h.time}</p>
              ))}
            </div>
          </div>
          <div className="h-64 rounded-xl overflow-hidden shadow-lg">
            <iframe 
              src={siteConfig.mapsLink.replace('/view', '/embed')} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-10 border-t border-[var(--color-border)] text-center text-[var(--color-text-muted)]">
        <p>&copy; {new Date().getFullYear()} {siteConfig.businessName}</p>
        <p>{siteConfig.address}</p>
      </footer>
    </div>
  );
}
