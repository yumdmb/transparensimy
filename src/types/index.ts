export interface Transaction {
  id: string;
  transactionHash: string;
  department: string;
  projectName: string;
  amount: number;
  date: Date;
  description: string;
  location: string;
  status: 'completed' | 'ongoing' | 'planned';
  budgetAllocated: number;
  amountSpent: number;
  category: string;
  contractor?: string;
}

export interface Department {
  id: string;
  name: string;
  nameMs: string;
  totalBudget: number;
  totalSpent: number;
  projectCount: number;
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface Feedback {
  id: string;
  projectId: string;
  rating: number;
  comment: string;
  date: Date;
  userId: string;
}

export type Language = 'en' | 'ms';
