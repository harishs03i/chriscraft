import HeroSlider from '../components/HeroSlider.jsx'
import Section from '../components/Section.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useStore } from '../Store/StoreContext.jsx'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  const { products } = useStore()
  const best = products.filter(p => p.bestseller).slice(0, 4)
  const news = products.filter(p => p.newArrival).slice(0, 4)

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <HeroSlider />

      {/* Best Sellers Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Section
          title={<span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Best Sellers</span>}
          subtitle={<span className="text-gray-600">Most loved right now</span>}
          action={<Link to="/bestsellers" className="text-blue-600 font-medium hover:underline">See all</Link>}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {best.map(p => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ProductCard p={p} />
              </motion.div>
            ))}
          </div>
        </Section>
      </motion.div>

      {/* New Arrivals Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Section
          title={<span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">New Arrivals</span>}
          subtitle={<span className="text-gray-600">Fresh drops</span>}
          action={<Link to="/new" className="text-pink-600 font-medium hover:underline">See all</Link>}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {news.map(p => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ProductCard p={p} />
              </motion.div>
            ))}
          </div>
        </Section>
      </motion.div>
    </div>
  )
}
