import { useStore } from '../Store/StoreContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function BestSellersPage() {
  const { products } = useStore()
  const list = products.filter(p => p.bestseller)

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Best Sellers</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {list.map(p => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  )
}
