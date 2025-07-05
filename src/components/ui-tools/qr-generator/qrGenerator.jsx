import { useRef, useState } from "react";
import generateQR from "@/utils/qrGenerator.js";

const QrGenerator = () => {
  const [text, setText] = useState("");
  const qrCodeRef = useRef(null);

  const handleGenerate = () => {
    if (qrCodeRef.current) {
      generateQR(text, qrCodeRef.current);
    }
  };

  return (
    <div>
      <h1>🎉 Generador de Código QR</h1>
      <input
        type="text"
        value={text}
        placeholder="Escribir..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate</button>
      <div ref={qrCodeRef}></div>
    </div>
  );
};

export default QrGenerator;