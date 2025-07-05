import ColorsContainer from "@/components/ui-tools/colors-component/ColorsContainer.jsx";
import ShadesGrid from "@/components/ui-tools/shades-component/ShadesGrid.jsx";
import QrGenerator from "@/components/ui-tools/qr-generator/qrGenerator.jsx";

export const componentMetadata = {
  colors: {
    name: "Color Picker",
    preview: "https://placehold.co/600x400",
    component: ColorsContainer,
  },
  shades: {
    name: "Shades Grid",
    preview: "https://placehold.co/600x400",
    component: ShadesGrid,
  },
  qr: {
    name: "QR Generator",
    preview: "https://placehold.co/600x400",
    component: QrGenerator,
  },
};
