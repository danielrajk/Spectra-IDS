"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Mechanisms", href: "#mechanisms" },
  { label: "Results", href: "#results" },
  { label: "Live Demo", href: "/demo" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-accent" />
          <span className="font-bold text-lg">
            SPECTRA<span className="text-accent">-IDS</span>
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <Link href="/demo">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Live Demo
            </Button>
          </Link>
          <Link href="/paper">
            <Button variant="outline" size="sm" className="border-border hover:bg-secondary">
              View Paper
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link href="/demo" className="block">
              <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Live Demo
              </Button>
            </Link>
            <Link href="/paper" className="block">
              <Button variant="outline" size="sm" className="w-full border-border hover:bg-secondary">
                View Paper
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
