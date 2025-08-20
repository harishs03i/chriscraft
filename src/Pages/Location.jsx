export default function Location() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 text-center">
        Our Store Location
      </h1>
      <p className="text-gray-600 text-center">
        Visit us at: 16/2, Singara Garden (Branded Market), 1st Lane, Old
        Washermenpet, Chennai, Tamil Nadu, India
      </p>

      {/* Open in Google Maps Link */}
      <div className="text-center">
        <a
          className="underline text-blue-600 hover:text-blue-800 transition"
          href="https://maps.app.goo.gl/uws85iJ3EnajXXZG7?g_st=aw"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps
        </a>
      </div>

      {/* Embedded Google Map with Pin */}
      <div className="mt-6 aspect-[16/9] w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps?q=16/2+Singara+Garden,+Old+Washermenpet,+Chennai,+Tamil+Nadu,+India&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}