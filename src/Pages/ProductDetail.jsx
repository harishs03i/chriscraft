
import { useParams } from 'react-router-dom'
import { useStore } from '../Store/StoreContext.jsx'
function waLink(id){
  const msg = encodeURIComponent(`Hi, I'm interested in product ${id}. Please share the price and details.`)
  return `https://wa.me/+919600910881?text=${msg}`
}
export default function ProductDetail(){
  const { id } = useParams()
  const { products } = useStore()
  const p = products.find(x => x.id === id)
  if(!p) return <div className="container mx-auto px-4 py-10">Product not found.</div>
  return (
    <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      <img src={p.img} alt={p.title} className="w-full rounded-2xl border object-cover"/>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">{p.title}</h1>
        <p className="text-gray-600">{p.description}</p>
        <p className="text-sm text-gray-500">Type: {p.type}</p>
        <p className="text-sm text-gray-500">Sizes: {p.sizes.join(', ')}</p>
        <div>
          <span className="price-blur text-2xl font-semibold" onClick={()=> window.open(waLink(p.id), '_blank')}>₹{p.price}</span>
          <p className="text-xs text-gray-500">Tap the price to reveal via WhatsApp</p>
        </div>
        <button className="px-4 py-2 rounded bg-black text-white" onClick={()=> window.open(waLink(p.id), '_blank')}>Chat on WhatsApp</button>
      </div>
    </div>
  )
}
