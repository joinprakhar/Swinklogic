import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden py-16 px-16 bg-[#172826] opacity-100 text-gray-300">
      {/* Gradient Blur Background */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-40"
          width="612"
          height="396"
          viewBox="0 0 612 396"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M225.569 296.184c-129.505-34.7-253.236 49.082-218.753-79.613C41.3 87.876 436.205-28.039 565.71 6.662c129.505 34.701-55.432 206.876-89.916 335.571-34.484 128.695-120.721-11.348-250.225-46.049Z"
            fill="url(#c)"
          />
          <defs>
            <linearGradient
              id="c"
              x1="623.268"
              y1="22.085"
              x2="453.193"
              y2="459.449"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center lg:flex-row gap-12 lg:justify-between">
        {/* Top CTA Section */}
        <div className="text-center lg:text-start mb-12">
          <span className="text-3xl max-w-md font-medium text-gray-100">
            Swinklogic helps you to grow 
          </span>
          <p className="text-3xl max-w-md font-medium text-gray-100">
            your career fast.
          </p>
          <a
            href="#"
            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-[#101212] to-[#08201D] text-white font-semibold rounded-full shadow-md hover:from-cyan-400 hover:to-purple-500 transition-all"
          >
            Start Free Today
          </a>
        </div>

        {/* Footer Links Grid */}
        <div className="flex flex-row items-center justify-center lg:justify-end gap-8 lg:gap-30 flex-wrap text-center sm:text-left w-full">
          <div>
            <h6 className="text-lg font-semibold text-white mb-3">Platform</h6>
            <ul className="space-y-2">
              {["About", "Features", "Pricing & Plans", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold text-white mb-3">Resources</h6>
            <ul className="space-y-2">
              {["Account", "Tools", "Newsletter", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold text-white mb-3">Legals</h6>
            <ul className="space-y-2">
              {[
                "Guides",
                "Terms & Conditions",
                "Privacy Policy",
                "Licensing",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
      </div>
      <hr className="my-10 border-gray-700  max-w-7xl mx-auto" />
      {/* Bottom Social Section */}
      <div className="flex flex-col max-w-7xl mx-auto sm:flex-row justify-between items-center gap-4">
        <span className="text-sm text-gray-400">
          © {new Date().getFullYear()} Swinklogic. All rights reserved.
        </span>

        <div className="flex items-center space-x-5">
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
