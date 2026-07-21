"use client";

import { useState } from "react";
import { Search, UserPlus, Shield, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: "USR-001",
      name: "Alex Danjuma",
      email: "alex@lumina.com",
      role: "Platform Administrator",
      status: "Active",
      lastLogin: "2 mins ago",
    },
    {
      id: "USR-002",
      name: "Fatima Aliyu",
      email: "fatima@lumina.com",
      role: "Compliance Officer",
      status: "Active",
      lastLogin: "1 hour ago",
    },
    {
      id: "USR-003",
      name: "Chidi Okafor",
      email: "chidi@lumina.com",
      role: "Support Lead",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: "USR-004",
      name: "Bello Kaduna",
      email: "bello.k@lumina.com",
      role: "Moderator",
      status: "Suspended",
      lastLogin: "2 weeks ago",
    },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Platform Users &amp; Staff</h2>
          <p className="text-body-md text-on-surface-variant">
            Manage system administrators, verification teams, support specialists, and control roles.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          <UserPlus size={16} className="mr-1.5" /> Invite Staff Member
        </Button>
      </div>

      <Card className="border border-outline-variant/30 shadow-soft">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <Input
              placeholder="Search staff name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-surface-container-lowest border-outline-variant"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b">
                <th className="p-4 font-bold text-on-surface-variant">Name</th>
                <th className="p-4 font-bold text-on-surface-variant">Email</th>
                <th className="p-4 font-bold text-on-surface-variant">Role</th>
                <th className="p-4 font-bold text-on-surface-variant">Status</th>
                <th className="p-4 font-bold text-on-surface-variant">Last Active</th>
                <th className="p-4 font-bold text-on-surface-variant text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-bold text-on-surface flex items-center gap-2">
                    <span className="p-1 bg-primary/10 text-primary rounded-md">
                      <Shield size={14} />
                    </span>
                    {user.name}
                  </td>
                  <td className="p-4 text-on-surface-variant">{user.email}</td>
                  <td className="p-4 text-on-surface font-semibold">{user.role}</td>
                  <td className="p-4">
                    <Badge
                      className={`border-none ${
                        user.status === "Active"
                          ? "bg-status-success/15 text-status-success"
                          : "bg-status-error/15 text-status-error"
                      } text-xs px-2.5 py-0.5 rounded font-bold`}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-on-surface-variant">{user.lastLogin}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-1.5">
                      <Button size="sm" variant="outline" className="text-xs border-outline-variant hover:bg-surface-container-high h-8">
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs text-status-error hover:bg-status-error/5 h-8">
                        <Lock size={12} className="mr-1" /> Deactivate
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
