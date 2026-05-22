import type {
  Invoice, Client, Employee, Department, Attendance,
  LeaveRequest, Payroll, Payment, BillingPlan,
  Stat, Activity, MonthlyRevenue, PaymentStatus,
} from "../types";

// ----------------------------------------------------------------
// Helper
// ----------------------------------------------------------------
const genId = (): string => crypto.randomUUID();

const now = (): string => new Date().toISOString();

// ----------------------------------------------------------------
// Seed data
// ----------------------------------------------------------------

export let stats: Stat[] = [
  { label: "Total Revenue", value: "$284,500", change: "+12.5%", trend: "up", icon: "DollarSign", prefix: "", suffix: "" },
  { label: "Paid Invoices", value: "1,842", change: "+8.2%", trend: "up", icon: "CheckCircle", prefix: "", suffix: "" },
  { label: "Pending Payments", value: "$48,200", change: "-3.1%", trend: "down", icon: "Clock", prefix: "", suffix: "" },
  { label: "Overdue Invoices", value: "$22,300", change: "+2.4%", trend: "down", icon: "AlertTriangle", prefix: "", suffix: "" },
  { label: "Active Clients", value: "573", change: "+18.7%", trend: "up", icon: "Users", prefix: "", suffix: "" },
  { label: "Monthly Profit", value: "$27,000", change: "+15.3%", trend: "up", icon: "TrendingUp", prefix: "", suffix: "" },
];

export let monthlyRevenue: MonthlyRevenue[] = [
  { month: "Jan", revenue: 28500, expenses: 12000, profit: 16500 },
  { month: "Feb", revenue: 32200, expenses: 13500, profit: 18700 },
  { month: "Mar", revenue: 29800, expenses: 11000, profit: 18800 },
  { month: "Apr", revenue: 35600, expenses: 14200, profit: 21400 },
  { month: "May", revenue: 42800, expenses: 15800, profit: 27000 },
  { month: "Jun", revenue: 39500, expenses: 14500, profit: 25000 },
];

export let paymentStatusData: PaymentStatus[] = [
  { label: "Paid", value: 65, color: "#10b981", amount: 184900 },
  { label: "Pending", value: 20, color: "#f59e0b", amount: 57000 },
  { label: "Overdue", value: 10, color: "#ef4444", amount: 32100 },
  { label: "Draft", value: 5, color: "#9ca3af", amount: 9900 },
];

export let activities: Activity[] = [
  { id: "1", type: "payment", message: "Payment received from Acme Corp - $12,500", timestamp: new Date(Date.now() - 120000).toISOString(), user: "Stripe" },
  { id: "2", type: "invoice", message: "Invoice INV-005 sent to CloudBase Systems", timestamp: new Date(Date.now() - 900000).toISOString(), user: "System" },
  { id: "3", type: "client", message: "New client registered: DesignStudio Co", timestamp: new Date(Date.now() - 3600000).toISOString(), user: "Admin" },
  { id: "4", type: "failed", message: "Payment failed for GlobalTrade Ltd - $22,300", timestamp: new Date(Date.now() - 7200000).toISOString(), user: "Stripe" },
  { id: "5", type: "payment", message: "Payment received from Quantum Labs - $15,750", timestamp: new Date(Date.now() - 10800000).toISOString(), user: "PayPal" },
  { id: "6", type: "invoice", message: "Invoice INV-007 marked as paid", timestamp: new Date(Date.now() - 18000000).toISOString(), user: "System" },
  { id: "7", type: "client", message: "New client registered: Apex Digital", timestamp: new Date(Date.now() - 21600000).toISOString(), user: "Admin" },
  { id: "8", type: "refund", message: "Refund processed for TechStart Inc - $840", timestamp: new Date(Date.now() - 28800000).toISOString(), user: "Admin" },
  { id: "9", type: "employee", message: "New employee joined: Sarah Chen (Engineering)", timestamp: new Date(Date.now() - 172800000).toISOString(), user: "System" },
  { id: "10", type: "leave", message: "Leave approved for Michael Torres (Vacation)", timestamp: new Date(Date.now() - 172800000).toISOString(), user: "Admin" },
];

