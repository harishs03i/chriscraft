// src/assets/assets.js
import Hero1 from './Hero1.jpg'
import Hero2 from './Hero2.jpg'
import Hero3 from './Hero3.jpg'

import Plain1 from './Plain1.jpg'
import Stripe1 from './Stripe1.jpg'
import Checked1 from './Checked1.jpg'
import Print1 from './Print1.jpg'

export const WHATSAPP_NUMBER = "+919600910881";

export const HERO_IMAGES = [Hero1, Hero2, Hero3];

export const PRODUCTS = [
  { id:'plain-1', title:'Plain Cotton Shirt', type:'Plain', sizes:['M','L','XL'], price:1299, img:Plain1, bestseller:true, newArrival:false, description:'Breathable cotton plain shirt for everyday comfort.' },
  { id:'stripe-1', title:'Striped Formal Shirt', type:'Stripes', sizes:['M','L','XL'], price:1499, img:Stripe1, bestseller:false, newArrival:true, description:'Sharp stripes, wrinkle-resistant finish.' },
  { id:'checked-1', title:'Checked Casual Shirt', type:'Checked', sizes:['S','M','L'], price:1399, img:Checked1, bestseller:true, newArrival:true, description:'Soft flannel vibe with clean checks.' },
  { id:'print-1', title:'Printed Statement Shirt', type:'Print', sizes:['M','L'], price:1599, img:Print1, bestseller:false, newArrival:true, description:'Bold all-over print to stand out.' }
];
