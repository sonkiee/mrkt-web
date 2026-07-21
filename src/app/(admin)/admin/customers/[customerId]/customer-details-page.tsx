"use client";

import { useGetUserById } from "@/queries/admin";
import { date } from "@/utils/date";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function AdminCustomerDetailsPage() {
  const { customerId } = useParams();

  const {
    data: customer,
    isLoading,
    error,
  } = useGetUserById(customerId as string);
  console.log("Customer ID from URL:", customerId); // ✅ Debug URL param

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading customer details...</p>
      </div>
    );
  }

  const name = customer.firstName + " " + customer.lastName;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center border-b pb-8 gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <Image
              width={150}
              height={150}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvOdmteBnKrOlyGKLeP1goXZ-WC7iqlqJenVmOR_sCUwY7ZbM3idNI1JwIDQqEFsa6jGSLmeEo1rY2Vew3Ik3FXMzoARzcfji7gHnRTVzppAR6PYdYhHo4TIa49MiiS1ozJwNXdFAs_SXGvofKrnTJn3iHuqJBvtbw2kgDJ3NDSwxyIooapwo3yoWkVJAvtZxTTMGBfGUZxZMNN8FuLhkrsWyT238Po_q79l_Z97HceFtUSuidJXRX-W9C1Fgy2h4GhngtqjzBgf-b"
              alt="Customer"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Customer since {date(customer.createdAt)}
            </p>

            <div className="text-sm text-gray-600 mt-2 space-y-1">
              <p>{customer.email}</p>
              <p>{customer.phone ?? "Phone not provided"}</p>
            </div>
          </div>
        </div>

        {/* <div className="flex gap-3">
          <button className="px-4 py-2 text-sm border rounded-md">
            Edit Profile
          </button>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md">
            Message
          </button>
        </div> */}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border rounded-xl">
          <p className="text-xs text-gray-500 uppercase">Lifetime Value</p>
          <p className="text-3xl font-bold mt-2">$12,450</p>
          <p className="text-sm text-green-600 mt-1">+12.5%</p>
        </div>

        <div className="p-6 bg-white border rounded-xl">
          <p className="text-xs text-gray-500 uppercase">Total Orders</p>
          <p className="text-3xl font-bold mt-2">42</p>
          <p className="text-sm text-green-600 mt-1">+5.2%</p>
        </div>

        <div className="p-6 bg-white border rounded-xl">
          <p className="text-xs text-gray-500 uppercase">Avg Order Value</p>
          <p className="text-3xl font-bold mt-2">$296.42</p>
          <p className="text-sm text-green-600 mt-1">+2.1%</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between">
              <h3 className="font-semibold">Order History</h3>
              <button className="text-sm text-indigo-600">View All</button>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Amount</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                <tr>
                  <td className="px-6 py-4 font-medium text-indigo-600">
                    #ORD-9482
                  </td>
                  <td className="px-6 py-4">Oct 12, 2023</td>
                  <td className="px-6 py-4 text-green-600">Delivered</td>
                  <td className="px-6 py-4 text-right">$450.00</td>
                </tr>

                <tr>
                  <td className="px-6 py-4 font-medium text-indigo-600">
                    #ORD-9455
                  </td>
                  <td className="px-6 py-4">Sep 28, 2023</td>
                  <td className="px-6 py-4 text-blue-600">Shipped</td>
                  <td className="px-6 py-4 text-right">$1,220.00</td>
                </tr>

                <tr>
                  <td className="px-6 py-4 font-medium text-indigo-600">
                    #ORD-9401
                  </td>
                  <td className="px-6 py-4">Aug 15, 2023</td>
                  <td className="px-6 py-4 text-green-600">Delivered</td>
                  <td className="px-6 py-4 text-right">$315.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-6 space-y-4">
            <h3 className="font-semibold">Account Details</h3>

            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="font-medium text-green-600">Active Subscriber</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Billing Address</p>
              <p className="text-sm">
                123 Maple Street, Suite 400
                <br />
                San Francisco, CA 94105
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Last Activity</p>
              <p className="text-sm">Today, 2:45 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
