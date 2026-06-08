'use client';

import { Bell, Settings as SettingsIcon, Lock, Database } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your research platform</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">General Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Research Project Name</label>
              <input type="text" value="SPECTRA-IDS-XAI" className="w-full px-4 py-2 border border-border rounded bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Primary Dataset</label>
              <select className="w-full px-4 py-2 border border-border rounded bg-background">
                <option>CICIDS2017</option>
                <option>NSL-KDD</option>
                <option>UNSW-NB15</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Notifications</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm">Training completion alerts</label>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Experiment results updates</label>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Weekly performance summary</label>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Data Management</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-secondary/30 hover:bg-secondary/50 rounded transition">
              Export all experiments
            </button>
            <button className="w-full text-left px-4 py-3 bg-secondary/30 hover:bg-secondary/50 rounded transition">
              Backup research data
            </button>
            <button className="w-full text-left px-4 py-3 bg-secondary/30 hover:bg-secondary/50 rounded transition">
              Clear cache
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Security</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-secondary/30 hover:bg-secondary/50 rounded transition">
              Change password
            </button>
            <button className="w-full text-left px-4 py-3 bg-secondary/30 hover:bg-secondary/50 rounded transition">
              API Keys
            </button>
            <button className="w-full text-left px-4 py-3 bg-secondary/30 hover:bg-secondary/50 rounded transition">
              Two-factor authentication
            </button>
          </div>
        </div>

        <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-medium">
          Save Settings
        </button>
      </div>
    </div>
  );
}
