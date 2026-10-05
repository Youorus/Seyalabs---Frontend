import { ImageResponse } from "next/og";
export const alt = "SEYA LABS — La technologie à la mesure de votre entreprise.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#F3F0E8", padding: "60px 70px", display: "flex", flexDirection: "column", color: "#11100E" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}><span style={{ fontWeight: 700 }}>SEYA LABS</span><span style={{ color: "#6B645B", fontSize: 17 }}>SOFTWARE × AI × AUTOMATION</span></div>
    <div style={{ display: "flex", flexDirection: "column", fontSize: 80, letterSpacing: -4, lineHeight: 1.1, marginTop: 80 }}><span>La technologie.</span><span>À la mesure de</span><span style={{ color: "#A94021" }}>votre entreprise.</span></div>
    <div style={{ display: "flex", marginTop: "auto", justifyContent: "space-between", borderTop: "1px solid #C9BDAE", paddingTop: 20, fontSize: 17 }}><span>DU CADRAGE À LA PRODUCTION.</span><span>seyalabs.com</span></div>
  </div>, size);
}
