
import { createContext, useContext, useEffect, useState } from 'react'
const ThemeContext = createContext()
export function ThemeProvider({children}){
  const [scrolled, setScrolled] = useState(false)
  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll(); window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])
  return <ThemeContext.Provider value={{scrolled}}>{children}</ThemeContext.Provider>
}
export function useTheme(){ return useContext(ThemeContext) }
