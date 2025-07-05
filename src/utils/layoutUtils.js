export const breakpoints = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0,
};

export const cols = {
  lg: 12,
  md: 10,
  sm: 6,
  xs: 4,
  xxs: 2,
};

export const generateSafeLayouts = (layouts, renderedComponents) => {
  const safeLayouts = {};

  for (const bp in layouts) {
    safeLayouts[bp] = [...layouts[bp]];

    renderedComponents.forEach((key, index) => {
      const exists = safeLayouts[bp].some((item) => item.i === key);
      if (!exists) {
        safeLayouts[bp].push({
          i: key,
          x: (index * 2) % (cols[bp] || 12),
          y: Infinity,
          w: 2,
          h: 2,
        });
      }
    });
  }

  return safeLayouts;
};
