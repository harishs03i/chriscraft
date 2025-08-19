import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/StoreContext.jsx";

function waLink(id) {
  const msg = encodeURIComponent(
    `Hi, I'm interested in product ${id}. Please share the price and details.`
  );
  return `https://wa.me/919600910881?text=${msg}`;
}

export default function ProductCard({ p }) {
  const nav = useNavigate();
  const { addFavourite, favourites, removeFavourite } = useStore();
  const fav = favourites.includes(p.id);

  return (
    <div className="group rounded-2xl border overflow-hidden hover:shadow-lg transition duration-300">
      {/* Product Image + Wishlist Button */}
      <div className="relative">
        <img
          src={p.img}
          alt={p.title}
          className="w-full aspect-[4/3] object-cover"
        />
        <button
          onClick={() => (fav ? removeFavourite(p.id) : addFavourite(p.id))}
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm shadow transition ${
            fav
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white/90 hover:bg-white"
          }`}
        >
          {fav ? "♥" : "♡"}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-lg">{p.title}</h3>
        <p className="text-sm text-gray-500">Type: {p.type}</p>
        <p className="text-sm text-gray-500">Sizes: {p.sizes.join(", ")}</p>

        {/* Price + View Button */}
        <div className="flex items-center justify-between pt-2">
          <span
            title="Tap to reveal on WhatsApp"
            className="price-blur text-lg font-semibold cursor-pointer"
            onClick={() => window.open(waLink(p.id), "_blank")}
          >
            ₹{p.price}
          </span>
          <button
            onClick={() => nav(`/product/${p.id}`)}
            className="text-brand-accent underline decoration-dotted hover:text-brand-dark"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
