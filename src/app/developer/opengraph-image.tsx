import { ImageResponse } from "next/og";
import { DEVELOPER } from "@/data/developer";

// The preview card shown when the developer page is shared or listed: the
// name large in the site's blue and yellow, with the role and location.
export const alt = `${DEVELOPER.name} — ${DEVELOPER.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#183fad",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 40, color: "#abb9de" }}>Mugsy&apos;s Mugs · Developer</div>
        <div style={{ marginTop: 24, fontSize: 120, fontWeight: 800, color: "#F1BF0A", lineHeight: 1 }}>
          {DEVELOPER.name.toUpperCase()}
        </div>
        <div style={{ marginTop: 28, fontSize: 52 }}>{DEVELOPER.role}</div>
        <div style={{ marginTop: 12, fontSize: 36, color: "#abb9de" }}>
          {`${DEVELOPER.location.city}, ${DEVELOPER.location.country} · Next.js · React · TypeScript · Node.js`}
        </div>
      </div>
    ),
    size
  );
}
