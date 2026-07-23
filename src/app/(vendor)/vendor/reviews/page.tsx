"use client";

import { Star, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFetchVendorProfile, useFetchVendorReviews } from "@/hooks/queries";
import { date } from "@/utils/date";
import Spinner from "@/components/spinner";

export default function VendorReviewsPage() {
  const { data: profileData, isLoading: isProfileLoading } = useFetchVendorProfile();
  
  const vendor = profileData?.data || profileData || {};
  const vendorId = vendor.id || "";

  const { data: reviewsData, isLoading: isReviewsLoading, error } = useFetchVendorReviews(vendorId);

  const reviews = reviewsData?.data || reviewsData || [];

  // Calculations
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc: number, r: any) => acc + Number(r.rating || 0), 0) / totalReviews).toFixed(1)
    : "0.0";

  const isPageLoading = isProfileLoading || isReviewsLoading;

  if (isPageLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading reviews..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-status-error font-medium">
        Failed to load store feedback. Please try again later.
      </div>
    );
  }

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
            <h3 className="text-2xl font-bold text-primary mt-1">{averageRating} / 5.0</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Total Verified Reviews</p>
            <h3 className="text-2xl font-bold text-on-surface mt-1">{totalReviews}</h3>
          </CardContent>
        </Card>
        <Card className="border border-outline-variant/30 shadow-soft">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-on-surface-variant">Response SLA Rate</p>
            <h3 className="text-2xl font-bold text-status-success mt-1">100.0%</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reviews.map((r: any) => (
          <Card key={r.id} className="border border-outline-variant/30 shadow-soft">
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface">
                      {r.user ? `${r.user.firstName} ${r.user.lastName}` : "Customer"}
                    </span>
                    <span className="text-xs text-on-surface-variant">reviewed</span>
                    <span className="text-xs font-bold text-primary">{r.product?.title || "Product"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className={idx < Number(r.rating || 0) ? "text-status-warning fill-current" : "text-outline-variant"}
                      />
                    ))}
                    <span className="text-xs text-on-surface-variant/80 ml-1.5">
                      Published {r.createdAt ? date(r.createdAt, false) : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {r.comment && (
                <p className="text-sm text-on-surface-variant/90 leading-relaxed bg-surface-container-low/40 p-4 rounded-xl border">
                  "{r.comment}"
                </p>
              )}

              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline" className="border-outline-variant hover:bg-surface-container-high h-8 text-xs">
                  <Send size={12} className="mr-1.5" /> Post Public Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && (
          <div className="py-12 text-center border border-dashed rounded-xl bg-white">
            <MessageSquare size={32} className="mx-auto text-on-surface-variant/40 mb-2" />
            <p className="font-bold text-on-surface">No Feedback Received Yet</p>
            <p className="text-xs text-on-surface-variant">Reviews from verified buyers will show up here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

