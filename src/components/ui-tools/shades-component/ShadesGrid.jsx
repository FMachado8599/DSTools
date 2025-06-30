import { useState, useEffect } from "react";
import { generateShades } from "@/utils/colorUtils";
import { useColors } from "@/context/ColorsContext";

import styles from "./ShadesGrid.module.scss";

export default function ShadesGrid({ steps = 11 }) {
  const { colors } = useColors();
  const [selectedColorId, setSelectedColorId] = useState(null);

  // Al cargar o si se cambia la lista, seleccionar el primero si hay
  useEffect(() => {
    if (colors.length > 0 && !selectedColorId) {
      setSelectedColorId(colors[0].id);
    }
  }, [colors, selectedColorId]);

  const selectedColorValue = colors.find(
    (c) => c.id === selectedColorId
  )?.value;

  let shades = [];
  try {
    if (selectedColorValue) {
      shades = generateShades(selectedColorValue, steps);
    }
  } catch (error) {
    return <p>Error generando shades: {error.message}</p>;
  }

  return (
    <div
      className={`${styles["shades-grid-container"]} flex flex-wrap flex-col gap-4 col-span-3`}
    >
      <select
        value={selectedColorId || ""}
        onChange={(e) => setSelectedColorId(e.target.value)}
        className={`${styles["select-color-input"]} rounded px-4 py-2`}
      >
        {colors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.value}
          </option>
        ))}
      </select>

      {shades.length > 0 && (
        <div className={`${styles["shades-grid"]} rounded px-4 py-2`}>
          {shades.map((shade, index) => (
            <div
              key={index}
              className={`${styles["shade-block"]} rounded-md h-16 text-xs flex items-center justify-center text-white`}
              style={{ backgroundColor: shade }}
            >
              {shade.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
