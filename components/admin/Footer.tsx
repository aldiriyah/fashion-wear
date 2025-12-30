import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  FooterData,
  Category,
  InformationLink,
  PhoneNumber,
  SocialMedia,
  FooterFormData,
} from '@/types/FooterTypes';
import Image from 'next/image';
const api = process.env.NEXT_PUBLIC_API_URL;
const FooterForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<FooterFormData, 'companyInfo'> & { companyInfo: Omit<FooterData['companyInfo'], 'logo'> }>({
    title: 'Smartwear Outfits',
    companyInfo: {
      address: '',
      companyRegistrationNumber: '',
      vatRegistrationNumber: '',
    },
    categories: [],
    informationLinks: [],
    contactInfo: {
      email: '',
      phoneNumbers: [],
    },
    socialMedia: [],
    copyright: '',
  });

  const [newCategory, setNewCategory] = useState<Omit<Category, '_id'>>({ 
    name: '', 
    url: '#', 
    order: 0 
  });
  const [newInfoLink, setNewInfoLink] = useState<Omit<InformationLink, '_id'>>({ 
    title: '', 
    url: '', 
    order: 0 
  });
  const [newPhone, setNewPhone] = useState<Omit<PhoneNumber, '_id'>>({ 
    number: '', 
    label: '' 
  });
  const [newSocial, setNewSocial] = useState<Omit<SocialMedia, '_id'>>({ 
    platform: 'facebook', 
    url: '', 
    icon: '', 
    order: 0 
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const response = await fetch(`${api}/api/v1/features/get-footer`);
      const data = await response.json();
      // console.log("footer", data.data);
      if (data.success) {
        const footerData: FooterData = data.data;
        setFormData({
          ...footerData,
          companyInfo: {
            address: footerData.companyInfo.address,
            companyRegistrationNumber: footerData.companyInfo.companyRegistrationNumber,
            vatRegistrationNumber: footerData.companyInfo.vatRegistrationNumber,
          }
        });
        setPreviewUrl(footerData.companyInfo.logo);
      }
    } catch (error) {
      console.log('No existing footer found, starting with empty form',error);
      // toast.error('Failed to fetch footer data');
    }
  };

  const handleInputChange = (path: string, value: string) => {
    setFormData(prev => {
      const keys = path.split('.');
      const lastKey = keys.pop()!;
      const updated = { ...prev };
      let current: Record<string, unknown> = updated;
      
      for (const key of keys) {
        current = current[key] as Record<string, unknown>;
      }
      if (current && typeof current === 'object' && lastKey in current) {
        (current as Record<string, unknown>)[lastKey] = value;
      }
      
      return updated;
    });
  };

  const handleArrayAdd = <T,>(
    arrayName: keyof typeof formData,
    newItem: T,
    resetState: () => void
  ) => {
    if (Object.values(newItem as Record<string, unknown>).some(val => val === '')) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] as T[]), { ...newItem }]
    }));
    resetState();
  };

  const handleArrayRemove = (arrayName: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: (prev[arrayName] as unknown[]).filter((_, i) => i !== index)
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    
    // Append basic fields
    submitData.append('title', formData.title);
    submitData.append('address', formData.companyInfo.address);
    submitData.append('companyRegistrationNumber', formData.companyInfo.companyRegistrationNumber);
    submitData.append('vatRegistrationNumber', formData.companyInfo.vatRegistrationNumber);
    submitData.append('email', formData.contactInfo.email);
    submitData.append('copyright', formData.copyright);
    
    // Append arrays as JSON strings
    submitData.append('categories', JSON.stringify(formData.categories));
    submitData.append('informationLinks', JSON.stringify(formData.informationLinks));
    submitData.append('phoneNumbers', JSON.stringify(formData.contactInfo.phoneNumbers));
    submitData.append('socialMedia', JSON.stringify(formData.socialMedia));
    
    // Append logo file if selected
    if (logoFile) {
      submitData.append('logo', logoFile);
    }

    try {
      const response = await fetch(`${api}/api/v1/features/create-footer`, {
        method: 'POST',
        body: submitData,
        
      });
      
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Footer saved successfully!');
        const updatedData: FooterData = data.data;
        setFormData({
          ...updatedData,
          companyInfo: {
            address: updatedData.companyInfo.address,
            companyRegistrationNumber: updatedData.companyInfo.companyRegistrationNumber,
            vatRegistrationNumber: updatedData.companyInfo.vatRegistrationNumber,
          }
        });
        setPreviewUrl(updatedData.companyInfo.logo);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error('Error saving footer: ' + error.message);
      } else {
        toast.error('Unknown error saving footer');
      }
    } finally {
      setLoading(false);
    }
  };

  const ArraySection = <T extends { _id?: string }>({
    title,
    items,
    onAdd,
    onRemove,
    renderItem,
    renderForm,
  }: {
    title: string;
    items: T[];
    arrayName: keyof typeof formData;
    newItem: T;
    setNewItem: (item: T) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    renderItem: (item: T, index: number) => React.ReactNode;
    renderForm: () => React.ReactNode;
  }) => (
    <div className="border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          {renderForm()}
          <button
            type="button"
            onClick={onAdd}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Add {title.slice(0, -1)}
          </button>
        </div>
        
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200"
            >
              {renderItem(item, index)}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-gray-500 text-center py-4">No items added yet</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white">Footer Management</h2>
          <p className="text-blue-100">Manage your website footer content</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  disabled
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Company Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {previewUrl && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <Image
                      src={previewUrl}
                      alt="Logo preview"
                      width={100}
                      height={100}
                      className="h-20 w-20 object-contain border border-gray-300 rounded"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    value={formData.companyInfo.address}
                    onChange={(e) => handleInputChange('companyInfo.address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Registration Number *
                    </label>
                    <input
                      type="text"
                      value={formData.companyInfo.companyRegistrationNumber}
                      onChange={(e) => handleInputChange('companyInfo.companyRegistrationNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      VAT Registration Number *
                    </label>
                    <input
                      type="text"
                      value={formData.companyInfo.vatRegistrationNumber}
                      onChange={(e) => handleInputChange('companyInfo.vatRegistrationNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          {ArraySection({
            title: "Categories",
            items: formData.categories,
            arrayName: 'categories',
            newItem: newCategory,
            setNewItem: setNewCategory,
            onAdd: () => handleArrayAdd('categories', newCategory, () => 
              setNewCategory({ name: '', url: '#', order: 0 })),
            onRemove: (index) => handleArrayRemove('categories', index),
            renderItem: (category: Category, ) => (
              <span>
                {category.name} - {category.url} (Order: {category.order})
              </span>
            ),
            renderForm: () => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Category Name *"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="URL"
                  value={newCategory.url}
                  onChange={(e) => setNewCategory({...newCategory, url: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Order"
                  value={newCategory.order}
                  onChange={(e) => setNewCategory({...newCategory, order: parseInt(e.target.value) || 0})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ),
          })}

          {/* Information Links */}
          {ArraySection({
            title: "Information Links",
            items: formData.informationLinks,
            arrayName: 'informationLinks',
            newItem: newInfoLink,
            setNewItem: setNewInfoLink,
            onAdd: () => handleArrayAdd('informationLinks', newInfoLink, () => 
              setNewInfoLink({ title: '', url: '', order: 0 })),
            onRemove: (index) => handleArrayRemove('informationLinks', index),
            renderItem: (link: InformationLink, ) => (
              <span>
                {link.title} - {link.url} (Order: {link.order})
              </span>
            ),
            renderForm: () => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Link Title *"
                  value={newInfoLink.title}
                  onChange={(e) => setNewInfoLink({...newInfoLink, title: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="URL *"
                  value={newInfoLink.url}
                  onChange={(e) => setNewInfoLink({...newInfoLink, url: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Order"
                  value={newInfoLink.order}
                  onChange={(e) => setNewInfoLink({...newInfoLink, order: parseInt(e.target.value) || 0})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ),
          })}

          {/* Contact Information */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <h4 className="font-medium mb-4">Phone Numbers</h4>
            {ArraySection({
              title: "Phone Numbers",
              items: formData.contactInfo.phoneNumbers,
              arrayName: 'contactInfo.phoneNumbers' as keyof typeof formData,
              newItem: newPhone,
              setNewItem: setNewPhone,
              onAdd: () => handleArrayAdd('contactInfo.phoneNumbers' as keyof typeof formData, newPhone, () => 
                setNewPhone({ number: '', label: '' })),
              onRemove: (index) => handleArrayRemove('contactInfo.phoneNumbers' as keyof typeof formData, index),
              renderItem: (phone: PhoneNumber, ) => (
                <span>
                  {phone.number} {phone.label && `(${phone.label})`}
                </span>
              ),
              renderForm: () => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Phone Number *"
                    value={newPhone.number}
                    onChange={(e) => setNewPhone({...newPhone, number: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Label (optional)"
                    value={newPhone.label}
                    onChange={(e) => setNewPhone({...newPhone, label: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ),
            })}
          </div>

          {/* Social Media */}
          {ArraySection({
            title: "Social Media",
            items: formData.socialMedia,
            arrayName: 'socialMedia',
            newItem: newSocial,
            setNewItem: setNewSocial,
            onAdd: () => handleArrayAdd('socialMedia', newSocial, () => 
              setNewSocial({ platform: 'facebook', url: '', icon: '', order: 0 })),
            onRemove: (index) => handleArrayRemove('socialMedia', index),
            renderItem: (social: SocialMedia, ) => (
              <span className="capitalize">
                {social.platform} - {social.url} {social.icon && `(Icon: ${social.icon})`} (Order: {social.order})
              </span>
            ),
            renderForm: () => (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <select
                  value={newSocial.platform}
                  onChange={(e) => setNewSocial({...newSocial, platform: e.target.value as SocialMedia['platform']})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="pinterest">Pinterest</option>
                </select>
                <input
                  type="text"
                  placeholder="URL *"
                  value={newSocial.url}
                  onChange={(e) => setNewSocial({...newSocial, url: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Icon Class"
                  value={newSocial.icon}
                  onChange={(e) => setNewSocial({...newSocial, icon: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Order"
                  value={newSocial.order}
                  onChange={(e) => setNewSocial({...newSocial, order: parseInt(e.target.value) || 0})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ),
          })}

          {/* Copyright */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Copyright</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Copyright Text
              </label>
              <input
                type="text"
                value={formData.copyright}
                onChange={(e) => handleInputChange('copyright', e.target.value)}
                placeholder="© 2024 Your Company. All rights reserved."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Footer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FooterForm;