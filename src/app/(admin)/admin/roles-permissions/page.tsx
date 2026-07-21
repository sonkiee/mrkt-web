"use client";

import { Shield, Plus, Key, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RolesPermissionsPage() {
  const roles = [
    {
      name: "Platform Administrator",
      desc: "Full access to all platform resources, settings, audit logs, financial accounts, and staff management.",
      usersCount: 3,
      level: "Super Admin",
    },
    {
      name: "Compliance / Verification Auditor",
      desc: "Audit new seller registrations, CAC corporate documents, brand registry entries, and storefront holds.",
      usersCount: 2,
      level: "Operations",
    },
    {
      name: "Support Specialist",
      desc: "View and resolve platform-wide support tickets, buyer claims, refund requests, and user inquiries.",
      usersCount: 5,
      level: "Customer Care",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Roles &amp; Permissions</h2>
          <p className="text-body-md text-on-surface-variant">
            Create user roles, define fine-grained action permission trees, and audit access security levels.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          <Plus size={16} className="mr-1.5" /> Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {roles.map((r, idx) => (
          <Card key={idx} className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                  <Shield size={18} />
                </span>
                <span className="font-bold text-on-surface text-lg">{r.name}</span>
              </div>
              <Badge className="bg-primary-container text-on-primary-container border-none text-xs font-bold px-2.5 py-0.5 rounded">
                {r.level}
              </Badge>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {r.desc}
              </p>
              <div className="border-t pt-3 flex justify-between items-center text-xs">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <Users size={14} /> Assigned Staff: <strong className="text-on-surface">{r.usersCount} users</strong>
                </span>
                <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/5 h-8">
                  <Key size={14} className="mr-1.5" /> Edit Permissions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
