"use client";

import { useState } from "react";
import {
  Wallet as WalletIcon,
  Download,
  Landmark,
  DollarSign,
  ArrowDownToLine,
  ShoppingCart,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useFetchVendorBalance,
  useFetchVendorBank,
  useFetchVendorPayouts,
  useFetchVendorOrders,
} from "@/hooks/queries";
import { requestPayoutAction } from "@/actions";
import { naira } from "@/utils/naira";
import { date } from "@/utils/date";
import { toast } from "sonner";
import Spinner from "@/components/spinner";

function RequestPayoutModal({
  withdrawableBalance,
  onSuccess,
}: {
  withdrawableBalance: number;
  onSuccess: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmt = Number(amount);

    if (isNaN(withdrawAmt) || withdrawAmt <= 0) {
      toast.error("Please enter a valid positive number.");
      return;
    }

    if (withdrawAmt > withdrawableBalance) {
      toast.error(`Insufficient balance. You can withdraw up to ${naira(withdrawableBalance)}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await requestPayoutAction({ amount: withdrawAmt });
      if (res?.data?.success) {
        toast.success((res.data as any).message || "Payout request submitted successfully!");
        setAmount("");
        setIsOpen(false);
        onSuccess();
      } else {
        toast.error(res?.serverError || (res?.data as any)?.message || "Failed to submit payout request. Please try again.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit payout request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-on-primary">
          <Download size={16} className="mr-1.5" /> Request Payout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-headline-md font-bold text-on-surface">Request Payout</DialogTitle>
            <DialogDescription className="text-body-sm text-on-surface-variant">
              Submit a transfer request from your withdrawable store balance to your linked bank account.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 flex justify-between items-center">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Withdrawable Balance</span>
              <span className="text-lg font-extrabold text-primary">{naira(withdrawableBalance)}</span>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="amount" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Payout Amount (₦)
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g. 50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                step="any"
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
              {isSubmitting ? "Processing..." : "Confirm & Withdraw"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function VendorWalletPage() {
  const [activeTab, setActiveTab] = useState("wallet");

  const { data: balanceData, refetch: refetchBalance, isLoading: isBalanceLoading } = useFetchVendorBalance();
  const { data: bankData, isLoading: isBankLoading } = useFetchVendorBank();
  const { data: payoutsData, refetch: refetchPayouts, isLoading: isPayoutsLoading } = useFetchVendorPayouts();
  const { data: ordersData, isLoading: isOrdersLoading } = useFetchVendorOrders();

  const handlePayoutSuccess = () => {
    refetchBalance();
    refetchPayouts();
  };

  const balances = balanceData?.data || balanceData || {};
  const bank = bankData?.data || bankData || null;
  const payoutsList = payoutsData?.data || payoutsData || [];
  const ordersList = ordersData?.data || ordersData || [];

  const withdrawableBalance = Number(balances.withdrawableBalance || 0);
  const pendingBalance = Number(balances.pendingBalance || 0);
  const processingPayouts = Number(balances.processingPayouts || 0);

  // Calculations for Monthly Ledger Summary
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const thisMonthOrders = ordersList.filter((order: any) => {
    if (!order.createdAt) return false;
    const d = new Date(order.createdAt);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  const grossSalesThisMonth = thisMonthOrders.reduce((acc: number, order: any) => {
    return acc + Number(order.total || order.unitPrice || 0);
  }, 0);

  const platformFeeThisMonth = grossSalesThisMonth * 0.1;
  const netEarningsThisMonth = grossSalesThisMonth * 0.9;

  // Map orders list to visual ledger items
  const ledgerList = ordersList.map((order: any) => {
    const val = Number(order.total || order.unitPrice || 0);
    const fee = val * 0.1;
    const net = val * 0.9;
    return {
      ref: `PAY-${order.orderNumber || order.id.slice(0, 8)}`,
      val,
      fee,
      net,
      date: order.createdAt ? date(order.createdAt, false) : "N/A",
    };
  });

  // Map payout requests list to visual withdrawals
  const withdrawalsList = payoutsList.map((p: any) => {
    const statusMap: Record<string, string> = {
      pending: "Pending Approval",
      processing: "Processing Transfer",
      completed: "Approved & Transferred",
      failed: "Transfer Failed",
      rejected: "Rejected",
    };
    return {
      id: p.reference || p.id.slice(0, 8),
      amount: Number(p.amount || 0),
      bank: bank ? `${bank.bankName} (${bank.accountNumber})` : "Linked Bank Account",
      date: p.createdAt ? date(p.createdAt, false) : "N/A",
      status: statusMap[p.status] || p.status,
    };
  });

  const isPageLoading = isBalanceLoading || isBankLoading || isPayoutsLoading || isOrdersLoading;

  if (isPageLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner infoText="Loading financial summary..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h2 className="text-headline-lg font-bold text-on-surface">
            Finance & Wallet Hub
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Manage your store balances, payout requests, earnings ledger, and bank accounts in one place.
          </p>
        </div>
        <RequestPayoutModal
          withdrawableBalance={withdrawableBalance}
          onSuccess={handlePayoutSuccess}
        />
      </div>

      {/* Unified Tabs */}
      <Tabs defaultValue="wallet" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-surface-container-low p-1 rounded-xl h-auto gap-1">
          <TabsTrigger
            value="wallet"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2"
          >
            <WalletIcon size={16} />
            <span>Wallet & Account</span>
          </TabsTrigger>

          <TabsTrigger
            value="earnings"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2"
          >
            <DollarSign size={16} />
            <span>Earnings & Ledger</span>
          </TabsTrigger>

          <TabsTrigger
            value="withdrawals"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2"
          >
            <ArrowDownToLine size={16} />
            <span>Payout History</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Wallet & Bank Account */}
        <TabsContent value="wallet" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border border-outline-variant/30 bg-gradient-to-br from-primary to-[#005c53] text-white p-6 rounded-2xl shadow-md lg:col-span-1">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-white/80 font-bold">
                    Seller Available Balance
                  </span>
                  <WalletIcon size={20} className="text-white/80" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{naira(withdrawableBalance)}</p>
                  <p className="text-[10px] text-white/70 mt-1">
                    Pending Settlement: {naira(pendingBalance)}
                  </p>
                </div>
                <div className="border-t border-white/20 pt-4 flex justify-between items-center text-xs">
                  <span>Processing: {naira(processingPayouts)}</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded font-bold">
                    Standard Account
                  </span>
                </div>
              </div>
            </Card>

            {/* Bank Account Details */}
            <Card className="border border-outline-variant/30 shadow-soft lg:col-span-2">
              <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-headline-md font-bold text-on-surface flex items-center gap-2">
                  <Landmark size={18} /> Verified Settlement Account
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4 text-sm">
                {bank ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">
                        Receiving Bank
                      </span>
                      <span className="font-bold text-on-surface text-base">
                        {bank.bankName}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">
                        Account Number
                      </span>
                      <span className="font-mono font-bold text-on-surface text-base">
                        {bank.accountNumber}
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">
                        Account Holder Name
                      </span>
                      <span className="font-bold text-on-surface">
                        {bank.accountName}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center border border-dashed rounded-xl bg-surface-container-low/40">
                    <p className="font-bold text-on-surface">No Settlement Bank Account Linked</p>
                    <p className="text-xs text-on-surface-variant mt-1">Please complete onboarding verification to set up bank details.</p>
                  </div>
                )}
                <div className="border-t pt-4">
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Bank credentials must match registered corporate CAC credentials exactly. Settlement routing transfers usually clear in 15-30 minutes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Earnings & Sales Ledger */}
        <TabsContent value="earnings" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-outline-variant/30 shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-primary/10 text-primary rounded-xl">
                    <DollarSign size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-on-surface-variant">
                      Gross Sales (This Month)
                    </p>
                    <h3 className="text-2xl font-bold text-on-surface mt-0.5">
                      {naira(grossSalesThisMonth)}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-outline-variant/30 shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-status-error/10 text-status-error rounded-xl">
                    <DollarSign size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-on-surface-variant">
                      Platform Fee (10% standard)
                    </p>
                    <h3 className="text-2xl font-bold text-status-error mt-0.5">
                      -{naira(platformFeeThisMonth)}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-outline-variant/30 shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-status-success/10 text-status-success rounded-xl">
                    <DollarSign size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-on-surface-variant">
                      Net Earnings (To Wallet)
                    </p>
                    <h3 className="text-2xl font-bold text-status-success mt-0.5">
                      {naira(netEarningsThisMonth)}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-headline-md font-bold text-on-surface">
                Payment Ledger History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b">
                    <th className="p-4 font-bold text-on-surface-variant">
                      Payment Reference
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant">
                      Order Value
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant text-right">
                      Commission Taken
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant text-right">
                      Net Store Payout
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant">
                      Settled Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm">
                  {ledgerList.map((p: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-surface-container-low/40 transition-colors"
                    >
                      <td className="p-4 font-mono font-bold text-on-surface">
                        {p.ref}
                      </td>
                      <td className="p-4 text-on-surface">{naira(p.val)}</td>
                      <td className="p-4 text-right text-status-error font-medium">
                        -{naira(p.fee)}
                      </td>
                      <td className="p-4 text-right text-primary font-bold">
                        {naira(p.net)}
                      </td>
                      <td className="p-4 text-on-surface-variant">{p.date}</td>
                    </tr>
                  ))}

                  {ledgerList.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <ShoppingCart size={32} className="text-on-surface-variant/40" />
                          <p className="font-bold text-on-surface">No Ledger Entries</p>
                          <p className="text-xs text-on-surface-variant">Sales statements will appear here.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Withdrawal History */}
        <TabsContent value="withdrawals" className="mt-6 space-y-6">
          <Card className="border border-outline-variant/30 shadow-soft">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-headline-md font-bold text-on-surface">
                Withdrawal Transfers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b">
                    <th className="p-4 font-bold text-on-surface-variant">
                      Request Reference
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant text-right">
                      Settled Amount
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant">
                      Destination Bank Account
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant">
                      Request Date
                    </th>
                    <th className="p-4 font-bold text-on-surface-variant">
                      Transfer Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm">
                  {withdrawalsList.map((p: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-surface-container-low/40 transition-colors"
                    >
                      <td className="p-4 font-mono font-bold text-on-surface">
                        {p.id}
                      </td>
                      <td className="p-4 text-right text-primary font-bold">
                        {naira(p.amount)}
                      </td>
                      <td className="p-4 text-on-surface-variant">{p.bank}</td>
                      <td className="p-4 text-on-surface-variant">{p.date}</td>
                      <td className="p-4">
                        <Badge
                          className={`border-none ${
                            p.status.startsWith("Approved") || p.status.includes("Transferred")
                              ? "bg-status-success/15 text-status-success"
                              : p.status.includes("Failed") || p.status.includes("Rejected")
                                ? "bg-status-error/15 text-status-error"
                                : "bg-status-warning/15 text-status-warning"
                          } text-xs px-2.5 py-0.5 rounded font-bold`}
                        >
                          {p.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}

                  {withdrawalsList.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <ArrowDownToLine size={32} className="text-on-surface-variant/40" />
                          <p className="font-bold text-on-surface">No Payout Requests Found</p>
                          <p className="text-xs text-on-surface-variant">Your requested transfer records will appear here.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

