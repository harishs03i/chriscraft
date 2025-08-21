import { useState, useEffect } from "react";
import { useStore } from "../Store/StoreContext.jsx";

// ✅ Import default hero images from src/Assets
import Hero1 from "../Assets/Hero1.jpg";
import Hero2 from "../Assets/Hero2.jpg";
import Hero3 from "../Assets/Hero3.jpg";

const ADMIN_USER = "chriscraft";
const ADMIN_PASS = "chris123";

const isValidHeroUrl = (url) =>
  url &&
  (url.startsWith("blob:") ||
    url.startsWith("http") ||
    url.startsWith("data:") ||
    url.startsWith("/") ||
    url.includes("Assets"));

export default function Admin() {
  const { products, setProducts, hero, setHero } = useStore();

  const defaultHeroImages = [Hero1, Hero2, Hero3];

  const [localHero, setLocalHero] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [creds, setCreds] = useState({ user: "", pass: "" });

  const [newProduct, setNewProduct] = useState({
    id: "",
    images: [],
    colors: [], // ✅ multiple color options
    name: "",
    description: "",
    category: "plain",
    price: "",
    sizes: [],
    bestseller: false,
    newArrival: false,
    sold: false,
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
    setProducts((prev) =>
      prev.map((p) =>
        String(p.id) === String(id) ? { ...p, [key]: !p[key] } : p
      )
    );
  };

  // ✅ Upload multiple product images
  const handleProductImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setNewProduct({ ...newProduct, images: [...newProduct.images, ...urls] });
  };

  // ✅ Add new color option
  const addColor = () => {
    const colorName = prompt("Enter color name:");
    if (!colorName) return;

    setNewProduct({
      ...newProduct,
      colors: [...newProduct.colors, { name: colorName, images: [] }],
    });
  };

  // ✅ Upload images for a color
  const handleColorImageUpload = (e, colorIndex) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));

    const updatedColors = [...newProduct.colors];
    updatedColors[colorIndex].images.push(...urls);

    setNewProduct({ ...newProduct, colors: updatedColors });
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Please enter product name and price");
      return;
    }

    if (!newProduct.id) {
      alert("Please enter a product ID");
      return;
    }

    const newItem = {
      id: newProduct.id,
      title: newProduct.name,
      description: newProduct.description,
      category: newProduct.category,
      img: newProduct.images[0] || "/placeholder.png",
      images: newProduct.images,
      colors: newProduct.colors,
      sizes: newProduct.sizes,
      price: newProduct.price,
      bestseller: newProduct.bestseller,
      newArrival: newProduct.newArrival,
      sold: newProduct.sold,
    };

    setProducts([newItem, ...products]);

    setNewProduct({
      id: "",
      images: [],
      colors: [],
      name: "",
      description: "",
      category: "plain",
      price: "",
      sizes: [],
      bestseller: false,
      newArrival: false,
      sold: false,
    });
  };

  const removeProduct = (id) => {
    if (confirm("Remove this product?")) {
      setProducts(products.filter((p) => String(p.id) !== String(id)));
    }
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

  const updateProductId = (oldId, newId) => {
    setProducts((prev) =>
      prev.map((p) =>
        String(p.id) === String(oldId) ? { ...p, id: newId } : p
      )
    );
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
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Hero Images</h2>
          <div className="flex gap-2">
            <button
              onClick={addHero}
              className="px-3 py-2 rounded bg-black text-white"
            >
              Add via URL
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleHeroFileUpload}
              className="text-sm"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {localHero.map((h, idx) => (
            <div key={idx} className="p-3 border rounded space-y-2">
              <img src={h} className="w-full h-32 object-cover rounded" />
              <input
                value={h}
                onChange={(e) => {
                  const updated = [...localHero];
                  updated[idx] = e.target.value;
                  setLocalHero(updated);
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
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Add Product</h2>
        <div className="p-4 border rounded space-y-3">
          {/* General Images */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleProductImageUpload}
          />
          <div className="flex gap-2 flex-wrap">
            {newProduct.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="w-16 h-16 rounded object-cover"
              />
            ))}
          </div>

          {/* Colors Section */}
          <div>
            <h3 className="font-medium mb-2">Available Colours</h3>
            <button
              onClick={addColor}
              className="px-2 py-1 bg-blue-600 text-white text-sm rounded"
            >
              + Add Colour
            </button>
            <div className="space-y-3 mt-2">
              {newProduct.colors.map((c, idx) => (
                <div key={idx} className="border rounded p-2 space-y-2">
                  <div className="font-medium">{c.name}</div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleColorImageUpload(e, idx)}
                  />
                  <div className="flex gap-2 flex-wrap">
                    {c.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <input
            placeholder="Product ID"
            className="w-full px-3 py-2 border rounded"
            value={newProduct.id}
            onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
          />

          <input
            placeholder="Product Name"
            className="w-full px-3 py-2 border rounded"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
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

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newProduct.bestseller}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, bestseller: e.target.checked })
                }
              />
              Bestseller
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newProduct.newArrival}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, newArrival: e.target.checked })
                }
              />
              New Arrival
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newProduct.sold}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, sold: e.target.checked })
                }
              />
              Sold Out
            </label>
          </div>

          <button
            onClick={addProduct}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Add Products
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

                {/* Editable Product ID */}
                <input
                  value={p.id}
                  onChange={(e) => updateProductId(p.id, e.target.value)}
                  className="w-full px-2 py-1 border rounded text-xs mt-1"
                />

                {/* ✅ Blur Price */}
                <div className="text-sm text-gray-600 mt-1 blur-sm select-none">
                  ₹ {p.price}
                </div>

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

                {/* Colors Preview */}
                {p.colors?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {p.colors.map((c, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-200 rounded"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                )}

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