export let invoices: Invoice[] = [
  { id: "INV-001", clientId: "c1", clientName: "Acme Corp", email: "billing@acme.com", amount: 12500, dueDate: "2026-05-15", status: "paid", items: [{ description: "Web Development", quantity: 1, rate: 12500, amount: 12500 }], invoiceDate: "2026-05-01", createdAt: now(), updatedAt: now() },
  { id: "INV-002", clientId: "c2", clientName: "TechStart Inc", email: "finance@techstart.io", amount: 8400, dueDate: "2026-05-20", status: "pending", items: [{ description: "UI/UX Design", quantity: 40, rate: 210, amount: 8400 }], invoiceDate: "2026-05-05", createdAt: now(), updatedAt: now() },
  { id: "INV-003", clientId: "c3", clientName: "GlobalTrade Ltd", email: "ap@globaltrade.com", amount: 22300, dueDate: "2026-05-10", status: "overdue", items: [{ description: "Consulting Services", quantity: 50, rate: 446, amount: 22300 }], invoiceDate: "2026-04-10", createdAt: now(), updatedAt: now() },
  { id: "INV-004", clientId: "c4", clientName: "DesignStudio Co", email: "payments@designstudio.co", amount: 5600, dueDate: "2026-05-25", status: "paid", items: [{ description: "Brand Identity", quantity: 1, rate: 5600, amount: 5600 }], invoiceDate: "2026-05-10", createdAt: now(), updatedAt: now() },
  { id: "INV-005", clientId: "c5", clientName: "CloudBase Systems", email: "billing@cloudbase.io", amount: 18900, dueDate: "2026-05-18", status: "pending", items: [{ description: "Cloud Migration", quantity: 1, rate: 18900, amount: 18900 }], invoiceDate: "2026-05-08", createdAt: now(), updatedAt: now() },
  { id: "INV-006", clientId: "c1", clientName: "NexGen Solutions", email: "accounting@nexgen.com", amount: 3200, dueDate: "2026-05-30", status: "draft", items: [{ description: "Maintenance", quantity: 1, rate: 3200, amount: 3200 }], invoiceDate: "2026-05-15", createdAt: now(), updatedAt: now() },
  { id: "INV-007", clientId: "c7", clientName: "Quantum Labs", email: "finance@quantumlab.org", amount: 15750, dueDate: "2026-05-12", status: "paid", items: [{ description: "Research Package", quantity: 1, rate: 15750, amount: 15750 }], invoiceDate: "2026-04-28", createdAt: now(), updatedAt: now() },
  { id: "INV-008", clientId: "c8", clientName: "Apex Digital", email: "invoices@apex.digital", amount: 9800, dueDate: "2026-05-22", status: "overdue", items: [{ description: "Digital Marketing", quantity: 1, rate: 9800, amount: 9800 }], invoiceDate: "2026-04-22", createdAt: now(), updatedAt: now() },
  { id: "INV-009", clientId: "c2", clientName: "TechStart Inc", email: "finance@techstart.io", amount: 15000, dueDate: "2026-06-05", status: "draft", items: [{ description: "Mobile App Dev", quantity: 1, rate: 15000, amount: 15000 }], invoiceDate: "2026-05-18", createdAt: now(), updatedAt: now() },
  { id: "INV-010", clientId: "c6", clientName: "NexGen Solutions", email: "accounting@nexgen.com", amount: 7200, dueDate: "2026-06-01", status: "pending", items: [{ description: "Server Maintenance", quantity: 3, rate: 2400, amount: 7200 }], invoiceDate: "2026-05-16", createdAt: now(), updatedAt: now() },
];

export let clients: Client[] = [
  { id: "c1", name: "Acme Corp", email: "billing@acme.com", phone: "+1-555-0101", company: "Acme Corporation", address: "123 Business Ave, New York, NY 10001", gstin: "GSTIN123456", status: "active", totalInvoices: 12, totalAmount: 156000, createdAt: "2025-01-15T00:00:00Z", updatedAt: now() },
  { id: "c2", name: "TechStart Inc", email: "finance@techstart.io", phone: "+1-555-0102", company: "TechStart Inc", address: "456 Innovation Drive, San Francisco, CA 94105", gstin: "GSTIN789012", status: "active", totalInvoices: 8, totalAmount: 98000, createdAt: "2025-02-20T00:00:00Z", updatedAt: now() },
  { id: "c3", name: "GlobalTrade Ltd", email: "ap@globaltrade.com", phone: "+1-555-0103", company: "GlobalTrade Ltd", address: "789 Commerce St, Chicago, IL 60601", gstin: "GSTIN345678", status: "active", totalInvoices: 5, totalAmount: 120000, createdAt: "2025-03-10T00:00:00Z", updatedAt: now() },
  { id: "c4", name: "DesignStudio Co", email: "payments@designstudio.co", phone: "+1-555-0104", company: "DesignStudio Co", address: "321 Creative Lane, Austin, TX 78701", status: "active", totalInvoices: 3, totalAmount: 28000, createdAt: "2025-04-05T00:00:00Z", updatedAt: now() },
  { id: "c5", name: "CloudBase Systems", email: "billing@cloudbase.io", phone: "+1-555-0105", company: "CloudBase Systems", address: "654 Cloud Avenue, Seattle, WA 98101", gstin: "GSTIN901234", status: "active", totalInvoices: 7, totalAmount: 145000, createdAt: "2025-01-25T00:00:00Z", updatedAt: now() },
  { id: "c6", name: "NexGen Solutions", email: "accounting@nexgen.com", phone: "+1-555-0106", company: "NexGen Solutions", address: "987 Future Rd, Boston, MA 02101", status: "active", totalInvoices: 4, totalAmount: 45000, createdAt: "2025-05-12T00:00:00Z", updatedAt: now() },
  { id: "c7", name: "Quantum Labs", email: "finance@quantumlab.org", phone: "+1-555-0107", company: "Quantum Labs", address: "147 Science Park, Denver, CO 80201", gstin: "GSTIN567890", status: "active", totalInvoices: 6, totalAmount: 89000, createdAt: "2025-02-28T00:00:00Z", updatedAt: now() },
  { id: "c8", name: "Apex Digital", email: "invoices@apex.digital", phone: "+1-555-0108", company: "Apex Digital", address: "258 Digital Way, Miami, FL 33101", status: "inactive", totalInvoices: 2, totalAmount: 18000, createdAt: "2025-06-01T00:00:00Z", updatedAt: now() },
];

