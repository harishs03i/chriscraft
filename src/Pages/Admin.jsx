import { useState, useEffect } from "react";
import { useStore } from "../Store/StoreContext.jsx";

const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

export default function Admin() {
  const { products, setProducts, hero, setHero } = useStore();
  const [localHero, setLocalHero] = useState(hero);
  const [isAuth, setIsAuth] = useState(false);
  const [creds, setCreds] = useState({ user: "", pass: "" });

  // new product state (removed subCategory)
  const [newProduct, setNewProduct] = useState({
    images: [],
    name: "",
    description: "",
    category: "plain",
    price: "",
    sizes: [],
    bestseller: false,
  });

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    const savedHero = JSON.parse(localStorage.getItem("hero"));
    if (savedProducts) setProducts(savedProducts);
    if (savedHero) setHero(savedHero);
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

  const handleFileUpload = (e) => {
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
    setProducts([
      {
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
      },
      ...products,
    ]);
    // reset form
    setNewProduct({
      images: [],
      name: "",
      description: "",
      category: "plain",
      price: "",
      sizes: [],
      bestseller: false,
    });
  };

  const removeProduct = (id) => {
    if (confirm("Remove this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const saveHero = () => setHero(localHero);
  const addHero = () => {
    const url = prompt("Image URL:");
    if (url) setLocalHero([...localHero, url]);
  };
  const removeHero = (idx) => {
    setLocalHero(localHero.filter((_, i) => i !== idx));
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
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Hero Images</h2>
          <button
            onClick={addHero}
            className="px-3 py-2 rounded bg-black text-white"
          >
            Add Hero
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {localHero.map((h, idx) => (
            <div key={idx} className="p-3 border rounded space-y-2">
              <img src={h} className="w-full h-32 object-cover rounded" />
              <input
                value={localHero[idx]}
                onChange={(e) => {
                  const next = [...localHero];
                  next[idx] = e.target.value;
                  setLocalHero(next);
                }}
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <button
                onClick={() => removeHero(idx)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={saveHero}
          className="px-3 py-2 rounded bg-green-600 text-white"
        >
          Save Hero
        </button>
      </section>

      {/* Product Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <div className="p-4 border rounded space-y-3">
          {/* Image Upload */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
          />
          <div className="flex gap-2">
            {newProduct.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="w-16 h-16 rounded object-cover"
              />
            ))}
          </div>

          <input
            placeholder="Product Name"
            className="w-full px-3 py-2 border rounded"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <textarea
            placeholder="Product Description"
            className="w-full px-3 py-2 border rounded"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <div className="flex gap-3">
            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="px-3 py-2 border rounded"
            >
              <option>plain</option>
              <option>checked</option>
              <option>stripes</option>
              <option>print</option>
            </select>
            <input
              type="number"
              placeholder="Price"
              className="px-3 py-2 border rounded"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={newProduct.sizes.includes(size)}
                  onChange={() => {
                    const sizes = newProduct.sizes.includes(size)
                      ? newProduct.sizes.filter((s) => s !== size)
                      : [...newProduct.sizes, size];
                    setNewProduct({ ...newProduct, sizes });
                  }}
                />
                {size}
              </label>
            ))}
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newProduct.bestseller}
              onChange={(e) =>
                setNewProduct({ ...newProduct, bestseller: e.target.checked })
              }
            />
            Add to Bestseller
          </label>
          <button
            onClick={addProduct}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Add Product
          </button>
        </div>

        {/* Existing Products */}
        <div className="grid md:grid-cols-2 gap-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-3 border rounded flex gap-3 items-start"
            >
              <img src={p.img} className="h-16 w-16 rounded object-cover" />
              <div className="flex-1">
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-500">{p.category}</div>
                <div className="text-sm text-gray-600 mt-1 blur-sm select-none">
                  ₹ {p.price}
                </div>
                <div className="flex gap-2 mt-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={p.bestseller}
                      onChange={() => toggleFlag(p.id, "bestseller")}
                    />{" "}
                    Bestseller
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={p.newArrival}
                      onChange={() => toggleFlag(p.id, "newArrival")}
                    />{" "}
                    New Arrival
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