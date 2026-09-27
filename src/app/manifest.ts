import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SHIVAM ITCS",
    short_name: "SHIVAM ITCS",
    description:
      "AI Infrastructure & Agentic Systems Partner. Intelligence That Ships.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0D10",
    theme_color: "#0B0D10",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
