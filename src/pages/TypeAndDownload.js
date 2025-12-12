import React, { useState } from "react";
import PdfViewer from "../components/PdfViewer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function TypeAndDownload({ placedFields, reset }) {
  const [fields, setFields] = useState(placedFields);

  const updateValue = (i, v) => {
    const copy = [...fields];
    copy[i].value = v;
    setFields(copy);
  };

const downloadPdf = async () => {
  const existingPdfBytes = await fetch("/blank_pdf.pdf").then((r) =>
    r.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page = pdfDoc.getPage(0);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pdfContainer = document.getElementById("pdf-container");
  const containerWidth = pdfContainer.offsetWidth;
  const containerHeight = pdfContainer.offsetHeight;

  const scaleX = page.getWidth() / containerWidth;
  const scaleY = page.getHeight() / containerHeight;

  fields.forEach((f) => {
    const pdfX = f.x * scaleX;
    const pdfY = page.getHeight() - f.y * scaleY - 12; // adjust font size
    page.drawText(f.value, {
      x: pdfX,
      y: pdfY,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "TypedPDF.pdf";
  link.click();

  reset();
};


  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* PDF container */}
      <div id="pdf-container" style={{ width: "70%", position: "relative" }}>
        <PdfViewer fileUrl="/blank_pdf.pdf" />

        {/* Overlay inputs */}
        {fields.map((f, i) => (
          <input
            key={i}
            value={f.value}
            onChange={(e) => updateValue(i, e.target.value)}
            style={{
              position: "absolute",
              top: f.y,
              left: f.x,
              width: 120,
              padding: 4,
              border: "1px solid #000",
              borderRadius: 4,
              background: "white",
              zIndex: 10,
            }}
          />
        ))}
      </div>

      {/* Right pane */}
      <div style={{ width: "30%", padding: 20 }}>
        <button
          onClick={downloadPdf}
          style={{ padding: 10, width: "100%", marginTop: 20 }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default TypeAndDownload;
