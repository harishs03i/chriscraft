import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/StoreContext.jsx";

// ✅ WhatsApp message builder (no price included)
function waLink(p) {
  const msg = encodeURIComponent(
    `Hi, I'm interested in the following product 👇

🆔 ID: ${p.id}
📦 Name: ${p.title}
📂 Category: ${p.category}
📏 Sizes: ${p.sizes.join(", ")}
📝 Description: ${p.description}

🖼️ Image: ${p.images?.[0] || p.img}

👉 Please share the price and more details.`
  );
  return `https://wa.me/919600910881?text=${msg}`;
}

export default function ProductCard({ p }) {
  const nav = useNavigate();
  const { addFavourite, favourites, removeFavourite } = useStore();
  const fav = favourites.includes(p.id);

  // ✅ Track which image is showing
  const [imgIndex, setImgIndex] = useState(0);
  const images = p.images && p.images.length > 0 ? p.images : [p.img];

  // ✅ Switch to next / prev image
  const nextImg = () => setImgIndex((i) => (i + 1) % images.length);
  const prevImg = () => setImgIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="group rounded-2xl border overflow-hidden hover:shadow-lg transition relative">
      {/* SOLD OUT Overlay */}
      {p.sold && (
        <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
          <span className="text-white font-bold text-lg">SOLD OUT</span>
        </div>
      )}

      {/* Image Carousel */}
      <div className="relative">
        <img
          src={images[imgIndex]}
          alt={p.title}
          onError={(e) => (e.currentTarget.src = "/fallback.png")}
          className={`w-full aspect-[4/3] object-cover ${
            p.sold ? "opacity-50" : ""
          }`}
        />

        {/* Prev / Next buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-2 py-1 shadow"
            >
              ◀
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-2 py-1 shadow"
            >
              ▶
            </button>
          </>
        )}

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

        {/* ✅ Show color swatches */}
        {p.colors?.length > 0 && (
          <div className="flex gap-2 pt-1">
            {p.colors.map((c, i) => (
              <span
                key={i}
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          {/* Price blurred */}
          {!p.sold ? (
            <span
              onClick={() => window.open(waLink(p), "_blank")}
              className="relative text-lg font-semibold cursor-pointer select-none"
            >
              <span className="blur-sm group-hover:blur-md">₹{p.price}</span>
              <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center text-gray-700 font-medium opacity-0 hover:opacity-100 transition">
                Tap to Reveal
              </span>
            </span>
          ) : (
            <span className="text-red-600 font-semibold">Unavailable</span>
          )}

          {/* View Details */}
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
