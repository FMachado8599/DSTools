import styles from "./colorPicker.module.scss";
import {useState} from "react";

function ColorPicker(){

    const [color, setColor] = useState("#000000");

    function handleColorChange(event) {
      setColor(event.target.value);
        console.log("Color seleccionado:", newColor);
    }

  return (
      <div className={styles["color-display"]}>
        <div className={styles["color-display-box-container"]}>
          <div style={{backgroundColor: color}} className={styles["color-display-box-overlay"]}></div>
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className={styles["color-display-box"]}
          />
        </div>
        <span>{color}</span>
      </div>

  )
}
export default ColorPicker