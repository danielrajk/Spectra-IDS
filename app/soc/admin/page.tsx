'use client'

import { StatCard } from '@/components/soc/stat-card'
import { Users, Lock, Eye } from 'lucide-react'

export default function AdminPage() {
  const users = [
    { id: 1, name: 'John Security', email: 'john@company.com', role: 'Admin', status: 'Active', lastLogin: '2 min ago' },
    { id: 2, name: 'Sarah Analyst', email: 'sarah@company.com', role: 'Analyst', status: 'Active', lastLogin: '15 min ago' },
    { id: 3, name: 'Mike Viewer', email: 'mike@company.com', role: 'Viewer', status: 'Active', lastLogin: '2 hours ago' },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-1">Manage users, roles, and access control</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Users"
          value={users.length}
          icon={<Users className="w-6 h-6" />}
        />
        <StatCard
          label="Admin Users"
          value="1"
          icon={<Lock className="w-6 h-6" />}
        />
        <StatCard
          label="Active Sessions"
          value={users.filter(u => u.status === 'Active').length}
          icon={<Eye className="w-6 h-6" />}
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-secondary/50">
                  <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'Analyst' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Form */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Add New User</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" className="px-4 py-2 border border-border rounded-lg bg-background" />
          <input type="email" placeholder="Email" className="px-4 py-2 border border-border rounded-lg bg-background" />
          <select className="px-4 py-2 border border-border rounded-lg bg-background">
            <option>Select Role</option>
            <option>Admin</option>
            <option>Analyst</option>
            <option>Viewer</option>
          </select>
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">Add User</button>
        </div>
      </div>
    </div>
  )
}
