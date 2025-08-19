
import { useStore } from '../Store/StoreContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Section from '../components/Section.jsx'
export default function NewArrivals(){
  const { products } = useStore()
  const list = products.filter(p => p.newArrival)
  return (
    <Section title="New Arrivals">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{list.map(p => <ProductCard key={p.id} p={p} />)}</div>
    </Section>
  )
}
