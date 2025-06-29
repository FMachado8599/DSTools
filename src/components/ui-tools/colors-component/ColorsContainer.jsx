import { useEffect, useState } from "react";
import ColorPicker from "../colorPicker/ColorPicker";

import styles from "./colorsContainer.module.scss";

const ColorsContainer = () => {

    const [colors, setColors] = useState([]);

    useEffect(() => {
        const storedColors = JSON.parse(localStorage.getItem('colors'));
        if (storedColors) {
        setColors(storedColors);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('colors', JSON.stringify(colors));
    }, [colors]);

    const addColor = (color = "#000000") => {
        const newColor = {
            id: crypto.randomUUID(),
            value: color
        };
        setColors(prevColors => [...prevColors, newColor]);
    };

    const deleteColor = (idToDelete) => {
    setColors(prevColors => prevColors.filter(c => c.id !== idToDelete));
    };

    const updateColor = (idToUpdate, newColor) => {
    setColors(prevColors =>
        prevColors.map(c => c.id === idToUpdate ? { ...c, value: newColor } : c)
    );
    };

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
  )
}
export default ColorsContainer