"use client";

import { useState } from "react";
import { Search, UserPlus, Shield, CheckCircle2, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useListUsers } from "@/hooks/queries";
import { inviteAdmin } from "@/actions/admin";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { date } from "@/utils/date";
import Spinner from "@/components/spinner";

function InviteStaffModal({ onSuccess }: { onSuccess: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { execute: promoteToAdmin } = useAction(inviteAdmin, {
    onSuccess(res) {
      toast.success(res?.data?.message || "User promoted to administrator successfully!");
      setEmail("");
      setIsOpen(false);
      onSuccess();
    },
    onError({ error }) {
      toast.error(error.serverError || "Failed to promote user. Ensure user profile exists.");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    promoteToAdmin({ email });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-on-primary">
          <UserPlus size={16} className="mr-1.5" /> Promote to Administrator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-headline-md font-bold text-on-surface">Promote Staff Member</DialogTitle>
            <DialogDescription className="text-body-sm text-on-surface-variant">
              Enter the registered email address of the user you want to grant full Platform Administrator access rights.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                User Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. fatima@lumina.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="bg-surface-container-lowest border-outline-variant"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-on-primary font-bold shadow-sm"
            >
              {isSubmitting ? "Promoting..." : "Grant Admin Rights"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: usersData, isLoading, error } = useListUsers();

  const users = usersData?.data || usersData || [];

  const handleInviteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const filteredUsers = users.filter(
    (u: any) =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: "Platform Administrator",
      vendor: "Marketplace Vendor",
      customer: "Platform Customer",
    };
    return labels[role] || role;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading user profiles..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-status-error font-medium">
        Failed to load platform users. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">Platform Users &amp; Staff</h2>
          <p className="text-body-md text-on-surface-variant">
            Manage system administrators, verification teams, support specialists, and control roles.
          </p>
        </div>
        <InviteStaffModal onSuccess={handleInviteSuccess} />
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
                <th className="p-4 font-bold text-on-surface-variant">Profile Created</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user: any) => (
                <tr key={user.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-bold text-on-surface flex items-center gap-2">
                    <span className="p-1 bg-primary/10 text-primary rounded-md">
                      <Shield size={14} />
                    </span>
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-4 text-on-surface-variant">{user.email}</td>
                  <td className="p-4 text-on-surface font-semibold">{getRoleLabel(user.role)}</td>
                  <td className="p-4">
                    <Badge className="border-none bg-status-success/15 text-status-success text-xs px-2.5 py-0.5 rounded font-bold">
                      Active
                    </Badge>
                  </td>
                  <td className="p-4 text-on-surface-variant">
                    {user.createdAt ? date(user.createdAt, false) : "N/A"}
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    No users matched your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

