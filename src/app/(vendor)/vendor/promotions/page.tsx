"use client";

import { TrendingUp, Plus, Percent, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VendorPromotionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Store Promotions &amp; Deals</h2>
          <p className="text-body-md text-on-surface-variant">
            Submit your products for platform-wide flash sales, seasonal events, and category deal cards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                  <Percent size={18} />
                </span>
                <CardTitle className="text-headline-md font-bold text-on-surface">Upcoming Platform Flash Sale</CardTitle>
              </div>
              <Badge className="bg-status-success/15 text-status-success border-none text-xs font-bold px-2 py-0.5 rounded">
                Open for Entries
              </Badge>
            </div>
            <p className="text-xs text-on-surface-variant mt-2">Starts: July 15, 2026 • Ends: July 18, 2026</p>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-xs text-on-surface-variant/90 leading-relaxed">
              Submit your top-selling electronics with a minimum discount of 15% to be featured on the main homepage Flash Sale strip.
            </p>
            <Button className="w-full bg-primary text-on-primary">
              Submit Products for Entry
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-outline-variant/30 shadow-soft">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
                  <CheckCircle2 size={18} />
                </span>
                <CardTitle className="text-headline-md font-bold text-on-surface">Lumina Tech Active Submissions</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-3 text-xs">
            <div className="flex justify-between items-center bg-surface-container-low/40 p-3 rounded-xl border">
              <div>
                <p className="font-bold text-on-surface">iPhone 13 Pro Max (128GB)</p>
                <p className="text-on-surface-variant">Submitted Discount: -20%</p>
              </div>
              <Badge className="bg-status-warning/15 text-status-warning border-none font-bold">
                Under Review
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
