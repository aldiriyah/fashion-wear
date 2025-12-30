// types/contact.ts
export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactStats {
  totalContacts: number;
  contactsByDate: ContactDateCount[];
  subjectsCount: SubjectCount[];
  monthlyTrend: MonthlyTrend[];
  recentContacts: Contact[];
}

export interface ContactDateCount {
  date: string;
  count: number;
}

export interface SubjectCount {
  subject: string;
  count: number;
}

export interface MonthlyTrend {
  month: string;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}