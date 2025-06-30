export function hexToHSL(hex) {
  let r, g, b;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else {
    throw new Error("Formato HEX inválido");
  }

  return rgbToHSL(r, g, b);
}

export function rgbToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) h = s = 0;
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

export function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    Math.round(
      255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
    );
  return (
    "#" +
    [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, "0")).join("")
  );
}

export function generateShades(baseColor, steps = 11) {
  const [h, s, l] = parseColorToHSL(baseColor);
  const shades = [];
  for (let i = 0; i < steps; i++) {
    const lightness = 95 - i * (90 / (steps - 1)); // de 95% a 5%
    shades.push(hslToHex(h, s, lightness));
  }
  return shades;
}

export function parseColorToHSL(color) {
  if (color.startsWith("#")) {
    return hexToHSL(color);
  }

  const rgbMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch.map(Number);
    return rgbToHSL(r, g, b);
  }

  throw new Error("Formato de color no soportado: " + color);
}
