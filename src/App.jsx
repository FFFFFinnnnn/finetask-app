import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

// --- Kamus Terjemahan (i18n) ---
const translations = {
    id: {
        greeting_morning: "Selamat Pagi,",
        greeting_afternoon: "Selamat Siang,",
        greeting_evening: "Selamat Malam,",
        subtitle: "Mari buat hari ini produktif.",
        stat_total_tasks: "Total Tugas",
        stat_pending: "tertunda",
        stat_completed: "Selesai",
        stat_completion_rate: "tingkat penyelesaian",
        stat_todays_done: "Selesai Hari Ini",
        stat_momentum: "Jaga momentum! 🚀",
        stat_day_streak: "Day Streak",
        stat_claim_now: "Klaim sekarang!",
        stat_claimed: "Sudah diklaim",
        schedule_title: "Jadwal Hari Ini",
        schedule_add: "Tambah Aktivitas",
        schedule_empty: "Tidak ada aktivitas terjadwal hari ini.",
        nav_home: "Beranda",
        nav_activity: "Aktivitas",
        nav_finance: "Finansial",
        nav_notes: "Dokumen",
        nav_stats: "Statistik",
        nav_settings: "Setelan",
        notes_title: "Dokumentasi Saya",
        notes_add: "Buat Dokumen Baru",
        notes_placeholder_title: "Judul Dokumen",
        notes_placeholder_content: "Tulis sesuatu...",
        notes_empty: "Belum ada dokumen.",
        daily_quote_title: "Kutipan Harian",
        streak_fire_button: "Nyalakan Api Semangat!",
        finance_title: "Lacak Keuangan",
        finance_add_transaction: "Tambah Transaksi",
        finance_type: "Tipe",
        finance_income: "Pemasukan",
        finance_expense: "Pengeluaran",
        finance_savings: "Tabungan",
        finance_investment: "Investasi",
        finance_amount: "Jumlah",
        finance_category: "Kategori",
        finance_category_custom: "Kategori Custom",
        finance_description: "Deskripsi",
        finance_upload_proof: "Unggah Bukti (Opsional)",
        finance_recent: "Transaksi Terkini",
        finance_empty: "Belum ada transaksi.",
        finance_summary: "Ringkasan Finansial",
        finance_total_income: "Total Pemasukan",
        finance_total_expense: "Total Pengeluaran",
        finance_total_savings: "Total Tabungan",
        finance_total_investment: "Total Investasi",
        finance_net_balance: "Sisa Dana (Net)",
        finance_expense_categories: "Kategori Pengeluaran",
        finance_monthly_trend: "Tren Bulanan",
        finance_allocation: "Alokasi Dana",
        finance_cash_flow: "Arus Kas Masuk vs Keluar",
        finance_outflow_allocation: "Alokasi Dana Keluar",
        finance_total_outflow: "Total Arus Keluar",
        modal_add_title: "Tambah Aktivitas Baru",
        modal_edit_title: "Edit Aktivitas",
        modal_field_title: "Judul",
        modal_field_description: "Deskripsi",
        modal_field_category: "Kategori",
        modal_field_duration: "Durasi (min)",
        modal_field_reminder: "Pengingat",
        modal_checklist_title: "Checklist Tugas",
        modal_checklist_add: "Tambah",
        modal_checklist_placeholder: "Item checklist baru",
        modal_reminder_none: "Tidak ada",
        modal_reminder_5min: "5 menit sebelumnya",
        modal_reminder_10min: "10 menit sebelumnya",
        modal_reminder_30min: "30 menit sebelumnya",
        modal_button_add: "Tambah Aktivitas",
        modal_button_update: "Perbarui Aktivitas",
        modal_button_save_changes: "Simpan Perubahan",
        settings_title: "Pengaturan",
        settings_language: "Bahasa",
        settings_data_management: "Manajemen Data",
        settings_backup: "Backup Data",
        settings_restore: "Restore Data",
        settings_restore_confirm: "Ini akan menimpa semua data saat ini. Lanjutkan?",
        settings_reset_data: "Reset Semua Data",
        settings_logout: "Keluar",
        settings_reset_confirm: "Apakah Anda yakin ingin mereset semua data? Tindakan ini tidak dapat diurungkan.",
        settings_feedback: "Kirim Feedback",
        settings_feedback_description: "Punya saran atau menemukan bug? Beri tahu kami!",
        settings_data_storage: "Penyimpanan Data Anda",
        settings_data_storage_description: "Semua data Anda disimpan aman di browser pada perangkat ini. Tidak ada data yang dikirim ke server online.",
        auth_title: "Fintask",
        auth_subtitle: "Masukkan nama pengguna untuk memulai.",
        auth_placeholder: "Contoh: Budi",
        auth_error: "Nama pengguna minimal 3 karakter.",
        auth_button: "Masuk / Daftar",
        alarm_title: "Pengingat Aktivitas!",
        alarm_dismiss: "Tutup",
        activity_tab_todos: "To-Do List",
        activity_tab_scheduled: "Terjadwal",
        activity_tab_missed: "Terlewat",
        todos_placeholder: "Tambah to-do baru...",
        todos_active: "Aktif",
        todos_empty: "Tidak ada to-do aktif.",
        todos_completed: "Selesai",
        missed_empty: "Tidak ada tugas yang terlewat. Kerja bagus!",
        stats_task_completion: "Penyelesaian Tugas per Kategori",
        stats_task_trend: "Tren Penyelesaian Tugas",
        stats_todo_trend: "Tren Penyelesaian To-Do",
        stats_week: "7 Hari",
        stats_month: "30 Hari",
        stats_year: "1 Tahun",
        dashboard_activity_title: "Statistik Aktivitas",
        dashboard_finance_title: "Ringkasan Finansial",
        scheduled_completion_note: "Untuk kegiatan terjadwal di tab ini, pastikan untuk menandai aktivitas sebagai 'selesai' di sini agar datanya tercatat dengan benar di statistik Anda. Tombol 'Tandai Selesai' ada di bawah setiap tugas.",
    },
    en: {
        greeting_morning: "Good Morning,",
        greeting_afternoon: "Good Afternoon,",
        greeting_evening: "Good Evening,",
        subtitle: "Let's make today productive.",
        stat_total_tasks: "Total Tasks",
        stat_pending: "pending",
        stat_completed: "Completed",
        stat_completion_rate: "completion rate",
        stat_todays_done: "Done Today",
        stat_momentum: "Keep the momentum! 🚀",
        stat_day_streak: "Day Streak",
        stat_claim_now: "Claim now!",
        stat_claimed: "Claimed",
        schedule_title: "Today's Schedule",
        schedule_add: "Add Activity",
        schedule_empty: "No activities scheduled for today.",
        nav_home: "Home",
        nav_activity: "Activity",
        nav_finance: "Financial",
        nav_notes: "Documents",
        nav_stats: "Stats",
        nav_settings: "Settings",
        notes_title: "My Documents",
        notes_add: "Create New Document",
        notes_placeholder_title: "Document Title",
        notes_placeholder_content: "Write something...",
        notes_empty: "No documents yet.",
        daily_quote_title: "Daily Quote",
        streak_fire_button: "Light the Fire!",
        finance_title: "Track Finances",
        finance_add_transaction: "Add Transaction",
        finance_type: "Type",
        finance_income: "Income",
        finance_expense: "Expense",
        finance_savings: "Savings",
        finance_investment: "Investment",
        finance_amount: "Amount",
        finance_category: "Category",
        finance_category_custom: "Custom Category",
        finance_description: "Description",
        finance_upload_proof: "Upload Proof (Optional)",
        finance_recent: "Recent Transactions",
        finance_empty: "No transactions yet.",
        finance_summary: "Financial Summary",
        finance_total_income: "Total Income",
        finance_total_expense: "Total Expense",
        finance_total_savings: "Total Savings",
        finance_total_investment: "Total Investment",
        finance_net_balance: "Net Balance",
        finance_expense_categories: "Expense Categories",
        finance_monthly_trend: "Monthly Trend",
        finance_allocation: "Fund Allocation",
        finance_cash_flow: "Cash In vs. Out",
        finance_outflow_allocation: "Outflow Allocation",
        finance_total_outflow: "Total Outflow",
        modal_add_title: "Add New Activity",
        modal_edit_title: "Edit Activity",
        modal_field_title: "Title",
        modal_field_description: "Description",
        modal_field_category: "Category",
        modal_field_duration: "Duration (min)",
        modal_field_reminder: "Reminder",
        modal_checklist_title: "Task Checklist",
        modal_checklist_add: "Add",
        modal_checklist_placeholder: "New checklist item",
        modal_reminder_none: "None",
        modal_reminder_5min: "5 minutes before",
        modal_reminder_10min: "10 minutes before",
        modal_reminder_30min: "30 minutes before",
        modal_button_add: "Add Activity",
        modal_button_update: "Update Activity",
        modal_button_save_changes: "Save Changes",
        settings_title: "Settings",
        settings_language: "Language",
        settings_data_management: "Data Management",
        settings_backup: "Backup Data",
        settings_restore: "Restore Data",
        settings_restore_confirm: "This will overwrite all current data. Continue?",
        settings_reset_data: "Reset All Data",
        settings_logout: "Logout",
        settings_reset_confirm: "Are you sure you want to reset all data? This action cannot be undone.",
        settings_feedback: "Send Feedback",
        settings_feedback_description: "Have a suggestion or found a bug? Let us know!",
        settings_data_storage: "Your Data Storage",
        settings_data_storage_description: "All your data is stored securely in the browser on this device. No data is sent to any online server.",
        auth_title: "Fintask",
        auth_subtitle: "Enter your username to get started.",
        auth_placeholder: "Example: John",
        auth_error: "Username must be at least 3 characters.",
        auth_button: "Login / Register",
        alarm_title: "Activity Reminder!",
        alarm_dismiss: "Dismiss",
        activity_tab_todos: "To-Do List",
        activity_tab_scheduled: "Scheduled",
        activity_tab_missed: "Missed",
        todos_placeholder: "Add a new to-do...",
        todos_active: "Active",
        todos_empty: "No active to-dos.",
        todos_completed: "Completed",
        missed_empty: "No missed tasks. Great job!",
        stats_task_completion: "Task Completion by Category",
        stats_task_trend: "Task Completion Trend",
        stats_todo_trend: "To-Do Completion Trend",
        stats_week: "7 Days",
        stats_month: "30 Days",
        stats_year: "1 Year",
        dashboard_activity_title: "Activity Statistics",
        dashboard_finance_title: "Financial Summary",
        scheduled_completion_note: "For scheduled activities in this tab, be sure to mark the activity as 'complete' here so your data is correctly recorded in your dashboard statistics. The 'Mark Complete' button is below each task.",
    }
};

