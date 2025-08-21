import { useMemo, useState } from 'react'
import { useStore } from '../Store/StoreContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Section from '../components/Section.jsx'
import { motion } from 'framer-motion'

// ✅ Helper: resolve image source
function resolveImg(path) {
  if (path?.startsWith('http') || path?.startsWith('/uploads')) {
    return path
  }
  try {
    return new URL(`../Assets/${path}`, import.meta.url).href
  } catch (e) {
    return '/fallback.png'
  }
}

export default function Collection() {
  const { products } = useStore()
  const [cat, setCat] = useState('')
  const [type, setType] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [sort, setSort] = useState('') // ✅ low-high / high-low

  // ✅ Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category?.trim()).filter(Boolean)))
  }, [products])

  // ✅ Extract unique types
  const types = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.type?.trim()).filter(Boolean)))
  }, [products])

  // ✅ Extract unique sizes
  const sizes = useMemo(() => {
    return Array.from(new Set(products.flatMap((p) => p.sizes || []).filter(Boolean)))
  }, [products])

  // ✅ Extract unique colors
  const colors = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.color?.trim()).filter(Boolean)))
  }, [products])

  // ✅ Set default category
  useMemo(() => {
    if (!cat && categories.length > 0) setCat(categories[0])
  }, [categories, cat])

  // ✅ Filtering + Sorting
  const list = useMemo(() => {
    let filtered = products.filter((p) => {
      const matchCat = cat ? p.category?.toLowerCase() === cat.toLowerCase() : true
      const matchType = type ? p.type?.toLowerCase() === type.toLowerCase() : true
      const matchSize = size ? p.sizes?.includes(size) : true
      const matchColor = color ? p.color?.toLowerCase() === color.toLowerCase() : true
      return matchCat && matchType && matchSize && matchColor
    })

    // ✅ Sorting
    if (sort === 'low-high') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sort === 'high-low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [products, cat, type, size, color, sort])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Section
        title="Collections"
        subtitle="Browse by fabric / pattern"
        className="text-center"
      >
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

          {/* Categories */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((c) => (
              <motion.button
                key={c}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full border font-medium transition-colors ${
                  cat === c ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {c}
              </motion.button>
            ))}
          </div>

          {/* Types */}
          <div className="flex gap-2 flex-wrap justify-center">
            {types.map((t) => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setType(t === type ? '' : t)}
                className={`px-3 py-1 rounded-full border font-medium transition-colors ${
                  type === t ? 'bg-gray-700 text-white' : 'bg-gray-100 hover:bg-indigo-100 text-gray-700'
                }`}
              >
                {t}
              </motion.button>
            ))}
          </div>

          {/* Sizes */}
          <div className="flex gap-2 flex-wrap justify-center">
            {sizes.map((s) => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSize(s === size ? '' : s)}
                className={`px-3 py-1 rounded-full border font-medium transition-colors ${
                  size === s ? 'bg-gray-700 text-white' : 'bg-gray-100 hover:bg-indigo-100 text-gray-700'
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>

          {/* Colors */}
          <div className="flex gap-2 flex-wrap justify-center">
            {colors.map((clr) => (
              <motion.button
                key={clr}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setColor(clr === color ? '' : clr)}
                className={`px-3 py-1 rounded-full border font-medium transition-colors ${
                  color === clr ? 'bg-gray-700 text-white' : 'bg-gray-100 hover:bg-indigo-100 text-gray-700'
                }`}
              >
                {clr}
              </motion.button>
            ))}
          </div>

          {/* Sorting */}
          <div className="flex gap-2 flex-wrap justify-center">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1 rounded-full border text-gray-700"
            >
              <option value="">Sort</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {list.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard p={{ ...p, img: resolveImg(p.img) }} />
            </motion.div>
          ))}

          {list.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No products available for this selection.
            </p>
          )}
        </motion.div>
      </Section>
    </motion.div>
  )
}
