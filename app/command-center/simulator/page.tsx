'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function SimulatorPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Advanced Attack Simulator</h1>
        <p className="text-slate-400">Controlled environment for security testing and validation</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Available Scenarios</h2>
          <div className="space-y-2">
            {['APT Simulation', 'Ransomware Campaign', 'DDoS Wave', 'Data Exfiltration', 'Lateral Movement'].map((scenario) => (
              <Button key={scenario} className="w-full bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-700/50 justify-start">
                {scenario}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Simulation Results</h2>
          <div className="text-slate-400 text-center py-12">No active simulation</div>
        </motion.div>
      </div>
    </div>
  );
}
