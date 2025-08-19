import { useMemo, useState } from 'react'
import { useStore } from '../Store/StoreContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Section from '../components/Section.jsx'
import { motion } from 'framer-motion'

export default function Collection() {
  const { products } = useStore()
  const [cat, setCat] = useState('')
  const [size, setSize] = useState('')

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const cats = products
      .map((p) => p.category?.trim())
      .filter(Boolean)
    return [...new Set(cats)]
  }, [products])

  // Extract unique sizes dynamically
  const sizes = useMemo(() => {
    const allSizes = products.flatMap((p) => p.sizes || [])
    return [...new Set(allSizes)].filter(Boolean)
  }, [products])

  // Set default category if not set
  useMemo(() => {
    if (!cat && categories.length > 0) setCat(categories[0])
  }, [categories, cat])

  // Filtering products by category and size safely
  const list = useMemo(() => {
    return products.filter((p) => {
      const type = p.category?.toLowerCase() || ''
      const matchCat = cat ? type === cat.toLowerCase() : true
      const matchSize = size ? p.sizes?.includes(size) : true
      return matchCat && matchSize
    })
  }, [products, cat, size])

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
        {/* Category and Size Filters */}
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
                  cat === c
                    ? 'bg-black text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {c}
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
                onClick={() => setSize(s === size ? '' : s)} // toggle
                className={`px-3 py-1 rounded-full border font-medium transition-colors ${
                  size === s
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 hover:bg-indigo-100 text-gray-700'
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {list.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard p={p} />
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