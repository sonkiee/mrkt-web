"use client";

import { Layers, Plus, FileText, Globe, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CMSPage() {
  const pages = [
    { title: "Privacy Policy", route: "/privacy-policy", status: "Published", updated: "2 days ago" },
    { title: "Terms &amp; Conditions", route: "/terms", status: "Published", updated: "3 weeks ago" },
    { title: "Seller Agreement", route: "/legal/seller-agreement", status: "Draft", updated: "Just now" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">CMS &amp; Legal Page Manager</h2>
          <p className="text-body-md text-on-surface-variant">
            Create and edit legal agreements, help documentation pages, FAQs, and static info pages.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          <Plus size={16} className="mr-1.5" /> Create Page
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pages.map((p, idx) => (
          <Card key={idx} className="border border-outline-variant/30 shadow-soft">
            <CardContent className="pt-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                    <FileText size={16} />
                  </span>
                  <h3 className="text-headline-md font-bold text-on-surface">{p.title}</h3>
                  <Badge
                    className={`border-none ${
                      p.status === "Published" ? "bg-status-success/15 text-status-success" : "bg-status-warning/15 text-status-warning"
                    } text-[10px] font-bold px-2 py-0.5 rounded`}
                  >
                    {p.status}
                  </Badge>
                </div>
                <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                  <Globe size={12} className="text-on-surface-variant/75" />
                  URL Link: <span className="font-mono text-primary font-medium ml-1">{p.route}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="border-outline-variant hover:bg-surface-container-high h-9">
                  <Edit2 size={14} className="mr-1.5" /> Edit Content
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
