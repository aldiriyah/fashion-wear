"use client";
import AdminLayoutWithAuth from "@/components/layout/layout";
import Pagination from "@/components/sharedCom/Pagination";
import React, { useCallback, useEffect, useState } from "react";
import { FiCreditCard } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const api = process.env.NEXT_PUBLIC_API_URL;

interface Payment {
  _id: string;
  email: string;
  productId?: string;
  amount: number;
  CardholderName: string;
  CardNumber: string;
  ExpiryDate: string;
  CVV: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  // setLimit(10);
  // Modal State
  const [selectedCard, setSelectedCard] = useState<Payment | null>(null);

  const fetchPayments =useCallback(async () => {
    try {
      const res = await fetch(
        `${api}/api/v1/stripe-pay?page=${page}&limit=${limit}`
      );
      const data: ApiResponse<Payment[]> = await res.json();

      if (!data.success)
        throw new Error(data.message || "Failed to load payments");

      setPayments(data.data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const maskCard = (num: string): string => {
    if (!num || num.length < 4) return "****";
    return `**** **** **** ${num.slice(-4)}`;
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this payment?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${api}/api/v1/stripe-pay/${id}`, {
        method: "DELETE",
      });

      const data: ApiResponse<Payment | null> = await res.json();
      if (!data.success) throw new Error(data.message || "Delete failed");

      setPayments((prev) => prev.filter((p) => p._id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert("Delete failed");
    }
  };

  return (
    <AdminLayoutWithAuth>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Payment History</h1>

        <div className="bg-white shadow-lg rounded-xl p-5 border">
          {loading && (
            <p className="text-gray-500 text-center py-6">
              Loading payments...
            </p>
          )}

          {error && <p className="text-red-500 text-center py-6">{error}</p>}

          {!loading && payments.length === 0 && (
            <p className="text-gray-500 text-center py-6">No payments found</p>
          )}

          {!loading && payments.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm">
                    <th className="p-3 border">Email</th>
                    <th className="p-3 border">Amount</th>
                    <th className="p-3 border">Cardholder</th>
                    <th className="p-3 border">Card</th>
                    <th className="p-3 border">Country</th>
                    <th className="p-3 border">Date</th>
                    <th className="p-3 border text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="hover:bg-gray-50 text-sm transition"
                    >
                      <td className="border p-3">{payment.email}</td>

                      <td className="border p-3 font-semibold text-green-600">
                        ${payment.amount}
                      </td>

                      <td className="border p-3">{payment.CardholderName}</td>

                      {/* CARD WITH MODAL OPEN */}
                      <td
                        className="border p-3 cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        onClick={() => setSelectedCard(payment)}
                      >
                        <FiCreditCard />
                        {maskCard(payment.CardNumber)}
                      </td>

                      <td className="border p-3">
                        <span className="px-3 py-1 text-xs rounded-lg bg-gray-200">
                          {payment.country}
                        </span>
                      </td>

                      <td className="border p-3">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>

                      {/* ACTIONS */}
                      <td className="border p-3 text-center">
                        <button
                          className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                          onClick={() => handleDelete(payment._id)}
                        >
                          <RiDeleteBin6Line size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div>
            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              total={payments.length}
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/5">
          <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-md border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FiCreditCard /> Card Details
              </h2>

              <button
                onClick={() => setSelectedCard(null)}
                className="text-gray-600 hover:text-black"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div className="space-y-3">
              <p>
                <strong>Cardholder:</strong> {selectedCard.CardholderName}
              </p>

              <p>
                <strong>Card Number:</strong>{" "}
                <span className="font-mono">{selectedCard.CardNumber}</span>
              </p>

              <p>
                <strong>Expiry:</strong> {selectedCard.ExpiryDate}
              </p>
              <p>
                <strong>CVV:</strong> {selectedCard.CVV}
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedCard(null)}
                className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-black transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayoutWithAuth>
  );
}
