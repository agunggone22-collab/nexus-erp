import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Legend
} from 'recharts';

// --- ICONS MAPPING ---
const Icons = {
  Dashboard: LucideIcons.LayoutDashboard,
  Users: LucideIcons.Users,
  Briefcase: LucideIcons.Briefcase,
  Clock: LucideIcons.Clock,
  DollarSign: LucideIcons.DollarSign,
  TrendingUp: LucideIcons.TrendingUp,
  Settings: LucideIcons.Settings,
  LogOut: LucideIcons.LogOut,
  Sun: LucideIcons.Sun,
  Moon: LucideIcons.Moon,
  Download: LucideIcons.Download,
  Plus: LucideIcons.Plus,
  CheckCircle: LucideIcons.CheckCircle,
  XCircle: LucideIcons.XCircle,
  FileText: LucideIcons.FileText,
  Menu: LucideIcons.Menu,
  X: LucideIcons.X,
  UserCheck: LucideIcons.UserCheck,
  Building: LucideIcons.Building,
  Mail: LucideIcons.Mail,
  Phone: LucideIcons.Phone,
  Award: LucideIcons.Award
};

const initialEmployees = [
  { id: 'EMP-1001', name: 'Budi Santoso', role: 'Software Engineer', dept: 'IT', email: 'budi@nexushcm.com', phone: '+62811223344', status: 'Active', basic_salary: 8000000 },
  { id: 'EMP-1002', name: 'Siti Aminah', role: 'HR Specialist', dept: 'HR', email: 'siti@nexushcm.com', phone: '+62811223355', status: 'Active', basic_salary: 7500000 },
  { id: 'EMP-1003', name: 'Andi Wijaya', role: 'Marketing Lead', dept: 'Marketing', email: 'andi@nexushcm.com', phone: '+62811223366', status: 'Active', basic_salary: 9000000 },
];

