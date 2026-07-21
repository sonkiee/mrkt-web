"use client";

import { Megaphone, Plus, Calendar, Edit2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdvertisementsPage() {
  const campaigns = [
    {
      id: "ADV-01",
      title: "Mid-Year Mega Deals Banner",
      placement: "Homepage Hero Banner",
      vendor: "Marketplace Campaign",
      duration: "Jul 1 - Jul 31, 2026",
      status: "Active",
    },
    {
      id: "ADV-02",
      title: "Lumina Phone Promos",
      placement: "Electronics Sidebar Spot",
      vendor: "Lumina Official Store",
      duration: "Jul 5 - Jul 15, 2026",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Sponsored Advertisements</h2>
          <p className="text-body-md text-on-surface-variant">
            Manage promotional homepage sliders, featured categories, and seller advertisement fees.
          </p>
        </div>
        <Button className="bg-primary text-on-primary">
          <Plus size={16} className="mr-1.5" /> New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((c) => (
          <Card key={c.id} className="border border-outline-variant/30 shadow-soft">
            <CardContent className="pt-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                    <Megaphone size={16} />
                  </span>
                  <h3 className="text-headline-md font-bold text-on-surface">{c.title}</h3>
                  <Badge className="bg-status-success/15 text-status-success border-none text-[10px] font-bold px-2 py-0.5 rounded">
                    {c.status}
                  </Badge>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Placement: <span className="font-semibold">{c.placement}</span> • Seller: <span className="font-medium">{c.vendor}</span>
                </p>
                <p className="text-xs text-on-surface-variant/80 flex items-center gap-1.5 mt-1">
                  <Calendar size={12} /> Schedule: {c.duration}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Button size="sm" variant="outline" className="border-outline-variant hover:bg-surface-container-high h-9">
                  <Pause size={14} className="mr-1.5" /> Pause
                </Button>
                <Button size="sm" variant="outline" className="border-outline-variant hover:bg-surface-container-high h-9">
                  <Edit2 size={14} className="mr-1.5" /> Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