export let departments: Department[] = [
  { id: "d1", name: "Engineering", head: "Alice Johnson", employeeCount: 12, budget: 500000, status: "active", createdAt: "2025-01-01T00:00:00Z", updatedAt: now() },
  { id: "d2", name: "Design", head: "Bob Smith", employeeCount: 8, budget: 300000, status: "active", createdAt: "2025-01-01T00:00:00Z", updatedAt: now() },
  { id: "d3", name: "Marketing", head: "Carol Williams", employeeCount: 6, budget: 250000, status: "active", createdAt: "2025-01-01T00:00:00Z", updatedAt: now() },
  { id: "d4", name: "Sales", head: "David Brown", employeeCount: 10, budget: 400000, status: "active", createdAt: "2025-01-01T00:00:00Z", updatedAt: now() },
  { id: "d5", name: "Human Resources", head: "Eve Davis", employeeCount: 4, budget: 150000, status: "active", createdAt: "2025-01-01T00:00:00Z", updatedAt: now() },
  { id: "d6", name: "Finance", head: "Frank Miller", employeeCount: 5, budget: 200000, status: "active", createdAt: "2025-01-01T00:00:00Z", updatedAt: now() },
];

export let employees: Employee[] = [
  { id: "e1", firstName: "Alice", lastName: "Johnson", email: "alice@company.com", phone: "+1-555-1001", department: "Engineering", position: "Engineering Manager", salary: 150000, status: "active", joinDate: "2024-01-15", address: "100 Tech Lane, SF, CA", bankAccount: "****1234", ifscCode: "HDFC0001234", createdAt: "2024-01-15T00:00:00Z", updatedAt: now() },
  { id: "e2", firstName: "Bob", lastName: "Smith", email: "bob@company.com", phone: "+1-555-1002", department: "Design", position: "Lead Designer", salary: 130000, status: "active", joinDate: "2024-02-01", address: "200 Design St, SF, CA", bankAccount: "****5678", ifscCode: "HDFC0005678", createdAt: "2024-02-01T00:00:00Z", updatedAt: now() },
  { id: "e3", firstName: "Charlie", lastName: "Brown", email: "charlie@company.com", phone: "+1-555-1003", department: "Engineering", position: "Senior Developer", salary: 125000, status: "active", joinDate: "2024-03-10", address: "300 Code Ave, SF, CA", createdAt: "2024-03-10T00:00:00Z", updatedAt: now() },
  { id: "e4", firstName: "Diana", lastName: "Prince", email: "diana@company.com", phone: "+1-555-1004", department: "Marketing", position: "Marketing Lead", salary: 110000, status: "active", joinDate: "2024-04-05", address: "400 Market Rd, SF, CA", createdAt: "2024-04-05T00:00:00Z", updatedAt: now() },
  { id: "e5", firstName: "Edward", lastName: "Norton", email: "edward@company.com", phone: "+1-555-1005", department: "Sales", position: "Sales Manager", salary: 140000, status: "active", joinDate: "2024-01-20", address: "500 Sales Blvd, SF, CA", createdAt: "2024-01-20T00:00:00Z", updatedAt: now() },
  { id: "e6", firstName: "Fiona", lastName: "Apple", email: "fiona@company.com", phone: "+1-555-1006", department: "Finance", position: "Finance Manager", salary: 135000, status: "active", joinDate: "2024-02-15", address: "600 Money St, SF, CA", createdAt: "2024-02-15T00:00:00Z", updatedAt: now() },
  { id: "e7", firstName: "George", lastName: "Lucas", email: "george@company.com", phone: "+1-555-1007", department: "Human Resources", position: "HR Manager", salary: 95000, status: "active", joinDate: "2024-03-01", address: "700 People Ave, SF, CA", createdAt: "2024-03-01T00:00:00Z", updatedAt: now() },
  { id: "e8", firstName: "Hannah", lastName: "Montana", email: "hannah@company.com", phone: "+1-555-1008", department: "Engineering", position: "Developer", salary: 100000, status: "active", joinDate: "2024-05-01", address: "800 Code St, SF, CA", createdAt: "2024-05-01T00:00:00Z", updatedAt: now() },
  { id: "e9", firstName: "Ian", lastName: "Malcolm", email: "ian@company.com", phone: "+1-555-1009", department: "Design", position: "UI Designer", salary: 90000, status: "on-leave", joinDate: "2024-06-01", address: "900 Design Ln, SF, CA", createdAt: "2024-06-01T00:00:00Z", updatedAt: now() },
  { id: "e10", firstName: "Julia", lastName: "Roberts", email: "julia@company.com", phone: "+1-555-1010", department: "Marketing", position: "Content Strategist", salary: 85000, status: "active", joinDate: "2024-07-01", address: "1000 Content Dr, SF, CA", createdAt: "2024-07-01T00:00:00Z", updatedAt: now() },
  { id: "e11", firstName: "Kevin", lastName: "Hart", email: "kevin@company.com", phone: "+1-555-1011", department: "Sales", position: "Sales Rep", salary: 80000, status: "active", joinDate: "2024-08-01", address: "1100 Sales St, SF, CA", createdAt: "2024-08-01T00:00:00Z", updatedAt: now() },
  { id: "e12", firstName: "Laura", lastName: "Croft", email: "laura@company.com", phone: "+1-555-1012", department: "Engineering", position: "DevOps Engineer", salary: 120000, status: "active", joinDate: "2024-09-01", address: "1200 Ops Way, SF, CA", createdAt: "2024-09-01T00:00:00Z", updatedAt: now() },
];

