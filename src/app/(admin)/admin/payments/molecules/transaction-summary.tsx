export default function TransactionSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-xl border">
        <p className="text-xs text-slate-500 font-bold uppercase">
          Gross Amount
        </p>

        <p className="text-2xl font-extrabold">$1,250.00</p>
      </div>

      <div className="bg-white p-6 rounded-xl border">
        <p className="text-xs text-slate-500 font-bold uppercase">
          Platform Fee
        </p>

        <p className="text-2xl font-extrabold text-red-500">-$36.25</p>
      </div>

      <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
        <p className="text-xs font-bold uppercase text-primary">Net Amount</p>

        <p className="text-2xl font-extrabold text-primary">$1,213.75</p>
      </div>
    </div>
  );
}
