
import { useStore } from '../Store/StoreContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Section from '../components/Section.jsx'
export default function BestSellers(){
  const { products } = useStore()
  const list = products.filter(p => p.bestseller)
  return (
    <Section title="Best Sellers">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{list.map(p => <ProductCard key={p.id} p={p} />)}</div>
    </Section>
  )
}