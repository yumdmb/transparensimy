import { Transaction, Department } from '../types';

export const departments: Department[] = [
  {
    id: 'moh',
    name: 'Ministry of Health',
    nameMs: 'Kementerian Kesihatan',
    totalBudget: 35000000000,
    totalSpent: 28500000000,
    projectCount: 156,
    icon: 'Heart'
  },
  {
    id: 'moe',
    name: 'Ministry of Education',
    nameMs: 'Kementerian Pendidikan',
    totalBudget: 50000000000,
    totalSpent: 42000000000,
    projectCount: 234,
    icon: 'GraduationCap'
  },
  {
    id: 'mot',
    name: 'Ministry of Transport',
    nameMs: 'Kementerian Pengangkutan',
    totalBudget: 25000000000,
    totalSpent: 18000000000,
    projectCount: 89,
    icon: 'Train'
  },
  {
    id: 'mow',
    name: 'Ministry of Works',
    nameMs: 'Kementerian Kerja Raya',
    totalBudget: 30000000000,
    totalSpent: 22000000000,
    projectCount: 112,
    icon: 'Building2'
  },
  {
    id: 'mod',
    name: 'Ministry of Defence',
    nameMs: 'Kementerian Pertahanan',
    totalBudget: 20000000000,
    totalSpent: 15000000000,
    projectCount: 67,
    icon: 'Shield'
  }
];

export const generateTransactions = (): Transaction[] => {
  const projects = [
    {
      name: 'Hospital Equipment Upgrade - Selangor',
      nameMs: 'Naik Taraf Peralatan Hospital - Selangor',
      department: 'Ministry of Health',
      location: 'Selangor',
      category: 'Healthcare Infrastructure'
    },
    {
      name: 'Rural School Construction - Sabah',
      nameMs: 'Pembinaan Sekolah Luar Bandar - Sabah',
      department: 'Ministry of Education',
      location: 'Sabah',
      category: 'Education Infrastructure'
    },
    {
      name: 'Highway Maintenance KL-Seremban',
      nameMs: 'Penyelenggaraan Lebuh Raya KL-Seremban',
      department: 'Ministry of Works',
      location: 'Kuala Lumpur',
      category: 'Road Infrastructure'
    },
    {
      name: 'MRT Line 3 Development',
      nameMs: 'Pembangunan Laluan MRT 3',
      department: 'Ministry of Transport',
      location: 'Klang Valley',
      category: 'Public Transport'
    },
    {
      name: 'Flood Mitigation System - Kelantan',
      nameMs: 'Sistem Mitigasi Banjir - Kelantan',
      department: 'Ministry of Works',
      location: 'Kelantan',
      category: 'Disaster Management'
    },
    {
      name: 'Smart Classroom Initiative',
      nameMs: 'Inisiatif Bilik Darjah Pintar',
      department: 'Ministry of Education',
      location: 'Nationwide',
      category: 'Digital Education'
    },
    {
      name: 'COVID-19 Vaccination Centers',
      nameMs: 'Pusat Vaksinasi COVID-19',
      department: 'Ministry of Health',
      location: 'Nationwide',
      category: 'Public Health'
    },
    {
      name: 'Rural Road Development - Sarawak',
      nameMs: 'Pembangunan Jalan Luar Bandar - Sarawak',
      department: 'Ministry of Works',
      location: 'Sarawak',
      category: 'Rural Development'
    },
    {
      name: 'Military Base Upgrade - Johor',
      nameMs: 'Naik Taraf Pangkalan Tentera - Johor',
      department: 'Ministry of Defence',
      location: 'Johor',
      category: 'Defence Infrastructure'
    },
    {
      name: 'Public Bus Fleet Renewal',
      nameMs: 'Pembaharuan Armada Bas Awam',
      department: 'Ministry of Transport',
      location: 'Penang',
      category: 'Public Transport'
    }
  ];

  const transactions: Transaction[] = [];
  const statuses: Transaction['status'][] = ['completed', 'ongoing', 'planned'];
  
  projects.forEach((project, index) => {
    const budgetAllocated = Math.floor(Math.random() * 50000000) + 10000000;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const spentPercentage = status === 'completed' ? 0.95 : status === 'ongoing' ? 0.6 : 0.1;
    const amountSpent = Math.floor(budgetAllocated * spentPercentage);
    
    transactions.push({
      id: `tx-${index + 1}`,
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      department: project.department,
      projectName: project.name,
      amount: budgetAllocated,
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      description: `${project.name} - ${status === 'completed' ? 'Project completed successfully' : status === 'ongoing' ? 'Project in progress' : 'Project in planning phase'}`,
      location: project.location,
      status,
      budgetAllocated,
      amountSpent,
      category: project.category,
      contractor: `Contractor ${String.fromCharCode(65 + Math.floor(Math.random() * 10))} Sdn Bhd`
    });
  });

  return transactions;
};

export const mockTransactions = generateTransactions();
