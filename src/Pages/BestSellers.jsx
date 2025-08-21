import { useMemo, useState } from "react";
import { useStore } from "../Store/StoreContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Section from "../components/Section.jsx";
import { motion } from "framer-motion";

export default function BestSellers() {
  const { products } = useStore();

  // ⭐ Filter only Best Sellers
  const list = useMemo(() => products.filter((p) => p.bestseller), [products]);

  const [cat, setCat] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [sort, setSort] = useState("");

  // Extract unique categories, sizes, colors from bestsellers only
  const categories = [...new Set(list.map((p) => p.category).filter(Boolean))];
  const sizes = [...new Set(list.map((p) => p.size).filter(Boolean))];
  const colors = [...new Set(list.map((p) => p.color).filter(Boolean))];

  // Apply filters
  const filtered = list.filter((p) => {
    return (
      (!cat || p.category === cat) &&
      (!size || p.size === size) &&
      (!color || p.color === color)
    );
  });

  // Apply sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "low-high") return a.price - b.price;
    if (sort === "high-low") return b.price - a.price;
    if (sort === "az") return a.name.localeCompare(b.name);
    if (sort === "za") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <Section title="Best Sellers">
      {/* Filters + Sorting Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          className="border p-2 rounded"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All Sizes</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="">All Colors</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="az">Name: A-Z</option>
          <option value="za">Name: Z-A</option>
        </select>
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {sorted.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </motion.div>
    </Section>
  );
}
