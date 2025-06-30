export function getTextColorForBackground(hexColor) {
  if (!hexColor || typeof hexColor !== "string" || !hexColor.startsWith("#")) {
    return "#000000"; // fallback por si hay error
  }

  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  const [R, G, B] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}
