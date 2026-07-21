"use client";

import { MessageSquare, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function VendorMessagesPage() {
  const threads = [
    { id: 1, name: "Kamilu Isa", lastMsg: "Please check Sierra Blue color availability", date: "1 hour ago", unread: true },
    { id: 2, name: "Blessing Audu", lastMsg: "Thank you for the fast dispatch!", date: "1 day ago", unread: false },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h2 className="text-headline-lg font-bold text-on-surface">Store Chat Messages</h2>
        <p className="text-body-md text-on-surface-variant">
          Chat directly with buyers regarding item details, custom specs, or returns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Chat Threads */}
        <Card className="border border-outline-variant/30 shadow-soft h-full flex flex-col">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-sm font-bold text-on-surface">Inbox Threads</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto divide-y">
            {threads.map((t) => (
              <div key={t.id} className="p-4 hover:bg-surface-container-low cursor-pointer transition-colors flex justify-between items-center">
                <div>
                  <div className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                    <User size={14} className="text-primary" /> {t.name}
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">{t.lastMsg}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-on-surface-variant block">{t.date}</span>
                  {t.unread && <span className="inline-block w-2 h-2 bg-primary rounded-full mt-1"></span>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Message View (Mockup) */}
        <Card className="lg:col-span-2 border border-outline-variant/30 shadow-soft h-full flex flex-col justify-between">
          <CardHeader className="border-b pb-4">
            <div className="font-bold text-on-surface">Kamilu Isa</div>
            <p className="text-[10px] text-on-surface-variant">Active Order: ORD-9421</p>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-container-lowest">
            <div className="bg-surface-container-low max-w-[70%] p-3 rounded-2xl text-xs sm:text-sm self-start">
              Hello, I just placed an order for the iPhone 13 Pro Max. Is it possible to get the Sierra Blue color instead of Space Black?
            </div>
            <div className="bg-primary text-on-primary max-w-[70%] p-3 rounded-2xl text-xs sm:text-sm self-end ml-auto">
              Hi Kamilu! Space Black is currently the only color in stock for this SKU. Let us know if you would like us to ship that, or process a cancel.
            </div>
          </CardContent>
          <div className="p-4 border-t flex gap-2">
            <Input placeholder="Write your reply..." className="bg-surface-container-lowest" />
            <Button className="bg-primary text-on-primary">
              <Send size={16} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