export let attendanceRecords: Attendance[] = [
  { id: "a1", employeeId: "e1", employeeName: "Alice Johnson", date: "2026-05-01", status: "present", checkIn: "09:00", checkOut: "18:00", createdAt: now(), updatedAt: now() },
  { id: "a2", employeeId: "e2", employeeName: "Bob Smith", date: "2026-05-01", status: "present", checkIn: "08:45", checkOut: "17:30", createdAt: now(), updatedAt: now() },
  { id: "a3", employeeId: "e3", employeeName: "Charlie Brown", date: "2026-05-01", status: "absent", checkIn: "-", checkOut: "-", createdAt: now(), updatedAt: now() },
  { id: "a4", employeeId: "e4", employeeName: "Diana Prince", date: "2026-05-01", status: "present", checkIn: "09:15", checkOut: "18:15", createdAt: now(), updatedAt: now() },
  { id: "a5", employeeId: "e5", employeeName: "Edward Norton", date: "2026-05-01", status: "half-day", checkIn: "09:00", checkOut: "13:00", createdAt: now(), updatedAt: now() },
  { id: "a6", employeeId: "e1", employeeName: "Alice Johnson", date: "2026-05-02", status: "present", checkIn: "08:55", checkOut: "17:45", createdAt: now(), updatedAt: now() },
  { id: "a7", employeeId: "e2", employeeName: "Bob Smith", date: "2026-05-02", status: "leave", checkIn: "-", checkOut: "-", createdAt: now(), updatedAt: now() },
  { id: "a8", employeeId: "e3", employeeName: "Charlie Brown", date: "2026-05-02", status: "present", checkIn: "09:10", checkOut: "18:05", createdAt: now(), updatedAt: now() },
];

export let leaveRequests: LeaveRequest[] = [
  { id: "l1", employeeId: "e2", employeeName: "Bob Smith", type: "vacation", startDate: "2026-05-02", endDate: "2026-05-05", reason: "Family vacation", status: "approved", createdAt: "2026-04-20T00:00:00Z", updatedAt: now() },
  { id: "l2", employeeId: "e9", employeeName: "Ian Malcolm", type: "sick", startDate: "2026-05-10", endDate: "2026-05-14", reason: "Medical leave", status: "approved", createdAt: "2026-05-08T00:00:00Z", updatedAt: now() },
  { id: "l3", employeeId: "e8", employeeName: "Hannah Montana", type: "personal", startDate: "2026-05-20", endDate: "2026-05-20", reason: "Personal work", status: "pending", createdAt: "2026-05-15T00:00:00Z", updatedAt: now() },
  { id: "l4", employeeId: "e11", employeeName: "Kevin Hart", type: "vacation", startDate: "2026-06-01", endDate: "2026-06-05", reason: "Summer trip", status: "pending", createdAt: "2026-05-17T00:00:00Z", updatedAt: now() },
  { id: "l5", employeeId: "e4", employeeName: "Diana Prince", type: "sick", startDate: "2026-05-15", endDate: "2026-05-16", reason: "Not feeling well", status: "approved", createdAt: "2026-05-14T00:00:00Z", updatedAt: now() },
];

