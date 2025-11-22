'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PdfOverlay = dynamic(() => import('./PdfOverlay'), { ssr: false });

const ResultsPage = () => {
  const [fileData, setFileData] = useState<string | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("uploadedFile");
    setFileData(data);
  }, []);
  if (!fileData) {
    return <div>Loading...</div>;
  }



  return (
    <div className="flex h-screen gap-10">
      {/* Sidebar */}
      <div className="w-3/5 overflow-y-auto ">
        <div className="m-4 ml-8 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-green-500/20 transition-all duration-300">
          <div className="flex justify-between w-full">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-white">
              Your Resume ATS score result
            </h2>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
              Score: {25}%
            </h2>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${25}%` }}
            ></div>
          </div>
          <div className="flex justify-between w-full">
            <a
              href="#"
              title=""
              className="inline-flex items-center px-3 py-0 font-semibold text-white bg-white/5 rounded-xl backdrop-blur-sm border border-green-500/20"
              role="button"
            >
              Fix your resume
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
            </a>
            <a
              href="#"
              title=""
              className="inline-flex items-center px-6 py-2 underline"
              role="button"
            >
              Upload and rescan
            </a>
          </div>
          <h2 className="text-xl font-bold my-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">
            Review our suggestions to see what you can fix.{" "}
          </h2>
        </div>
      </div>
      {/* File Display */}
      <div className="w-2/5 p-4  overflow-y-auto fixed top-20 right-0">
        <PdfOverlay url={fileData} pdf_height={"100%"} dynamicWidth={35} />
      </div>
    </div>
  );
};

export default ResultsPage;
