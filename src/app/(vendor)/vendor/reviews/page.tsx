"use client";

import { Star, MessageSquare, ThumbsUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VendorReviewsPage() {
  const reviews = [
    {
      id: "REV-901",
      customer: "Aminu Isa",
      product: "iPhone 13 Pro Max (128GB)",
      rating: 5,
      comment: "Super fast shipping Kaduna-wide! The package came sealed, original factory box, 100% authentic battery health at 100%. Highly recommend this vendor storefront.",
      date: "2 hours ago",
    },
    {
      id: "REV-900",
      customer: "Faith Joshua",
      product: "Apple AirPods Pro (2nd Generation)",
      rating: 4,
      comment: "Audio clarity is brilliant. Active noise cancellation blocks noise from my generator perfectly. Only issue was delivery delay, courier took 24 hours.",
      date: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Store Reviews &amp; Feedback</h2>
        <p className="text-body-md text-on-surface-variant">
          Respond to customer product reviews, maintain high storefront ratings, and resolve low-star complaints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Average Storefront Rating</p>
            <h3 className="text-2xl font-bold text-primary mt-1">4.8 / 5.0</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Total Verified Reviews</p>
            <h3 className="text-2xl font-bold text-on-surface mt-1">1,240</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Response SLA Rate</p>
            <h3 className="text-2xl font-bold text-status-success mt-1">98.5%</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reviews.map((r) => (
          <Card key={r.id} className="border border-outline-variant/30 shadow-soft">
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface">{r.customer}</span>
                    <span className="text-xs text-on-surface-variant">reviewed</span>
                    <span className="text-xs font-bold text-primary">{r.product}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className={idx < r.rating ? "text-status-warning fill-current" : "text-outline-variant"}
                      />
                    ))}
                    <span className="text-xs text-on-surface-variant/80 ml-1.5">Published {r.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-on-surface-variant/90 leading-relaxed bg-surface-container-low/40 p-4 rounded-xl border">
                "{r.comment}"
              </p>

              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline" className="border-outline-variant hover:bg-surface-container-high h-8 text-xs">
                  <Send size={12} className="mr-1.5" /> Post Public Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