export let payrollRecords: Payroll[] = [
  { id: "p1", employeeId: "e1", employeeName: "Alice Johnson", month: "May", year: 2026, basicSalary: 150000, allowances: 20000, deductions: 15000, netSalary: 155000, status: "pending", createdAt: now(), updatedAt: now() },
  { id: "p2", employeeId: "e2", employeeName: "Bob Smith", month: "May", year: 2026, basicSalary: 130000, allowances: 15000, deductions: 12000, netSalary: 133000, status: "paid", paidDate: "2026-05-01", createdAt: now(), updatedAt: now() },
  { id: "p3", employeeId: "e3", employeeName: "Charlie Brown", month: "May", year: 2026, basicSalary: 125000, allowances: 10000, deductions: 11000, netSalary: 124000, status: "processing", createdAt: now(), updatedAt: now() },
  { id: "p4", employeeId: "e4", employeeName: "Diana Prince", month: "May", year: 2026, basicSalary: 110000, allowances: 12000, deductions: 10000, netSalary: 112000, status: "pending", createdAt: now(), updatedAt: now() },
  { id: "p5", employeeId: "e5", employeeName: "Edward Norton", month: "May", year: 2026, basicSalary: 140000, allowances: 18000, deductions: 13000, netSalary: 145000, status: "paid", paidDate: "2026-04-30", createdAt: now(), updatedAt: now() },
  { id: "p6", employeeId: "e1", employeeName: "Alice Johnson", month: "April", year: 2026, basicSalary: 150000, allowances: 20000, deductions: 15000, netSalary: 155000, status: "paid", paidDate: "2026-04-01", createdAt: "2026-04-01T00:00:00Z", updatedAt: now() },
  { id: "p7", employeeId: "e2", employeeName: "Bob Smith", month: "April", year: 2026, basicSalary: 130000, allowances: 15000, deductions: 12000, netSalary: 133000, status: "paid", paidDate: "2026-04-01", createdAt: "2026-04-01T00:00:00Z", updatedAt: now() },
];

export let payments: Payment[] = [
  { id: "pay1", invoiceId: "INV-001", clientName: "Acme Corp", amount: 12500, method: "bank_transfer", status: "completed", transactionId: "TXN-001", date: "2026-05-02", createdAt: now(), updatedAt: now() },
  { id: "pay2", invoiceId: "INV-004", clientName: "DesignStudio Co", amount: 5600, method: "credit_card", status: "completed", transactionId: "TXN-002", date: "2026-05-12", createdAt: now(), updatedAt: now() },
  { id: "pay3", invoiceId: "INV-007", clientName: "Quantum Labs", amount: 15750, method: "bank_transfer", status: "completed", transactionId: "TXN-003", date: "2026-05-11", createdAt: now(), updatedAt: now() },
  { id: "pay4", invoiceId: "INV-002", clientName: "TechStart Inc", amount: 8400, method: "check", status: "pending", transactionId: "TXN-004", date: "2026-05-15", createdAt: now(), updatedAt: now() },
  { id: "pay5", invoiceId: "INV-003", clientName: "GlobalTrade Ltd", amount: 22300, method: "bank_transfer", status: "failed", transactionId: "TXN-005", date: "2026-05-10", createdAt: now(), updatedAt: now() },
  { id: "pay6", invoiceId: "INV-005", clientName: "CloudBase Systems", amount: 18900, method: "upi", status: "pending", transactionId: "TXN-006", date: "2026-05-16", createdAt: now(), updatedAt: now() },
];

export let billingPlans: BillingPlan[] = [
  { id: "b1", clientId: "c1", clientName: "Acme Corp", plan: "enterprise", amount: 2999, status: "active", startDate: "2025-01-15", endDate: "2026-01-15", createdAt: "2025-01-15T00:00:00Z", updatedAt: now() },
  { id: "b2", clientId: "c2", clientName: "TechStart Inc", plan: "pro", amount: 1499, status: "active", startDate: "2025-02-20", endDate: "2026-02-20", createdAt: "2025-02-20T00:00:00Z", updatedAt: now() },
  { id: "b3", clientId: "c3", clientName: "GlobalTrade Ltd", plan: "enterprise", amount: 2999, status: "active", startDate: "2025-03-10", endDate: "2026-03-10", createdAt: "2025-03-10T00:00:00Z", updatedAt: now() },
  { id: "b4", clientId: "c4", clientName: "DesignStudio Co", plan: "basic", amount: 499, status: "trial", startDate: "2025-04-05", endDate: "2025-05-05", createdAt: "2025-04-05T00:00:00Z", updatedAt: now() },
  { id: "b5", clientId: "c5", clientName: "CloudBase Systems", plan: "pro", amount: 1499, status: "active", startDate: "2025-01-25", endDate: "2026-01-25", createdAt: "2025-01-25T00:00:00Z", updatedAt: now() },
  { id: "b6", clientId: "c6", clientName: "NexGen Solutions", plan: "basic", amount: 499, status: "expired", startDate: "2025-05-12", endDate: "2025-11-12", createdAt: "2025-05-12T00:00:00Z", updatedAt: now() },
];

