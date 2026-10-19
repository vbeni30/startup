import { ImageResponse } from "next/og";

export const alt = "Second Form — Good business. Outgrown your website?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#f4f2eb",
        color: "#242923",
        padding: "58px 64px 50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.28,
          backgroundImage:
            "linear-gradient(#c6cbb7 1px, transparent 1px), linear-gradient(90deg, #c6cbb7 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "linear-gradient(90deg, transparent 44%, black 75%)",
        }}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
          <div style={{ width: 43, height: 43, display: "flex", position: "relative" }}>
            <div
              style={{
                width: 30,
                height: 30,
                display: "flex",
                position: "absolute",
                left: 0,
                top: 0,
                border: "3px solid #c34224",
              }}
            />
            <div
              style={{
                width: 30,
                height: 30,
                display: "flex",
                position: "absolute",
                left: 13,
                top: 13,
                background: "#c34224",
              }}
            />
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "-1.5px" }}>
            second form<span style={{ color: "#c34224" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: 690, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 22,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "2.4px",
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  display: "flex",
                  borderRadius: "50%",
                  background: "#c34224",
                }}
              />
              A FRESH PERSPECTIVE
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 82,
                lineHeight: 0.94,
                letterSpacing: "-5px",
              }}
            >
              <span>Good business.</span>
              <span>Outgrown</span>
              <span
                style={{
                  color: "#c34224",
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: 91,
                  letterSpacing: "-4px",
                }}
              >
                your website?
              </span>
            </div>
          </div>

          <div
            style={{
              width: 350,
              height: 267,
              display: "flex",
              flexDirection: "column",
              transform: "rotate(3deg)",
              background: "#f7f5ea",
              border: "1px solid #9ba491",
              borderRadius: 8,
              boxShadow: "0 24px 45px rgba(36, 41, 35, 0.18)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 31,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 13px",
                background: "#efefe8",
                borderBottom: "1px solid #d3d6ca",
                color: "#74796c",
                fontSize: 9,
              }}
            >
              <span style={{ display: "flex", gap: 5 }}>
                <i style={{ width: 5, height: 5, display: "flex", borderRadius: "50%", background: "#b7baad" }} />
                <i style={{ width: 5, height: 5, display: "flex", borderRadius: "50%", background: "#b7baad" }} />
                <i style={{ width: 5, height: 5, display: "flex", borderRadius: "50%", background: "#b7baad" }} />
              </span>
              lindenandco.example
              <span>↗</span>
            </div>
            <div style={{ display: "flex", flex: 1, padding: "24px 25px", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9 }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 18 }}>linden & co.</span>
                <span>Spaces &nbsp; Studio</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", marginTop: 39 }}>
                <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "1.4px" }}>
                  INTERIORS, WITH INTENTION.
                </span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 11,
                    fontFamily: "Georgia, serif",
                    fontSize: 38,
                    lineHeight: 0.98,
                    letterSpacing: "-1.5px",
                  }}
                >
                  <span>Space for</span>
                  <span style={{ fontStyle: "italic" }}>living well.</span>
                </span>
                <span
                  style={{
                    width: 122,
                    display: "flex",
                    marginTop: 22,
                    padding: "9px 11px",
                    background: "#394a3a",
                    color: "#fffdf7",
                    fontSize: 8,
                  }}
                >
                  Discover our work ↗
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 23,
            borderTop: "1px solid #d5d6cb",
            color: "#5b6259",
            fontSize: 16,
          }}
        >
          <span>Thoughtful redesigns for your next chapter.</span>
          <span style={{ color: "#c34224", fontSize: 14, fontWeight: 700, letterSpacing: "1.6px" }}>
            CLEARER STORY · CONSIDERED DESIGN · RESPONSIVE REBUILD
          </span>
        </div>
      </div>
    </div>,
    size,
  );
}
