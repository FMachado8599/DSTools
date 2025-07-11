import { useState } from "react";

const GradientCode = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`background: ${code};`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div>
      <p><strong>CSS:</strong></p>
      <code>background: {code};</code>
      <button onClick={handleCopy}>{copied ? "Copiado!" : "Copiar CSS"}</button>
    </div>
  );
};

export default GradientCode;