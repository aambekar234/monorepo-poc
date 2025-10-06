"use client";

import { useMemo } from "react";
import { Button } from "@myorg/ui";

export default function ClientHome() {
  function sendMessageToArtboard() {
    const frame = document.querySelector('iframe[title="artboard"]');
    frame?.contentWindow?.postMessage(
      { type: "PING", data: "Hello from Client" },
      process.env.NEXT_PUBLIC_ARTBOARD_URL
    );
  }

  // During dev, Artboard runs on :3001; in prod, use an env var (NEXT_PUBLIC_ARTBOARD_URL)
  const artboardUrl = useMemo(() => process.env.NEXT_PUBLIC_ARTBOARD_URL, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>🧩 Client</h1>
      <p>Main shell. Artboard is embedded below.</p>

      <div style={{ margin: "12px 0" }}>
        <Button
          onClick={() => {
            sendMessageToArtboard();
            alert("Client button clicked!");
          }}
        >
          Client Button
        </Button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <iframe
          title="artboard"
          src={artboardUrl}
          style={{ width: "100%", height: 600, border: "0", zIndex: 1000 }}
        />
      </div>
    </main>
  );
}
