// src/Store/StoreContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS, HERO_IMAGES } from '../data/assets.js';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('cc_products') || 'null') || PRODUCTS);
  const [hero, setHero] = useState(() => JSON.parse(localStorage.getItem('cc_hero') || 'null') || HERO_IMAGES);
  const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem('cc_fav') || 'null') || []);

  useEffect(() => localStorage.setItem('cc_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('cc_hero', JSON.stringify(hero)), [hero]);
  useEffect(() => localStorage.setItem('cc_fav', JSON.stringify(favourites)), [favourites]);

  const addFavourite = (id) => setFavourites(p => p.includes(id) ? p : [...p, id]);
  const removeFavourite = (id) => setFavourites(p => p.filter(x => x !== id));

  const value = useMemo(() => ({
    products, setProducts,
    hero, setHero,
    favourites, addFavourite, removeFavourite
  }), [products, hero, favourites]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
