'use client';

import { motion } from 'framer-motion';

export default function SettingsPage() {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">System Settings</h1>
        <p className="text-slate-400">Configuration and preferences</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-100 mb-6">General Settings</h2>
        <div className="space-y-4">
          {[
            { label: 'System Version', value: 'SPECTRA-IDS v1.0' },
            { label: 'Deployment Mode', value: 'Production' },
            { label: 'Update Frequency', value: 'Real-time' },
            { label: 'Logging Level', value: 'INFO' },
            { label: 'Backup Status', value: 'Active' },
          ].map((setting, idx) => (
            <motion.div key={setting.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-center justify-between p-3 border border-slate-700/30 rounded bg-slate-700/20">
              <div className="text-slate-100">{setting.label}</div>
              <div className="text-slate-400">{setting.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
