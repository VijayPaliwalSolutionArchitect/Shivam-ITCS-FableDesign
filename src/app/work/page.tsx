import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";

export const metadata: Metadata = {
  title: "Our Work — AI Products & Case Studies",
  description:
    "Real products, real clients, real production environments — across the USA, Europe and India. Commander Architecture, Hospital OS, HiveGPT, Social27, and more.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="relative z-10">
      <WorkGrid />
    </div>
  );
}
