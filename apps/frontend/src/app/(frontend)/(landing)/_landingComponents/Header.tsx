import Link from "next/link";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-10 w-full">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <a href="#" title="" className="flex">
              <span className="text-3xl mr-5">SwinkLogic</span>
            </a>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10 ml-29">
            <a
              href="#"
              title=""
              className="text-base text-white transition-all duration-200 hover:text-opacity-80"
            >
              {" "}
              Features{" "}
            </a>

            <a
              href="#"
              title=""
              className="text-base text-white transition-all duration-200 hover:text-opacity-80"
            >
              {" "}
              Solutions{" "}
            </a>

            <a
              href="#"
              title=""
              className="text-base text-white transition-all duration-200 hover:text-opacity-80"
            >
              {" "}
              Resources{" "}
            </a>

            <a
              href="#"
              title=""
              className="text-base text-white transition-all duration-200 hover:text-opacity-80"
            >
              {" "}
              Pricing{" "}
            </a>
          </div>

          <div className="lg:flex lg:items-center lg:justify-end lg:space-x-6 sm:ml-auto">
            <a
              href="#"
              title=""
              className="hidden text-base text-white transition-all duration-200 lg:inline-flex hover:text-opacity-80"
            >
              {" "}
              Log in{" "}
            </a>
            <Link href={"dashboard"}>
              <div
                title=""
                className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold bg-white/5 rounded-xl backdrop-blur-sm border border-green-500/20 rounded-lg text-white"
                role="button"
              >
                {" "}
                Get Started for free{" "}
              </div>
            </Link>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
