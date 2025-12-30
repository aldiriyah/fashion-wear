"use client";
import AdminLayoutWithAuth from "@/components/layout/layout";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface ApiResponse {
  data: {
    data: ContactMessage[];
    pagination: PaginationInfo;
  };
  success: boolean;
  message: string;
  statusCode: number;
}

const Contact = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const api = process.env.NEXT_PUBLIC_API_URL;

 

  const fetchContacts = useCallback(async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      const res = await fetch(`${api}/api/v1/contact?page=${page}&limit=${limit}`);
      
      if (!res.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data: ApiResponse = await res.json();
      // console.log("API Response:", data);
      
      setContacts(data.data.data);
      setPagination(data.data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch contacts");
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  },[api]);

   useEffect(() => {
    fetchContacts(1);
  }, [fetchContacts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(`${api}/api/v1/contact/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Failed to delete contact");
      } else {
        toast.success("Message deleted successfully!");
        // Refresh the current page after deletion
        fetchContacts(pagination.page, pagination.limit);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete contact");
    } finally {
      setDeletingId(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchContacts(newPage, pagination.limit);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    fetchContacts(1, newLimit);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const currentPage = pagination.page;
    const totalPages = pagination.pages;
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('...');
    }
    
    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (loading && contacts.length === 0) {
    return (
      <AdminLayoutWithAuth>
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayoutWithAuth>
    );
  }

  if (error && contacts.length === 0) {
    return (
      <AdminLayoutWithAuth>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Error: {error}</p>
          <button
            onClick={() => fetchContacts(1)}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </AdminLayoutWithAuth>
    );
  }

  return (
    <AdminLayoutWithAuth>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-600">
            Manage messages sent from the contact form
          </p>
        </div>

        {/* Pagination Controls - Top */}
        {pagination.pages > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Show:</span>
                <select
                  value={pagination.limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span className="text-sm text-gray-700">per page</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Page {pagination.page} of {pagination.pages} 
                ({pagination.total} total messages)
              </span>
            </div>
          </div>
        )}

        {contacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">No contact messages found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    {/* Message Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 break-words">
                          {contact.subject}
                        </h3>
                        <span className="text-sm text-gray-500 sm:ml-2">
                          {formatDate(contact.createdAt)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            From
                          </p>
                          <p className="text-gray-900 break-words">
                            {contact.name}
                          </p>
                          <p className="text-blue-600 break-words">
                            {contact.email}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Message
                        </p>
                        <p className="text-gray-700 whitespace-pre-wrap break-words bg-gray-50 p-3 rounded-lg">
                          {contact.message}
                        </p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <div className="flex lg:flex-col gap-2 lg:justify-start">
                      <button
                        onClick={() => handleDelete(contact._id)}
                        disabled={deletingId === contact._id}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[100px]"
                      >
                        {deletingId === contact._id ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Deleting
                          </>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls - Bottom */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                      disabled={page === '...'}
                      className={`px-3 py-2 border rounded-lg min-w-[40px] ${
                        page === pagination.page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : page === '...'
                          ? 'border-transparent cursor-default'
                          : 'border-gray-300 hover:bg-gray-50'
                      } disabled:cursor-default transition-colors`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayoutWithAuth>
  );
};

export default Contact;