// ----------------------------------------------------------------
// Generic CRUD helpers
// ----------------------------------------------------------------

function paginate<T>(items: T[], page: number, limit: number) {
  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    total: items.length,
    page,
    limit,
    totalPages: Math.ceil(items.length / limit),
  };
}

// ----------------------------------------------------------------
// Store object
// ----------------------------------------------------------------

export const store = {
  // --- Invoices ---
  getInvoices: (page = 1, limit = 50, search?: string, status?: string) => {
    let filtered = [...invoices];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (inv) =>
          inv.clientName.toLowerCase().includes(q) ||
          inv.id.toLowerCase().includes(q) ||
          inv.email.toLowerCase().includes(q),
      );
    }
    if (status) {
      filtered = filtered.filter((inv) => inv.status === status);
    }
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return paginate(filtered, page, limit);
  },

  getInvoice: (id: string) => invoices.find((inv) => inv.id === id),

  createInvoice: (data: Omit<Invoice, "id" | "createdAt" | "updatedAt">) => {
    const inv: Invoice = { ...data, id: `INV-${String(invoices.length + 1).padStart(3, "0")}`, createdAt: now(), updatedAt: now() };
    invoices.unshift(inv);
    activities.unshift({ id: genId(), type: "invoice", message: `Invoice ${inv.id} created for ${inv.clientName}`, timestamp: "Just now" });
    return inv;
  },

  updateInvoice: (id: string, data: Partial<Invoice>) => {
    const idx = invoices.findIndex((inv) => inv.id === id);
    if (idx === -1) return null;
    invoices[idx] = { ...invoices[idx], ...data, updatedAt: now() };
    return invoices[idx];
  },

  deleteInvoice: (id: string) => {
    const idx = invoices.findIndex((inv) => inv.id === id);
    if (idx === -1) return false;
    invoices.splice(idx, 1);
    return true;
  },

  // --- Clients ---
  getClients: (page = 1, limit = 50, search?: string, status?: string) => {
    let filtered = [...clients];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (c) => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q),
      );
    }
    if (status) filtered = filtered.filter((c) => c.status === status);
    return paginate(filtered, page, limit);
  },

  getClient: (id: string) => clients.find((c) => c.id === id),

  createClient: (data: Omit<Client, "id" | "createdAt" | "updatedAt" | "totalInvoices" | "totalAmount">) => {
    const client: Client = { ...data, id: genId(), totalInvoices: 0, totalAmount: 0, createdAt: now(), updatedAt: now() };
    clients.push(client);
    activities.unshift({ id: genId(), type: "client", message: `New client registered: ${client.name}`, timestamp: "Just now" });
    return client;
  },

  updateClient: (id: string, data: Partial<Client>) => {
    const idx = clients.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    clients[idx] = { ...clients[idx], ...data, updatedAt: now() };
    return clients[idx];
  },

  deleteClient: (id: string) => {
    const idx = clients.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    clients.splice(idx, 1);
    return true;
  },

  // --- Employees ---
  getEmployees: (page = 1, limit = 50, search?: string, department?: string, status?: string) => {
    let filtered = [...employees];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.position.toLowerCase().includes(q),
      );
    }
    if (department) filtered = filtered.filter((e) => e.department === department);
    if (status) filtered = filtered.filter((e) => e.status === status);
    return paginate(filtered, page, limit);
  },

  getEmployee: (id: string) => employees.find((e) => e.id === id),

  createEmployee: (data: Omit<Employee, "id" | "createdAt" | "updatedAt">) => {
    const emp: Employee = { ...data, id: genId(), createdAt: now(), updatedAt: now() };
    employees.push(emp);
    const dept = departments.find((d) => d.name === emp.department);
    if (dept) { dept.employeeCount += 1; dept.updatedAt = now(); }
    activities.unshift({ id: genId(), type: "employee", message: `New employee joined: ${emp.firstName} ${emp.lastName} (${emp.department})`, timestamp: "Just now" });
    return emp;
  },

  updateEmployee: (id: string, data: Partial<Employee>) => {
    const idx = employees.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    employees[idx] = { ...employees[idx], ...data, updatedAt: now() };
    return employees[idx];
  },

  deleteEmployee: (id: string) => {
    const idx = employees.findIndex((e) => e.id === id);
    if (idx === -1) return false;
    const emp = employees[idx];
    const dept = departments.find((d) => d.name === emp.department);
    if (dept) { dept.employeeCount -= 1; dept.updatedAt = now(); }
    employees.splice(idx, 1);
    return true;
  },

  // --- Departments ---
  getDepartments: (search?: string, status?: string) => {
    let filtered = [...departments];
    if (search) filtered = filtered.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
    if (status) filtered = filtered.filter((d) => d.status === status);
    return filtered;
  },

  getDepartment: (id: string) => departments.find((d) => d.id === id),

  createDepartment: (data: Omit<Department, "id" | "createdAt" | "updatedAt" | "employeeCount">) => {
    const dept: Department = { ...data, id: genId(), employeeCount: 0, createdAt: now(), updatedAt: now() };
    departments.push(dept);
    return dept;
  },

  updateDepartment: (id: string, data: Partial<Department>) => {
    const idx = departments.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    departments[idx] = { ...departments[idx], ...data, updatedAt: now() };
    return departments[idx];
  },

  deleteDepartment: (id: string) => {
    const idx = departments.findIndex((d) => d.id === id);
    if (idx === -1) return false;
    departments.splice(idx, 1);
    return true;
  },

  // --- Attendance ---
  getAttendance: (page = 1, limit = 50, employeeId?: string, date?: string) => {
    let filtered = [...attendanceRecords];
    if (employeeId) filtered = filtered.filter((a) => a.employeeId === employeeId);
    if (date) filtered = filtered.filter((a) => a.date === date);
    return paginate(filtered, page, limit);
  },

  getAttendanceByEmployee: (employeeId: string) =>
    attendanceRecords.filter((a) => a.employeeId === employeeId),

  createAttendance: (data: Omit<Attendance, "id" | "createdAt" | "updatedAt">) => {
    const record: Attendance = { ...data, id: genId(), createdAt: now(), updatedAt: now() };
    attendanceRecords.push(record);
    return record;
  },

  updateAttendance: (id: string, data: Partial<Attendance>) => {
    const idx = attendanceRecords.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    attendanceRecords[idx] = { ...attendanceRecords[idx], ...data, updatedAt: now() };
    return attendanceRecords[idx];
  },

  deleteAttendance: (id: string) => {
    const idx = attendanceRecords.findIndex((a) => a.id === id);
    if (idx === -1) return false;
    attendanceRecords.splice(idx, 1);
    return true;
  },

  // --- Leave Requests ---
  getLeaveRequests: (page = 1, limit = 50, status?: string, employeeId?: string) => {
    let filtered = [...leaveRequests];
    if (status) filtered = filtered.filter((l) => l.status === status);
    if (employeeId) filtered = filtered.filter((l) => l.employeeId === employeeId);
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return paginate(filtered, page, limit);
  },

  getLeaveRequest: (id: string) => leaveRequests.find((l) => l.id === id),

  createLeaveRequest: (data: Omit<LeaveRequest, "id" | "createdAt" | "updatedAt">) => {
    const leave: LeaveRequest = { ...data, id: genId(), createdAt: now(), updatedAt: now() };
    leaveRequests.unshift(leave);
    return leave;
  },

  updateLeaveRequest: (id: string, data: Partial<LeaveRequest>) => {
    const idx = leaveRequests.findIndex((l) => l.id === id);
    if (idx === -1) return null;
    leaveRequests[idx] = { ...leaveRequests[idx], ...data, updatedAt: now() };
    const leave = leaveRequests[idx];
    if (data.status === "approved") {
      activities.unshift({ id: genId(), type: "leave", message: `Leave approved for ${leave.employeeName} (${leave.type})`, timestamp: "Just now" });
    }
    return leave;
  },

  deleteLeaveRequest: (id: string) => {
    const idx = leaveRequests.findIndex((l) => l.id === id);
    if (idx === -1) return false;
    leaveRequests.splice(idx, 1);
    return true;
  },

  // --- Payroll ---
  getPayrollRecords: (page = 1, limit = 50, month?: string, year?: number, status?: string) => {
    let filtered = [...payrollRecords];
    if (month) filtered = filtered.filter((p) => p.month === month);
    if (year) filtered = filtered.filter((p) => p.year === year);
    if (status) filtered = filtered.filter((p) => p.status === status);
    return paginate(filtered, page, limit);
  },

  getPayrollRecord: (id: string) => payrollRecords.find((p) => p.id === id),

  createPayrollRecord: (data: Omit<Payroll, "id" | "createdAt" | "updatedAt">) => {
    const record: Payroll = { ...data, id: genId(), createdAt: now(), updatedAt: now() };
    payrollRecords.unshift(record);
    return record;
  },

  updatePayrollRecord: (id: string, data: Partial<Payroll>) => {
    const idx = payrollRecords.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    payrollRecords[idx] = { ...payrollRecords[idx], ...data, updatedAt: now() };
    if (data.status === "paid") {
      activities.unshift({ id: genId(), type: "payroll", message: `Payroll processed for ${payrollRecords[idx].employeeName}`, timestamp: "Just now" });
    }
    return payrollRecords[idx];
  },

  deletePayrollRecord: (id: string) => {
    const idx = payrollRecords.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    payrollRecords.splice(idx, 1);
    return true;
  },

  // --- Payments ---
  getPayments: (page = 1, limit = 50, status?: string, method?: string) => {
    let filtered = [...payments];
    if (status) filtered = filtered.filter((p) => p.status === status);
    if (method) filtered = filtered.filter((p) => p.method === method);
    return paginate(filtered, page, limit);
  },

  getPayment: (id: string) => payments.find((p) => p.id === id),

  createPayment: (data: Omit<Payment, "id" | "createdAt" | "updatedAt">) => {
    const payment: Payment = { ...data, id: genId(), createdAt: now(), updatedAt: now() };
    payments.unshift(payment);
    if (payment.status === "completed") {
      activities.unshift({ id: genId(), type: "payment", message: `Payment received from ${payment.clientName} - $${payment.amount.toLocaleString()}`, timestamp: "Just now" });
    }
    return payment;
  },

  updatePayment: (id: string, data: Partial<Payment>) => {
    const idx = payments.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    payments[idx] = { ...payments[idx], ...data, updatedAt: now() };
    return payments[idx];
  },

  deletePayment: (id: string) => {
    const idx = payments.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    payments.splice(idx, 1);
    return true;
  },

  // --- Billing Plans ---
  getBillingPlans: (page = 1, limit = 50, status?: string) => {
    let filtered = [...billingPlans];
    if (status) filtered = filtered.filter((b) => b.status === status);
    return paginate(filtered, page, limit);
  },

  getBillingPlan: (id: string) => billingPlans.find((b) => b.id === id),

  createBillingPlan: (data: Omit<BillingPlan, "id" | "createdAt" | "updatedAt">) => {
    const plan: BillingPlan = { ...data, id: genId(), createdAt: now(), updatedAt: now() };
    billingPlans.push(plan);
    return plan;
  },

  updateBillingPlan: (id: string, data: Partial<BillingPlan>) => {
    const idx = billingPlans.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    billingPlans[idx] = { ...billingPlans[idx], ...data, updatedAt: now() };
    return billingPlans[idx];
  },

  deleteBillingPlan: (id: string) => {
    const idx = billingPlans.findIndex((b) => b.id === id);
    if (idx === -1) return false;
    billingPlans.splice(idx, 1);
    return true;
  },

  // --- Activities ---
  getActivities: (page = 1, limit = 20) => paginate(activities, page, limit),

  // --- Dashboard ---
  getDashboardData: () => ({
    stats,
    invoices: invoices.slice(0, 5).map((inv) => ({
      id: inv.id,
      clientName: inv.clientName,
      email: inv.email,
      amount: inv.amount,
      dueDate: inv.dueDate,
      status: inv.status,
      createdAt: inv.createdAt,
      items: inv.items ? inv.items.length : 0,
    })),
    recentActivity: activities.slice(0, 7),
    monthlyRevenue,
    paymentStatus: paymentStatusData,
  }),

  // --- Reports ---
  getRevenueReport: (period: "monthly" | "quarterly" | "yearly" = "monthly") => {
    if (period === "quarterly") {
      const quarters = ["Q1", "Q2", "Q3", "Q4"];
      return quarters.map((q, i) => ({
        label: q,
        revenue: monthlyRevenue.slice(i * 3, i * 3 + 3).reduce((s, m) => s + m.revenue, 0),
        expenses: monthlyRevenue.slice(i * 3, i * 3 + 3).reduce((s, m) => s + m.expenses, 0),
      }));
    }
    if (period === "yearly") {
      const totalRev = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
      const totalExp = monthlyRevenue.reduce((s, m) => s + m.expenses, 0);
      return [{ label: "2026", revenue: totalRev, expenses: totalExp }];
    }
    return monthlyRevenue.map((m) => ({ label: m.month, revenue: m.revenue, expenses: m.expenses }));
  },

  getInvoiceStats: () => {
    const total = invoices.length;
    const paid = invoices.filter((i) => i.status === "paid").length;
    const pending = invoices.filter((i) => i.status === "pending").length;
    const overdue = invoices.filter((i) => i.status === "overdue").length;
    const draft = invoices.filter((i) => i.status === "draft").length;
    const totalAmount = invoices.reduce((s, i) => s + i.amount, 0);
    const paidAmount = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
    const pendingAmount = invoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);
    return { total, paid, pending, overdue, draft, totalAmount, paidAmount, pendingAmount };
  },

  getClientStats: () => {
    const total = clients.length;
    const active = clients.filter((c) => c.status === "active").length;
    const inactive = clients.filter((c) => c.status === "inactive").length;
    return { total, active, inactive };
  },

  getEmployeeStats: () => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === "active").length;
    const onLeave = employees.filter((e) => e.status === "on-leave").length;
    const inactive = employees.filter((e) => e.status === "inactive").length;
    const payrollTotal = payrollRecords
      .filter((p) => p.month === "May" && p.year === 2026)
      .reduce((s, p) => s + p.netSalary, 0);
    return { total, active, onLeave, inactive, payrollTotal, departmentCount: departments.length };
  },
};