const dailyQuotes = [
    { id: "Rahasia untuk maju adalah memulai.", en: "The secret of getting ahead is getting started." },
    { id: "Jangan melihat jam; lakukan apa yang dilakukannya. Terus berjalan.", en: "Don't watch the clock; do what it does. Keep going." },
    { id: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah dengan mencintai apa yang Anda lakukan.", en: "The only way to do great work is to love what you do." },
    { id: "Masa depan tergantung pada apa yang Anda lakukan hari ini.", en: "The future depends on what you do today." },
    { id: "Percayalah Anda bisa dan Anda sudah setengah jalan.", en: "Believe you can and you're halfway there." },
];

// --- Komponen Ikon SVG ---
const IconHome = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>);
const IconPlus = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>);
const IconTrash = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>);
const IconMoon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>);
const IconSun = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>);
const IconCheck = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>);
const IconChartBar = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>);
const IconActivity = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>);
const IconClose = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const IconEdit = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>);
const IconClock = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const IconSettings = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const IconLogout = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>);
const IconFire = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.014 14.014A3 3 0 009.879 16.121z" /></svg>);
const IconListCheck = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>);
const IconBell = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>);
const IconNote = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>);
const IconWallet = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>);
const IconMail = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>);
const IconDatabase = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>);
const IconViewList = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>);
const IconViewGrid = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>);

// --- Hook Kustom untuk Data Pengguna ---
const useUserData = (username) => {
    const getInitialData = () => ({
        tasks: [],
        todos: [],
        notes: [],
        finance: { transactions: [] },
        streak: { count: 0, lastClaim: null },
        theme: 'light',
        language: 'id',
    });

    const [data, setData] = useState(() => {
        try {
            const rawData = localStorage.getItem(`fintask_data_${username}`);
            const parsedData = rawData ? JSON.parse(rawData) : getInitialData();
            return { ...getInitialData(), ...parsedData };
        } catch (error) {
            console.error("Failed to parse data from localStorage", error);
            return getInitialData();
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(`fintask_data_${username}`, JSON.stringify(data));
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
        }
    }, [data, username]);

    const updateData = (key, value) => {
        setData(prevData => ({ ...prevData, [key]: value }));
    };

    const restoreData = (restoredData) => {
        setData({ ...getInitialData(), ...restoredData });
    }
    const resetData = () => setData(getInitialData());

    return [data, updateData, resetData, restoreData];
};

// --- Hook untuk Notifikasi & Alarm ---
const useNotificationScheduler = (tasks, onAlarm, t) => {
    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("Browser ini tidak mendukung notifikasi desktop");
            return;
        }

        const schedule = () => {
            const now = new Date();
            tasks.forEach(task => {
                if (window[`timeout_${task.id}`]) clearTimeout(window[`timeout_${task.id}`]);
                if (task.reminder > 0 && !task.completed && task.date && task.time) {
                    const taskTime = new Date(`${task.date}T${task.time}`);
                    const reminderTime = new Date(taskTime.getTime() - task.reminder * 60000);
                    if (reminderTime > now) {
                        const delay = reminderTime.getTime() - now.getTime();
                        window[`timeout_${task.id}`] = setTimeout(() => {
                            new Notification('Fintask Reminder', { body: `"${task.title}" starts in ${task.reminder} minutes.` });
                            onAlarm(task);
                        }, delay);
                    }
                }
            });
        };

        if (Notification.permission === "granted") {
            schedule();
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(p => { if (p === "granted") schedule(); });
        }

        const timeoutIds = tasks.map(task => window[`timeout_${task.id}`]);
        return () => timeoutIds.forEach(id => clearTimeout(id));
    }, [tasks, onAlarm, t]);
};

// --- Komponen Utama ---
export default function App() {
    const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('fintask_currentUser'));
    if (!currentUser) return <AuthScreen onLogin={setCurrentUser} />;
    return <MainApp currentUser={currentUser} onLogout={() => {
        localStorage.removeItem('fintask_currentUser');
        setCurrentUser(null);
    }} />;
}

const AuthScreen = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [lang, setLang] = useState('id');
    const t = (key) => translations[lang]?.[key] || key;

    const handleLogin = () => {
        if (username.trim().length >= 3) {
            localStorage.setItem('fintask_currentUser', username);
            onLogin(username);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 overflow-hidden relative flex flex-col items-center justify-center p-4">
            <div className="absolute w-96 h-96 bg-purple-500 rounded-full -top-32 -left-32 mix-blend-lighten filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute w-96 h-96 bg-blue-500 rounded-full -bottom-32 -right-32 mix-blend-lighten filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute w-72 h-72 bg-pink-500 rounded-full -bottom-16 left-16 mix-blend-lighten filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-sm text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
                <div className="absolute top-4 right-4">
                    <select onChange={(e) => setLang(e.target.value)} value={lang} className="bg-transparent text-white/70 text-sm">
                        <option value="id" style={{ color: 'black' }}>ID</option>
                        <option value="en" style={{ color: 'black' }}>EN</option>
                    </select>
                </div>
                <h1 className="text-4xl font-bold font-heading text-white mb-2">{t('auth_title')}</h1>
                <p className="text-gray-300 mb-8">{t('auth_subtitle')}</p>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('auth_placeholder')} className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border-2 border-transparent focus:border-white/50 outline-none" />
                <button onClick={handleLogin} className="w-full bg-white/90 text-gray-900 py-3 rounded-lg font-semibold hover:bg-white disabled:bg-gray-400 disabled:text-gray-600" disabled={username.trim().length < 3}>{t('auth_button')}</button>
                <p className="text-xs text-white/50 mt-8">made by !-SAK24</p>
            </motion.div>
        </div>
    );
};

const MainApp = ({ currentUser, onLogout }) => {
    const [data, updateData, resetData, restoreData] = useUserData(currentUser);
    const { tasks, todos, notes, finance, theme, language } = data;
    const t = (key) => translations[language]?.[key] || key;

    const [alarmTask, setAlarmTask] = useState(null);
    useNotificationScheduler(tasks, setAlarmTask, t);

    const [activePage, setActivePage] = useState('home');
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (message) => {
        setToastMessage(message);
    };

    useEffect(() => { document.documentElement.className = theme; }, [theme]);

    const handleUpdate = (key, value) => updateData(key, value);
    const openEditModal = (task) => { setEditingTask(task); setIsTaskModalOpen(true); };
    const openAddModal = () => { setEditingTask(null); setIsTaskModalOpen(true); };

    const crudHandlers = {
        tasks: {
            add: (task) => handleUpdate('tasks', [...data.tasks, { ...task, id: uuidv4(), completed: false }]),
            update: (updatedTask) => handleUpdate('tasks', data.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)),
            delete: (id) => handleUpdate('tasks', data.tasks.filter(t => t.id !== id)),
            toggle: (id) => {
                handleUpdate('tasks', data.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
            },
            toggleChecklistItem: (taskId, checklistItemId) => {
                const newTasks = data.tasks.map(task => {
                    if (task.id === taskId) {
                        const newChecklist = task.checklist.map(item =>
                            item.id === checklistItemId ? { ...item, completed: !item.completed } : item
                        );
                        // Optional: Tandai tugas selesai jika semua checklist selesai
                        const allCompleted = newChecklist.length > 0 && newChecklist.every(item => item.completed);
                        return { ...task, checklist: newChecklist, completed: allCompleted ? true : task.completed };
                    }
                    return task;
                });
                handleUpdate('tasks', newTasks);
            },
        },
        todos: {
            add: (todo) => handleUpdate('todos', [{ ...todo, id: uuidv4(), completed: false, completedAt: null, checklist: [] }, ...data.todos]),
            update: (updatedTodo) => handleUpdate('todos', data.todos.map(t => t.id === updatedTodo.id ? updatedTodo : t)),
            delete: (id) => handleUpdate('todos', data.todos.filter(t => t.id !== id)),
            toggle: (id) => {
                 const isCompleting = !data.todos.find(t => t.id === id)?.completed;
                handleUpdate('todos', data.todos.map(t => {
                if (t.id === id) {
                    const isNowCompleted = !t.completed;
                    return { ...t, completed: isNowCompleted, completedAt: isNowCompleted ? new Date().toISOString() : null };
                }
                return t;
            }));
            if (isCompleting) {
                showToast("To-do selesai!");
            }
            },
        },
        notes: {
            add: (note) => handleUpdate('notes', [{ ...note, id: uuidv4(), date: new Date().toISOString() }, ...data.notes]),
            update: (updatedNote) => handleUpdate('notes', data.notes.map(n => n.id === updatedNote.id ? updatedNote : n)),
            delete: (id) => handleUpdate('notes', data.notes.filter(n => n.id !== id)),
        },
        finance: {
            add: (transaction) => handleUpdate('finance', { ...data.finance, transactions: [{ ...transaction, id: uuidv4(), date: new Date().toISOString() }, ...data.finance.transactions] }),
            delete: (id) => handleUpdate('finance', { ...data.finance, transactions: data.finance.transactions.filter(t => t.id !== id) }),
        }
    };

    const renderPage = () => {
        switch (activePage) {
            case 'home':
                return <HomePage key="home" data={data} onUpdate={handleUpdate} onAddTaskClick={openAddModal} crudHandlers={crudHandlers} onEditTask={openEditModal} t={t} />;
            case 'activity':
                return <ActivityPage key="activity" tasks={tasks} todos={todos} handlers={crudHandlers} onEditTask={openEditModal} t={t} />;
            case 'finance':
                return <FinancePage key="finance" finance={finance} handlers={crudHandlers.finance} t={t} />;
            case 'notes':
                return <NotesPage key="notes" notes={notes} handlers={crudHandlers.notes} t={t} />;
            case 'stats':
                return <StatsPage key="stats" tasks={tasks} todos={todos} t={t} />;
            case 'settings':
                return <SettingsPage key="settings" onLogout={onLogout} onResetData={resetData} onRestoreData={restoreData} onUpdate={handleUpdate} lang={language} username={currentUser} t={t} />;
            default:
                return <HomePage key="home" data={data} onUpdate={handleUpdate} onAddTaskClick={openAddModal} crudHandlers={crudHandlers} onEditTask={openEditModal} t={t} />;
        }
    };

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg font-body text-light-text dark:text-dark-text transition-colors duration-300 pb-20">
            <Header username={currentUser} theme={theme} onToggleTheme={() => handleUpdate('theme', theme === 'light' ? 'dark' : 'light')} t={t} />
            <main className="max-w-4xl mx-auto p-4 md:p-6">
                <AnimatePresence mode="wait">
                    {renderPage()}
                </AnimatePresence>
            </main>
            <BottomNav activePage={activePage} onNavigate={setActivePage} t={t} />
            <TaskModal isOpen={isTaskModalOpen} onClose={() => { setIsTaskModalOpen(false); setEditingTask(null); }} onSave={(taskData) => { editingTask ? crudHandlers.tasks.update({ ...editingTask, ...taskData }) : crudHandlers.tasks.add(taskData); setIsTaskModalOpen(false); }} editingTask={editingTask} t={t} />
            <AlarmModal task={alarmTask} onClose={() => setAlarmTask(null)} t={t} />
            <Toast message={toastMessage} isVisible={!!toastMessage} onDismiss={() => setToastMessage('')} />
        </div>
    );
};

