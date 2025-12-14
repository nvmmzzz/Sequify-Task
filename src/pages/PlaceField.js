import React, { useState, useRef } from "react";
import PdfViewer from "../components/PdfViewer";

function PlaceField({ placedFields, setPlacedFields, goNext }) {
  const [isDragging, setIsDragging] = useState(false);
  const [, setDragPos] = useState({ x: 0, y: 0 });
  const pdfRef = useRef(null);

  const startDrag = (e) => {
    setIsDragging(true);
    setDragPos({ x: e.clientX, y: e.clientY });

    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", onDragEnd);
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const onDragEnd = (e) => {
    setIsDragging(false);

    const pdfRect = pdfRef.current.getBoundingClientRect();

    // Check if dropped inside PDF
    const isInsidePDF =
      e.clientX >= pdfRect.left &&
      e.clientX <= pdfRect.right &&
      e.clientY >= pdfRect.top &&
      e.clientY <= pdfRect.bottom;

    if (isInsidePDF) {
      setPlacedFields((prev) => [
        ...prev,
        {
          x: e.clientX - pdfRect.left,
          y: e.clientY - pdfRect.top,
          value: "",
        },
      ]);
    }

    window.removeEventListener("mousemove", onDragMove);
    window.removeEventListener("mouseup", onDragEnd);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Pane */}
      {/* PDF Viewer */}
      <div ref={pdfRef} style={{ width: "70%", position: "relative" }}>
        <PdfViewer fileUrl="/blank_pdf.pdf" />

        {/* Display already placed fields */}
        {placedFields.map((f, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: f.y,
              left: f.x,
              background: "#fff",
              padding: "6px 20px",
              borderRadius: 4,
              border: "1px solid #999",
              pointerEvents: "none", // fields are not editable here
            }}
          >
            Field {i + 1}
          </div>
        ))}
      </div>

      {/* Right Pane */}
      {/* Complete Pane */}
      <div
        style={{
          width: "30%",
          padding: 20,
          background: "#f3f3f3",
          borderLeft: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Input Box */}
        <div
          onMouseDown={startDrag}
          style={{
            width: "70%",
            padding: "6px 10px",
            border: "1px solid #111",
            borderRadius: 2,
            cursor: "grab",
            textAlign: "center",
          }}
        >
          Input Text
        </div>

        {/* Save and Go To Next Screen */}
        <button
          onClick={goNext}
          style={{
            marginTop: "auto",
            padding: 10,
            width: "80%",
          }}
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}

export default PlaceField;
