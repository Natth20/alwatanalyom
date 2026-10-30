"use client";

import { Download } from "lucide-react";

interface AuditLogEntry {
  id: string;
  userName: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  ip: string;
  createdAt: string;
}

interface Props {
  logs: AuditLogEntry[];
}

export function ExportAuditButton({ logs }: Props) {
  const handleExport = () => {
    if (logs.length === 0) return;

    // رؤوس الأعمدة باللغة العربية
    const headers = ["معرف العملية", "المسؤول", "البريد الإلكتروني", "نوع الإجراء", "الكيان المتأثر", "معرف الكيان", "عنوان IP", "التاريخ والوقت"];

    const escapeCsv = (val: string) => `"${(val || "").replace(/"/g, '""')}"`;

    const rows = logs.map((l) => [
      escapeCsv(l.id),
      escapeCsv(l.userName),
      escapeCsv(l.userEmail),
      escapeCsv(l.action),
      escapeCsv(l.entityType),
      escapeCsv(l.entityId),
      escapeCsv(l.ip),
      escapeCsv(new Date(l.createdAt).toLocaleString("ar-EG")),
    ]);

    const csvContent = [headers.map(escapeCsv).join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    // إضافة BOM (\uFEFF) لضمان ظهور الحروف العربية بدون تشويه في Microsoft Excel
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `alwatan-audit-log-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={logs.length === 0}
      className="px-3.5 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-hover)] disabled:opacity-50 text-xs font-bold transition-colors inline-flex items-center gap-1.5 text-[var(--text)]"
      title="تصدير سجل التدقيق إلى ملف CSV متوافق مع Excel"
    >
      <Download className="w-3.5 h-3.5 text-emerald-400" />
      <span>تصدير إلى CSV (Excel)</span>
    </button>
  );
}
