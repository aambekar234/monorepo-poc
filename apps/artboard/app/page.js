"use client";
import { Button } from "@myorg/ui";
import { useEffect } from "react";

export default function ArtboardHome() {
  useEffect(() => {
    function onMsg(e) {
      if (e.origin !== "http://localhost:3000") return;
      if (e.data?.type === "PING") {
        console.log("Artboard received:", e.data);
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);
  return (
    <main style={{ padding: 24 }}>
      <h1>🎨 Artboard</h1>
      <p>This app is meant to be embedded in an iframe.</p>
      <Button onClick={() => alert("Artboard says hi!")}>
        Click inside Artboard
      </Button>
    </main>
  );
}
