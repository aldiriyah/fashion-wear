"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FiTrash2,
  FiPlus,
  FiType,
  FiLink,
  FiEdit2,
  FiSave,
  FiX,
} from "react-icons/fi";

interface NavbarItem {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export default function NavbarManager() {
  const api = process.env.NEXT_PUBLIC_API_URL as string;
  const [navItems, setNavItems] = useState<NavbarItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchNavItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/v1/navbar`);
      const result = await response.json();
      if (result.success) {
        setNavItems(result.data);
      } else {
        console.error("Failed to fetch navbar items:", result.message);
      }
    } catch (error) {
      console.error("Error fetching navbar items:", error);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchNavItems();
  }, [fetchNavItems]);

  const resetForm = () => {
    setName("");
    setSlug("");
    setEditingId(null);
    setMessage(null);
  };

  const handleEdit = (item: NavbarItem) => {
    setEditingId(item._id);
    setName(item.name);
    setSlug(item.slug);
    setMessage(null);
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!editingId) {
      // Only auto-generate slug for new items
      setSlug(generateSlug(newName));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const url = editingId
        ? `${api}/api/v1/navbar/${editingId}`
        : `${api}/api/v1/navbar`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, slug }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage({
          type: "success",
          text: `Navbar item ${
            editingId ? "updated" : "created"
          } successfully!`,
        });
        resetForm();
        fetchNavItems();
      } else {
        setMessage({
          type: "error",
          text:
            result.message ||
            `Failed to ${editingId ? "update" : "create"} item.`,
        });
      }
    } catch (error) {
      console.error("Error saving navbar item:", error);
      setMessage({
        type: "error",
        text: "An error occurred while saving the item.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`${api}/api/v1/navbar/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setNavItems((prev) => prev.filter((item) => item._id !== id));
        if (editingId === id) resetForm();
      } else {
        alert(result.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred while deleting the item.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Create/Edit Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          {editingId ? (
            <FiEdit2 className="text-blue-600" />
          ) : (
            <FiPlus className="text-blue-600" />
          )}
          {editingId ? "Edit Navbar Item" : "Add New Navbar Item"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FiType />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter navigation name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FiLink />
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g., about-us"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            {message && (
              <span
                className={`text-sm ${
                  message.type === "success" ? "text-green-600" : "text-red-500"
                }`}
              >
                {message.text}
              </span>
            )}
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
              >
                <FiX /> Cancel Edit
              </button>
            )}

            <button
              type="submit"
              disabled={submitting || !name || !slug}
              className={`px-6 py-2 rounded-lg text-white font-medium shadow-sm transition-all flex items-center gap-2 ${
                submitting || !name || !slug
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              {submitting ? (
                "Saving..."
              ) : (
                <>
                  {editingId ? <FiSave /> : <FiPlus />}
                  {editingId ? "Update Item" : "Create Item"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          Existing Navbar Items
        </h3>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading items...
          </div>
        ) : navItems.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg text-gray-500">
            No navbar items found. Add one above!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Slug
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {navItems.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      /{item.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
