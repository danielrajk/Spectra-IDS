# SPECTRA-IDS Technical Implementation Guide

## Table of Contents
1. [Project Setup](#project-setup)
2. [Architecture Overview](#architecture-overview)
3. [Key Components](#key-components)
4. [State Management](#state-management)
5. [Module Development](#module-development)
6. [Performance Optimization](#performance-optimization)
7. [Deployment](#deployment)
8. [Monitoring & Debugging](#monitoring--debugging)

---

## Project Setup

### Prerequisites
- Node.js 18.17+
- npm/yarn/pnpm
- Git
- Vercel account (for deployment)

### Installation

```bash
# Clone repository
git clone https://github.com/danielrajk/Spectra-IDS.git
cd Spectra-IDS

# Install dependencies
npm install
# or
pnpm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_APP_NAME=SPECTRA-IDS
NEXT_PUBLIC_VERSION=1.0.0

# Optional: API endpoints for real threat data
THREAT_API_ENDPOINT=
FEDERATED_LEARNING_ENDPOINT=
ENERGY_MONITOR_ENDPOINT=
```

---

## Architecture Overview

### Directory Structure
```
/app
  /command-center
    /dashboard              # Overview page
    /spectra-core          # Pipeline visualization
    /detection             # Live detection lab
    /network               # 6G network simulator
    /digital-twin          # Virtual environment
    /cdl                   # Chameleon drift layer
    /spd                   # Seismic pre-shock detector
    /ppe                   # Predator pursuit engine
    /ai                    # Hybrid AI engine
    /federated             # Federated learning hub
    /quantum               # Post-quantum security
    /energy                # Energy intelligence
    /adversarial           # Adversarial AI lab
    /xai                   # Explainable AI
    /intelligence          # Threat intelligence hub
    /simulator             # Attack simulator
    /evaluation            # Model evaluation
    /settings              # System settings
  layout.tsx              # Root layout
  page.tsx                # Redirects to dashboard

/components
  /command-center
    sidebar.tsx            # Navigation sidebar
    header.tsx             # Top navigation bar
    metrics-card.tsx       # Reusable metrics display
    chart-components.tsx   # Recharts wrappers

/lib
  threat-store.ts         # Zustand state management
  utils.ts                # Utility functions
  constants.ts            # Global constants

/styles
  globals.css             # Tailwind configuration
```

---

## Key Components

### 1. Threat Store (lib/threat-store.ts)

The centralized state management system using Zustand:

```typescript
// Types
export type ThreatType = 'AI Botnet' | 'DDoS' | 'Port Scan' | ...
export type AttackStage = 'Reconnaissance' | 'Scanning' | 'Exploitation' | ...

export interface Threat {
  id: string;
  type: ThreatType;
  confidence: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  detectionTime: number;
  energyCost: number;
  responseStatus: 'Detected' | 'Mitigating' | 'Contained' | 'Resolved';
  sourceIP: string;
  targetIP: string;
  stage: AttackStage;
  propagationNodes: string[];
  escalationLevel: number;
  detectionDifficulty: number;
  affectedNodes: number;
}

// Store Methods
useThreatStore.setState(...)
useThreatStore.getState().threats
useThreatStore.getState().launchAttack(type)
useThreatStore.getState().escalateThreat(id)
useThreatStore.getState().propagateThreat(id, nodes)
```

### 2. Sidebar Navigation

Dynamic navigation with all 17 modules:

```typescript
// components/command-center/sidebar.tsx
const modules = [
  { icon: LayoutDashboard, label: 'Overview', href: '/command-center/dashboard' },
  { icon: Zap, label: 'SPECTRA Core', href: '/command-center/spectra-core' },
  { icon: Zap, label: 'Live Detection Lab', href: '/command-center/detection' },
  // ... 14 more modules
];
```

### 3. Metrics Display

Reusable card component for displaying KPIs:

```typescript
<MetricsCard
  label="Detection Accuracy"
  value="99.2%"
  icon={<CheckCircle />}
  trend="up"
  color="green"
/>
```

### 4. Recharts Visualizations

All charts use Recharts for real-time data visualization:

```typescript
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={threatData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
    <XAxis dataKey="hour" stroke="#94a3b8" />
    <YAxis stroke="#94a3b8" />
    <Tooltip />
    <Bar dataKey="threats" fill="#ef4444" />
  </BarChart>
</ResponsiveContainer>
```

---

## State Management

### Attack Simulation Engine

```typescript
// Launch attack
const { launchAttack } = useThreatStore();
launchAttack('AI Botnet');

// Attack auto-escalates through stages
// Reconnaissance → Scanning → Exploitation → Persistence → Lateral Movement → Impact

// Threat propagation
const { propagateThreat } = useThreatStore();
propagateThreat(threatId, ['node-1', 'node-2', 'node-3']);

// Update metrics in real-time
const { updateMetrics } = useThreatStore();
updateMetrics({
  activeThreats: 5,
  detectionAccuracy: 99.2,
  detectionLatency: 2.3,
});
```

### Real-Time Synchronization

All pages subscribe to threat store updates:

```typescript
export default function DashboardPage() {
  const threats = useThreatStore(state => state.threats);
  const metrics = useThreatStore(state => state.metrics);
  
  // Automatically re-renders when store updates
  return (
    <div>
      <MetricsDisplay metrics={metrics} />
      <ThreatFeed threats={threats} />
    </div>
  );
}
```

---

## Module Development

### Creating a New Module

1. **Create directory structure:**
```bash
mkdir -p app/command-center/new-module
touch app/command-center/new-module/page.tsx
```

2. **Implement page component:**
```typescript
'use client';

import { motion } from 'framer-motion';
import { useThreatStore } from '@/lib/threat-store';

export default function NewModulePage() {
  const { threats, metrics } = useThreatStore();
  
  return (
    <div className="p-8 space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold text-green-400">New Module</h1>
      </motion.div>
      
      {/* Module content */}
    </div>
  );
}
```

3. **Add to sidebar navigation:**
```typescript
// components/command-center/sidebar.tsx
const modules = [
  // ... existing modules
  { icon: Zap, label: 'New Module', href: '/command-center/new-module' },
];
```

### Design System

**Color Palette:**
- Primary: Dark Navy `#0f172a`
- Accent Green: `#22c55e`
- Accent Blue: `#3b82f6`
- Accent Red: `#ef4444`
- Accent Orange: `#f97316`
- Backgrounds: Slate `#1e293b` to `#334155`

**Typography:**
- Headings: Geist Sans Bold
- Body: Geist Sans Regular
- Mono: Geist Mono

**Spacing Scale:**
- Use Tailwind spacing: p-4, gap-6, mb-8
- Prefer gap over margin for flex/grid layouts

---

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/network-topology.png"
  alt="Network Topology"
  width={1200}
  height={600}
  priority={true}  // For above-fold images
/>
```

### Animation Performance
```typescript
// Use Framer Motion with GPU acceleration
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="will-change-transform"  // GPU acceleration
>
  Content
</motion.div>
```

### Data Fetching
```typescript
// Use SWR for client-side data with caching
import useSWR from 'swr';

export function MetricsWidget() {
  const { data: metrics } = useSWR('/api/metrics', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,  // Cache 1 minute
  });
  
  return <MetricsDisplay metrics={metrics} />;
}
```

### Build Optimization
```bash
# Build analysis
npm run build --analyze

# Production build
npm run build
npm start
```

---

## Deployment

### Vercel Deployment

1. **Connect GitHub repository:**
   - Go to vercel.com/new
   - Select this repository
   - Configure environment variables

2. **Environment variables:**
```env
# .env.production
NEXT_PUBLIC_API_URL=https://api.spectra-ids.app
THREAT_WEBHOOK_SECRET=your_secret_here
```

3. **Deploy:**
```bash
vercel deploy --prod
```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .next .next
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t spectra-ids .
docker run -p 3000:3000 spectra-ids
```

---

## Monitoring & Debugging

### Console Debugging

Use prefixed console.log for easy tracking:

```typescript
// Log threat data flow
console.log("[v0] Threat received:", threat);
console.log("[v0] Store updated, active threats:", threats.length);
console.log("[v0] Metrics calculated:", metrics);

// Remove before production
```

### React DevTools

```bash
# Open app with React DevTools
agent-browser open --enable react-devtools "http://localhost:3000"

# Inspect component tree
agent-browser react tree

# View component props
agent-browser react inspect <fiberId>
```

### Web Vitals Monitoring

```bash
# Check Core Web Vitals
agent-browser vitals "http://localhost:3000" --json
```

### Performance Profiling

```typescript
// React profiler
import { Profiler } from 'react';

<Profiler id="dashboard" onRender={onRenderCallback}>
  <DashboardContent />
</Profiler>
```

### Error Tracking

```typescript
// Global error handler
window.addEventListener('error', (event) => {
  console.error("[v0] Uncaught error:", event.error);
  // Send to error tracking service
});
```

---

## API Integration

### Threat Data Integration

```typescript
// lib/threat-api.ts
export async function fetchRealThreats() {
  const response = await fetch(
    process.env.THREAT_API_ENDPOINT || '/api/threats',
    {
      headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
    }
  );
  return response.json();
}

// Use in component
import { useEffect } from 'react';
import { fetchRealThreats } from '@/lib/threat-api';

export function RealTimeThreatFeed() {
  const { addThreat } = useThreatStore();
  
  useEffect(() => {
    const interval = setInterval(async () => {
      const threats = await fetchRealThreats();
      threats.forEach(addThreat);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
}
```

### Federated Learning Integration

```typescript
// lib/federated-learning.ts
export async function participateInGlobalTraining() {
  const localModel = await trainLocalModel();
  
  const response = await fetch(
    process.env.FEDERATED_LEARNING_ENDPOINT + '/aggregate',
    {
      method: 'POST',
      body: JSON.stringify(localModel),
    }
  );
  
  return response.json();
}
```

---

## Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests with Playwright

```typescript
// tests/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('Dashboard loads with metrics', async ({ page }) => {
  await page.goto('http://localhost:3000/command-center/dashboard');
  
  const accuracy = await page.locator('[data-testid="accuracy"]');
  await expect(accuracy).toContainText('99.2%');
});
```

### Visual Regression Testing

```bash
npm run test:visual
```

---

## Troubleshooting

### Common Issues

**Issue**: Port 3000 already in use
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

**Issue**: Zustand state not updating
```typescript
// Ensure using hook correctly
const threats = useThreatStore(state => state.threats);  // ✓
const { threats } = useThreatStore();  // ✗ Wrong

// Check store mutations
useThreatStore.subscribe(state => {
  console.log("[v0] Store updated:", state);
});
```

**Issue**: Charts not rendering
```typescript
// Ensure ResponsiveContainer has parent with explicit height
<div className="w-full h-[300px]">  {/* Must have height */}
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      {/* chart content */}
    </BarChart>
  </ResponsiveContainer>
</div>
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Recharts](https://recharts.org)
- [Vercel Deployment](https://vercel.com/docs)

---

## Support & Contribution

For issues, questions, or contributions:
1. Check GitHub Issues
2. Create detailed bug reports
3. Submit pull requests with descriptions
4. Contact: research@spectra-ids.app

---

**Last Updated**: June 8, 2026  
**Version**: 1.0.0  
**Maintained by**: SPECTRA Research Team

