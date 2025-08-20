import { useState, useEffect } from "react";
import { useStore } from "../Store/StoreContext.jsx";

// ✅ Import hero images from src/Assets
import Hero1 from "../Assets/Hero1.jpg";
import Hero2 from "../Assets/Hero2.jpg";
import Hero3 from "../Assets/Hero3.jpg";

const ADMIN_USER = "chriscraft";
const ADMIN_PASS = "chris123";

const isValidHeroUrl = (url) => {
  return (
    url &&
    (url.startsWith("blob:") ||
      url.startsWith("http") ||
      url.startsWith("data:") ||
      url.startsWith("/") ||
      url.includes("Assets"))
  );
};

export default function Admin() {
  const { products, setProducts, hero, setHero } = useStore();

  const defaultHeroImages = [Hero1, Hero2, Hero3];

  const [localHero, setLocalHero] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [creds, setCreds] = useState({ user: "", pass: "" });

  const [newProduct, setNewProduct] = useState({
    images: [],
    name: "",
    description: "",
    category: "plain",
    price: "",
    sizes: [],
    bestseller: false,
    sold: false, // ✅ Sold Out toggle
  });

  // Load from localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    const savedHero = JSON.parse(localStorage.getItem("hero"));

    if (savedProducts) setProducts(savedProducts);

    const combinedHero = [
      ...defaultHeroImages,
      ...(Array.isArray(savedHero) ? savedHero : []),
    ].filter(isValidHeroUrl);

    setHero(combinedHero);
    setLocalHero(combinedHero);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("hero", JSON.stringify(hero));
  }, [products, hero]);

  const login = () => {
    if (creds.user === ADMIN_USER && creds.pass === ADMIN_PASS) {
      setIsAuth(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const toggleFlag = (id, key) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, [key]: !p[key] } : p))
    );
  };

  const handleProductImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setNewProduct({ ...newProduct, images: urls });
  };

  const addProduct = () => {
    const id = Date.now().toString();
    if (!newProduct.name || !newProduct.price) {
      alert("Please enter product name and price");
      return;
    }

    const newItem = {
      id,
      title: newProduct.name,
      description: newProduct.description,
      category: newProduct.category,
      img: newProduct.images[0] || "/placeholder.png",
      images: newProduct.images,
      sizes: newProduct.sizes,
      price: newProduct.price,
      bestseller: newProduct.bestseller,
      newArrival: false,
      sold: newProduct.sold, // ✅ Sold toggle
    };

    setProducts([newItem, ...products]);

    setNewProduct({
      images: [],
      name: "",
      description: "",
      category: "plain",
      price: "",
      sizes: [],
      bestseller: false,
      sold: false,
    });
  };

  const removeProduct = (id) => {
    if (confirm("Remove this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    alert(`Copied Product ID: ${id}`);
  };

  const saveHero = () => {
    const filtered = localHero.filter(isValidHeroUrl);
    setHero(filtered);
    localStorage.setItem("hero", JSON.stringify(filtered));
  };

  const addHero = () => {
    const url = prompt("Image URL:");
    if (url && isValidHeroUrl(url)) {
      setLocalHero([...localHero, url]);
    }
  };

  const removeHero = (idx) => {
    setLocalHero(localHero.filter((_, i) => i !== idx));
  };

  const handleHeroFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setLocalHero([...localHero, ...urls]);
  };

  if (!isAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="p-6 border rounded shadow space-y-3">
          <h2 className="text-xl font-semibold">Admin Login</h2>
          <input
            placeholder="Username"
            className="w-full px-3 py-2 border rounded"
            value={creds.user}
            onChange={(e) => setCreds({ ...creds, user: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={creds.pass}
            onChange={(e) => setCreds({ ...creds, pass: e.target.value })}
          />
          <button
            onClick={login}
            className="px-4 py-2 bg-black text-white rounded w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-semibold">Admin Panel</h1>

      {/* Hero Section */}
      {/* ... unchanged hero section ... */}

      {/* Product Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Manage Products</h2>

        {/* Add Product Form */}
        {/* ... unchanged add product form ... */}

        {/* Product List */}
        <div className="grid md:grid-cols-2 gap-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-3 border rounded flex gap-3 items-start"
            >
              <img src={p.img} className="h-16 w-16 rounded object-cover" />
              <div className="flex-1">
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-500">Category: {p.category}</div>
                <div className="text-xs text-gray-700">ID: {p.id}</div>

                <button
                  onClick={() => copyId(p.id)}
                  className="text-blue-600 text-xs underline mt-1"
                >
                  Copy ID
                </button>

                <div className="text-sm text-gray-600 mt-1 blur-sm select-none">
                  ₹ {p.price}
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-3 mt-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={p.bestseller}
                      onChange={() => toggleFlag(p.id, "bestseller")}
                    />
                    Bestseller
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={p.newArrival}
                      onChange={() => toggleFlag(p.id, "newArrival")}
                    />
                    New Arrival
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={p.sold}
                      onChange={() => toggleFlag(p.id, "sold")}
                    />
                    Sold Out
                  </label>
                </div>

                <button
                  onClick={() => removeProduct(p.id)}
                  className="text-red-600 text-sm mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
