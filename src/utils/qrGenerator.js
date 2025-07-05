export default function generateQR(text, container) {
  if (!container) return;

  container.innerHTML = "";

  if (text.trim() === "") {
    alert("Escribí algo papito");
    return;
  }

  new QRCode(container, {
    text: text,
    width: 100,
    height: 100,
    colorDark: "#ffffff",
    colorLight: "#141e30",
  });
}