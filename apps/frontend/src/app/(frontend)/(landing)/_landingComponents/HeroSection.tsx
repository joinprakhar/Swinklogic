import { AudioWaveform, BrainCircuit, ScanSearch } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="px-4 pb-15 lg:pb-25  mx-auto max-w-7xl sm:px-6 lg:px-8 relative">
      <div className="max-w-xxl mx-auto text-center ">
        <h1 className="text-3xl font-bold sm:text-6xl pt-30 md:pt-10">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
            Simplified solution for
          </span>
        </h1>
        <h1 className="text-4xl font-bold sm:text-6xl space-x-5 py-5 flex justify-center flex-wrap flex-col lg:flex-row items-center lg:gap-3 leading-18">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-white">
            Searching,
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
            Tracking
          </span>
          <span className="text-transparent text-xl bg-clip-text bg-gradient-to-r from-white to-white">
            and
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">
            AI Prepration
          </span>
        </h1>{" "}
        <h1 className="text-xl font-bold sm:text-4xl pb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
            Designed for Your Next Big Jump{" "}
          </span>
        </h1>
        <p className="mt-5 text-base text-white sm:text-xl">
          No more hassle exploring multiple platforms. Our all-in-one solution
          streamlines your job search, application tracking, and preparation
          process.
        </p>
        <Link href={"dashboard"}>
          <div
            title=""
            className="inline-flex items-center px-6 py-4 mt-16 font-semibold text-white bg-white/5 rounded-xl backdrop-blur-sm border border-green-500/20"
            role="button"
          >
            Get Started for free
            <svg
              className="w-6 h-6 ml-4 -mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </Link>
        {/* three lines */}
        <div className="grid grid-cols-1 px-20 mt-12 text-left gap-x-12 gap-y-8 sm:grid-cols-3 sm:px-0">
          <div className="flex items-center justify-center flex-col">
            <ScanSearch className="flex-shrink-0 w-16 h-16 text-white py-3" />

            <p className="ml-3 text-md  text-center text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-white">
              Instant access to multiple job posted accross platforms and
              companies
            </p>
          </div>

          <div className="flex items-center justify-center flex-col">
            <AudioWaveform className="flex-shrink-0 w-16 h-16 text-white py-3" />
            <p className="ml-3 text-md  text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
              Track applications and resume enhancement in one place
            </p>
          </div>

          <div className="flex items-center justify-center flex-col">
            <BrainCircuit className="flex-shrink-0 w-16 h-16 text-white py-3" />
            <p className="ml-3 text-md  text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">
              AI Audio / Video mock interview Prepration with curated resources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
