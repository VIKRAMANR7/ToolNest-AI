import { assets, testimonialsData } from "../assets/assets";

export default function Testimonial() {
  return (
    <section className="bg-white px-4 py-20 sm:px-20 xl:px-32">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Loved by Creators</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Hear what our users are saying about ToolNest AI.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsData.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => {
                const isFilled = i < t.rating;
                return (
                  <img
                    key={i}
                    src={isFilled ? assets.star_icon : assets.star_dull_icon}
                    alt={isFilled ? "Star" : "Empty star"}
                    className="h-5 w-5"
                  />
                );
              })}
            </div>

            <p className="mb-6 text-sm leading-relaxed text-gray-600">“{t.content}”</p>

            <hr className="mb-6 border-gray-200" />

            <div className="flex items-center gap-4">
              <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <h4 className="font-semibold text-gray-900">{t.name}</h4>
                <p className="text-xs text-gray-500">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