// --- Komponen Halaman ---
const Header = ({ username, theme, onToggleTheme, t }) => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t('greeting_morning');
        if (hour < 18) return t('greeting_afternoon');
        return t('greeting_evening');
    };
    return (
        <header className="px-4 md:px-6 pt-6 mb-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold font-heading text-light-text dark:text-dark-text">{getGreeting()} <span className="text-primary">{username}!</span></h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('subtitle')}</p>
                </div>
                <button onClick={onToggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    {theme === 'light' ? <IconMoon className="w-6 h-6 text-primary" /> : <IconSun className="w-6 h-6 text-yellow-400" />}
                </button>
            </div>
        </header>
    );
};

const HomePage = ({ data, onUpdate, onAddTaskClick, crudHandlers, onEditTask, t }) => {
    const { tasks, streak, finance, todos } = data;
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const todayStr = new Date().toISOString().slice(0, 10);
    const canClaimStreak = streak.lastClaim !== todayStr;

    const handleClaimStreak = () => {
        if (!canClaimStreak) return;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);
        const newCount = streak.lastClaim === yesterdayStr ? streak.count + 1 : 1;
        onUpdate('streak', { count: newCount, lastClaim: todayStr });
    };
    
    // PERBAIKAN: Tampilkan tugas hari ini DAN yang terlewat (belum selesai) di dashboard
    const todaysTasks = useMemo(() => {
        const now = new Date();
        const todayDate = now.toISOString().slice(0, 10);

        return tasks
            .filter(t => !t.completed && (
                t.date === todayDate || 
                new Date(t.date + (t.time ? 'T' + t.time : '')) < now // Tugas yang terlewat (past tasks)
            ))
            .sort((a, b) => {
                const timeA = a.time ? a.time : '23:59'; // Jika tidak ada waktu, taruh di akhir hari
                const timeB = b.time ? b.time : '23:59';
                const dateA = a.date + 'T' + timeA;
                const dateB = b.date + 'T' + timeB;
                return new Date(dateA) - new Date(dateB);
            });
    }, [tasks, currentTime]);

    const stats = useMemo(() => {
        const completed = tasks.filter(t => t.completed).length;
        const total = tasks.length;
        // Hanya hitung selesai HARI INI
        const todaysDone = tasks.filter(t => t.completed && t.date === todayStr).length; 
        return { total, completed, pending: total - completed, completionRate: total > 0 ? Math.round((completed / total) * 100) : 0, todaysDone };
    }, [tasks, todayStr]);

    const quote = useMemo(() => {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        return dailyQuotes[dayOfYear % dailyQuotes.length];
    }, []);

    // Handler baru untuk menandai selesai dari dashboard
    const handleToggleCompletion = (taskId) => {
        crudHandlers.tasks.toggle(taskId);
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            {/* Bagian Statistik Utama & Streak */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title={t('stat_total_tasks')} value={stats.total} subtitle={`${stats.pending} ${t('stat_pending')}`} icon={<IconActivity className="w-5 h-5" />} color="indigo" />
                <StatCard title={t('stat_completed')} value={stats.completed} subtitle={`${stats.completionRate}% ${t('stat_completion_rate')}`} icon={<IconCheck className="w-5 h-5" />} color="green" progressBar={stats.completionRate} />
                <StatCard title={t('stat_todays_done')} value={stats.todaysDone} subtitle={t('stat_momentum')} icon={<span className="text-2xl">⚡️</span>} color="blue" />
                <div className={`p-5 rounded-2xl text-left flex flex-col justify-between bg-orange-50 dark:bg-orange-900/50`}>
                    <div className="flex justify-between items-start">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-orange-100 dark:bg-orange-800/60`}><IconFire className="w-6 h-6 text-orange-500" /></div>
                        <span className="text-3xl font-bold text-light-text dark:text-dark-text">{streak.count}</span>
                    </div>
                    <div>
                        <p className="font-semibold text-light-text dark:text-dark-text mt-2">{t('stat_day_streak')}</p>
                        <button onClick={handleClaimStreak} disabled={!canClaimStreak} className={`w-full mt-2 text-sm font-semibold py-2 rounded-lg transition-colors ${canClaimStreak ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-orange-200 text-orange-600 cursor-not-allowed'}`}>{canClaimStreak ? t('streak_fire_button') : t('stat_claimed')}</button>
                    </div>
                </div>
            </div>

            {/* Bagian Visualisasi Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FinancialSummaryCard finance={finance} t={t} />
                <ActivitySummaryCard tasks={tasks} todos={todos} t={t} />
            </div>

            {/* Kutipan Harian */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <h3 className="font-bold text-lg mb-2">{t('daily_quote_title')}</h3>
                <p className="italic">"{quote[data.language || 'id']}"</p>
            </div>

            {/* Jadwal Hari Ini */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">{t('schedule_title')}</h2>
                    <button onClick={onAddTaskClick} className="bg-primary text-white px-4 py-2 text-sm rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-transform hover:scale-105">
                        <IconPlus className="w-4 h-4" /> {t('schedule_add')}
                    </button>
                </div>

                {/* Catatan Konfirmasi untuk Dashboard */}
                <div className="p-3 bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-lg text-sm mb-4">
                    <p>Setelah selesai, pastikan **Tandai Selesai** di bawah untuk memperbarui statistik Anda. Anda juga bisa mengeceklis **Checklist Tugas** di bawah!</p>
                </div>

                {todaysTasks.length > 0 ? (
                    <div className="relative pl-5">
                        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                        {todaysTasks.map(task => 
                            <ScheduleItem 
                                key={task.id} 
                                task={task} 
                                onEditTask={onEditTask} 
                                onDeleteTask={crudHandlers.tasks.delete} 
                                onToggleChecklistItem={crudHandlers.tasks.toggleChecklistItem} 
                                onToggleCompletion={handleToggleCompletion} // Handler baru
                                currentTime={currentTime} 
                            />
                        )}
                    </div>
                ) : (<div className="text-center text-gray-500 py-8 bg-light-card dark:bg-dark-card rounded-2xl"><p>{t('schedule_empty')}</p></div>)}
            </div>
        </motion.div>
    );
};


const FinancePage = ({ finance, handlers, t }) => {
    // --- Kategori Finansial ---
    const expenseCategories = ['Makanan & Minuman', 'Transportasi', 'Tagihan', 'Hiburan', 'Belanja', 'Kesehatan', 'Pendidikan', 'Keluarga', 'Lainnya...'];
    const incomeCategories = ['Gaji', 'Usaha', 'Bonus', 'Hadiah', 'Hasil Investasi', 'Lainnya...'];
    const savingsCategories = ['Dana Darurat', 'Tujuan Spesifik', 'Pensiun', 'Lainnya...'];
    const investmentCategories = ['Saham', 'Reksa Dana', 'Properti', 'Kripto', 'Lainnya...'];

    const getCategoriesForType = (type) => {
        switch (type) {
            case 'expense': return expenseCategories;
            case 'income': return incomeCategories;
            case 'savings': return savingsCategories;
            case 'investment': return investmentCategories;
            default: return ['Lainnya...'];
        }
    };

    const [formState, setFormState] = useState({
        type: 'expense',
        amount: '',
        category: getCategoriesForType('expense')[0],
        description: '',
        proof: null,
    });
    const [customCategory, setCustomCategory] = useState('');
    const [isCustom, setIsCustom] = useState(false);

    useEffect(() => {
        // Reset category when type changes
        setFormState(prev => ({ ...prev, category: getCategoriesForType(prev.type)[0] }));
        setIsCustom(false);
        setCustomCategory('');
    }, [formState.type]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) || '' : value }));
    };
    
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (value === 'Lainnya...') {
            setIsCustom(true);
            setFormState(prev => ({ ...prev, category: value }));
        } else {
            setIsCustom(false);
            setCustomCategory('');
            setFormState(prev => ({ ...prev, category: value }));
        }
    };


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState(prev => ({ ...prev, proof: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalCategory = isCustom ? customCategory : formState.category;
        if (!formState.amount || !finalCategory) return;
        
        handlers.add({ 
            ...formState, 
            category: finalCategory,
            amount: Number(formState.amount) 
        });

        // Reset form
        setFormState({ type: 'expense', amount: '', category: getCategoriesForType('expense')[0], description: '', proof: null });
        setIsCustom(false);
        setCustomCategory('');
    };

    const { financialSummary, monthlyTrendData } = useMemo(() => {
        if (!finance || !finance.transactions) return { financialSummary: {}, monthlyTrendData: [] };

        const totals = finance.transactions.reduce((acc, t) => {
            acc[t.type] = (acc[t.type] || 0) + t.amount;
            return acc;
        }, { income: 0, expense: 0, savings: 0, investment: 0 });

        const netBalance = totals.income - (totals.expense + totals.savings + totals.investment);

        const trendData = finance.transactions.reduce((acc, t) => {
            const month = new Date(t.date).toLocaleString('default', { month: 'short', year: '2-digit' });
            if (!acc[month]) {
                acc[month] = { name: month, income: 0, expense: 0, date: new Date(t.date) };
            }
            if (t.type === 'income') acc[month].income += t.amount;
            if (t.type === 'expense') acc[month].expense += t.amount;
            return acc;
        }, {});
        
        const sortedTrendData = Object.values(trendData).sort((a,b) => a.date - b.date);

        return {
            financialSummary: { ...totals, netBalance },
            monthlyTrendData: sortedTrendData
        };
    }, [finance]);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            <div className="p-4 bg-light-card dark:bg-dark-card rounded-2xl">
                <h3 className="font-bold text-lg mb-2">{t('finance_summary')}</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>{t('finance_total_income')}</span><span className="font-semibold text-green-500">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(financialSummary.income || 0)}</span></div>
                    <div className="flex justify-between"><span>{t('finance_total_expense')}</span><span className="font-semibold text-red-500">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(financialSummary.expense || 0)}</span></div>
                     <div className="flex justify-between"><span>{t('finance_total_savings')}</span><span className="font-semibold text-blue-500">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(financialSummary.savings || 0)}</span></div>
                     <div className="flex justify-between"><span>{t('finance_total_investment')}</span><span className="font-semibold text-purple-500">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(financialSummary.investment || 0)}</span></div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 font-bold"><span>{t('finance_net_balance')}</span><span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(financialSummary.netBalance || 0)}</span></div>
                </div>
            </div>

            <div className="p-4 bg-light-card dark:bg-dark-card rounded-2xl">
                <h3 className="font-bold text-lg mb-4">{t('finance_add_transaction')}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">{t('finance_type')}</label>
                            <select name="type" value={formState.type} onChange={handleInputChange} className="w-full p-2 mt-1 rounded-lg bg-light-bg dark:bg-dark-bg">
                                <option value="expense">{t('finance_expense')}</option>
                                <option value="income">{t('finance_income')}</option>
                                <option value="savings">{t('finance_savings')}</option>
                                <option value="investment">{t('finance_investment')}</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium">{t('finance_amount')}</label>
                            <input type="number" name="amount" value={formState.amount} onChange={handleInputChange} placeholder="50000" className="w-full p-2 mt-1 rounded-lg bg-light-bg dark:bg-dark-bg" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium">{t('finance_category')}</label>
                            <select name="category" value={formState.category} onChange={handleCategoryChange} className="w-full p-2 mt-1 rounded-lg bg-light-bg dark:bg-dark-bg">
                                {getCategoriesForType(formState.type).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        {isCustom && (
                            <div>
                                <label className="text-sm font-medium">{t('finance_category_custom')}</label>
                                <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} placeholder="e.g., Donasi" className="w-full p-2 mt-1 rounded-lg bg-light-bg dark:bg-dark-bg" required />
                            </div>
                        )}
                        <div className="md:col-span-2">
                             <label className="text-sm font-medium">{t('finance_upload_proof')}</label>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                        </div>
                    </div>
                    {formState.proof && <img src={formState.proof} alt="Preview" className="max-h-40 w-auto rounded-md mt-2" />}
                    <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg font-semibold w-full">{t('finance_add_transaction')}</button>
                </form>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-4">{t('finance_recent')}</h3>
                <div className="space-y-2">
                    {finance.transactions.length > 0 ? finance.transactions.slice(0, 10).map(t => (
                        <div key={t.id} className="p-3 bg-light-card dark:bg-dark-card rounded-lg flex justify-between items-center">
                            <div className="flex items-center gap-4">
                               {t.proof && <img src={t.proof} alt={t.category} className="w-12 h-12 object-cover rounded-md" />}
                                <div>
                                    <p className="font-semibold">{t.category}</p>
                                    <p className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${t.type === 'income' ? 'text-green-500' : t.type === 'expense' ? 'text-red-500' : t.type === 'savings' ? 'text-blue-500' : 'text-purple-500'}`}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(t.amount)}</p>
                                <button onClick={() => handlers.delete(t.id)} className="text-xs text-gray-400 hover:text-red-500"><IconTrash className="w-3 h-3 inline"/> Delete</button>
                            </div>
                        </div>
                    )) : <p className="text-center text-gray-500">{t('finance_empty')}</p>}
                </div>
            </div>
        </motion.div>
    );
};


const NotesPage = ({ notes, handlers, t }) => {
    const [editingNote, setEditingNote] = useState(null);
    const [noteContent, setNoteContent] = useState({ title: '', content: '', image: null });

    const handleOpenModal = (note = null) => {
        if (note) {
            setNoteContent({ title: note.title, content: note.content, image: note.image });
            setEditingNote(note);
        } else {
            setNoteContent({ title: '', content: '', image: null });
            setEditingNote({ id: 'new' });
        }
    };

    const handleCloseModal = () => setEditingNote(null);

    const handleSave = () => {
        if (!noteContent.title && !noteContent.content) return;
        if (editingNote.id === 'new') {
            handlers.add(noteContent);
        } else {
            handlers.update({ ...editingNote, ...noteContent });
        }
        handleCloseModal();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNoteContent(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{t('notes_title')}</h2>
                <button onClick={() => handleOpenModal()} className="bg-primary text-white px-4 py-2 text-sm rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90">
                    <IconPlus className="w-4 h-4" /> {t('notes_add')}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    {notes.length > 0 ? notes.map(note => (
                        <motion.div key={note.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => handleOpenModal(note)} className="bg-light-card dark:bg-dark-card p-4 rounded-lg relative break-words cursor-pointer hover:shadow-lg transition-shadow">
                            {note.image && <img src={note.image} alt={note.title} className="w-full h-32 object-cover rounded-md mb-2" />}
                            <h3 className="font-bold mb-1 truncate">{note.title}</h3>
                            <p className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{note.content}</p>
                            <button onClick={(e) => { e.stopPropagation(); handlers.delete(note.id); }} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
                                <IconTrash className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )) : <p className="col-span-full text-center text-gray-500 py-10">{t('notes_empty')}</p>}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {editingNote && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-light-bg dark:bg-dark-bg rounded-2xl p-6 w-full max-w-lg relative border border-gray-200 dark:border-gray-700">
                            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"><IconClose className="w-6 h-6" /></button>
                            <input type="text" value={noteContent.title} onChange={e => setNoteContent(p => ({ ...p, title: e.target.value }))} placeholder={t('notes_placeholder_title')} className="w-full text-2xl font-bold bg-transparent outline-none mb-4" />
                            <textarea value={noteContent.content} onChange={e => setNoteContent(p => ({ ...p, content: e.target.value }))} placeholder={t('notes_placeholder_content')} className="w-full h-40 bg-transparent outline-none resize-none mb-4" />
                            {noteContent.image && <img src={noteContent.image} alt="Preview" className="max-h-40 w-auto rounded-md mb-4" />}
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                            <button onClick={handleSave} className="w-full bg-primary text-white py-2 rounded-lg font-semibold">{editingNote.id === 'new' ? t('notes_add') : t('modal_button_save_changes')}</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


// --- Komponen Lainnya ---
const colorVariants = {
    indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-900/50',
        iconBg: 'bg-indigo-100 dark:bg-indigo-800/60',
        text: 'text-indigo-500 dark:text-indigo-300',
        progress: 'bg-indigo-500',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-900/50',
        iconBg: 'bg-green-100 dark:bg-green-800/60',
        text: 'text-green-500 dark:text-green-300',
        progress: 'bg-green-500',
    },
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/50',
        iconBg: 'bg-blue-100 dark:bg-blue-800/60',
        text: 'text-blue-500 dark:text-blue-300',
        progress: 'bg-blue-500',
    },
    orange: {
        tag: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        progress: 'bg-orange-500'
    },
    Health: {
        tag: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        progress: 'bg-green-500'
    },
    Work: {
        tag: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        progress: 'bg-blue-500'
    },
    Study: {
        tag: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        progress: 'bg-purple-500'
    },
    Personal: {
        tag: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
        progress: 'bg-indigo-500'
    }
};

const StatCard = ({ title, value, subtitle, icon, color, progressBar }) => {
    const variants = colorVariants[color] || colorVariants.indigo;
    return (
        <div className={`p-5 rounded-2xl ${variants.bg}`}>
            <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${variants.iconBg} ${variants.text}`}>{icon}</div>
                <span className="text-3xl font-bold text-light-text dark:text-dark-text">{value}</span>
            </div>
            <div className="mt-4">
                <p className="font-semibold text-light-text dark:text-dark-text">{title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
                {progressBar !== undefined && (
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                        <div className={`${variants.progress} h-1.5 rounded-full`} style={{ width: `${progressBar}%` }}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ScheduleItem = ({ task, onEditTask, onDeleteTask, onToggleChecklistItem, onToggleCompletion, currentTime }) => {
    const categoryStyle = colorVariants[task.category] || colorVariants.Personal;
    const now = currentTime;
    
    // Perhitungan Waktu dan Status Aktif
    const isTimedTask = task.time && task.duration > 0;
    let isCompletable = true; // Default: Jika tidak ada durasi/waktu, selalu dapat diselesaikan

    if (isTimedTask) {
        const taskStart = new Date(`${task.date}T${task.time}`);
        const taskEnd = new Date(taskStart.getTime() + task.duration * 60000);
        
        isCompletable = now >= taskEnd; // Hanya bisa selesai setelah durasi berakhir
    } else if (task.date) {
        // Jika hanya ada tanggal/waktu tanpa durasi, bisa selesai kapan saja setelah waktu mulai
        const taskStart = new Date(`${task.date}${task.time ? 'T' + task.time : ''}`);
        isCompletable = now >= taskStart; 
    }
    
    const isPast = task.date && new Date(`${task.date}${task.time ? 'T' + task.time : ''}`) < now;
    const isOngoing = isTimedTask && now >= new Date(`${task.date}T${task.time}`) && !isCompletable;
    const progressPercentage = isOngoing ? Math.min(100, ((now - new Date(`${task.date}T${task.time}`)) / (task.duration * 60000)) * 100) : 0;
    
    // Check jika semua checklist selesai
    const allChecklistCompleted = task.checklist && task.checklist.length > 0 && task.checklist.every(item => item.completed);
    const isCompleted = task.completed || allChecklistCompleted;

    const statusIcon = () => {
        if (isCompleted) {
            return <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"><IconCheck className="w-3 h-3 text-white" /></div>;
        }
        // Jika sudah lewat tapi belum selesai, anggap terlewat/merah
        if (isPast && !isOngoing) {
             return <div className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/40 border-2 border-red-400 dark:border-red-600"></div>;
        }
        if (isOngoing) {
            return <div className="w-4 h-4 rounded-full bg-blue-500 relative flex items-center justify-center"><div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></div><IconClock className="w-3 h-3 text-white" /></div>;
        }
        
        return <div className="w-4 h-4 rounded-full bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500"></div>;
    };

    const isButtonDisabled = !isCompleted && !isCompletable;

    return (
        <div className="relative mb-4">
            {/* Status Icon */}
            <div className="absolute -left-7 top-1/2 -translate-y-1/2 z-10">{statusIcon()}</div>
            <div className={`p-4 bg-light-card dark:bg-dark-card rounded-xl ml-4 shadow-sm ${isCompleted ? 'opacity-70' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                    {/* Header: Waktu, Kategori, Durasi. Tampilkan tanggal jika bukan hari ini */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                             {task.date && task.date !== new Date().toISOString().slice(0, 10) ? `${task.date} • ` : ''}
                             {task.time ? task.time : 'Sepanjang Hari'}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryStyle.tag}`}>{task.category}</span>
                        {task.duration > 0 && <span className="text-sm text-gray-500 dark:text-gray-400">• {task.duration} min</span>}
                    </div>
                    {/* Aksi: Edit, Delete */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => onEditTask(task)} className="p-2 text-gray-500 hover:text-primary rounded-full"><IconEdit className="w-5 h-5" /></button>
                        <button onClick={() => onDeleteTask(task.id)} className="p-2 text-gray-500 hover:text-red-500 rounded-full"><IconTrash className="w-5 h-5" /></button>
                    </div>
                </div>
                
                {/* Judul & Deskripsi */}
                <p className={`font-semibold text-lg ${isCompleted ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{task.description}</p>
                
                {/* Checklist (Diambil dari Screenshot) */}
                {task.checklist && task.checklist.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
                        {task.checklist.map(item => (
                            <div key={item.id} className="flex items-center gap-2 text-sm">
                                <input 
                                    type="checkbox" 
                                    checked={item.completed} 
                                    onChange={() => onToggleChecklistItem(task.id, item.id)} 
                                    className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary bg-transparent cursor-pointer" 
                                />
                                <span className={item.completed ? 'line-through text-gray-500' : ''}>{item.content}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Status & Aksi Selesai */}
                <div className="mt-3 flex justify-between items-center">
                    {isOngoing && !isCompleted && (
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 flex-grow mr-4">
                            <div className={`${categoryStyle.progress} h-1.5 rounded-full`} style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    )}
                    
                    {!isCompleted && (
                        <button 
                            onClick={() => onToggleCompletion(task.id)} 
                            disabled={isButtonDisabled}
                            className={`text-sm font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 mt-2 md:mt-0 ${
                                isButtonDisabled 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-opacity-90'
                            }`}
                        >
                            <IconCheck className="w-4 h-4"/> {isButtonDisabled ? 'Sedang Berlangsung' : 'Tandai Selesai'}
                        </button>
                    )}
                    {isCompleted && (
                        <p className="text-sm font-semibold text-primary">✓ Selesai</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const ActivityPage = ({ tasks, todos, handlers, onEditTask, t }) => {
    const [activeTab, setActiveTab] = useState('todos');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

    const todayStr = new Date().toISOString().slice(0, 10);
    const missedTasks = useMemo(() => tasks.filter(t => t.date < todayStr && !t.completed), [tasks, todayStr]);
    const scheduledTasks = useMemo(() => tasks.filter(t => t.date >= todayStr).sort((a, b) => {
        // Sortir berdasarkan tanggal, lalu waktu
        const dateComparison = a.date.localeCompare(b.date);
        if (dateComparison !== 0) return dateComparison;
        
        // Handle kasus tanpa waktu: taruh di akhir
        const timeA = a.time || '23:59';
        const timeB = b.time || '23:59';
        return timeA.localeCompare(timeB);

    }), [tasks, todayStr]);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex justify-between items-center mb-4">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button onClick={() => setActiveTab('todos')} className={`py-2 px-4 font-semibold ${activeTab === 'todos' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}>{t('activity_tab_todos')}</button>
                    <button onClick={() => setActiveTab('scheduled')} className={`py-2 px-4 font-semibold ${activeTab === 'scheduled' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}>{t('activity_tab_scheduled')}</button>
                    <button onClick={() => setActiveTab('missed')} className={`py-2 px-4 font-semibold ${activeTab === 'missed' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}>{t('activity_tab_missed')}</button>
                </div>

                {/* View Toggler (hanya muncul di tab To-Do) */}
                <AnimatePresence>
                {activeTab === 'todos' && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex items-center gap-2">
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-dark-card text-gray-500'}`}>
                            <IconViewList className="w-5 h-5" />
                        </button>
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-dark-card text-gray-500'}`}>
                            <IconViewGrid className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
                {activeTab === 'todos' ? <TodoListView key="todos" todos={todos} handlers={handlers} viewMode={viewMode} t={t} />
                    : activeTab === 'scheduled' ? <ScheduledListView key="scheduled" tasks={scheduledTasks} handlers={handlers.tasks} onEditTask={onEditTask} t={t} /> 
                        : <MissedListView key="missed" tasks={missedTasks} handlers={handlers} t={t} />}
            </AnimatePresence>
        </motion.div>
    );
};

const ScheduledTaskItem = ({ task, handlers, onEditTask, t }) => {
    const categoryStyle = colorVariants[task.category] || colorVariants.Personal;
    const now = new Date();

    // Logika Button Aktif/Nonaktif sama dengan ScheduleItem
    const isTimedTask = task.time && task.duration > 0;
    let isCompletable = true; 

    if (isTimedTask) {
        const taskStart = new Date(`${task.date}T${task.time}`);
        const taskEnd = new Date(taskStart.getTime() + task.duration * 60000);
        isCompletable = now >= taskEnd;
    } else if (task.time) {
        const taskStart = new Date(`${task.date}T${task.time}`);
        isCompletable = now >= taskStart; 
    }
    
    // Check jika semua checklist selesai (untuk sinkronisasi tampilan)
    const allChecklistCompleted = task.checklist && task.checklist.length > 0 && task.checklist.every(item => item.completed);
    const isCompleted = task.completed || allChecklistCompleted;
    const isButtonDisabled = !isCompleted && !isCompletable;


    return (
        <div className={`p-4 bg-light-card dark:bg-dark-card rounded-xl ${isCompleted ? 'opacity-70' : ''}`}>
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{task.date} • {task.time ? task.time : 'Sepanjang Hari'}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryStyle.tag}`}>{task.category}</span>
                        {task.duration > 0 && <span className="text-sm text-gray-500 dark:text-gray-400">• {task.duration} min</span>}
                    </div>
                    <p className={`font-semibold text-lg ${isCompleted ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <button onClick={() => onEditTask(task)} className="p-2 text-gray-500 hover:text-primary rounded-full"><IconEdit className="w-5 h-5" /></button>
                    <button onClick={() => handlers.delete(task.id)} className="p-2 text-gray-500 hover:text-red-500 rounded-full"><IconTrash className="w-5 h-5" /></button>
                </div>
            </div>
            {task.checklist && task.checklist.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    {task.checklist.map(item => (
                        <div key={item.id} className="flex items-center gap-2 text-sm">
                            {/* Di halaman ini, checklist hanya untuk tampilan/info status dari master task, tidak bisa diubah di sini */}
                            <input type="checkbox" readOnly checked={item.completed} className="form-checkbox h-4 w-4 rounded text-primary focus:ring-primary bg-transparent pointer-events-none" />
                            <span className={item.completed ? 'line-through text-gray-500' : ''}>{item.content}</span>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-4 flex items-center justify-end">
                 <button 
                    onClick={() => handlers.toggle(task.id)} 
                    disabled={isButtonDisabled}
                    className={`flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors ${
                        isCompleted 
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-500' 
                        : isButtonDisabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-opacity-90'
                    }`}
                >
                    {isCompleted ? <><IconCheck className="w-4 h-4"/> Selesai</> : isButtonDisabled ? 'Sedang Berlangsung' : 'Tandai Selesai'}
                </button>
            </div>
        </div>
    );
};

const TodoListView = ({ todos, handlers, viewMode, t }) => {
    const [newTodo, setNewTodo] = useState('');
    const [editingTodo, setEditingTodo] = useState(null); // null or todo object

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            handlers.todos.add({ content: newTodo, checklist: [] }); // Add with empty checklist
            setNewTodo('');
        }
    };
    
    const openEditModal = (todo) => setEditingTodo(todo);
    const closeEditModal = () => setEditingTodo(null);

    const handleSaveEdit = (updatedTodo) => {
        handlers.todos.update(updatedTodo);
        closeEditModal();
    };

    const pending = todos.filter(t => !t.completed);
    const completed = todos.filter(t => t.completed);

    const renderList = (list, isCompletedList = false) => (
        list.map(todo => (
            <motion.div key={todo.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={`flex items-start gap-3 p-3 rounded-lg mb-2 ${isCompletedList ? 'text-gray-500' : 'bg-light-card dark:bg-dark-card'}`}
            >
                <button onClick={() => handlers.todos.toggle(todo.id)} className={`mt-1 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    isCompletedList ? 'bg-primary border-primary' : 'border-gray-300 dark:border-gray-500'
                }`}>
                    {isCompletedList && <IconCheck className="w-4 h-4 text-white" />}
                </button>
                <div className="flex-grow">
                    <p className={isCompletedList ? 'line-through' : ''}>{todo.content}</p>
                    {todo.checklist && todo.checklist.length > 0 && (
                        <div className="mt-2 space-y-1">
                            {todo.checklist.map(item => (
                                     <div key={item.id} className="flex items-center gap-2 text-sm">
                                         <input type="checkbox" readOnly checked={item.completed} className="form-checkbox h-4 w-4 rounded text-primary focus:ring-primary bg-transparent pointer-events-none" />
                                         <span className={item.completed ? 'line-through' : ''}>{item.content}</span>
                                     </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <button onClick={() => openEditModal(todo)} className="p-1 text-gray-400 hover:text-primary"><IconEdit className="w-5 h-5" /></button>
                    <button onClick={() => handlers.todos.delete(todo.id)} className="p-1 text-gray-400 hover:text-red-500"><IconTrash className="w-5 h-5" /></button>
                </div>
            </motion.div>
        ))
    );

    const renderGrid = (list) => (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
            {list.map(todo => (
                     <motion.div key={todo.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                        className={`p-4 rounded-lg flex flex-col ${todo.completed ? 'bg-gray-100 dark:bg-gray-800' : 'bg-yellow-100 dark:bg-yellow-900/50'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <p className={`font-semibold flex-grow break-words ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.content}</p>
                            <button onClick={() => handlers.todos.toggle(todo.id)} className={`ml-2 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                                todo.completed ? 'bg-primary border-primary' : 'border-gray-400'
                            }`}>
                                {todo.completed && <IconCheck className="w-4 h-4 text-white" />}
                            </button>
                        </div>

                        <div className="space-y-2 mb-4 flex-grow">
                            {(todo.checklist || []).map(item => (
                                <div key={item.id} className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" readOnly checked={item.completed} className="form-checkbox h-4 w-4 rounded text-primary focus:ring-primary bg-transparent pointer-events-none" />
                                    <span className={item.completed ? 'line-through text-gray-500' : ''}>{item.content}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex items-center justify-end gap-2 mt-auto pt-2 border-t border-yellow-200 dark:border-yellow-800/50">
                            <button onClick={() => openEditModal(todo)} className="p-1 text-gray-400 hover:text-primary"><IconEdit className="w-4 h-4" /></button>
                            <button onClick={() => handlers.todos.delete(todo.id)} className="p-1 text-gray-400 hover:text-red-500"><IconTrash className="w-4 h-4" /></button>
                        </div>
                    </motion.div>
            ))}
             </AnimatePresence>
        </div>
    );


    return (
        <div>
            <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
                <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder={t('todos_placeholder')} className="w-full p-3 rounded-lg bg-light-card dark:bg-dark-card border border-transparent focus:border-primary focus:ring-0 outline-none" />
                <button type="submit" className="bg-primary text-white px-4 rounded-lg font-semibold"><IconPlus className="w-6 h-6" /></button>
            </form>

            <AnimatePresence>
            {viewMode === 'list' ? (
                     <motion.div key="list-view">
                        <h3 className="font-semibold mb-2">{t('todos_active')} ({pending.length})</h3>
                        {pending.length === 0 ? <p className="text-gray-500 text-sm mb-4">{t('todos_empty')}</p> : renderList(pending)}
                        
                        <h3 className="font-semibold mt-6 mb-2">{t('todos_completed')} ({completed.length})</h3>
                        {renderList(completed, true)}
                     </motion.div>
            ) : (
                <motion.div key="grid-view">
                     <h3 className="font-semibold mb-2">{t('todos_active')} ({pending.length})</h3>
                     {pending.length === 0 ? <p className="text-gray-500 text-sm mb-4">{t('todos_empty')}</p> : renderGrid(pending)}

                     <h3 className="font-semibold mt-6 mb-2">{t('todos_completed')} ({completed.length})</h3>
                     {completed.length > 0 && renderGrid(completed)}
                </motion.div>
            )}
            </AnimatePresence>

            {/* Modal untuk Edit To-Do dan Checklist-nya */}
            <TodoEditModal isOpen={!!editingTodo} onClose={closeEditModal} onSave={handleSaveEdit} todo={editingTodo} t={t} />

        </div>
    );
};

const TodoEditModal = ({ isOpen, onClose, onSave, todo, t }) => {
    const [content, setContent] = useState('');
    const [checklist, setChecklist] = useState([]);
    const [newChecklistItem, setNewChecklistItem] = useState('');

    useEffect(() => {
        if (todo) {
            setContent(todo.content || '');
            setChecklist(todo.checklist || []);
        }
    }, [todo]);

    const handleAddChecklistItem = () => {
        if (newChecklistItem.trim()) {
            setChecklist([...checklist, { id: uuidv4(), content: newChecklistItem, completed: false }]);
            setNewChecklistItem('');
        }
    };

    const toggleChecklistItem = (id) => {
        setChecklist(checklist.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    };
    
    const deleteChecklistItem = (id) => {
        setChecklist(checklist.filter(item => item.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        onSave({ ...todo, content, checklist });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-light-card dark:bg-dark-card rounded-2xl p-6 w-full max-w-md relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><IconClose className="w-6 h-6" /></button>
                    <h2 className="text-xl font-bold mb-4">{t('modal_edit_title')}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" value={content} onChange={e => setContent(e.target.value)} placeholder={t('modal_field_title')} className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg" required />
                        
                        <div>
                            <label className="text-sm font-medium">{t('modal_checklist_title')}</label>
                            <div className="flex gap-2 mt-1">
                                <input type="text" value={newChecklistItem} onChange={(e) => setNewChecklistItem(e.target.value)} placeholder={t('modal_checklist_placeholder')} className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg" />
                                <button type="button" onClick={handleAddChecklistItem} className="bg-gray-200 dark:bg-gray-600 px-3 rounded-lg">{t('modal_checklist_add')}</button>
                            </div>
                            <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                                {checklist.map(item => (
                                    <div key={item.id} className="flex items-center justify-between bg-light-bg dark:bg-dark-bg p-2 rounded">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" checked={item.completed} onChange={() => toggleChecklistItem(item.id)} className="form-checkbox h-4 w-4 rounded text-primary focus:ring-primary"/>
                                            <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : ''}`}>{item.content}</span>
                                        </div>
                                        <button type="button" onClick={() => deleteChecklistItem(item.id)} className="p-1 text-gray-400 hover:text-red-500">
                                            <IconTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90">{t('modal_button_save_changes')}</button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const ScheduledListView = ({ tasks, handlers, onEditTask, t }) => (
    <div className="space-y-4">
        {/* Note for confirmation */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
            <p>{t('scheduled_completion_note')}</p>
        </div>
        
        {tasks.length > 0 ? tasks.map(task => (
             <ScheduledTaskItem key={task.id} task={task} handlers={handlers} onEditTask={onEditTask} t={t} />
        )) : (
            <div className="text-center text-gray-500 py-8 bg-light-card dark:bg-dark-card rounded-2xl">
                <p>{t('schedule_empty')}</p>
            </div>
        )}
    </div>
);

const MissedListView = ({ tasks, handlers, t }) => (
    <div className="space-y-3">
        {tasks.length > 0 ? (
            <>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-lg text-sm mb-4">
                    <p>Aktivitas terlewat? Anda masih bisa menyelesaikannya sekarang untuk menambahkannya ke statistik.</p>
                </div>
                {tasks.map(task => (
                    <div key={task.id} className="p-4 bg-red-50 dark:bg-red-900/50 rounded-xl flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-red-700 dark:text-red-300">{task.title}</p>
                            <p className="text-sm text-red-500 dark:text-red-400">Terlewat pada {task.date}</p>
                        </div>
                        <button
                            onClick={() => handlers.tasks.toggle(task.id)}
                            className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full hover:bg-opacity-90"
                        >
                            Selesaikan Sekarang
                        </button>
                    </div>
                ))}
            </>
        ) : <p className="text-center text-gray-500 py-8">{t('missed_empty')}</p>}
    </div>
);

const StatsPage = ({ tasks, todos, t }) => {
    const [timeframe, setTimeframe] = useState('week'); // 'week', 'month', 'year'

    const categoryData = useMemo(() => {
        const categories = ['Work', 'Study', 'Personal', 'Health'];
        return categories.map(category => ({
            name: category,
            Total: tasks.filter(t => t.category === category).length,
            Completed: tasks.filter(t => t.category === category && t.completed).length,
        }));
    }, [tasks]);
    
    // PERBAIKAN: Memastikan perhitungan statistik menggunakan data yang relevan dengan timeframe
    const { taskTrendData, todoTrendData } = useMemo(() => {
        const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365;
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days + 1);
        startDate.setHours(0, 0, 0, 0);

        const dateMap = new Map();
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateString = d.toISOString().slice(0, 10);
            let label;
            if (days === 7) label = d.toLocaleDateString('default', { weekday: 'short' });
            else if (days === 30) label = d.getDate().toString();
            else label = d.toLocaleDateString('default', { month: 'short' });
            dateMap.set(dateString, { name: label, Total: 0, Completed: 0, TodosCompleted: 0, date: new Date(d) });
        }
        
        // Filter tasks and todos to only include those within the current timeframe
        const filterDate = new Date(startDate).toISOString().slice(0, 10);

        tasks.filter(t => t.date >= filterDate).forEach(task => {
            if (dateMap.has(task.date)) {
                dateMap.get(task.date).Total++;
                if (task.completed) {
                    dateMap.get(task.date).Completed++;
                }
            }
        });

        todos.filter(t => t.completed && t.completedAt && t.completedAt.slice(0, 10) >= filterDate).forEach(todo => {
            const completedDateStr = todo.completedAt.slice(0, 10);
            if (dateMap.has(completedDateStr)) {
                 dateMap.get(completedDateStr).TodosCompleted++;
            }
        });

        if (days === 365) {
            const monthMap = new Map();
             for (const item of Array.from(dateMap.values())) {
                 const monthName = item.date.toLocaleDateString('default', { month: 'short' });
                 if (!monthMap.has(monthName)) {
                     const initialMonthData = { name: monthName, Total: 0, Completed: 0, TodosCompleted: 0, sortDate: item.date };
                     monthMap.set(monthName, initialMonthData);
                 }
                 const monthData = monthMap.get(monthName);
                 monthData.Total += item.Total;
                 monthData.Completed += item.Completed;
                 monthData.TodosCompleted += item.TodosCompleted;
             }
             const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
             const sortedMonths = Array.from(monthMap.values()).sort((a,b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));
             return { taskTrendData: sortedMonths, todoTrendData: sortedMonths.map(m => ({name: m.name, Completed: m.TodosCompleted})) };
        }


        const trendData = Array.from(dateMap.values());
        
        return {
            taskTrendData: trendData.map(d => ({ name: d.name, Total: d.Total, Completed: d.Completed })),
            todoTrendData: trendData.map(d => ({ name: d.name, Completed: d.TodosCompleted }))
        };

    }, [tasks, todos, timeframe]);
    
    const TimeframeButton = ({ value, label }) => (
        <button 
            onClick={() => setTimeframe(value)} 
            className={`px-3 py-1 text-sm rounded-md ${timeframe === value ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            {label}
        </button>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            <div className="p-4 bg-light-card dark:bg-dark-card rounded-lg">
                <h2 className="text-xl font-bold mb-4">{t('stats_task_completion')}</h2>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={categoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem', color: '#F9FAFB' }} />
                            <Legend />
                            <Bar dataKey="Total" fill="#6366F1" />
                            <Bar dataKey="Completed" fill="#34D399" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="p-4 bg-light-card dark:bg-dark-card rounded-lg">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{t('stats_task_trend')}</h2>
                    <div className="flex gap-2">
                        <TimeframeButton value="week" label={t('stats_week')} />
                        <TimeframeButton value="month" label={t('stats_month')} />
                        <TimeframeButton value="year" label={t('stats_year')} />
                    </div>
                </div>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={taskTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem', color: '#F9FAFB' }} />
                            <Legend />
                            <Bar dataKey="Total" stackId="a" fill="#6366F1" />
                            <Bar dataKey="Completed" stackId="a" fill="#34D399" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="p-4 bg-light-card dark:bg-dark-card rounded-lg">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{t('stats_todo_trend')}</h2>
                 </div>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={todoTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem', color: '#F9FAFB' }} />
                            <Legend />
                            <Bar dataKey="Completed" fill="#f97316" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </motion.div>
    );
};

const SettingsPage = ({ onLogout, onResetData, onRestoreData, onUpdate, lang, username, t }) => {
    const handleReset = () => { if (window.confirm(t('settings_reset_confirm'))) onResetData(); };
    const handleBackup = () => {
        const data = localStorage.getItem(`fintask_data_${username}`);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fintask_backup_${username}_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };
    const handleRestore = (e) => {
        const file = e.target.files[0];
        if (file && window.confirm(t('settings_restore_confirm'))) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const restoredData = JSON.parse(event.target.result);
                    onRestoreData(restoredData);
                    alert("Data restored successfully!");
                } catch {
                    alert("Invalid backup file.");
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h2 className="text-xl font-bold mb-4">{t('settings_title')}</h2>
            <div className="space-y-4">
                <div className="p-4 bg-light-card dark:bg-dark-card rounded-lg">
                    <label className="font-semibold block mb-2">{t('settings_language')}</label>
                    <div className="flex gap-2">
                        <button onClick={() => onUpdate('language', 'id')} className={`px-4 py-2 rounded-lg ${lang === 'id' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Indonesia</button>
                        <button onClick={() => onUpdate('language', 'en')} className={`px-4 py-2 rounded-lg ${lang === 'en' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>English</button>
                    </div>
                </div>
                <div className="p-4 bg-light-card dark:bg-dark-card rounded-lg">
                    <label className="font-semibold block mb-2">{t('settings_data_management')}</label>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <button onClick={handleBackup} className="w-full text-center p-2 bg-blue-500 text-white rounded-lg font-semibold">{t('settings_backup')}</button>
                        <label className="w-full text-center p-2 bg-green-500 text-white rounded-lg font-semibold cursor-pointer">{t('settings_restore')}
                            <input type="file" accept=".json" className="hidden" onChange={handleRestore} />
                        </label>
                    </div>
                </div>

                {/* --- Bagian Baru: Feedback & Info Data --- */}
                <a href="mailto:Alvienkho12@gmail.com?subject=Feedback for Fintask App" className="block w-full text-left p-4 bg-light-card dark:bg-dark-card rounded-lg">
                    <div className="flex items-center gap-4">
                        <IconMail className="w-6 h-6 text-primary"/>
                        <div>
                            <p className="font-semibold">{t('settings_feedback')}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings_feedback_description')}</p>
                        </div>
                    </div>
                </a>
                 <div className="w-full text-left p-4 bg-light-card dark:bg-dark-card rounded-lg">
                     <div className="flex items-center gap-4">
                        <IconDatabase className="w-6 h-6 text-primary"/>
                        <div>
                            <p className="font-semibold">{t('settings_data_storage')}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings_data_storage_description')}</p>
                        </div>
                    </div>
                </div>
                {/* --- Akhir Bagian Baru --- */}


                <button onClick={handleReset} className="w-full text-left p-4 bg-red-50 text-red-700 dark:bg-red-900/50 dark:text-red-300 rounded-lg font-semibold">{t('settings_reset_data')}</button>
                <button onClick={onLogout} className="w-full text-left p-4 bg-light-card dark:bg-dark-card rounded-lg font-semibold flex items-center gap-2">
                    <IconLogout className="w-5 h-5" />{t('settings_logout')}
                </button>
            </div>
        </motion.div>
    );
};

const BottomNav = ({ activePage, onNavigate, t }) => {
    const navItems = [
        { id: 'home', icon: <IconHome className="w-6 h-6" />, label: t('nav_home') },
        { id: 'activity', icon: <IconListCheck className="w-6 h-6" />, label: t('nav_activity') },
        { id: 'finance', icon: <IconWallet className="w-6 h-6" />, label: t('nav_finance') },
        { id: 'notes', icon: <IconNote className="w-6 h-6" />, label: t('nav_notes') },
        { id: 'stats', icon: <IconChartBar className="w-6 h-6" />, label: t('nav_stats') },
        { id: 'settings', icon: <IconSettings className="w-6 h-6" />, label: t('nav_settings') }
    ];
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-light-card dark:bg-dark-card shadow-[0_-2px_5px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_5px_rgba(0,0,0,0.2)]">
            <div className="max-w-4xl mx-auto px-2 h-16 flex justify-around items-center">
                {navItems.map(item => (
                    <button key={item.id} onClick={() => onNavigate(item.id)} className={`flex flex-col items-center justify-center w-16 transition-colors ${activePage === item.id ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-primary'}`}>
                        {item.icon}
                        <span className="text-xs mt-1">{item.label}</span>
                    </button>
                ))}
            </div>
        </footer>
    );
};

const TaskModal = ({ isOpen, onClose, onSave, editingTask, t }) => {
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [category, setCategory] = useState('Personal'); 
    const [date, setDate] = useState(''); 
    const [time, setTime] = useState(''); 
    const [duration, setDuration] = useState(0); // Set default duration to 0
    const [reminder, setReminder] = useState(0); 
    const [checklist, setChecklist] = useState([]); 
    const [newChecklistItem, setNewChecklistItem] = useState('');

    const isTimed = time !== '' || (editingTask && editingTask.time);

    useEffect(() => { 
        if (isOpen) { 
            const now = new Date(); 
            const task = editingTask || {}; 
            setTitle(task.title || ''); 
            setDescription(task.description || ''); 
            setCategory(task.category || 'Personal'); 
            // PERBAIKAN: Gunakan tanggal saat ini sebagai default jika menambahkan baru
            setDate(task.date || now.toISOString().slice(0, 10)); 
            // PERBAIKAN: Set time/duration default ke empty string/0
            setTime(task.time || ''); 
            setDuration(task.duration || 0); 
            setReminder(task.reminder || 0); 
            setChecklist(task.checklist || []); 
        } 
    }, [editingTask, isOpen]);

    const handleAddChecklistItem = () => { if (newChecklistItem.trim()) { setChecklist([...checklist, { id: uuidv4(), content: newChecklistItem, completed: false }]); setNewChecklistItem(''); } };
    const handleDeleteChecklistItem = (id) => { setChecklist(checklist.filter(item => item.id !== id)); };

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        if (!title.trim()) return; 

        // Atur time dan duration ke null/0 jika tidak diisi
        const finalTime = time.trim() || '';
        const finalDuration = finalTime ? (parseInt(duration) || 0) : 0;
        const finalReminder = finalTime ? (parseInt(reminder) || 0) : 0;
        
        onSave({ 
            title, 
            description, 
            category, 
            date, 
            time: finalTime, 
            duration: finalDuration, 
            reminder: finalReminder, 
            checklist 
        }); 
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-light-card dark:bg-dark-card rounded-2xl p-6 w-full max-w-md relative">
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><IconClose className="w-6 h-6" /></button>
                        <h2 className="text-xl font-bold mb-4">{editingTask ? t('modal_edit_title') : t('modal_add_title')}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={t('modal_field_title')} className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg" required />
                            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder={t('modal_field_description')} className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg h-20" />
                            
                            {/* Baris 1: Kategori & Durasi */}
                            <div className="grid grid-cols-2 gap-4">
                                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg"><option>Personal</option><option>Work</option><option>Study</option><option>Health</option></select>
                                <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder={t('modal_field_duration')} className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg" disabled={!time} />
                            </div>

                            {/* Baris 2: Tanggal & Waktu */}
                            <div className="grid grid-cols-2 gap-4">
                                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg" required />
                                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg" />
                            </div>
                            
                            {/* Checklist */}
                            <div>
                                <label className="text-sm font-medium">{t('modal_checklist_title')}</label>
                                <div className="flex gap-2 mt-1">
                                    <input type="text" value={newChecklistItem} onChange={(e) => setNewChecklistItem(e.target.value)} placeholder={t('modal_checklist_placeholder')} className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg" />
                                    <button type="button" onClick={handleAddChecklistItem} className="bg-gray-200 dark:bg-gray-600 px-3 rounded-lg">{t('modal_checklist_add')}</button>
                                </div>
                                <div className="mt-2 space-y-1 max-h-24 overflow-y-auto">{checklist.map(item => (<div key={item.id} className="flex items-center justify-between bg-light-bg dark:bg-dark-bg p-1 rounded"><span className="text-sm">{item.content}</span><button type="button" onClick={() => handleDeleteChecklistItem(item.id)} className="p-1 text-red-500"><IconClose className="w-4 h-4" /></button></div>))}</div>
                            </div>

                            {/* Reminder (hanya jika ada waktu) */}
                            {time && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('modal_field_reminder')}</label>
                                    <select value={reminder} onChange={e => setReminder(e.target.value)} className="w-full p-2 rounded-lg bg-light-bg dark:bg-dark-bg mt-1">
                                        <option value="0">{t('modal_reminder_none')}</option><option value="5">{t('modal_reminder_5min')}</option><option value="10">{t('modal_reminder_10min')}</option><option value="30">{t('modal_reminder_30min')}</option>
                                    </select>
                                </div>
                            )}

                            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90">{editingTask ? t('modal_button_update') : t('modal_button_add')}</button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const AlarmModal = ({ task, onClose, t }) => {
    useEffect(() => {
        if (task) {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 1);
            } catch (e) {
                console.error("Failed to play alarm sound:", e);
            }
        }
    }, [task]);
    if (!task) return null;
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-light-card dark:bg-dark-card rounded-2xl p-6 w-full max-w-sm text-center">
                    <div className="text-primary mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><IconBell className="w-8 h-8" /></div>
                    <h2 className="text-xl font-bold mb-2">{t('alarm_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-1 font-semibold text-lg">{task.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Starts at {task.time}.</p>
                    <button onClick={onClose} className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90">{t('alarm_dismiss')}</button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- Komponen Baru untuk Dashboard di Beranda ---
const FinancialSummaryCard = ({ finance, t }) => {
    const { totals, allocationData, flowData } = useMemo(() => {
        if (!finance || !finance.transactions) return { totals: {}, allocationData: [], flowData: [] };
        
        const calculatedTotals = finance.transactions.reduce((acc, t) => {
             if (['income', 'expense', 'savings', 'investment'].includes(t.type)) {
                 acc[t.type] = (acc[t.type] || 0) + t.amount;
             }
            return acc;
        }, { income: 0, expense: 0, savings: 0, investment: 0 });
        
        const totalOutflow = calculatedTotals.expense + calculatedTotals.savings + calculatedTotals.investment;
        calculatedTotals.netBalance = calculatedTotals.income - totalOutflow;

        const dataForPie = [
            { name: t('finance_expense'), value: calculatedTotals.expense },
            { name: t('finance_savings'), value: calculatedTotals.savings },
            { name: t('finance_investment'), value: calculatedTotals.investment },
        ].filter(item => item.value > 0);

        const dataForBar = [
            { name: t('finance_income'), value: calculatedTotals.income },
            { name: t('finance_total_outflow'), value: totalOutflow },
        ]

        return { totals: calculatedTotals, allocationData: dataForPie, flowData: dataForBar };

    }, [finance, t]);
    
    const COLORS = {
        [t('finance_expense')]: '#ef4444',
        [t('finance_savings')]: '#3b82f6',
        [t('finance_investment')]: '#8b5cf6',
    };

    const flowColors = ['#22c55e', '#f87171'];

    return (
        <div className="p-4 bg-light-card dark:bg-dark-card rounded-2xl flex flex-col h-full">
            <h3 className="font-bold text-lg mb-4">{t('dashboard_finance_title')}</h3>
            {finance.transactions.length > 0 ? (
                <div className="flex flex-col flex-grow space-y-4">
                    {/* Grafik Batang Arus Kas & Ringkasan Teks */}
                    <div>
                         <h4 className="font-semibold text-sm text-center mb-2">{t('finance_cash_flow')}</h4>
                         <div style={{ width: '100%', height: 100 }}>
                              <ResponsiveContainer>
                                 <BarChart data={flowData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                     <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(128, 128, 128, 0.2)" />
                                     <XAxis type="number" hide />
                                     <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                     <Tooltip
                                         formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)}
                                         contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem' }}
                                         labelStyle={{ color: '#F9FAFB' }}
                                     />
                                     <Bar dataKey="value" barSize={20}>
                                         {flowData.map((entry, index) => (
                                             <Cell key={`cell-${index}`} fill={flowColors[index % 20]} />
                                         ))}
                                     </Bar>
                                    </BarChart>
                              </ResponsiveContainer>
                          </div>
                          {/* Ringkasan Dana di sini */}
                          <div className="mt-4 space-y-2 text-sm">
                               <div className="flex justify-between p-2 rounded bg-green-50 dark:bg-green-900/50">
                                   <span>{t('finance_total_income')}</span>
                                   <span className="font-semibold text-green-600 dark:text-green-400">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totals.income)}</span>
                               </div>
                               <div className="flex justify-between p-2 rounded bg-red-50 dark:bg-red-900/50">
                                   <span>{t('finance_total_outflow')}</span>
                                   <span className="font-semibold text-red-600 dark:text-red-400">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totals.expense + totals.savings + totals.investment)}</span>
                               </div>
                               <div className="flex justify-between p-2 rounded bg-gray-100 dark:bg-gray-700/50 font-bold border-t-2 border-gray-200 dark:border-gray-600">
                                   <span>{t('finance_net_balance')}</span>
                                   <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totals.netBalance)}</span>
                               </div>
                          </div>
                    </div>

                    {/* Alokasi Dana Keluar */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex-grow flex flex-col">
                        <h4 className="font-semibold text-sm text-center mb-2">{t('finance_outflow_allocation')}</h4>
                        <div className="flex-grow" style={{ minHeight: '150px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={allocationData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3}>
                                        {allocationData.map((entry) => <Cell key={entry.name} fill={COLORS[entry.name]} />)}
                                    </Pie>
                                    <Tooltip formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)} />
                                    <Legend wrapperStyle={{fontSize: "12px", paddingTop: "10px"}}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : <div className="flex items-center justify-center flex-grow"><p className="text-center text-gray-500">{t('finance_empty')}</p></div>}
        </div>
    );
};

// --- Komponen Baru untuk Notifikasi Toast ---
const Toast = ({ message, isVisible, onDismiss }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 3000); // Hilang setelah 3 detik
            return () => clearTimeout(timer);
        }
    }, [isVisible, onDismiss]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="flex items-center gap-2 bg-gray-800 text-white py-2 px-4 rounded-full shadow-lg">
                        <IconCheck className="w-5 h-5 text-green-400" />
                        <span>{message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ActivitySummaryCard = ({ tasks, t }) => {
    const [timeframe, setTimeframe] = useState('week');

    const chartData = useMemo(() => {
        const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365;
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days + 1);
        startDate.setHours(0, 0, 0, 0);


        const categories = ['Work', 'Study', 'Personal', 'Health'];
        const dateMap = new Map();

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateString = d.toISOString().slice(0, 10);
            let label;
            if (days === 7) label = d.toLocaleDateString('en-US', { weekday: 'short' });
            else if (days === 30) label = d.getDate().toString();
            else label = d.toLocaleDateString('en-US', { month: 'short' });

            const initialData = { name: label, date: new Date(d) };
            categories.forEach(cat => initialData[cat] = 0);
            dateMap.set(dateString, initialData);
        }

        const filterDate = new Date(startDate).toISOString().slice(0, 10);
        
        tasks.filter(t => t.completed && t.date >= filterDate).forEach(task => {
            if (dateMap.has(task.date)) {
                const dayData = dateMap.get(task.date);
                if(dayData[task.category] !== undefined) {
                    dayData[task.category]++;
                }
            }
        });
        
        if (days === 365) {
            const monthMap = new Map();
            for (const dayData of dateMap.values()) {
                const monthName = dayData.date.toLocaleDateString('en-US', { month: 'short' });
                if (!monthMap.has(monthName)) {
                    const initialMonthData = { name: monthName, date: dayData.date };
                     categories.forEach(cat => initialMonthData[cat] = 0);
                    monthMap.set(monthName, initialMonthData);
                }
                const monthData = monthMap.get(monthName);
                categories.forEach(cat => monthData[cat] += dayData[cat]);
            }
             return Array.from(monthMap.values()).sort((a,b) => a.date - b.date);
        }

        return Array.from(dateMap.values()).sort((a,b) => a.date - b.date);
    }, [tasks, timeframe]);

    const CATEGORY_COLORS = {
        Work: '#3b82f6',
        Study: '#8b5cf6',
        Personal: '#6366f1',
        Health: '#22c55e',
    };

    const TimeframeButton = ({ value, label }) => (
        <button
            onClick={() => setTimeframe(value)}
            className={`px-3 py-1 text-xs rounded-md ${timeframe === value ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
            {label}
        </button>
    );

    return (
        <div className="p-4 bg-light-card dark:bg-dark-card rounded-2xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">{t('dashboard_activity_title')}</h3>
                <div className="flex gap-2">
                    <TimeframeButton value="week" label={t('stats_week')} />
                    <TimeframeButton value="month" label={t('stats_month')} />
                    <TimeframeButton value="year" label={t('stats_year')} />
                </div>
            </div>
            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis allowDecimals={false} fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '0.5rem', color: '#F9FAFB' }} />
                        <Legend wrapperStyle={{fontSize: "12px"}} />
                        {Object.keys(CATEGORY_COLORS).map(cat => (
                             <Bar key={cat} dataKey={cat} stackId="a" fill={CATEGORY_COLORS[cat]} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}