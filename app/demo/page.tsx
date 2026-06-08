"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">SPECTRA-IDS Command Center</h1>
        <p className="text-slate-400 mb-8">The interactive demo has been integrated into the main command center.</p>
        <Link href="/command-center/dashboard">
          <Button className="bg-green-900/50 hover:bg-green-900/70 text-green-400 border border-green-700/50">
            Launch Command Center
          </Button>
        </Link>
      </div>
    </div>
  );
}
