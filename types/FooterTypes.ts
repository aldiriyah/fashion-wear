export interface PhoneNumber {
    _id?: string | undefined;
  number: string;
  label: string;
}

export interface Category {
  _id?: string | undefined;
  name: string;
  url: string;
  order: number;
}

export interface InformationLink {
  _id?: string | undefined;
  title: string;
  url: string;
  order: number;
}

export interface SocialMedia {
  _id?: string | undefined;
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'pinterest';
  url: string;
  icon: string;
  order: number;
}

export interface CompanyInfo {
  _id?: string | undefined;
  logo: string;
  address: string;
  companyRegistrationNumber: string;
  vatRegistrationNumber: string;
}

export interface ContactInfo {
  _id?: string | undefined;
  email: string;
  phoneNumbers: PhoneNumber[];
}

export interface FooterData {
  _id?: string | undefined;
  title: string;
  
  companyInfo: CompanyInfo;
  categories: Category[];
  informationLinks: InformationLink[];
  contactInfo: ContactInfo;
  socialMedia: SocialMedia[];
  copyright: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FooterFormData {
  _id?: string | undefined;
  title: string;
  companyInfo: Omit<CompanyInfo, 'logo'>;
  categories: Category[];
  informationLinks: InformationLink[];
  contactInfo: ContactInfo;
  socialMedia: SocialMedia[];
  copyright: string;
}