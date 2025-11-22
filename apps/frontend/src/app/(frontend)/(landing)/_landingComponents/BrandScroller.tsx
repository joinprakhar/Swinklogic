import React from "react";

const BrandScroller = () => {
  const logos = [
    "https://landingfoliocom.imgix.net/store/collection/dusk/images/cloud-logos/3/logo-waverio.svg",
    "https://landingfoliocom.imgix.net/store/collection/dusk/images/cloud-logos/3/logo-tinygone.svg",
    "https://landingfoliocom.imgix.net/store/collection/dusk/images/cloud-logos/3/logo-ridoria.svg",
    "https://landingfoliocom.imgix.net/store/collection/dusk/images/cloud-logos/3/logo-alterbone.svg",
    "https://landingfoliocom.imgix.net/store/collection/dusk/images/cloud-logos/3/logo-logoipsum.svg",
    "https://landingfoliocom.imgix.net/store/collection/dusk/images/cloud-logos/3/logo-preso.svg",
    "https://landingfoliocom.imgix.net/store/collection/dusk/images/cloud-logos/3/logo-carbonia.svg",
  ];

  return (
    <section className="overflow-hidden bg-transparent pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-gray-100 text-xl font-semibold mb-6">
          1000 + companies and platforms available here
        </h2>

        {/* Scrolling logos */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {[...logos, ...logos].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`brand-${index}`}
                className="h-12 mx-10 inline-block"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandScroller;
