import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Stanley Taber",
    role: "Director at Lorem Ipsum",
    message:
      "Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta. Nam condimentum vitae ligula.",
    image:
      "https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/1/avatar-male-1.png",
  },
  {
    name: "Ruveyda Crutzen",
    role: "Project Manager at Lorem Ipsum",
    message:
      "Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim neque.",
    image:
      "https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/1/avatar-female-1.png",
  },
  {
    name: "Sophie Lambert",
    role: "CEO at Lorem Ipsum Dolor",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie.",
    image:
      "https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/1/avatar-female-2.png",
  },
  {
    name: "Robert S. McCully",
    role: "Employee at Lorem Ipsum",
    message:
      "Ut porta viverra est, ut dignissim elit elementum ut. Nunc vel rhoncus nibh, ut tincidunt turpis. Integer ac enim pellentesque, adipiscing metus id.",
    image:
      "https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/1/avatar-male-2.png",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-transparent ">
      <div className="max-w-7xl mx-auto px-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
          <span className="text-gray-500">See what</span>{" "}
          <span className="text-indigo-600">our members</span>{" "}
          <span className="text-gray-500">are saying</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="cale-105 bg-white/5 rounded-xl backdrop-blur-sm border border-green-500/20 transition-all duration-300 rounded-2xl p-6 hover:shadow-xl "
            >
              <Quote className="w-8 h-8 text-indigo-500 mb-4 mx-auto" />
              <p className="text-gray-100 italic mb-4">“{t.message}”</p>
              <div className="flex flex-col items-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover mb-3"
                />
                <p className="font-semibold text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-200">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
