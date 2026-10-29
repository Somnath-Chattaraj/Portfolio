import { ImageResponse } from "next/og";
export const alt = "Somnath Chattaraj — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f8f8f4",
          color: "#242b28",
          padding: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26 }}>
          SC. / SOMNATH CHATTARAJ
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            letterSpacing: -3,
            lineHeight: 1.1,
          }}
        >
          <span>Thoughtful interfaces.</span>
          <span style={{ color: "#626b64" }}>Dependable systems.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24 }}>
          Software engineer · Kolkata, India · portfolio.somnathc.xyz
        </div>
      </div>
    ),
    size,
  );
}
