import StatusBadge from "@/components/status";
import { OrderItem as OItems } from "@/types";
import { date } from "@/utils/date";
import { naira } from "@/utils/naira";
import Image from "next/image";
import { useRouter } from "next/navigation";

// const mapOrderToUI = (order: Order): OrderItemProps => {
//   return {
//     status: capitalize(order.status),
//     date: new Date(order.createdAt).toLocaleDateString(),
//     orderNumber: order.orderNumber,

//     // take first product title (or combine if multiple)
//     title:
//       order.items.length === 1
//         ? order.items[0].productTitleSnapshot
//         : `${order.items[0].productTitleSnapshot} + ${
//             order.items.length - 1
//           } more`,

//     total: order.total,
//     itemCount: order.items.reduce((acc, item) => acc + item.qty, 0),

//     imageUrl: undefined, // you don’t have image in payload yet
//   };
// };

export default function OrderItem({ item }: { item: OItems }) {
  const router = useRouter();
  const {
    status,
    createdAt,
    orderNumber,
    total,
    productTitleSnapshot: title,
    itemCount,
    id,
  } = item;

  return (
    <div
      onClick={() => router.push(`/account/orders/${id}`)}
      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50"
    >
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            alt={"Order Item"}
            src={"/placeholder.svg"}
            width={100}
            height={100}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <StatusBadge
                  status={status}
                  className="rounded-none bg-tranparent"
                />

                <span className="text-sm text-slate-400">
                  {date(createdAt)}
                </span>
              </div>

              <h3 className="mt-1 ml-1.5 font-bold text-slate-900 dark:text-white">
                {orderNumber}
              </h3>
              <p className="text-sm ml-1.5 text-slate-500">
                {title ?? "Unnamed Item"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {naira(Number(total))}
              </p>
              <p className="text-xs text-slate-400">
                {itemCount} {itemCount === 1 ? "Item" : "Items"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//  <div className="mt-4 flex items-center gap-3">
//    <button
//      type="button"
//      onClick={onPrimaryAction}
//      className={[
//        "flex items-center gap-2 rounded-lg px-5 py-2 text-sm transition-all",
//        cfg.primaryClass,
//      ].join(" ")}
//    >
//      {cfg.icon ? (
//        cfg.icon === "chevron_right" ? (
//          <>
//            <span>{cfg.primaryLabel}</span>
//            <span className="material-symbols-outlined">chevron_right</span>
//          </>
//        ) : (
//          <>
//            <span className="material-symbols-outlined">{cfg.icon}</span>
//            <span>{cfg.primaryLabel}</span>
//          </>
//        )
//      ) : (
//        <span>{cfg.primaryLabel}</span>
//      )}
//    </button>

//    {secondary?.variant === "outline" && (
//      <button
//        type="button"
//        onClick={onSecondaryAction}
//        className="flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
//      >
//        {secondary.label}
//      </button>
//    )}

//    {secondary?.variant === "link" && (
//      <button
//        type="button"
//        onClick={onSecondaryAction}
//        className="text-sm font-medium text-slate-400 transition-colors hover:text-red-500"
//      >
//        {secondary.label}
//      </button>
//    )}
//  </div>;
