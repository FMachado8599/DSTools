import { createContext, useContext, useEffect, useState } from "react";

const ColorsContext = createContext();

export const ColorsProvider = ({ children }) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("colors"));
    if (stored) {
      setColors(stored);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  const addColor = (color = "#000000") => {
    const newColor = { id: crypto.randomUUID(), value: color };
    setColors((prev) => [...prev, newColor]);
  };

  const deleteColor = (id) => {
    setColors((prev) => prev.filter((c) => c.id !== id));
  };

  const updateColor = (id, newValue) => {
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: newValue } : c))
    );
  };

  return (
    <ColorsContext.Provider
      value={{ colors, addColor, deleteColor, updateColor }}
    >
      {children}
    </ColorsContext.Provider>
  );
};

export const useColors = () => useContext(ColorsContext);
