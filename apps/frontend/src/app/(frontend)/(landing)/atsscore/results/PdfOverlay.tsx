import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs, TextContent } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface HighlightBlock {
  Id: string;
  Page: number;
  Geometry: {
    BoundingBox: {
      Height: number;
      Width: number;
      Left: number;
      Top: number;
    };
  };
}



interface PdfOverlayProps {
  url: string | File;
  layoutype?: HighlightBlock[];
  pdf_height?: string;
  dynamicWidth?: number;
}

const PdfOverlay: React.FC<PdfOverlayProps> = ({ url, layoutype, pdf_height, dynamicWidth }) => {
  const [highlights, setHighlights] = useState<HighlightBlock[]>([]);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>((dynamicWidth ? dynamicWidth / 100 : 1) * 2.5);


  useEffect(() => {
    setHighlights(layoutype || []);
  }, [layoutype]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = (_page: unknown) => {
    // Optional: handle page load
  };

  const onGetTextSuccess = (textContent: TextContent) => {
    // setTextItems(items);
  };

  const renderHighlights = (pageIndex: number, pageSize: { width: number; height: number }) => {
    const { width, height } = pageSize;
    return highlights?.map((block) => {
      const { Height, Width, Left, Top } = block.Geometry.BoundingBox;
      if (block.Page === pageIndex + 1) {
        return (
          <div
            key={block.Id}
            style={{
              position: "absolute",
              top: `${Top * height - 2}px`,
              left: `${Left * width - 1}px`,
              width: `${Width * width + 2}px`,
              height: `${Height * height + 2}px`,
              backgroundColor: "rgba(166, 166, 162, 0.5)",
              pointerEvents: "none",
              padding: "3px",
            }}
          ></div>
        );
      } else {
        return null;
      }
    });
  };



  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          width: `${Number(dynamicWidth)}vw`,
          height: pdf_height,
          background: "transparent",
        }}
      >
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={currentPage}
            scale={scale}
            onLoadSuccess={onPageLoadSuccess}
            onGetTextSuccess={onGetTextSuccess}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
          {renderHighlights(currentPage - 1, { width: 600, height: 800 })} {/* Approximate pageSize, adjust as needed */}
        </Document>
      </div>
      {/* <div className="sidebar_preview_control_pannel">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={zoomIn}>
          <i className="fa fa-search-plus" aria-hidden="true"></i>
        </button>
        <button onClick={zoomOut}>
          <i className="fa fa-search-minus" aria-hidden="true"></i>
        </button>
        <button onClick={goToPreviousPage} disabled={currentPage <= 1}>
          <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
        </button>
        <span>
          {currentPage} / {numPages}
        </span>
        <button onClick={goToNextPage} disabled={numPages ? currentPage >= numPages : true}>
          <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
        </button>
      </div> */}
    </div>
  );
};

export default PdfOverlay;
