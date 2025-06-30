import { useColors } from "@/context/ColorsContext";
import ColorPicker from "./colorPicker/ColorPicker";

import styles from "./colorsContainer.module.scss";

const ColorsContainer = () => {
  const { colors, addColor, deleteColor, updateColor } = useColors();

  return (
    <div className={`${styles["colors-container"]}`}>
      <div className="flex flex-wrap flex-column gap-2">
        {colors.map((color) => (
          <ColorPicker
            key={color.id}
            color={color.value}
            id={color.id}
            onDelete={deleteColor}
            onUpdate={updateColor}
          />
        ))}
      </div>
      <button
        onClick={() => addColor()}
        className={`${styles["add-color-button"]} px-3 py-3`}
      >
        + Add Color
      </button>
    </div>
  );
};
export default ColorsContainer;
