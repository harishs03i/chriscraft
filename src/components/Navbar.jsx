import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../Store/ThemeContext.jsx";
import { useStore } from "../Store/StoreContext.jsx";
import { Search, Heart, MapPin, X } from "lucide-react"; // icons

// ✅ Import logo properly (make sure file is in src/assets/logo.jpg)
import logo from "../assets/logo.jpg";

// Drawer Component
function Drawer({ open, onClose, side = "right", children }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`absolute bg-white w-full md:w-[420px] h-full shadow-2xl rounded-l-2xl transition-transform duration-300 ease-in-out
        ${
          side === "right"
            ? open
              ? "right-0 translate-x-0"
              : "right-0 translate-x-full"
            : open
            ? "left-0 translate-x-0"
            : "-translate-x-full"
        } 
        p-5`}
      >
        {children}
      </div>
    </div>
  );
}

// Top Dropdown
function TopDropdown({ open, onClose, children }) {
  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white backdrop-blur-sm border-b shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          {children}
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { scrolled } = useTheme();
  const { products, favourites, removeFavourite } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const results = products.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "bg-gradient-to-r from-gray-900 via-black to-gray-800 shadow-lg"
          : "bg-gradient-to-r from-gray-800 to-black"
      } text-white`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-2xl hover:scale-110 transition"
          >
            ☰
          </button>

          {/* Navlinks (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            {["Home", "Collection", "About Us"].map((item) => (
              <NavLink
                key={item}
                to={
                  item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`
                }
                className={({ isActive }) =>
                  `relative transition hover:text-brand ${
                    isActive ? "text-brand font-semibold" : "text-gray-200"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>

          {/* ✅ Fixed Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover shadow-md group-hover:scale-105 transition"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
              ChrisCraft
            </span>
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              className="hover:text-pink-400 transition hover:scale-110"
            >
              <Search size={22} />
            </button>
            <button
              onClick={() => setFavOpen(true)}
              className="hover:text-red-500 transition hover:scale-110"
            >
              <Heart size={22} />
            </button>
            <button
              onClick={() => nav("/location")}
              className="hover:text-green-400 transition hover:scale-110"
            >
              <MapPin size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* 🔍 Search Dropdown */}
      <TopDropdown open={searchOpen} onClose={() => setSearchOpen(false)}>
        <div className="w-full flex flex-col items-center gap-3">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-pink-500 outline-none"
          />
          {q && (
            <div className="mt-2 bg-white border rounded-lg shadow max-h-80 overflow-y-auto w-full md:w-1/2 text-black">
              {results.length > 0 ? (
                results.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSearchOpen(false);
                      nav("/product/" + r.id);
                    }}
                    className="flex w-full items-center gap-3 p-3 hover:bg-gray-50 text-left transition"
                  >
                    <img
                      src={r.img} // ✅ Make sure product.img is stored in public/ or imported
                      alt={r.title}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{r.title}</div>
                      <div className="text-xs text-gray-500">{r.type}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-3 text-sm text-gray-500">No results</div>
              )}
            </div>
          )}
        </div>
      </TopDropdown>

      {/* ❤️ Favourites Drawer */}
      <Drawer open={favOpen} onClose={() => setFavOpen(false)} side="right">
        <div className="flex items-center justify-between mb-5 border-b pb-3 text-white">
          <h3 className="text-lg font-semibold">Favourites</h3>
          <button
            onClick={() => setFavOpen(false)}
            className="p-2 rounded-full hover:bg-white/20 transition"
            title="Close"
          >
            <X size={20} className="text-black" />
          </button>
        </div>

        {favourites.length === 0 ? (
          <p className="text-sm text-gray-300">No favourites yet.</p>
        ) : (
          <div className="space-y-3">
            {favourites.map((id) => {
              const product = products.find((p) => p.id === id);
              if (!product) return null;
              return (
                <div
                  key={id}
                  className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                >
                  <img
                    src={product.img} // ✅ Same rule: keep product.img inside public/ or import
                    alt={product.title}
                    className="h-12 w-12 rounded object-cover shadow"
                  />
                  <div className="flex-1 text-white">
                    <div className="font-medium">{product.title}</div>
                    <div className="text-xs text-gray-300">{product.type}</div>
                  </div>
                  <button
                    onClick={() => removeFavourite(id)}
                    className="text-xs text-red-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Drawer>

      {/* 📱 Mobile Menu Drawer */}
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} side="left">
        <div className="flex items-center justify-between mb-5 text-white">
          <h3 className="text-lg font-semibold">Menu</h3>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
        <nav className="flex flex-col gap-4 font-medium">
          {["Home", "Collection", "About Us"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
              onClick={() => setMenuOpen(false)}
              className="text-gray-200 hover:text-pink-400 transition"
            >
              {item}
            </NavLink>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
