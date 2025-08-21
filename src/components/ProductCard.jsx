import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/StoreContext.jsx";
import { useState } from "react";

// ✅ WhatsApp message builder (no price included)
function waLink(p) {
  const msg = encodeURIComponent(
    `Hi, I'm interested in the following product 👇

🆔 ID: ${p.id}
📦 Name: ${p.title}
📂 Category: ${p.category}
📏 Sizes: ${p.sizes.join(", ")}
📝 Description: ${p.description}

🖼️ Image: ${p.img}

👉 Please share the price and more details.`
  );
  return `https://wa.me/919600910881?text=${msg}`;
}

export default function ProductCard({ p }) {
  const nav = useNavigate();
  const { addFavourite, favourites, removeFavourite } = useStore();
  const fav = favourites.includes(p.id);

  // ✅ Track selected color & image index
  const [selectedColor, setSelectedColor] = useState(p.colors?.[0] || null);
  const [mainImg, setMainImg] = useState(
    p.images?.[0] || p.img // fallback to single img
  );

  return (
    <div className="group rounded-2xl border overflow-hidden hover:shadow-lg transition relative">
      {/* SOLD OUT Overlay */}
      {p.sold && (
        <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
          <span className="text-white font-bold text-lg">SOLD OUT</span>
        </div>
      )}

      {/* Product Image with Zoom Effect */}
      <div className="relative overflow-hidden">
        <img
          src={mainImg}
          alt={p.title}
          onError={(e) => (e.currentTarget.src = "/fallback.png")}
          className={`w-full aspect-[4/3] object-cover transition-transform duration-300 ${
            p.sold ? "opacity-50" : "group-hover:scale-110"
          }`}
        />

        {/* Favourites Button */}
        <button
          onClick={() => (fav ? removeFavourite(p.id) : addFavourite(p.id))}
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm bg-white/90 hover:bg-white shadow"
        >
          {fav ? "♥" : "♡"}
        </button>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-medium">{p.title}</h3>
        <p className="text-sm text-gray-500">Type: {p.type}</p>
        <p className="text-sm text-gray-500">Sizes: {p.sizes.join(", ")}</p>

        {/* ✅ Color Selector */}
        {p.colors?.length > 0 && (
          <div className="flex items-center gap-2">
            {p.colors.map((clr) => (
              <button
                key={clr.name}
                onClick={() => {
                  setSelectedColor(clr.name);
                  setMainImg(clr.img || mainImg);
                }}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === clr.name ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: clr.hex }}
              ></button>
            ))}
          </div>
        )}

        {/* ✅ Thumbnails for multiple images */}
        {p.images?.length > 1 && (
          <div className="flex gap-2 mt-2">
            {p.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${p.title}-${i}`}
                onClick={() => setMainImg(img)}
                className={`w-12 h-12 object-cover rounded cursor-pointer border ${
                  mainImg === img ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          {/* Price (blurred, click → WhatsApp) */}
          {!p.sold ? (
            <span
              title="Click to reveal price on WhatsApp"
              className="relative text-lg font-semibold cursor-pointer select-none"
              onClick={() => window.open(waLink(p), "_blank")}
            >
              <span className="blur-sm group-hover:blur-md">₹{p.price}</span>
              <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center text-gray-700 font-medium opacity-0 hover:opacity-100 transition">
                Tap to Reveal
              </span>
            </span>
          ) : (
            <span className="text-red-600 font-semibold">Unavailable</span>
          )}

          {/* View Details Button */}
          <button
            onClick={() => nav(`/product/${p.id}`)}
            className="text-brand-accent underline decoration-dotted disabled:opacity-50"
            disabled={p.sold}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
