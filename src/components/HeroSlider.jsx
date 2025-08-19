
import { useEffect, useState } from 'react'
import { useStore } from '../Store/StoreContext.jsx'
import { motion, AnimatePresence } from 'framer-motion'
export default function HeroSlider(){
  const { hero } = useStore()
  const [i, setI] = useState(0)
  useEffect(()=>{ const t=setInterval(()=> setI(p=>(p+1)%hero.length),3500); return ()=> clearInterval(t)},[hero.length])
  return (
    <div className="relative h-[60vh] md:h-[72vh] hero-gradient overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img key={i} src={hero[i]} className="absolute inset-0 w-full h-full object-cover"
          initial={{opacity:0, scale:1.05}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.98}} transition={{duration:0.8}} />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-10 flex justify-center gap-2">
        {hero.map((_,idx)=>(<button key={idx} onClick={()=> setI(idx)} className={`h-2 w-10 rounded-full ${idx===i?'bg-brand-accent':'bg-white/70'}`} />))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow">Wear the Future.</h1>
          <p className="mt-3 text-gray-700">Premium shirts. Smart details. Effortless style.</p>
        </div>
      </div>
    </div>
  )
}
