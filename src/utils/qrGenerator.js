import { useState } from "react";
import { QRCode } from "qrcode.react";

const QrGenerator = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <h1>🎉 Generador de Código QR</h1>
      <input
        type="text"
        value={text}
        placeholder="Escribir..."
        onChange={(e) => setText(e.target.value)}
      />
      {text.trim() !== "" && (
        <QRCode value={text} size={128} bgColor="#141e30" fgColor="#ffffff" />
      )}
    </div>
  );
};

export default QrGenerator;
