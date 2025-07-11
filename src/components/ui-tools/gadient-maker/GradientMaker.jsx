import { useState } from "react";
import styles from "./gradient-maker.module.scss";

const GradientMaker = () => {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [type, setType] = useState("linear");
  const [direction, setDirection] = useState("to right");
  const [copied, setCopied] = useState(false);

  const gradient =
    type === "linear"
      ? `linear-gradient(${direction}, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`background: ${gradient};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.component_container}>
      <h3>Gradient Maker</h3>

      <div className={styles.controls}>
        <label>
          Color 1:
          <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
        </label>

        <label>
          Color 2:
          <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
        </label>

        <label>
          Tipo:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </label>

        {type === "linear" && (
          <label>
            Dirección:
            <input
              type="text"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              placeholder="to right, 45deg, etc."
            />
          </label>
        )}
      </div>

      <div className={styles.preview} style={{ background: gradient }}>
        <p>Preview</p>
      </div>

      <div className={styles.code_block}>
        <code>background: {gradient};</code>
        <button onClick={handleCopy}>{copied ? "Copiado!" : "Copiar CSS"}</button>
      </div>
    </div>
  );
};

export default GradientMaker;
