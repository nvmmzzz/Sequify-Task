import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import workerSrc from "pdfjs-dist/build/pdf.worker.min.js"; // PDF.js worker

function PdfViewer({ fileUrl, children }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Worker workerUrl={workerSrc}>
        <Viewer fileUrl={fileUrl} />
      </Worker>

      {/* Overlay for fields */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PdfViewer;
