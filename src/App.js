import React, { useState } from "react";

const PRIMARY = "#2E7D32";
const SECONDARY = "#FE5303";
const BG_PEACH = "#ffe5d9";
const BG_SOFT = "#fff5f0";

const PRODUCTS = [
  { id: "onion", name: "Fresh Onion", price: 4.99, unit: "per lb", category: "Vegetables", emoji: "🧅", img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=300&q=80", desc: "Locally grown red onions, firm and fresh." },
  { id: "orange", name: "Fresh Orange", price: 5.49, unit: "per lb", category: "Fruits", emoji: "🍊", img: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=300&q=80", desc: "Juicy Valencia oranges, hand-picked." },
  { id: "carrot", name: "Fresh Carrot", price: 3.99, unit: "per bunch", category: "Vegetables", emoji: "🥕", img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=300&q=80", desc: "Crunchy rainbow carrots, great for salads." },
  { id: "apple", name: "Fresh Green Apple", price: 6.99, unit: "per lb", category: "Fruits", emoji: "🍏", img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=300&q=80", desc: "Crisp green apples, tart and sweet." },
  { id: "watermelon", name: "Fresh Watermelon", price: 8.99, unit: "each", category: "Fruits", emoji: "🍉", img: "https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=300&q=80", desc: "Sweet, seedless watermelon." },
  { id: "brinjal", name: "Fresh Brinjal", price: 4.49, unit: "per lb", category: "Vegetables", emoji: "🍆", img: "https://images.unsplash.com/photo-1659261200833-ec8761558af7?auto=format&fit=crop&w=300&q=80", desc: "Glossy purple brinjal, farm fresh." },
  { id: "tomato", name: "Fresh Tomato", price: 3.49, unit: "per lb", category: "Vegetables", emoji: "🍅", img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=300&q=80", desc: "Vine-ripened, juicy red tomatoes." },
  { id: "banana", name: "Fresh Banana", price: 2.99, unit: "per dozen", category: "Fruits", emoji: "🍌", img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80", desc: "Naturally ripened, sweet bananas." },
  { id: "potato", name: "Fresh Potato", price: 3.29, unit: "per lb", category: "Vegetables", emoji: "🥔", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80", desc: "Farm-fresh potatoes, great for any dish." },
  { id: "broccoli", name: "Fresh Broccoli", price: 5.99, unit: "per lb", category: "Vegetables", emoji: "🥦", img: "https://images.unsplash.com/photo-1584270354949-1f8e5a1e5d1a?auto=format&fit=crop&w=300&q=80", desc: "Crisp green broccoli, packed with nutrients." },
  { id: "milk", name: "Fresh Milk", price: 3.99, unit: "1 liter", category: "Dairy", emoji: "🥛", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80", desc: "Pure, pasteurized whole milk." },
  { id: "cheese", name: "Fresh Cheese", price: 7.49, unit: "per block", category: "Dairy", emoji: "🧀", img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=300&q=80", desc: "Creamy, aged cheddar cheese." },
];

const CATEGORIES = ["All", "Vegetables", "Fruits", "Dairy"];

const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const validatePhone = (v) => /^\d{10}$/.test(v);
const validatePincode = (v) => /^\d{6}$/.test(v);
const validateCard = (v) => /^\d{16}$/.test(v.replace(/\s/g, ""));
const validateCVV = (v) => /^\d{3}$/.test(v);
const validateUPI = (v) => /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(v);
const validateExpiry = (v) => {
  if (!/^\d{2}\/\d{2}$/.test(v)) return false;
  const [mm, yy] = v.split("/").map(Number);
  if (mm < 1 || mm > 12) return false;
  const now = new Date();
  const curYY = now.getFullYear() % 100;
  const curMM = now.getMonth() + 1;
  if (yy < curYY || (yy === curYY && mm < curMM)) return false;
  return true;
};

function currency(n) {
  return `$${n.toFixed(2)}`;
}

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: "16px", textAlign: "left" }}>
      <label style={{ display: "block", fontSize: "13px", color: "#333", marginBottom: "6px", fontWeight: 600 }}>{label}</label>
      {children}
      {error && <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>{error}</p>}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "14px",
  fontFamily: "inherit",
  boxSizing: "border-box",
  outline: "none",
  background: "#fff",
  color: "#333"
};

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", color: PRIMARY, cursor: "pointer", marginBottom: "20px", fontSize: "14px", fontWeight: 600, padding: 0, display: "flex", alignItems: "center", gap: "4px" }}>
      ← Back
    </button>
  );
}

function InfoModal({ title, children, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "10px", padding: "28px", maxWidth: "380px", width: "100%", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
        <h3 style={{ color: PRIMARY, marginBottom: "14px" }}>{title}</h3>
        <div style={{ color: "#444", fontSize: "14px", lineHeight: 1.6, marginBottom: "22px" }}>{children}</div>
        <button onClick={onClose} style={{ background: PRIMARY, color: "#fff", border: "none", padding: "9px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Close</button>
      </div>
    </div>
  );
}

function SectionBadge({ prefix, text }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch", marginBottom: "30px" }}>
      <span style={{ fontSize: "26px", fontWeight: 700, color: PRIMARY, marginRight: "14px", alignSelf: "center" }}>{prefix}</span>
      <span
        style={{
          background: SECONDARY,
          color: "#fff",
          fontWeight: 700,
          fontSize: "17px",
          padding: "13px 34px",
          display: "flex",
          alignItems: "center",
          clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 50%, 100% 100%, 14px 100%, 0% 50%)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function Stars() {
  return <span style={{ color: "#FFC107", fontSize: "13px", letterSpacing: "1px" }}>★★★★★</span>;
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "26px",
        left: "50%",
        transform: "translateX(-50%)",
        background: PRIMARY,
        color: "#fff",
        padding: "12px 22px",
        borderRadius: "24px",
        fontSize: "13px",
        fontWeight: 600,
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span>✓</span> {message}
    </div>
  );
}

function Header({ page, goto, cartCount, user }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 6%", background: BG_PEACH, flexWrap: "wrap", gap: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", position: "sticky", top: 0, zIndex: 99 }}>
      <div onClick={() => goto("home")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
        <span style={{ fontSize: "22px" }}>🏬</span>
        <span style={{ fontSize: "22px", fontWeight: 700, color: PRIMARY }}>GroCo</span>
      </div>
      <nav style={{ display: "flex", gap: "26px", fontWeight: 600, fontSize: "14px", flexWrap: "wrap", alignItems: "center" }}>
        {[["Home", "home"], ["About Us", "about"], ["Categories", "categories"], ["Contact", "contact"]].map(([label, id]) => (
          <button
            key={id}
            onClick={() => goto(id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: page === id ? SECONDARY : "#333", textDecoration: page === id ? "underline" : "none", fontFamily: "inherit", fontWeight: 600, fontSize: "14px" }}
          >
            {label}
          </button>
        ))}
      </nav>
      <div style={{ display: "flex", gap: "18px", alignItems: "center", fontSize: "18px" }}>
        <span onClick={() => goto("search")} style={{ cursor: "pointer", padding: "4px" }} title="Search">🔍</span>
        <div onClick={() => goto("cart")} style={{ position: "relative", cursor: "pointer", padding: "4px" }} title="Cart">
          <span>🛒</span>
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: "-2px", right: "-6px", background: SECONDARY, color: "#fff", fontSize: "10px", borderRadius: "50%", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
              {cartCount}
            </span>
          )}
        </div>
        <span onClick={() => goto(user ? "account" : "login")} style={{ cursor: "pointer", padding: "4px" }} title="Account">👤</span>
      </div>
    </header>
  );
}

function Footer({ goto }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function subscribe() {
    if (validateEmail(email)) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <footer style={{ background: BG_PEACH, padding: "50px 6% 24px", marginTop: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "30px", marginBottom: "40px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span style={{ fontSize: "20px" }}>🏬</span>
            <span style={{ fontSize: "18px", fontWeight: 700, color: PRIMARY }}>GroCo</span>
          </div>
          <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
            Farm-fresh groceries delivered straight to your door with trusted quality.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {["📘", "🐦", "📷", "💼"].map((icon, i) => (
              <span key={i} style={{ width: "32px", height: "32px", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", cursor: "pointer" }}>{icon}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: PRIMARY, fontSize: "15px", marginBottom: "14px" }}>Contact Info</h4>
          <p style={{ color: "#444", fontSize: "13px", marginBottom: "10px" }}>📞 +123-9887-0987</p>
          <p style={{ color: "#444", fontSize: "13px", marginBottom: "10px" }}>✉️ hello@groco.com</p>
          <p style={{ color: "#444", fontSize: "13px" }}>📍 Madurai, Tamil Nadu</p>
        </div>

        <div>
          <h4 style={{ color: PRIMARY, fontSize: "15px", marginBottom: "14px" }}>Quick Links</h4>
          {[["Home", "home"], ["Categories", "categories"], ["Contact", "contact"]].map(([label, id]) => (
            <p key={id} onClick={() => goto(id)} style={{ color: "#444", fontSize: "13px", marginBottom: "10px", cursor: "pointer" }}>{label}</p>
          ))}
        </div>

        <div>
          <h4 style={{ color: PRIMARY, fontSize: "15px", marginBottom: "14px" }}>Newsletter</h4>
          <p style={{ color: "#444", fontSize: "13px", marginBottom: "12px" }}>Subscribe for latest updates</p>
          {subscribed ? (
            <p style={{ color: PRIMARY, fontSize: "13px", fontWeight: 600 }}>Thanks for subscribing!</p>
          ) : (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" style={{ ...inputStyle, flex: "1 1 140px", background: "#fff" }} />
              <button onClick={subscribe} style={{ background: PRIMARY, color: "#fff", border: "none", padding: "0 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>Subscribe</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: "12px", color: "#666", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "18px" }}>
        © 2026 GroCo · Fresh groceries, delivered with care.
      </div>
    </footer>
  );
}

function ProductCard({ p, goto, addToCart, requireLoginThen }) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(p.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  function buyNow() {
    addToCart(p.id);
    requireLoginThen("checkout");
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "18px", textAlign: "center", display: "flex", flexDirection: "column", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
      <img
        src={p.img}
        alt={p.name}
        onClick={() => goto("product", p.id)}
        style={{ width: "100%", height: "130px", objectFit: "contain", marginBottom: "12px", cursor: "pointer" }}
        onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
      />
      <div style={{ fontSize: "56px", marginBottom: "12px", display: "none" }}>{p.emoji}</div>
      <h4 onClick={() => goto("product", p.id)} style={{ margin: "0 0 6px", fontSize: "15px", cursor: "pointer", color: PRIMARY, fontWeight: 700 }}>{p.name}</h4>
      <p style={{ color: "#666", fontSize: "12px", marginBottom: "6px" }}>{currency(p.price)} – {currency(p.price + 2)}</p>
      <div style={{ marginBottom: "12px" }}><Stars /></div>
      <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
        <button
          onClick={handleAdd}
          style={{
            flex: 1,
            background: added ? PRIMARY : "#fff",
            color: added ? "#fff" : PRIMARY,
            border: `1px solid ${PRIMARY}`,
            padding: "8px 6px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            transition: "all 0.15s ease",
            transform: added ? "scale(1.04)" : "scale(1)",
          }}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
        <button onClick={buyNow} style={{ flex: 1, background: SECONDARY, color: "#fff", border: "none", padding: "8px 6px", borderRadius: "5px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

function HomePage({ goto, addToCart, requireLoginThen }) {
  const [modal, setModal] = useState(null);

  const FEATURES = [
    { key: "organic", emoji: "🥬", title: "Fresh And Organic", desc: "Sourced daily from local organic farms.", onClick: () => goto("products") },
    { key: "delivery", emoji: "🚚", title: "Free Delivery", desc: "Free delivery on all orders above $30.", onClick: () => setModal("delivery") },
    { key: "payment", emoji: "💳", title: "Easy Payment", desc: "Secure Card, UPI or Cash on Delivery.", onClick: () => setModal("payment") },
  ];

  const HOME_CATS = [
    { name: "Fresh Vegetables", filter: "Vegetables", emoji: "🥕", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80" },
    { name: "Dairy Products", filter: "Dairy", emoji: "🥛", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80" },
    { name: "Fresh Fruits", filter: "Fruits", emoji: "🍎", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80" },
  ];

  const REVIEWS = [
    { name: "Priya N.", quote: "The vegetables actually stay fresh for a whole week. Highly recommend!", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Marcus D.", quote: "Super fast delivery and great prices compared to local supermarkets.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Elena V.", quote: "Easy to order and excellent customer service. Very satisfied!", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  ];

  const BLOG = [
    {
      title: "Fresh And Organic Vegetables And Fruits",
      img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80",
      body: "Choosing organic produce means fewer chemicals on your table and better flavor. Our farms harvest every morning so everything reaches your kitchen crisp, nutritious, and full of natural taste.",
    },
    {
      title: "Eating Seasonally For Better Health",
      img: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80",
      body: "Seasonal eating ensures you get fruits and vegetables at their absolute nutritional peak. We rotate our catalog with local harvesting cycles to bring you peak quality produce year-round.",
    },
    {
      title: "Essential Kitchen Staples Delivered",
      img: "https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=400&q=80",
      body: "Stock up on onions, tomatoes, greens, and everyday dairy items with just a few clicks. Fresh cooking starts with reliable ingredients delivered right to your doorstep.",
    },
  ];
  const [openBlog, setOpenBlog] = useState(null);

  return (
    <div>
      {/* Hero Section - Increased image width and height significantly */}
      <section
        style={{
          background: "#ffffff",
          padding: "70px 6% 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "50px",
          minHeight: "560px",
        }}
      >
        <div style={{ flex: "1.5 1 500px", display: "flex", justifyContent: "center", minWidth: "320px" }}>
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80"
            alt="Fresh vegetables and fruits"
            style={{ width: "100%", maxWidth: "660px", height: "auto", maxHeight: "480px", borderRadius: "16px", objectFit: "cover", boxShadow: "0 16px 36px rgba(0,0,0,0.1)" }}
          />
        </div>
        <div style={{ flex: "1 1 380px", minWidth: "280px", textAlign: "left" }}>
          <h1
            style={{
              fontSize: "clamp(30px, 3.8vw, 44px)",
              color: "#333",
              marginBottom: "20px",
              lineHeight: 1.25,
              fontWeight: 700,
            }}
          >
            Fresh And <span style={{ color: SECONDARY }}>Organic</span> Products For You
          </h1>
          <p
            style={{
              color: "#777",
              marginBottom: "32px",
              lineHeight: 1.7,
              fontSize: "15px",
              maxWidth: "440px",
            }}
          >
            Lorem ipsum Dolor,sit Amet Consectetur Adipisicing Elite. Earum Aials Volupats Labore Est.Dolorum Tenetur!
          </p>
          <button
            onClick={() => goto("products")}
            style={{
              background: PRIMARY,
              color: "#fff",
              border: `1px solid ${PRIMARY}`,
              padding: "13px 36px",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Our Features */}
      <section style={{ padding: "50px 6%", background: BG_SOFT }}>
        <SectionBadge prefix="Our" text="Features" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px" }}>
          {FEATURES.map((f) => (
            <div
              key={f.key}
              onClick={f.onClick}
              style={{ textAlign: "center", padding: "30px 20px", border: "1px solid #e0e0e0", background: "#fff", borderRadius: "8px", cursor: "pointer", transition: "box-shadow .2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div style={{ fontSize: "48px", marginBottom: "14px" }}>{f.emoji}</div>
              <h3 style={{ color: PRIMARY, fontSize: "16px", marginBottom: "8px" }}>{f.title}</h3>
              <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our products */}
      <section style={{ padding: "50px 6%", background: BG_SOFT }}>
        <SectionBadge prefix="Our" text="products" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" }}>
          {PRODUCTS.slice(0, 6).map((p) => (
            <ProductCard key={p.id} p={p} goto={goto} addToCart={addToCart} requireLoginThen={requireLoginThen} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "35px" }}>
          <button onClick={() => goto("products")} style={{ background: "#fff", border: `1px solid ${PRIMARY}`, color: PRIMARY, padding: "10px 28px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>
            View All Products
          </button>
        </div>
      </section>

      {/* Our Categories */}
      <section style={{ padding: "50px 6%", background: BG_SOFT }}>
        <SectionBadge prefix="Our" text="Categories" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "20px" }}>
          {HOME_CATS.map((c) => (
            <div key={c.name} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px", textAlign: "center" }}>
              <img src={c.img} alt={c.name} style={{ width: "100%", height: "130px", objectFit: "cover", borderRadius: "6px", marginBottom: "14px" }} />
              <h3 style={{ color: PRIMARY, fontSize: "16px", marginBottom: "6px" }}>{c.name}</h3>
              <p style={{ color: "#666", fontSize: "12px", marginBottom: "14px" }}>Upto 45% Off</p>
              <button onClick={() => goto("products", c.filter)} style={{ background: "#fff", border: `1px solid ${PRIMARY}`, color: PRIMARY, padding: "8px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                Show More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Customer's Review */}
      <section style={{ padding: "50px 6%", background: BG_SOFT }}>
        <SectionBadge prefix="Customer's" text="Review" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "20px" }}>
          {REVIEWS.map((r) => (
            <div key={r.name} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "26px 22px", textAlign: "center" }}>
              <img src={r.avatar} alt={r.name} style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", marginBottom: "16px" }} />
              <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.6, marginBottom: "14px" }}>"{r.quote}"</p>
              <p style={{ color: PRIMARY, fontWeight: 700, fontSize: "14px", marginBottom: "6px" }}>{r.name}</p>
              <Stars />
            </div>
          ))}
        </div>
      </section>

      {/* Our Blog */}
      <section style={{ padding: "50px 6%", background: BG_SOFT }}>
        <SectionBadge prefix="Our" text="Blog" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "20px" }}>
          {BLOG.map((b, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "100%", aspectRatio: "16 / 9", overflow: "hidden" }}>
                <img src={b.img} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "16px 18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", gap: "14px", fontSize: "11px", color: "#888", marginBottom: "10px", flexWrap: "wrap" }}>
                  <span>👤 By Admin</span>
                  <span>📅 7th Sep, 2026</span>
                </div>
                <h4 style={{ color: PRIMARY, fontSize: "15px", marginBottom: "14px", lineHeight: 1.4, flex: 1 }}>{b.title}</h4>
                <button onClick={() => setOpenBlog(b)} style={{ alignSelf: "flex-start", background: "#fff", border: `1px solid ${PRIMARY}`, color: PRIMARY, padding: "7px 18px", borderRadius: "5px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {modal === "delivery" && (
        <InfoModal title="Free Delivery" onClose={() => setModal(null)}>
          All orders above $30 qualify for free express delivery within 24 hours. A standard $3.99 fee applies below $30.
        </InfoModal>
      )}
      {modal === "payment" && (
        <InfoModal title="Easy Payment" onClose={() => setModal(null)}>
          We accept Credit/Debit Cards, UPI, and Cash on Delivery with secure verification protocols.
        </InfoModal>
      )}
      {openBlog && (
        <InfoModal title={openBlog.title} onClose={() => setOpenBlog(null)}>
          <img src={openBlog.img} alt={openBlog.title} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px", marginBottom: "16px" }} />
          {openBlog.body}
        </InfoModal>
      )}
    </div>
  );
}

function ProductsPage({ goto, addToCart, requireLoginThen, initialCategory, goBack }) {
  const [cat, setCat] = useState(initialCategory || "All");
  const list = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  return (
    <div style={{ padding: "40px 6%", background: BG_SOFT, minHeight: "60vh" }}>
      <BackButton onClick={goBack} />
      <h2 style={{ color: PRIMARY, marginBottom: "20px" }}>All Products</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "26px", flexWrap: "wrap" }}>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)} style={{ padding: "8px 18px", borderRadius: "20px", border: `1px solid ${PRIMARY}`, background: cat === c ? PRIMARY : "#fff", color: cat === c ? "#fff" : PRIMARY, cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" }}>
        {list.map((p) => <ProductCard key={p.id} p={p} goto={goto} addToCart={addToCart} requireLoginThen={requireLoginThen} />)}
      </div>
    </div>
  );
}

function CategoriesPage({ goto, goBack }) {
  const list = PRODUCTS.map((p) => ({ ...p }));
  return (
    <div style={{ padding: "40px 6%", background: BG_SOFT, minHeight: "60vh" }}>
      <BackButton onClick={goBack} />
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 220px", background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "24px", height: "fit-content" }}>
          <h2 style={{ color: PRIMARY, marginBottom: "10px", fontSize: "20px" }}>Categories</h2>
          <div style={{ borderBottom: `2px solid ${SECONDARY}`, width: "40px", marginBottom: "15px" }} />
          <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.5 }}>Explore our fresh catalog ranging from farm vegetables to fresh dairy.</p>
        </div>
        <div style={{ flex: "1 1 500px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" }}>
            {list.map((p) => (
              <div key={p.id} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "18px", textAlign: "left", position: "relative" }}>
                <span style={{ position: "absolute", top: "14px", right: "14px", color: SECONDARY, cursor: "pointer" }}>♥</span>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: "110px", objectFit: "contain", borderRadius: "4px", marginBottom: "12px", cursor: "pointer" }} onClick={() => goto("product", p.id)} />
                <p style={{ color: PRIMARY, fontWeight: 700, marginBottom: "4px" }}>{currency(p.price)}</p>
                <h4 onClick={() => goto("product", p.id)} style={{ margin: "0 0 10px", fontSize: "14px", color: "#333", cursor: "pointer" }}>{p.name}</h4>
                <button onClick={() => goto("product", p.id)} style={{ background: SECONDARY, color: "#fff", border: "none", padding: "7px 16px", borderRadius: "5px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>Buy Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailPage({ id, goto, addToCart, requireLoginThen, goBack }) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return (
    <div style={{ padding: "60px", textAlign: "center" }}>
      <BackButton onClick={goBack} />
      <p>Product not found.</p>
    </div>
  );
  return (
    <div style={{ padding: "40px 6%", minHeight: "60vh", background: BG_SOFT }}>
      <BackButton onClick={goBack} />
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", background: "#fff", padding: "30px", borderRadius: "8px", border: "1px solid #e0e0e0", alignItems: "center" }}>
        <img src={p.img} alt={p.name} style={{ width: "100%", maxWidth: "300px", height: "260px", objectFit: "contain", borderRadius: "8px" }} />
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#333", marginBottom: "6px" }}>{p.name}</h2>
          <p style={{ color: "#666", marginBottom: "12px", fontSize: "13px" }}>Unit: {p.unit}</p>
          <p style={{ fontSize: "24px", color: PRIMARY, fontWeight: 700, marginBottom: "16px" }}>{currency(p.price)}</p>
          <p style={{ color: "#555", marginBottom: "24px", lineHeight: 1.6, fontSize: "14px" }}>{p.desc}</p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => addToCart(p.id)} style={{ background: "#fff", color: PRIMARY, border: `1px solid ${PRIMARY}`, padding: "12px 24px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Add to Cart</button>
            <button onClick={() => { addToCart(p.id); requireLoginThen("checkout"); }} style={{ background: SECONDARY, color: "#fff", border: "none", padding: "12px 24px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchPage({ goto, addToCart, requireLoginThen, goBack }) {
  const [q, setQ] = useState("");
  const results = q.trim() ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <div style={{ padding: "40px 6%", minHeight: "60vh", background: BG_SOFT }}>
      <BackButton onClick={goBack} />
      <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." style={{ ...inputStyle, marginBottom: "24px", maxWidth: "400px" }} />
      {q.trim() === "" && <p style={{ color: "#666" }}>Start typing to search products...</p>}
      {q.trim() !== "" && results.length === 0 && <p style={{ color: "#666" }}>No products found for "{q}".</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" }}>
        {results.map((p) => <ProductCard key={p.id} p={p} goto={goto} addToCart={addToCart} requireLoginThen={requireLoginThen} />)}
      </div>
    </div>
  );
}

function CartPage({ cart, changeQty, goto, requireLoginThen, goBack }) {
  const items = Object.entries(cart).map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{ padding: "40px 6%", minHeight: "60vh", background: BG_SOFT }}>
      <BackButton onClick={goBack} />
      <h2 style={{ color: PRIMARY, marginBottom: "24px" }}>Your Cart</h2>
      {items.length === 0 ? (
        <div style={{ background: "#fff", padding: "40px", borderRadius: "8px", textAlign: "center", border: "1px solid #e0e0e0" }}>
          <p style={{ color: "#666", marginBottom: "16px" }}>Your cart is empty.</p>
          <button onClick={() => goto("products")} style={{ background: PRIMARY, color: "#fff", border: "none", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Explore Products</button>
        </div>
      ) : (
        <div style={{ background: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #e0e0e0", maxWidth: "700px" }}>
          {items.map((i) => (
            <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #eee", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <img src={i.img} alt={i.name} style={{ width: "50px", height: "50px", objectFit: "contain", borderRadius: "6px" }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>{i.name}</div>
                  <div style={{ color: "#666", fontSize: "13px" }}>{currency(i.price)} · {i.unit}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button onClick={() => changeQty(i.id, -1)} style={qtyBtn}>−</button>
                  <span style={{ fontWeight: 600, fontSize: "14px" }}>{i.qty}</span>
                  <button onClick={() => changeQty(i.id, 1)} style={qtyBtn}>+</button>
                </div>
                <span style={{ fontWeight: 700, fontSize: "14px", minWidth: "60px", textAlign: "right" }}>{currency(i.price * i.qty)}</span>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0 24px", fontSize: "18px", fontWeight: 700 }}>
            <span>Total</span><span>{currency(total)}</span>
          </div>
          <button onClick={() => requireLoginThen("checkout")} style={{ width: "100%", background: SECONDARY, color: "#fff", border: "none", padding: "13px 30px", borderRadius: "6px", fontWeight: 700, cursor: "pointer", fontSize: "15px" }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

const qtyBtn = { width: "28px", height: "28px", borderRadius: "50%", border: `1px solid ${PRIMARY}`, background: "#fff", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" };

function LoginPage({ goto, users, login, pendingRedirect, clearPendingRedirect, justSignedUpEmail, goBack }) {
  const [email, setEmail] = useState(justSignedUpEmail || "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!validateEmail(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    if (Object.keys(errs).length) return setErrors(errs);

    const found = users.find((u) => u.email === email);
    if (!found || found.password !== password) {
      return setErrors({ form: "Invalid email or password." });
    }
    login(found);
    const target = pendingRedirect || "home";
    clearPendingRedirect();
    goto(target);
  }

  return (
    <div style={{ padding: "50px 6%", display: "flex", flexDirection: "column", alignItems: "center", background: BG_SOFT, minHeight: "60vh" }}>
      <div style={{ width: "100%", maxWidth: "380px" }}>
        <BackButton onClick={goBack} />
      </div>
      <form onSubmit={submit} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "32px", width: "100%", maxWidth: "380px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <h2 style={{ color: PRIMARY, marginBottom: "20px" }}>Log In</h2>
        {justSignedUpEmail && <p style={{ color: PRIMARY, fontSize: "13px", marginBottom: "14px" }}>Account created! Please log in to continue.</p>}
        {errors.form && <p style={{ color: "#d32f2f", fontSize: "13px", marginBottom: "14px" }}>{errors.form}</p>}
        <Field label="Email" error={errors.email}>
          <input style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
        </Field>
        <Field label="Password" error={errors.password}>
          <input style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />
        </Field>
        <button type="submit" style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", padding: "12px", borderRadius: "6px", fontWeight: 700, cursor: "pointer", marginTop: "6px" }}>Log In</button>
        <p style={{ fontSize: "13px", marginTop: "16px", textAlign: "center", color: "#666" }}>
          No account? <span onClick={() => goto("signup")} style={{ color: SECONDARY, cursor: "pointer", fontWeight: 600 }}>Sign up</span>
        </p>
      </form>
    </div>
  );
}

function SignupPage({ goto, users, signup, goBack }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!validateEmail(form.email)) errs.email = "Enter a valid email address.";
    else if (users.some((u) => u.email === form.email)) errs.email = "An account with this email already exists.";
    if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (form.confirm !== form.password) errs.confirm = "Passwords do not match.";
    if (Object.keys(errs).length) return setErrors(errs);

    signup(form);
    goto("login");
  }

  return (
    <div style={{ padding: "50px 6%", display: "flex", flexDirection: "column", alignItems: "center", background: BG_SOFT, minHeight: "60vh" }}>
      <div style={{ width: "100%", maxWidth: "380px" }}>
        <BackButton onClick={goBack} />
      </div>
      <form onSubmit={submit} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "32px", width: "100%", maxWidth: "380px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <h2 style={{ color: PRIMARY, marginBottom: "20px" }}>Sign Up</h2>
        <Field label="Full Name" error={errors.name}>
          <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
        </Field>
        <Field label="Email" error={errors.email}>
          <input style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="name@example.com" />
        </Field>
        <Field label="Password" error={errors.password}>
          <input style={inputStyle} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" placeholder="At least 6 characters" />
        </Field>
        <Field label="Confirm Password" error={errors.confirm}>
          <input style={inputStyle} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} type="password" placeholder="Re-enter password" />
        </Field>
        <button type="submit" style={{ width: "100%", background: PRIMARY, color: "#fff", border: "none", padding: "12px", borderRadius: "6px", fontWeight: 700, cursor: "pointer", marginTop: "6px" }}>Create Account</button>
        <p style={{ fontSize: "13px", marginTop: "16px", textAlign: "center", color: "#666" }}>
          Already have an account? <span onClick={() => goto("login")} style={{ color: SECONDARY, cursor: "pointer", fontWeight: 600 }}>Log in</span>
        </p>
      </form>
    </div>
  );
}

function AccountPage({ user, logout, goto, goBack, orders }) {
  return (
    <div style={{ padding: "50px 6%", textAlign: "center", background: BG_SOFT, minHeight: "60vh" }}>
      <div style={{ textAlign: "left", maxWidth: "450px", margin: "0 auto" }}>
        <BackButton onClick={goBack} />
      </div>
      <div style={{ background: "#fff", padding: "35px", borderRadius: "8px", maxWidth: "450px", margin: "0 auto", border: "1px solid #e0e0e0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "left" }}>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <div style={{ fontSize: "50px", marginBottom: "6px" }}>👤</div>
          <h2 style={{ color: PRIMARY, marginBottom: "4px" }}>Hi, {user.name}</h2>
          <p style={{ color: "#666", fontSize: "14px" }}>{user.email}</p>
        </div>

        <div style={{ borderTop: "1px solid #eee", marginTop: "20px", paddingTop: "20px" }}>
          <h4 style={{ color: PRIMARY, marginBottom: "12px" }}>Your Orders ({orders.length})</h4>
          {orders.length === 0 ? (
            <p style={{ color: "#888", fontSize: "13px" }}>No orders placed yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "200px", overflowY: "auto" }}>
              {orders.map((o) => (
                <div key={o.id} style={{ padding: "10px", background: BG_SOFT, borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                  <div>
                    <strong>#{o.id}</strong>
                    <div style={{ color: "#666", fontSize: "12px" }}>{o.items.length} items · {currency(o.total)}</div>
                  </div>
                  <button onClick={() => goto("track", o.id)} style={{ background: PRIMARY, color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", fontSize: "11px", cursor: "pointer", fontWeight: 600 }}>Track</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button
            onClick={() => {
              logout();
              goto("login");
            }}
            style={{ background: SECONDARY, color: "#fff", border: "none", padding: "10px 26px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutPage({ cart, goto, placeOrder, goBack }) {
  const items = Object.entries(cart).map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const [address, setAddress] = useState({ name: "", phone: "", line1: "", city: "", pincode: "" });
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [errors, setErrors] = useState({});

  if (items.length === 0) {
    return (
      <div style={{ padding: "60px 6%", textAlign: "center", background: BG_SOFT, minHeight: "60vh" }}>
        <BackButton onClick={goBack} />
        <p style={{ color: "#666", marginBottom: "16px" }}>Your cart is empty — nothing to check out.</p>
        <button onClick={() => goto("products")} style={{ background: PRIMARY, color: "#fff", border: "none", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Browse products</button>
      </div>
    );
  }

  function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!address.name.trim()) errs.name = "Name is required.";
    if (!validatePhone(address.phone)) errs.phone = "Enter a valid 10-digit phone number.";
    if (!address.line1.trim()) errs.line1 = "Address is required.";
    if (!address.city.trim()) errs.city = "City is required.";
    if (!validatePincode(address.pincode)) errs.pincode = "Enter a valid 6-digit pincode.";

    if (method === "card") {
      if (!validateCard(card.number)) errs.cardNumber = "Enter a valid 16-digit card number.";
      if (!validateExpiry(card.expiry)) errs.expiry = "Enter a valid future expiry (MM/YY).";
      if (!validateCVV(card.cvv)) errs.cvv = "Enter a valid 3-digit CVV.";
    } else if (method === "upi") {
      if (!validateUPI(upi)) errs.upi = "Enter a valid UPI ID (e.g. name@bank).";
    }

    if (Object.keys(errs).length) return setErrors(errs);
    const newOrderId = placeOrder(items, total);
    goto("orderSuccess", newOrderId);
  }

  return (
    <div style={{ padding: "40px 6%", minHeight: "60vh", background: BG_SOFT }}>
      <BackButton onClick={goBack} />
      <h2 style={{ color: PRIMARY, marginBottom: "24px" }}>Checkout</h2>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <form onSubmit={submit} style={{ flex: "1 1 340px", maxWidth: "460px", background: "#fff", padding: "28px", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "14px", color: "#333" }}>Shipping Address</h3>
          <Field label="Full Name" error={errors.name}>
            <input style={inputStyle} value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} placeholder="John Doe" />
          </Field>
          <Field label="Phone Number" error={errors.phone}>
            <input style={inputStyle} value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} maxLength={10} placeholder="10-digit mobile number" />
          </Field>
          <Field label="Address" error={errors.line1}>
            <input style={inputStyle} value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} placeholder="Street address / apartment" />
          </Field>
          <Field label="City" error={errors.city}>
            <input style={inputStyle} value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="City name" />
          </Field>
          <Field label="Pincode" error={errors.pincode}>
            <input style={inputStyle} value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} maxLength={6} placeholder="6-digit pincode" />
          </Field>

          <h3 style={{ fontSize: "16px", margin: "24px 0 14px", color: "#333" }}>Payment Method</h3>
          <div style={{ display: "flex", gap: "10px", marginBottom: "18px", flexWrap: "wrap" }}>
            {[["card", "Card"], ["upi", "UPI"], ["cod", "Cash on Delivery"]].map(([val, label]) => (
              <button type="button" key={val} onClick={() => setMethod(val)} style={{ padding: "8px 14px", borderRadius: "6px", border: `1px solid ${PRIMARY}`, background: method === val ? PRIMARY : "#fff", color: method === val ? "#fff" : PRIMARY, cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                {label}
              </button>
            ))}
          </div>

          {method === "card" && (
            <div>
              <Field label="Card Number" error={errors.cardNumber}>
                <input style={inputStyle} placeholder="1234567890123456" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} maxLength={16} />
              </Field>
              <div style={{ display: "flex", gap: "14px" }}>
                <div style={{ flex: 1 }}>
                  <Field label="Expiry (MM/YY)" error={errors.expiry}>
                    <input style={inputStyle} placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} maxLength={5} />
                  </Field>
                </div>
                <div style={{ flex: 1 }}>
                  <Field label="CVV" error={errors.cvv}>
                    <input style={inputStyle} placeholder="123" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} maxLength={3} type="password" />
                  </Field>
                </div>
              </div>
            </div>
          )}
          {method === "upi" && (
            <Field label="UPI ID" error={errors.upi}>
              <input style={inputStyle} placeholder="name@bank" value={upi} onChange={(e) => setUpi(e.target.value)} />
            </Field>
          )}
          {method === "cod" && <p style={{ color: "#666", fontSize: "13px", marginBottom: "16px" }}>Pay in cash when your order arrives.</p>}

          <button type="submit" style={{ width: "100%", background: SECONDARY, color: "#fff", border: "none", padding: "13px", borderRadius: "6px", fontWeight: 700, cursor: "pointer", marginTop: "10px", fontSize: "15px" }}>
            Place Order — {currency(total)}
          </button>
        </form>

        <div style={{ flex: "1 1 260px", maxWidth: "320px", background: "#fff", borderRadius: "8px", padding: "22px", border: "1px solid #e0e0e0", height: "fit-content" }}>
          <h3 style={{ fontSize: "15px", marginBottom: "14px", color: "#333" }}>Order Summary</h3>
          {items.map((i) => (
            <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "10px", color: "#555" }}>
              <span>{i.name} × {i.qty}</span><span>{currency(i.price * i.qty)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #eee", marginTop: "14px", paddingTop: "14px", display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "15px" }}>
            <span>Total</span><span>{currency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSuccessPage({ goto, orderId }) {
  return (
    <div style={{ padding: "70px 6%", textAlign: "center", background: BG_SOFT, minHeight: "60vh" }}>
      <div style={{ fontSize: "50px", marginBottom: "16px" }}>✅</div>
      <h2 style={{ color: PRIMARY, marginBottom: "10px" }}>Order Placed Successfully!</h2>
      <p style={{ color: "#666", marginBottom: "24px", fontSize: "14px" }}>Your order <strong>#{orderId}</strong> has been confirmed and is on its way.</p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button onClick={() => goto("track", orderId)} style={{ background: SECONDARY, color: "#fff", border: "none", padding: "10px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Track Order</button>
        <button onClick={() => goto("home")} style={{ background: PRIMARY, color: "#fff", border: "none", padding: "10px 22px", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Back to Home</button>
      </div>
    </div>
  );
}

function OrderTrackPage({ orderId, orders, goto, goBack }) {
  const order = orders.find((o) => o.id === orderId) || orders[orders.length - 1];

  return (
    <div style={{ padding: "40px 6%", minHeight: "60vh", background: BG_SOFT }}>
      <BackButton onClick={goBack} />
      <div style={{ background: "#fff", padding: "30px", borderRadius: "8px", border: "1px solid #e0e0e0", maxWidth: "600px", margin: "0 auto", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <h2 style={{ color: PRIMARY, marginBottom: "10px" }}>Track Order #{order ? order.id : orderId}</h2>
        <p style={{ color: "#666", fontSize: "13px", marginBottom: "20px" }}>Status: <span style={{ color: SECONDARY, fontWeight: 700 }}>Out for Delivery (~2 km away)</span></p>

        <div style={{ marginBottom: "24px", borderRadius: "8px", overflow: "hidden", border: "1px solid #ddd", position: "relative" }}>
          <div style={{ width: "100%", height: "220px", position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80"
              alt="Delivery route map"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)",
              }}
            />
            <span style={{ position: "absolute", top: "16px", left: "16px", fontSize: "26px" }}>📍</span>
            <span style={{ position: "absolute", bottom: "40px", right: "24px", fontSize: "30px" }}>🛵</span>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <p style={{ fontSize: "13px", color: "#fff", fontWeight: 600, margin: 0, textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>
                Delivery agent is 2.1 km away from your location
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: PRIMARY,
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-block",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.25)"
                }}
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>

        {order && (
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}>Ordered Items:</h4>
            {order.items.map((i, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#555", marginBottom: "6px" }}>
                <span>{i.name} × {i.qty}</span>
                <span>{currency(i.price * i.qty)}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #eee", marginTop: "10px", paddingTop: "10px", display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "14px" }}>
              <span>Total Paid</span>
              <span>{currency(order.total)}</span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderLeft: `2px solid ${PRIMARY}`, paddingLeft: "20px", marginLeft: "10px" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "14px", color: PRIMARY }}>Order Placed</div>
            <div style={{ color: "#888", fontSize: "12px" }}>We have received your order successfully.</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "14px", color: PRIMARY }}>Packed & Dispatched</div>
            <div style={{ color: "#888", fontSize: "12px" }}>Items are fresh and packed securely.</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "14px", color: SECONDARY }}>Out for Delivery (~2 km away) - Current</div>
            <div style={{ color: "#888", fontSize: "12px" }}>Delivery partner is heading straight to your address.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage({ goBack }) {
  return (
    <div style={{ padding: "50px 6%", minHeight: "60vh", background: BG_SOFT }}>
      <BackButton onClick={goBack} />
      <div style={{ background: "#fff", padding: "35px", borderRadius: "8px", border: "1px solid #e0e0e0", maxWidth: "600px" }}>
        <h2 style={{ color: PRIMARY, marginBottom: "16px" }}>About Us</h2>
        <p style={{ color: "#555", lineHeight: 1.7, fontSize: "14px" }}>
          GroCo brings farm-fresh vegetables, fruits, and dairy straight to your door. We partner with
          local growers so every order arrives fresher, cheaper, and with fewer stops in between. Our mission is to make healthy eating effortless and accessible.
        </p>
      </div>
    </div>
  );
}

function ContactPage({ goBack }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function submitContact(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!validateEmail(form.email)) errs.email = "Enter a valid email address.";
    if (!form.message.trim()) errs.message = "Message is required.";
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div style={{ padding: "40px 6%", minHeight: "60vh", background: BG_SOFT }}>
      <BackButton onClick={goBack} />
      <h2 style={{ textAlign: "center", color: PRIMARY, marginBottom: "10px" }}>Contact Us</h2>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "34px", fontSize: "14px" }}>Questions about an order or delivery? Send us a message.</p>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 260px", maxWidth: "300px", background: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
          <p style={{ marginBottom: "14px", fontSize: "14px", color: "#555" }}>📍 12 Market Street, Madurai, TN</p>
          <p style={{ marginBottom: "14px", fontSize: "14px", color: "#555" }}>📞 +123-9887-0987</p>
          <p style={{ marginBottom: "14px", fontSize: "14px", color: "#555" }}>✉️ hello@groco.com</p>
          <p style={{ fontSize: "14px", color: "#555" }}>🕐 Mon–Sat, 8am – 8pm</p>
        </div>
        <form onSubmit={submitContact} style={{ flex: "1 1 300px", maxWidth: "400px", background: "#fff", padding: "28px", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
          {sent && <p style={{ color: PRIMARY, fontSize: "13px", marginBottom: "14px", fontWeight: 600 }}>Thanks! We'll get back to you shortly.</p>}
          <Field label="Name" error={errors.name}>
            <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" />
          </Field>
          <Field label="Email" error={errors.email}>
            <input style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="name@example.com" />
          </Field>
          <Field label="Message" error={errors.message}>
            <textarea style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Type your message here..." />
          </Field>
          <button type="submit" style={{ background: PRIMARY, color: "#fff", border: "none", padding: "11px 28px", borderRadius: "6px", cursor: "pointer", fontWeight: 600, width: "100%" }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [history, setHistory] = useState([]);
  const [productId, setProductId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [cart, setCart] = useState({});
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [pendingRedirect, setPendingRedirect] = useState(null);
  const [signupEmail, setSignupEmail] = useState(null);
  const [toast, setToast] = useState(null);

  function goto(p, extra) {
    setHistory((h) => [...h, page]);
    if (p === "product") setProductId(extra);
    if (p === "products") setCategoryFilter(extra || "All");
    if (p === "track") setCurrentOrderId(extra);
    if (p === "orderSuccess") setCurrentOrderId(extra);
    setPage(p);
    window.scrollTo(0, 0);
  }

  function goBack() {
    setHistory((h) => {
      if (h.length === 0) {
        setPage("home");
        return h;
      }
      const prev = h[h.length - 1];
      setPage(prev);
      return h.slice(0, -1);
    });
    window.scrollTo(0, 0);
  }

  function requireLoginThen(target) {
    if (!user) {
      setPendingRedirect(target);
      goto("login");
    } else {
      goto(target);
    }
  }

  function addToCart(id) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) {
      setToast(`${product.name} added to cart`);
      window.clearTimeout(addToCart._t);
      addToCart._t = window.setTimeout(() => setToast(null), 2000);
    }
  }

  function changeQty(id, delta) {
    setCart((c) => {
      const next = { ...c };
      const qty = (next[id] || 0) + delta;
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }

  function signup(form) {
    const newUser = { name: form.name, email: form.email, password: form.password };
    setUsers((u) => [...u, newUser]);
    setSignupEmail(form.email);
  }

  function login(u) {
    setUser(u);
    setSignupEmail(null);
  }

  function logout() {
    setUser(null);
    setPendingRedirect(null);
  }

  function orderPlaced(items, total) {
    const newId = Math.floor(100000 + Math.random() * 900000);
    const newOrder = { id: newId, items, total, date: new Date().toLocaleDateString() };
    setOrders((prev) => [newOrder, ...prev]);
    setCart({});
    return newId;
  }

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  let body;
  if (page === "home") body = <HomePage goto={goto} addToCart={addToCart} requireLoginThen={requireLoginThen} />;
  else if (page === "products") body = <ProductsPage goto={goto} addToCart={addToCart} requireLoginThen={requireLoginThen} initialCategory={categoryFilter} goBack={goBack} />;
  else if (page === "categories") body = <CategoriesPage goto={goto} goBack={goBack} />;
  else if (page === "about") body = <AboutPage goBack={goBack} />;
  else if (page === "product") body = <ProductDetailPage id={productId} goto={goto} addToCart={addToCart} requireLoginThen={requireLoginThen} goBack={goBack} />;
  else if (page === "search") body = <SearchPage goto={goto} addToCart={addToCart} requireLoginThen={requireLoginThen} goBack={goBack} />;
  else if (page === "cart") body = <CartPage cart={cart} changeQty={changeQty} goto={goto} requireLoginThen={requireLoginThen} goBack={goBack} />;
  else if (page === "login") body = <LoginPage goto={goto} users={users} login={login} pendingRedirect={pendingRedirect} clearPendingRedirect={() => setPendingRedirect(null)} justSignedUpEmail={signupEmail} goBack={goBack} />;
  else if (page === "signup") body = <SignupPage goto={goto} users={users} signup={signup} goBack={goBack} />;
  else if (page === "account") body = user ? <AccountPage user={user} logout={logout} goto={goto} goBack={goBack} orders={orders} /> : <LoginPage goto={goto} users={users} login={login} pendingRedirect={pendingRedirect} clearPendingRedirect={() => setPendingRedirect(null)} justSignedUpEmail={signupEmail} goBack={goBack} />;
  else if (page === "checkout") body = user ? <CheckoutPage cart={cart} goto={goto} placeOrder={orderPlaced} goBack={goBack} /> : <LoginPage goto={goto} users={users} login={login} pendingRedirect={"checkout"} clearPendingRedirect={() => setPendingRedirect(null)} justSignedUpEmail={signupEmail} goBack={goBack} />;
  else if (page === "orderSuccess") body = <OrderSuccessPage goto={goto} orderId={currentOrderId} />;
  else if (page === "track") body = <OrderTrackPage orderId={currentOrderId} orders={orders} goto={goto} goBack={goBack} />;
  else if (page === "contact") body = <ContactPage goBack={goBack} />;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: "#333", background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header page={page} goto={goto} cartCount={cartCount} user={user} />
      <div style={{ flex: 1 }}>{body}</div>
      <Footer goto={goto} />
      <Toast message={toast} />
    </div>
  );
}