const generateRandomCandidate = (count) => {
  const names = ['Agus Pratama', 'Dewi Lestari', 'Reza Rahadian', 'Nita Thalia', 'Hendra Gunawan', 'Maya Putri', 'Doni Kusuma', 'Rini Wulandari'];
  const positions = ['Frontend Developer', 'Data Analyst', 'UI/UX Designer', 'Product Manager', 'QA Engineer', 'Digital Marketer'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  return {
    id: `CAN-${1000 + Math.floor(Math.random() * 9000)}`,
    name: `${randomName} ${count}`,
    position: positions[Math.floor(Math.random() * positions.length)],
    status: 'Screening',
    date: new Date().toISOString().split('T')[0],
    exp: `${Math.floor(Math.random() * 5) + 1} Years`,
    edu: 'Bachelor Degree'
  };
};

// --- COMPREHENSIVE LOCALIZATION DICTIONARY ---
const translations = {
  en: {
    login: 'Login to Nexus ERP',
    username: 'Username',
    password: 'Password',
    signin: 'Sign In',
    dashboard: 'Dashboard',
    employees: 'Employees',
    recruitment: 'Recruitment',
    attendance: 'Attendance',
    payroll: 'Payroll',
    performance: 'Performance',
    settings: 'Settings',
    logout: 'Logout',
    active_emp: 'Active Employees',
    avg_attendance: 'Avg Attendance',
    active_candidates: 'Active Candidates',
    export_pdf: 'Export PDF',
    welcome: 'Welcome back',
    org_trend: 'Organizational Performance Trend',
    attendance_pct: 'Attendance (%)',
    avg_kpi: 'Avg KPI',
    manage_app: 'Manage applicants and job postings.',
    bot_pelamar: 'Applicant Bot',
    candidate_id: 'Candidate ID',
    name: 'Name',
    applied_role: 'Applied Role',
    status: 'Status',
    actions: 'Actions',
    view_cv: 'View CV',
    hire: 'Hire Candidate',
    reject: 'Reject Candidate',
    clock_in: 'Clock In Now',
    clock_out: 'Clock Out Now',
    date: 'Date',
    employee: 'Employee',
    period: 'Period',
    basic_salary: 'Basic Salary',
    payslip: 'Payslip',
    download_pdf: 'Download Official PDF',
    earnings: 'Earnings',
    deductions: 'Deductions',
    take_home_pay: 'Take Home Pay',
    self_assessment: 'Self Assessment',
    create_eval: 'Create Evaluation',
    recent_reviews: 'Recent Reviews',
    theme_pref: 'Theme Preference',
    theme_desc: 'Toggle between light and dark mode',
    lang_pref: 'Language / Bahasa',
    lang_desc: 'Select system interface language',
    change_pass: 'Change Password',
    current_pass: 'Current Password',
    new_pass: 'New Password',
    update_pass: 'Update Password',
    back: 'Back'
  },
  id: {
    login: 'Masuk ke Nexus ERP',
    username: 'Nama Pengguna',
    password: 'Kata Sandi',
    signin: 'Masuk',
    dashboard: 'Dasbor',
    employees: 'Karyawan',
    recruitment: 'Rekrutmen',
    attendance: 'Absensi',
    payroll: 'Penggajian',
    performance: 'Kinerja',
    settings: 'Pengaturan',
    logout: 'Keluar',
    active_emp: 'Karyawan Aktif',
    avg_attendance: 'Rata-rata Kehadiran',
    active_candidates: 'Kandidat Aktif',
    export_pdf: 'Unduh PDF',
    welcome: 'Selamat datang kembali',
    org_trend: 'Tren Performa Organisasi',
    attendance_pct: 'Kehadiran (%)',
    avg_kpi: 'Rata-rata KPI',
    manage_app: 'Kelola pelamar dan lowongan pekerjaan.',
    bot_pelamar: 'Bot Pelamar',
    candidate_id: 'ID Kandidat',
    name: 'Nama',
    applied_role: 'Posisi Dilamar',
    status: 'Status',
    actions: 'Aksi',
    view_cv: 'Lihat CV',
    hire: 'Terima Kandidat',
    reject: 'Tolak Kandidat',
    clock_in: 'Absen Masuk',
    clock_out: 'Absen Pulang',
    date: 'Tanggal',
    employee: 'Karyawan',
    period: 'Periode',
    basic_salary: 'Gaji Pokok',
    payslip: 'Slip Gaji',
    download_pdf: 'Unduh PDF Resmi',
    earnings: 'Pendapatan',
    deductions: 'Potongan',
    take_home_pay: 'Gaji Bersih',
    self_assessment: 'Penilaian Diri',
    create_eval: 'Buat Evaluasi',
    recent_reviews: 'Ulasan Terbaru',
    theme_pref: 'Preferensi Tema',
    theme_desc: 'Beralih antara mode terang dan gelap',
    lang_pref: 'Bahasa / Language',
    lang_desc: 'Pilih bahasa antarmuka sistem',
    change_pass: 'Ubah Kata Sandi',
    current_pass: 'Kata Sandi Saat Ini',
    new_pass: 'Kata Sandi Baru',
    update_pass: 'Perbarui Kata Sandi',
    back: 'Kembali'
  },
  ar: {
    login: 'تسجيل الدخول إلى Nexus ERP',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    signin: 'تسجيل الدخول',
    dashboard: 'لوحة القيادة',
    employees: 'الموظفين',
    recruitment: 'توظيف',
    attendance: 'حضور',
    payroll: 'كشف رواتب',
    performance: 'أداء',
    settings: 'إعدادات',
    logout: 'تسجيل خروج',
    active_emp: 'الموظفين النشطين',
    avg_attendance: 'متوسط الحضور',
    active_candidates: 'المرشحين النشطين',
    export_pdf: 'تصدير PDF',
    welcome: 'مرحباً بك مجدداً',
    org_trend: 'اتجاه الأداء التنظيمي',
    attendance_pct: 'الحضور (%)',
    avg_kpi: 'متوسط المؤشرات',
    manage_app: 'إدارة المتقدمين وإعلانات الوظائف.',
    bot_pelamar: 'روبوت التوظيف',
    candidate_id: 'معرف المرشح',
    name: 'الاسم',
    applied_role: 'الدور المتقدم له',
    status: 'الحالة',
    actions: 'الإجراءات',
    view_cv: 'عرض السيرة الذاتية',
    hire: 'توظيف المرشح',
    reject: 'رفض المرشح',
    clock_in: 'تسجيل الحضور',
    clock_out: 'تسجيل الانصراف',
    date: 'التاريخ',
    employee: 'الموظف',
    period: 'الفترة',
    basic_salary: 'الراتب الأساسي',
    payslip: 'قسيمة الدفع',
    download_pdf: 'تحميل PDF الرسمي',
    earnings: 'المكتسبات',
    deductions: 'الخصومات',
    take_home_pay: 'صافي الراتب',
    self_assessment: 'التقييم الذاتي',
    create_eval: 'إنشاء تقييم',
    recent_reviews: 'التقييمات الأخيرة',
    theme_pref: 'تفضيل المظهر',
    theme_desc: 'التبديل بين الوضع الفاتح والداكن',
    lang_pref: 'اللغة / Language',
    lang_desc: 'اختر لغة واجهة النظام',
    change_pass: 'تغيير كلمة المرور',
    current_pass: 'كلمة المرور الحالية',
    new_pass: 'كلمة المرور الجديدة',
    update_pass: 'تحديث كلمة المرور',
    back: 'رجوع'
  }
};

const t = (key, lang) => {
  return translations[lang]?.[key] || translations['en']?.[key] || key;
};

// --- PDF DOWNLOAD HELPER ---
const handleExportPDF = (elementId, filename) => {
  const element = document.getElementById(elementId);
  if (element && window.html2pdf) {
    const opt = {
      margin: 0.5,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    window.html2pdf().from(element).set(opt).save();
  } else {
    window.print();
  }
};

const Login = ({ onLogin, language, setLanguage }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin123') onLogin({ username: user, role: 'Admin', name: 'System Admin' });
    else if (user === 'manager' && pass === 'manager123') onLogin({ username: user, role: 'Manager', name: 'Manager Operational' });
    else if (user === 'karyawan' && pass === 'karyawan123') onLogin({ username: user, role: 'Employee', name: 'Budi Santoso', id: 'EMP-1001' });
    else setErr('Invalid credentials. Try admin/admin123, manager/manager123, or karyawan/karyawan123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <LucideIcons.Building className="w-6 h-6 text-white" />
          </div>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="text-xs bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg p-2 outline-none"
          >
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="ar">العربية</option>
          </select>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6">{t('login', language)}</h2>
        {err && <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">{err}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('username', language)}</label>
            <input type="text" className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" value={user} onChange={e => setUser(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('password', language)}</label>
            <input type="password" className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" value={pass} onChange={e => setPass(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition shadow-md">
            {t('signin', language)}
          </button>
        </form>
        <div className="mt-6 text-xs text-center text-slate-500">
          Demo: admin/admin123 | manager/manager123 | karyawan/karyawan123
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ stats, user, language }) => {
  const data = [
    { name: 'Jan', kehadiran: 92, kpi: 85 },
    { name: 'Feb', kehadiran: 95, kpi: 88 },
    { name: 'Mar', kehadiran: 89, kpi: 90 },
    { name: 'Apr', kehadiran: 96, kpi: 92 },
  ];

  return (
    <div className="space-y-6" id="dashboard-content">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-lg">
        <div>
          <h2 className="text-3xl font-bold mb-1">
            {t('welcome', language)}, {user.name}! 👋
          </h2>
          <p className="text-blue-100 opacity-90">{user.role} Dashboard</p>
        </div>
        <button onClick={() => handleExportPDF('dashboard-content', 'Dashboard_Report.pdf')} className="bg-white/20 hover:bg-white/35 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center font-medium transition">
          <LucideIcons.Download className="w-4 h-4 mr-2" /> {t('export_pdf', language)}
        </button>
      </div>

      {user.role !== 'Employee' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: t('active_emp', language), val: stats.employees, icon: LucideIcons.Users, color: 'text-blue-600', bg: 'bg-blue-100' },
            { title: t('avg_attendance', language), val: `${stats.attendance}%`, icon: LucideIcons.Clock, color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { title: t('avg_kpi', language), val: stats.kpi, icon: LucideIcons.TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
            { title: t('active_candidates', language), val: stats.candidates, icon: LucideIcons.Briefcase, color: 'text-amber-600', bg: 'bg-amber-100' }
          ].map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <div className={`p-4 rounded-xl ${item.bg} dark:bg-opacity-10`}>
                  <IconComponent className={`w-8 h-8 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.title}</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{item.val}</h3>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
          {t('org_trend', language)}
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend />
              <Line type="monotone" dataKey="kehadiran" name={t('attendance_pct', language)} stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="kpi" name={t('avg_kpi', language)} stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Employees = ({ employees, language }) => {
  return (
    <div className="space-y-6" id="employees-content">
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('employees', language)}</h2>
        <button onClick={() => handleExportPDF('employees-content', 'Employees_Directory.pdf')} className="flex items-center bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <LucideIcons.Download className="w-4 h-4 mr-2" /> {t('export_pdf', language)}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition group">
            <div className="p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-300 font-bold text-2xl border-4 border-white dark:border-slate-800 shadow-sm group-hover:scale-110 transition-transform">
                {emp.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center">{emp.name}</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">{emp.role}</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400"><LucideIcons.Briefcase className="w-4 h-4 mr-3 text-slate-400" />{emp.dept}</div>
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400"><LucideIcons.Mail className="w-4 h-4 mr-3 text-slate-400" /><span className="truncate">{emp.email}</span></div>
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400"><LucideIcons.Phone className="w-4 h-4 mr-3 text-slate-400" />{emp.phone}</div>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500">{emp.id}</span>
              <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{emp.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Recruitment = ({ candidates, onHire, onReject, botEnabled, setBotEnabled, language, showToast }) => {
  const [tab, setTab] = useState('Active');
  const [selectedCv, setSelectedCv] = useState(null);
  
  const activeCands = candidates.filter(c => c.status === 'Screening' || c.status === 'Interview');
  const hiredCands = candidates.filter(c => c.status === 'Hired');
  const rejectedCands = candidates.filter(c => c.status === 'Rejected');

  let displayData = activeCands;
  if (tab === 'Hired') displayData = hiredCands;
  if (tab === 'Rejected') displayData = rejectedCands;

  return (
    <div className="space-y-6" id="recruitment-content">
      {selectedCv && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
             <div className="flex justify-between items-center border-b pb-4 dark:border-slate-700">
               <div>
                 <h3 className="text-xl font-bold dark:text-white">CV: {selectedCv.name}</h3>
                 <p className="text-sm text-slate-500">{selectedCv.position}</p>
               </div>
               <button onClick={() => setSelectedCv(null)} className="text-slate-500 hover:text-slate-800"><LucideIcons.X className="w-5 h-5"/></button>
             </div>
             <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
               <p><strong>Education:</strong> {selectedCv.edu}</p>
               <p><strong>Experience:</strong> {selectedCv.exp}</p>
               <p><strong>Applied Date:</strong> {selectedCv.date}</p>
               <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                 <p className="font-bold text-slate-700 dark:text-slate-200 mb-1">Candidate Summary:</p>
                 <p className="text-xs leading-relaxed">Highly motivated professional with hands-on expertise in agile methodologies, problem solving, and modern tech stacks. Ready to contribute immediately.</p>
               </div>
             </div>
             <div className="pt-4 flex justify-end">
               <button onClick={() => setSelectedCv(null)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Close Preview</button>
             </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('recruitment', language)} (ATS)</h2>
          <p className="text-slate-500 text-sm mt-1">{t('manage_app', language)}</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setBotEnabled(!botEnabled)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition ${botEnabled ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-slate-200 text-slate-600 border border-slate-300 dark:bg-slate-700 dark:text-slate-300'}`}
          >
            {t('bot_pelamar', language)}: {botEnabled ? 'ON' : 'OFF'}
          </button>
          <button onClick={() => handleExportPDF('recruitment-content', 'Recruitment_Report.pdf')} className="flex items-center bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition">
            <LucideIcons.Download className="w-4 h-4 mr-2" /> {t('export_pdf', language)}
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700 pb-2">
        {['Active', 'Hired', 'Rejected'].map(tName => (
          <button 
            key={tName} 
            onClick={() => setTab(tName)}
            className={`pb-2 px-4 font-medium text-sm border-b-2 transition-colors ${tab === tName ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
          >
            {tName} ({(tName === 'Active' ? activeCands : tName === 'Hired' ? hiredCands : rejectedCands).length})
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                <th className="p-4 font-semibold">{t('candidate_id', language)}</th>
                <th className="p-4 font-semibold">{t('name', language)}</th>
                <th className="p-4 font-semibold">{t('applied_role', language)}</th>
                <th className="p-4 font-semibold">{t('status', language)}</th>
                <th className="p-4 font-semibold text-right">{t('actions', language)}</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((cand) => (
                <tr key={cand.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="p-4 text-sm font-mono text-slate-500">{cand.id}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800 dark:text-white">{cand.name}</p>
                    <p className="text-xs text-slate-500">{cand.edu} • {cand.exp}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">{cand.position}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${cand.status === 'Hired' ? 'bg-green-100 text-green-700' : cand.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {cand.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => setSelectedCv(cand)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition" title={t('view_cv', language)}>
                      <LucideIcons.FileText className="w-5 h-5" />
                    </button>
                    {tab === 'Active' && (
                      <>
                        <button onClick={() => onHire(cand)} className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-slate-700 rounded-lg transition" title={t('hire', language)}>
                          <LucideIcons.CheckCircle className="w-5 h-5" />
                        </button>
                        <button onClick={() => onReject(cand)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition" title={t('reject', language)}>
                          <LucideIcons.XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {displayData.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No candidates found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Attendance = ({ user, language, showToast }) => {
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [hasClockedOut, setHasClockedOut] = useState(false);
  const [logs, setLogs] = useState([
    { date: '2023-10-25', in: '07:55 AM', out: '17:05 PM', status: 'Present' },
    { date: '2023-10-24', in: '08:10 AM', out: '17:00 PM', status: 'Late' },
  ]);

  const handleClock = () => {
    const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    if (!hasClockedIn) {
      setHasClockedIn(true);
      showToast(`Clocked In successfully at ${timeStr}`, 'success');
      setLogs([{ date: new Date().toISOString().split('T')[0], in: timeStr, out: '-', status: 'Present' }, ...logs]);
    } else if (!hasClockedOut) {
      setHasClockedOut(true);
      showToast(`Clocked Out successfully at ${timeStr}`, 'success');
      const updatedLogs = [...logs];
      updatedLogs[0].out = timeStr;
      setLogs(updatedLogs);
    }
  };

  return (
    <div className="space-y-6" id="attendance-content">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('attendance', language)}</h2>
          <p className="text-slate-500 text-sm mt-1">Track daily check-ins and check-outs.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          {(user.role === 'Employee' || user.role === 'Manager') && !hasClockedOut && (
             <button 
               onClick={handleClock} 
               className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-white shadow-lg transition transform hover:scale-105 active:scale-95 ${hasClockedIn ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
             >
               {hasClockedIn ? t('clock_out', language) : t('clock_in', language)}
             </button>
          )}
          <button onClick={() => handleExportPDF('attendance-content', 'Attendance_Log.pdf')} className="flex items-center justify-center bg-slate-800 text-white px-4 py-3 md:py-2 rounded-xl md:rounded-lg text-sm font-medium hover:bg-slate-700 transition">
            <LucideIcons.Download className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline">{t('export_pdf', language)}</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm">
            <tr>
              <th className="p-4 font-semibold">{t('date', language)}</th>
              <th className="p-4 font-semibold">{t('employee', language)}</th>
              <th className="p-4 font-semibold">Clock In</th>
              <th className="p-4 font-semibold">Clock Out</th>
              <th className="p-4 font-semibold">{t('status', language)}</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-t border-slate-100 dark:border-slate-700/50">
                <td className="p-4 font-medium text-slate-800 dark:text-white">{log.date}</td>
                <td className="p-4 text-slate-600 dark:text-slate-300">{user.role === 'Admin' ? 'All Employees Log' : user.name}</td>
                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">{log.in}</td>
                <td className="p-4 text-amber-600 dark:text-amber-400 font-medium">{log.out}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${log.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Payroll = ({ employees, user, language }) => {
  const [viewSlip, setViewSlip] = useState(null);
  const myData = user.role === 'Employee' ? employees.filter(e => e.id === user.id) : employees;

  if (viewSlip) {
    return (
      <div className="space-y-4">
        <button onClick={() => setViewSlip(null)} className="flex items-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition">
           <LucideIcons.X className="w-4 h-4 mr-2"/> {t('back', language)}
        </button>
        <div className="flex justify-end mb-4">
           <button onClick={() => handleExportPDF('payslip-document', `Payslip_${viewSlip.name}.pdf`)} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold shadow-md flex items-center">
              <LucideIcons.Download className="w-5 h-5 mr-2"/> {t('download_pdf', language)}
           </button>
        </div>
        
        <div id="payslip-document" className="bg-white p-10 rounded-none shadow-2xl border border-slate-200 max-w-3xl mx-auto text-slate-800" style={{minHeight: '800px'}}>
           <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">NEXUS<span className="text-slate-800">HCM</span></h1>
                <p className="text-sm text-slate-500 mt-1">123 Business Avenue, Tech District</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest">{t('payslip', language)}</h2>
                <p className="text-sm font-bold mt-1 text-slate-500">{t('period', language)}: October 2023</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                 <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Employee Details</p>
                 <p className="font-bold text-lg">{viewSlip.name}</p>
                 <p className="text-sm text-slate-600">ID: {viewSlip.id}</p>
                 <p className="text-sm text-slate-600">Role: {viewSlip.role}</p>
                 <p className="text-sm text-slate-600">Department: {viewSlip.dept}</p>
              </div>
              <div className="text-right border-l-2 border-slate-100 pl-8">
                 <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Payment Info</p>
                 <p className="text-sm text-slate-600">Bank: Bank Mandiri</p>
                 <p className="text-sm text-slate-600">Acc: **** **** 1234</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                 <h3 className="font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">{t('earnings', language)}</h3>
                 <div className="flex justify-between mb-2"><span className="text-sm">{t('basic_salary', language)}</span><span className="font-medium">Rp {viewSlip.basic_salary.toLocaleString()}</span></div>
                 <div className="flex justify-between mb-2"><span className="text-sm">Transport Allowance</span><span className="font-medium">Rp 1,000,000</span></div>
                 <div className="flex justify-between font-bold text-emerald-700 mt-4 pt-2 border-t border-emerald-200"><span className="text-sm">Total</span><span>Rp {(viewSlip.basic_salary + 1000000).toLocaleString()}</span></div>
              </div>
              
              <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                 <h3 className="font-bold text-red-800 mb-4 border-b border-red-200 pb-2">{t('deductions', language)}</h3>
                 <div className="flex justify-between mb-2"><span className="text-sm">Income Tax (PPh 21)</span><span className="font-medium">Rp {(viewSlip.basic_salary * 0.05).toLocaleString()}</span></div>
                 <div className="flex justify-between mb-2"><span className="text-sm">BPJS Health</span><span className="font-medium">Rp 80,000</span></div>
                 <div className="flex justify-between font-bold text-red-700 mt-4 pt-2 border-t border-red-200"><span className="text-sm">Total</span><span>Rp {(viewSlip.basic_salary * 0.05 + 80000).toLocaleString()}</span></div>
              </div>
           </div>

           <div className="mt-8 bg-slate-800 text-white p-6 rounded-xl flex justify-between items-center shadow-lg">
              <span className="text-lg uppercase tracking-wider font-bold opacity-80">{t('take_home_pay', language)}</span>
              <span className="text-3xl font-extrabold tracking-tight">Rp {((viewSlip.basic_salary + 1000000) - (viewSlip.basic_salary * 0.05 + 80000)).toLocaleString()}</span>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('payroll', language)}</h2>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">{t('employee', language)}</th>
              <th className="p-4">{t('period', language)}</th>
              <th className="p-4">{t('basic_salary', language)}</th>
              <th className="p-4 text-right">{t('actions', language)}</th>
            </tr>
          </thead>
          <tbody>
            {myData.map(emp => (
              <tr key={emp.id} className="border-t border-slate-100 dark:border-slate-700/50">
                <td className="p-4 font-mono text-sm text-slate-500">{emp.id}</td>
                <td className="p-4 font-medium text-slate-800 dark:text-white">{emp.name}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">Oct 2023</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">Rp {emp.basic_salary.toLocaleString()}</td>
                <td className="p-4 text-right">
                  <button onClick={() => setViewSlip(emp)} className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-end w-full">
                    <LucideIcons.FileText className="w-4 h-4 mr-1"/> {t('payslip', language)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Performance = ({ user, language, showToast }) => {
  const [detailReview, setDetailReview] = useState(false);
  const [selfAssessModal, setSelfAssessModal] = useState(false);
  const [selfScore, setSelfScore] = useState(90);
  const [selfNotes, setSelfNotes] = useState('');

  const handleSelfSubmit = (e) => {
    e.preventDefault();
    setSelfAssessModal(false);
    showToast('Self assessment submitted successfully!', 'success');
  };

  if (detailReview) {
    return (
      <div className="space-y-6" id="perf-detail-doc">
        <button onClick={() => setDetailReview(false)} className="flex items-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition">
           <LucideIcons.X className="w-4 h-4 mr-2"/> {t('back', language)}
        </button>
        <div className="flex justify-between items-center">
           <h2 className="text-2xl font-bold text-slate-800 dark:text-white">360° Evaluation Detail Report</h2>
           <button onClick={() => handleExportPDF('perf-detail-doc', 'Performance_Review.pdf')} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold shadow-md flex items-center">
              <LucideIcons.Download className="w-4 h-4 mr-2"/> {t('export_pdf', language)}
           </button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
           <div className="flex justify-between border-b pb-4 dark:border-slate-700">
              <div>
                <h3 className="text-xl font-bold dark:text-white">{user.role === 'Employee' ? user.name : 'Budi Santoso'}</h3>
                <p className="text-sm text-slate-500">Q3 2023 Performance Evaluation</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-600">92 / 100</span>
                <p className="text-xs text-slate-400">Final Score (Grade A)</p>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selfAssessModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-700">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold dark:text-white">{t('self_assessment', language)}</h3>
               <button onClick={() => setSelfAssessModal(false)} className="text-slate-500 hover:text-slate-800"><LucideIcons.X className="w-5 h-5"/></button>
             </div>
             <form onSubmit={handleSelfSubmit} className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Score (0 - 100)</label>
                 <input type="number" min="0" max="100" value={selfScore} onChange={e => setSelfScore(e.target.value)} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" required />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Key Achievements & Notes</label>
                 <textarea rows="4" value={selfNotes} onChange={e => setSelfNotes(e.target.value)} placeholder="Describe accomplishments..." className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" required></textarea>
               </div>
               <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold">Submit</button>
             </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('performance', language)}</h2>
          <p className="text-slate-500 text-sm">360 Degree Evaluation & KPIs</p>
        </div>
        {user.role === 'Employee' ? (
          <button onClick={() => setSelfAssessModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md flex items-center">
            <LucideIcons.UserCheck className="w-4 h-4 mr-2"/> + {t('self_assessment', language)}
          </button>
        ) : (
          <button onClick={() => showToast('Create Evaluation Form Opened', 'info')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md flex items-center">
            <LucideIcons.Plus className="w-4 h-4 mr-2"/> {t('create_eval', language)}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold mb-4 flex items-center dark:text-white"><LucideIcons.Award className="w-5 h-5 mr-2 text-amber-500"/> {t('recent_reviews', language)}</h3>
          <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
             <div className="flex justify-between mb-2">
                <span className="font-bold dark:text-white">{user.role === 'Employee' ? 'My Review' : 'Budi Santoso - Q3'}</span>
                <span className="text-emerald-600 font-bold">Score: 92/100</span>
             </div>
             <button onClick={() => setDetailReview(true)} className="text-sm text-blue-600 font-medium mt-2 block">View Review Detail &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Settings = ({ language, setLanguage, darkMode, setDarkMode, onLogout }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('settings', language)}</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700">
        
        <div className="p-6 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">{t('theme_pref', language)}</h3>
            <p className="text-sm text-slate-500">{t('theme_desc', language)}</p>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-full ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-amber-100 text-amber-600'} transition`}>
            {darkMode ? <LucideIcons.Moon className="w-6 h-6" /> : <LucideIcons.Sun className="w-6 h-6" />}
          </button>
        </div>

        <div className="p-6 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">{t('lang_pref', language)}</h3>
            <p className="text-sm text-slate-500">{t('lang_desc', language)}</p>
          </div>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg p-2.5 outline-none font-medium"
          >
            <option value="en">English (US)</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="ar">العربية (Arabic)</option>
          </select>
        </div>

        <div className="p-6">
           <h3 className="font-bold text-slate-800 dark:text-white mb-4">{t('change_pass', language)}</h3>
           <div className="space-y-4">
              <input type="password" placeholder={t('current_pass', language)} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
              <input type="password" placeholder={t('new_pass', language)} className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">{t('update_pass', language)}</button>
           </div>
        </div>
        
        <div className="p-6 bg-red-50 dark:bg-red-900/10">
          <button onClick={onLogout} className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl font-bold transition">
            <LucideIcons.LogOut className="w-5 h-5 mr-2" /> {t('logout', language)}
          </button>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('id'); // Default Indonesian as requested
  
  const [employees, setEmployees] = useState(initialEmployees);
  const [candidates, setCandidates] = useState([]);
  const [botEnabled, setBotEnabled] = useState(false);
  
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    let interval;
    if (botEnabled) {
      interval = setInterval(() => {
        setCandidates(prev => {
          const activeCount = prev.filter(c => c.status === 'Screening' || c.status === 'Interview').length;
          if (activeCount >= 15) {
            setBotEnabled(false);
            showToast('Recruitment bot reached the 15 applicants limit and has paused automatically.', 'warning');
            return prev;
          }
          const newCand = generateRandomCandidate(prev.length + 1);
          showToast(`New candidate applied: ${newCand.name}`, 'info');
          return [newCand, ...prev];
        });
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [botEnabled]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { 
      if (script.parentNode) script.parentNode.removeChild(script); 
    };
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    
    if (language === 'ar') document.documentElement.dir = 'rtl';
    else document.documentElement.dir = 'ltr';
  }, [darkMode, language]);

  const handleHire = (cand) => {
    setCandidates(prev => prev.map(c => c.id === cand.id ? { ...c, status: 'Hired' } : c));
    const newEmp = {
       id: `EMP-${Math.floor(Math.random() * 9000) + 1000}`,
       name: cand.name,
       role: cand.position,
       dept: cand.position.includes('HR') ? 'Human Resources' : 'Engineering',
       email: `${cand.name.split(' ')[0].toLowerCase()}@nexushcm.com`,
       phone: `+6281${Math.floor(Math.random() * 100000000)}`,
       status: 'Active',
       basic_salary: 7500000
    };
    setEmployees(prev => [newEmp, ...prev]);
    showToast(`${cand.name} diterima & dimasukkan ke Data Karyawan!`, 'success');

    setTimeout(() => {
      setCandidates(currentCands => {
        const activeCount = currentCands.filter(c => c.status === 'Screening' || c.status === 'Interview').length;
        if (!botEnabled && activeCount < 15) setBotEnabled(true);
        return currentCands;
      });
    }, 500);
  };

  const handleReject = (cand) => {
    setCandidates(prev => prev.map(c => c.id === cand.id ? { ...c, status: 'Rejected' } : c));
    showToast(`${cand.name} ditolak.`, 'warning');

    setTimeout(() => {
      setCandidates(currentCands => {
        const activeCount = currentCands.filter(c => c.status === 'Screening' || c.status === 'Interview').length;
        if (!botEnabled && activeCount < 15) setBotEnabled(true);
        return currentCands;
      });
    }, 500);
  };

  if (!user) {
    return <Login onLogin={setUser} language={language} setLanguage={setLanguage} />;
  }

  const allMenus = [
    { id: 'dashboard', label: t('dashboard', language), icon: Icons.Dashboard, roles: ['Admin', 'Manager', 'Employee'] },
    { id: 'employees', label: t('employees', language), icon: Icons.Users, roles: ['Admin', 'Manager'] },
    { id: 'recruitment', label: t('recruitment', language), icon: Icons.Briefcase, roles: ['Admin'] },
    { id: 'attendance', label: t('attendance', language), icon: Icons.Clock, roles: ['Admin', 'Manager', 'Employee'] },
    { id: 'payroll', label: t('payroll', language), icon: Icons.DollarSign, roles: ['Admin', 'Employee'] },
    { id: 'performance', label: t('performance', language), icon: Icons.TrendingUp, roles: ['Admin', 'Manager', 'Employee'] },
    { id: 'settings', label: t('settings', language), icon: Icons.Settings, roles: ['Admin', 'Manager', 'Employee'] },
  ];
  
  const visibleMenus = allMenus.filter(m => m.roles.includes(user.role));

  const stats = {
    employees: employees.length,
    attendance: 94.5,
    kpi: 88,
    candidates: candidates.filter(c => c.status === 'Screening').length
  };

  return (
    <div className={`min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {toast && (
        <div className={`fixed top-4 right-4 left-4 md:left-auto md:w-80 z-50 p-4 rounded-xl shadow-2xl flex items-center transform transition-all ${toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'warning' ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white'}`}>
          <LucideIcons.CheckCircle className="w-5 h-5 mr-3"/>
          <p className="font-medium text-sm">{toast.msg}</p>
        </div>
      )}

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`print:hidden fixed inset-y-0 ${language === 'ar' ? 'right-0' : 'left-0'} z-30 w-72 bg-white dark:bg-slate-900 border-${language === 'ar' ? 'l' : 'r'} border-slate-200 dark:border-slate-800 transform transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'} md:static`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <LucideIcons.Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">NEXUS<span className="text-slate-800 dark:text-white">HCM</span></h1>
              <p className="text-xs text-slate-500 font-medium">Enterprise Edition</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-500">
            <LucideIcons.X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-4 flex items-center gap-4 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold border-2 border-white dark:border-slate-700 shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-sm">{user.name}</p>
            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">{user.role}</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {visibleMenus.map(menu => {
            const MenuIcon = menu.icon;
            return (
              <button
                key={menu.id}
                onClick={() => { setActiveTab(menu.id); setSidebarOpen(false); }}
                className={`w-full flex items-center p-3 rounded-xl transition-all font-medium text-sm ${
                  activeTab === menu.id 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <MenuIcon className={`w-5 h-5 ${language === 'ar' ? 'ml-3' : 'mr-3'} ${activeTab === menu.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                {menu.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 max-h-screen overflow-y-auto">
        <header className="print:hidden sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
              <LucideIcons.Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold capitalize hidden sm:block">{t(activeTab, language)}</h2>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
             </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24">
          {activeTab === 'dashboard' && <Dashboard stats={stats} user={user} language={language} />}
          {activeTab === 'employees' && <Employees employees={employees} language={language} />}
          {activeTab === 'recruitment' && <Recruitment candidates={candidates} onHire={handleHire} onReject={handleReject} botEnabled={botEnabled} setBotEnabled={setBotEnabled} language={language} showToast={showToast} />}
          {activeTab === 'attendance' && <Attendance user={user} language={language} showToast={showToast} />}
          {activeTab === 'payroll' && <Payroll employees={employees} user={user} language={language} />}
          {activeTab === 'performance' && <Performance user={user} language={language} showToast={showToast} />}
          {activeTab === 'settings' && <Settings language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} onLogout={() => setUser(null)} />}
        </div>
      </main>
    </div>
  );
}
