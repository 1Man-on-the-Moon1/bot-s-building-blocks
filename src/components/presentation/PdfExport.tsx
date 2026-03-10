import { useState, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { Download, Loader2 } from "lucide-react";

import SlideTitle from "./slides/SlideTitle";
import SlideProblem from "./slides/SlideProblem";
import SlideSolution from "./slides/SlideSolution";
import SlideFeatures from "./slides/SlideFeatures";
import SlideUserFlow from "./slides/SlideUserFlow";
import SlideRating from "./slides/SlideRating";
import SlideMarket from "./slides/SlideMarket";
import SlideMonetization from "./slides/SlideMonetization";
import SlideTech from "./slides/SlideTech";
import SlideRoadmap from "./slides/SlideRoadmap";
import SlideContact from "./slides/SlideContact";

const slides = [
  SlideTitle, SlideProblem, SlideSolution, SlideFeatures, SlideUserFlow,
  SlideRating, SlideMarket, SlideMonetization, SlideTech, SlideRoadmap, SlideContact,
];

const PdfExportButton = () => {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const exportPdf = useCallback(async () => {
    setExporting(true);
    setProgress(0);

    try {
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [1920, 1080] });

      // Create off-screen container
      const container = document.createElement("div");
      container.style.cssText = "position:fixed;left:-9999px;top:0;width:1920px;height:1080px;overflow:hidden;z-index:-1;";
      document.body.appendChild(container);

      for (let i = 0; i < slides.length; i++) {
        setProgress(Math.round(((i) / slides.length) * 100));

        // Render slide into container
        const slideDiv = document.createElement("div");
        slideDiv.style.cssText = "width:1920px;height:1080px;position:relative;overflow:hidden;";
        slideDiv.className = "slide-gradient-bg";
        container.innerHTML = "";
        container.appendChild(slideDiv);

        const SlideComponent = slides[i];
        const root = createRoot(slideDiv);
        root.render(<SlideComponent />);

        // Wait for render
        await new Promise((r) => setTimeout(r, 300));

        const canvas = await html2canvas(slideDiv, {
          width: 1920,
          height: 1080,
          scale: 1,
          useCORS: true,
          backgroundColor: "#0d0d12",
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.92);

        if (i > 0) pdf.addPage([1920, 1080], "landscape");
        pdf.addImage(imgData, "JPEG", 0, 0, 1920, 1080);

        root.unmount();
      }

      document.body.removeChild(container);

      setProgress(100);
      pdf.save("CITRAMON_DATING_Pitch.pdf");
    } catch (err) {
      console.error("PDF export error:", err);
    } finally {
      setExporting(false);
      setProgress(0);
    }
  }, []);

  return (
    <button
      onClick={exportPdf}
      disabled={exporting}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl card-glass text-foreground/70 hover:text-foreground transition-all text-sm font-medium disabled:opacity-60"
      title="Скачать PDF"
    >
      {exporting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{progress}%</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>PDF</span>
        </>
      )}
    </button>
  );
};

export default PdfExportButton;
