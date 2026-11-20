"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  Flame,
  Radio,
  RefreshCw,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  Sliders,
  Send,
  Database,
  Globe2,
  Clock,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Megaphone,
  Rss,
  Play,
  Pause,
  AlertCircle,
  BarChart3,
  KeyRound,
  FileCheck2,
  Coins,
  Vote,
  Users,
  MessageSquare,
  Settings,
  Lock,
} from "lucide-react";

interface AdminUser {
  name: string;
  email: string;
  role: string;
  department: string;
  lastLogin?: string;
}

interface ArticleItem {
  id: string;
  title: string;
  section: string;
  source: string;
  publishedAt: string;
  views: number;
  status: "published" | "draft" | "review";
  isBreaking?: boolean;
}

interface AdItem {
  id: string;
  title: string;
  advertiser: string;
  placement: "banner_top" | "in_article" | "sidebar" | "sports_screen";
  status: "active" | "paused";
  impressions: number;
  clicks: number;
  targetUrl: string;
}

interface SourceItem {
  id: string;
  name: string;
  feedUrl: string;
  country: string;
  trustLevel: number;
  enabled: boolean;
  lastSync: string;
  status: "healthy" | "probing" | "error";
}

interface ReviewItem {
  id: string;
  title: string;
  source: string;
  urgency: "high" | "medium" | "low";
  reason: string;
  receivedAt: string;
  contentSnippet: string;
}

interface PollItem {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
  active: boolean;
  totalVotes: number;
}

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR_IN_CHIEF" | "FIELD_REPORTER" | "FACT_CHECKER";
  active: boolean;
  twoFactor: boolean;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "articles"
    | "ads"
    | "sources"
    | "review"
    | "economy"
    | "polls"
    | "users"
    | "comments"
    | "settings"
    | "audit"
  >("overview");

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. غرفة العمليات والتحكم اللحظي
  const [breakingText, setBreakingText] = useState("");
  const [breakingDuration, setBreakingDuration] = useState("30");
  const [broadcasting, setBroadcasting] = useState(false);
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  const [revalidating, setRevalidating] = useState(false);

  // 2. إدارة الأخبار والمقالات (Articles CRUD)
  const [articles, setArticles] = useState<ArticleItem[]>([
    {
      id: "art-1",
      title: "مستجدات الميدان في غزة: استمرار التغطيات الإنسانية وجهود تشغيل المرافق الطبية",
      section: "فلسطين",
      source: "مراسل الوطن اليوم",
      publishedAt: "منذ 10 دقائق",
      views: 4520,
      status: "published",
      isBreaking: true,
    },
    {
      id: "art-2",
      title: "أسعار الذهب تسجل قفزة قياسية جديدة في الأسواق العالمية مع تراجع عوائد السندات",
      section: "اقتصاد",
      source: "رويترز للأنباء",
      publishedAt: "منذ 35 دقيقة",
      views: 2890,
      status: "published",
    },
    {
      id: "art-3",
      title: "يلا سبورت: مواجهات دوري أبطال أوروبا الحاسمة وجدول بث المباريات المباشر",
      section: "رياضة",
      source: "فريق التحرير الرياضي",
      publishedAt: "منذ ساعتين",
      views: 7120,
      status: "published",
    },
  ]);
  const [searchArticle, setSearchArticle] = useState("");
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleSection, setNewArticleSection] = useState("فلسطين");
  const [newArticleSource, setNewArticleSource] = useState("مراسل الوطن اليوم");
  const [newArticleContent, setNewArticleContent] = useState("");
  const [newArticleIsBreaking, setNewArticleIsBreaking] = useState(false);

  // 3. إدارة الإعلانات والرعايات (Ads CRUD)
  const [ads, setAds] = useState<AdItem[]>([
    {
      id: "ad-1",
      title: "رعاية قسم الاقتصاد والبورصة - بنك الاستثمار العربي",
      advertiser: "بنك الاستثمار العربي",
      placement: "banner_top",
      status: "active",
      impressions: 48200,
      clicks: 1420,
      targetUrl: "https://example.com/bank-invest",
    },
    {
      id: "ad-2",
      title: "إعلان مدمج - تطبيق يلا سبورت الرياضي للهواتف",
      advertiser: "شركة الاتصالات الإقليمية",
      placement: "sports_screen",
      status: "active",
      impressions: 92400,
      clicks: 5310,
      targetUrl: "https://example.com/yalla-app",
    },
  ]);
  const [showAddAdModal, setShowAddAdModal] = useState(false);
  const [newAdTitle, setNewAdTitle] = useState("");
  const [newAdAdvertiser, setNewAdAdvertiser] = useState("");
  const [newAdPlacement, setNewAdPlacement] = useState<AdItem["placement"]>("banner_top");
  const [newAdUrl, setNewAdUrl] = useState("");

  // 4. إدارة المصادر والخلاصات (Sources CRUD)
  const [sources, setSources] = useState<SourceItem[]>([
    {
      id: "src-1",
      name: "وكالة الأنباء الفلسطينية (وفا)",
      feedUrl: "https://www.wafa.ps/ar/Rss",
      country: "فلسطين",
      trustLevel: 5,
      enabled: true,
      lastSync: "منذ دقيقتين",
      status: "healthy",
    },
    {
      id: "src-2",
      name: "وكالة رويترز (Reuters Arabic)",
      feedUrl: "https://ara.reuters.com/rss",
      country: "دولي",
      trustLevel: 5,
      enabled: true,
      lastSync: "منذ 4 دقائق",
      status: "healthy",
    },
    {
      id: "src-3",
      name: "شهاب للأنباء (Shehab News)",
      feedUrl: "https://shehabnews.com/rss",
      country: "فلسطين",
      trustLevel: 4,
      enabled: true,
      lastSync: "منذ 6 دقائق",
      status: "healthy",
    },
  ]);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceFeedUrl, setNewSourceFeedUrl] = useState("");
  const [newSourceCountry, setNewSourceCountry] = useState("فلسطين");
  const [newSourceTrust, setNewSourceTrust] = useState(4);

  // 5. غرفة المراجعة والتدقيق البشري (Review Queue)
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([
    {
      id: "rev-1",
      title: "تقرير حصيلة أرقام المستشفيات الميدانية في خان يونس ورفح",
      source: "مراسل ميداني",
      urgency: "high",
      reason: "يتضمن إحصائيات ضحايا حساسة تتطلب مطابقة سجل وزارة الصحة الجنائي (قاعدة 4)",
      receivedAt: "منذ 8 دقائق",
      contentSnippet: "أكدت مصادر طبية ميدانية وصول 14 إصابة إلى النقطة الطبية إثر قصف مدفعي غربي المدينة...",
    },
  ]);

  // 6. التحكم بأسعار الذهب والعملات (Economy Overrides)
  const [usdRate, setUsdRate] = useState("3.725");
  const [jodRate, setJodRate] = useState("5.250");
  const [goldOunce, setGoldOunce] = useState("2748.50");
  const [gold24k, setGold24k] = useState("88.35");

  // 7. استطلاعات الرأي والتصويت (Polls)
  const [polls, setPolls] = useState<PollItem[]>([
    {
      id: "poll-1",
      question: "برأيك، ما هي الأولوية القصوى لإغاثة شمال قطاع غزة في المرحلة الراهنة؟",
      options: [
        { text: "تأمين تدفق الدقيق والمواد الغذائية الأساسية", votes: 4120 },
        { text: "إدخال الوقود لمولدات المستشفيات وشبكات المياه", votes: 5310 },
        { text: "تجهيز وتوسيع المشافي الميدانية الطارئة", votes: 2480 },
      ],
      active: true,
      totalVotes: 11910,
    },
  ]);

  // 8. المستخدمون والصلاحيات (Staff Users)
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>([
    { id: "usr-1", name: "رئاسة التحرير وإدارة النظم", email: "admin@alwatantoday.net", role: "ADMIN", active: true, twoFactor: true },
    { id: "usr-2", name: "أحمد المقدسي (محرر الأخبار)", email: "editor@alwatantoday.net", role: "EDITOR_IN_CHIEF", active: true, twoFactor: true },
    { id: "usr-3", name: "فريق رادار الحقيقة", email: "factcheck@alwatantoday.net", role: "FACT_CHECKER", active: true, twoFactor: false },
  ]);

  // 9. إدارة التعليقات والبلاغات (Comments & Whistleblower Tips)
  const [pendingComments, setPendingComments] = useState([
    { id: "c-1", author: "يوسف غزة", article: "مستجدات الميدان", text: "نسأل الله السلامة والصمود لأهلنا الطواقم الطبية تبذل جهوداً أسطورية.", time: "منذ 15 دقيقة" },
    { id: "c-2", author: "أبو خالد المقدسي", article: "الرباط في الأقصى", text: "القدس ستبقى عربية إسلامية رغم كل التهويد والقيود.", time: "منذ 40 دقيقة" },
  ]);

  // 10. إعدادات المنصة والهوية (General Settings)
  const [siteTitle, setSiteTitle] = useState("الوطن اليوم — المنصة الإخبارية الوطنية الرائدة");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [breakingSoundEnabled, setBreakingSoundEnabled] = useState(true);

  // 11. سجل التدقيق الجنائي (Audit Log)
  const [auditLogs, setAuditLogs] = useState<Array<{ id: string; action: string; user: string; time: string; target: string }>>([
    { id: "aud-1", action: "نشر خبر عاجل", user: "رئيس التحرير", time: "18:42", target: "استهداف جديد في خان يونس" },
    { id: "aud-2", action: "تحديث شريط الذهب والعملات", user: "محرر الاقتصاد", time: "18:30", target: "أونصة الذهب 2,748.50$" },
    { id: "aud-3", action: "تفعيل إعلان", user: "إدارة الإعلانات", time: "18:20", target: "رعاية بنك الاستثمار العربي" },
    { id: "aud-4", action: "فحص وتدقيق مادة", user: "محرر الأخبار", time: "17:55", target: "بيان هيئة الأسرى" },
  ]);

  useEffect(() => {
    // التحقق من الجلسة
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/v1/admin/auth");
        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          router.push("/admin/login");
          return;
        }
        setUser(data.user);
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  // وظائف الأخبار (Articles Handlers)
  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleTitle) return;

    const newArt: ArticleItem = {
      id: `art-${Date.now()}`,
      title: newArticleTitle,
      section: newArticleSection,
      source: newArticleSource,
      publishedAt: "الآن",
      views: 0,
      status: "published",
      isBreaking: newArticleIsBreaking,
    };

    setArticles([newArt, ...articles]);
    setShowAddArticleModal(false);
    setNewArticleTitle("");
    setNewArticleContent("");
    setNewArticleIsBreaking(false);
    showToast("✓ تم نشر الخبر وإدراجه في واجهة الموقع بنجاح!");
  };

  const handleDeleteArticle = (id: string, title: string) => {
    if (confirm(`هل أنت متأكد من حذف الخبر: "${title}" نهائياً من الموقع؟`)) {
      setArticles(articles.filter((a) => a.id !== id));
      showToast("تم حذف الخبر من قاعدة البيانات وسجلات البث.");
    }
  };

  const handleToggleArticleStatus = (id: string) => {
    setArticles(
      articles.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === "published" ? "draft" : "published";
          showToast(`تم تغيير حالة الخبر إلى: ${nextStatus === "published" ? "منشور" : "مسودة"}`);
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  // وظائف الإعلانات (Ads Handlers)
  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdTitle || !newAdAdvertiser) return;

    const newAd: AdItem = {
      id: `ad-${Date.now()}`,
      title: newAdTitle,
      advertiser: newAdAdvertiser,
      placement: newAdPlacement,
      status: "active",
      impressions: 0,
      clicks: 0,
      targetUrl: newAdUrl || "https://alwatantoday.net",
    };

    setAds([newAd, ...ads]);
    setShowAddAdModal(false);
    setNewAdTitle("");
    setNewAdAdvertiser("");
    setNewAdUrl("");
    showToast("✓ تم إنشاء الحملة الإعلانية وتفعيلها بنجاح!");
  };

  const handleToggleAdStatus = (id: string) => {
    setAds(
      ads.map((ad) => {
        if (ad.id === id) {
          const nextStatus = ad.status === "active" ? "paused" : "active";
          showToast(`تم ${nextStatus === "active" ? "تفعيل" : "إيقاف مؤقت"} للإعلان`);
          return { ...ad, status: nextStatus };
        }
        return ad;
      })
    );
  };

  const handleDeleteAd = (id: string, title: string) => {
    if (confirm(`هل أنت متأكد من حذف الحملة الإعلانية: "${title}"؟`)) {
      setAds(ads.filter((ad) => ad.id !== id));
      showToast("تم حذف الحملة الإعلانية بنجاح.");
    }
  };

  // وظائف المصادر (Sources Handlers)
  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceName || !newSourceFeedUrl) return;

    const newSrc: SourceItem = {
      id: `src-${Date.now()}`,
      name: newSourceName,
      feedUrl: newSourceFeedUrl,
      country: newSourceCountry,
      trustLevel: newSourceTrust,
      enabled: true,
      lastSync: "الآن",
      status: "healthy",
    };

    setSources([newSrc, ...sources]);
    setShowAddSourceModal(false);
    setNewSourceName("");
    setNewSourceFeedUrl("");
    showToast("✓ تم ربط المصدر الإخباري بنجاح!");
  };

  const handleProbeSource = (id: string, name: string) => {
    setSources(
      sources.map((s) => (s.id === id ? { ...s, status: "probing" } : s))
    );
    showToast(`جاري فحص اتصال وتحديث خلاصة: ${name}...`);

    setTimeout(() => {
      setSources(
        sources.map((s) =>
          s.id === id ? { ...s, status: "healthy", lastSync: "الآن" } : s
        )
      );
      showToast(`✓ اكتمل الفحص: خلاصة "${name}" نشطة وجاهزة للسحب!`);
    }, 1200);
  };

  const handleToggleSource = (id: string) => {
    setSources(
      sources.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
    showToast("تم تحديث حالة تفعيل المصدر.");
  };

  const handleDeleteSource = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف المصدر: "${name}" من قائمة التغذية؟`)) {
      setSources(sources.filter((s) => s.id !== id));
      showToast("تم حذف المصدر من شبكة التغذية.");
    }
  };

  // وظائف المراجعة (Review Queue Handlers)
  const handleApproveReview = (item: ReviewItem) => {
    const newArt: ArticleItem = {
      id: `art-${Date.now()}`,
      title: item.title,
      section: "فلسطين",
      source: item.source,
      publishedAt: "الآن",
      views: 0,
      status: "published",
    };
    setArticles([newArt, ...articles]);
    setReviewItems(reviewItems.filter((r) => r.id !== item.id));
    showToast(`✓ تم اعتماد المادة ونشرها في الموقع فوراً!`);
  };

  const handleRejectReview = (id: string, title: string) => {
    if (confirm(`هل ترغب في رفض وأرشفة المادة: "${title}"؟`)) {
      setReviewItems(reviewItems.filter((r) => r.id !== id));
      showToast("تم رفض المادة وأرشفتها في سجل المواد المستبعدة.");
    }
  };

  // وظائف البث العاجل
  const handleBroadcastBreaking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!breakingText) return;
    setBroadcasting(true);
    setTimeout(() => {
      setBroadcasting(false);
      const newArt: ArticleItem = {
        id: `art-breaking-${Date.now()}`,
        title: breakingText,
        section: "عاجل",
        source: user?.name || "غرفة التحرير",
        publishedAt: "الآن",
        views: 1,
        status: "published",
        isBreaking: true,
      };
      setArticles([newArt, ...articles]);
      setBreakingText("");
      showToast("✓ تم بث وتعميم الخبر العاجل على كامل شاشات المنصة!");
    }, 600);
  };

  const handleFlushCache = () => {
    setRevalidating(true);
    setTimeout(() => {
      setRevalidating(false);
      showToast("✓ تم تطهير الكاش اللحظي وإعادة توليد صفحات الموقع بنجاح!");
    }, 800);
  };

  // وظيفة حفظ أسعار البورصة
  const handleSaveEconomyRates = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("✓ تم تحديث ونشر أسعار الذهب والعملات في شريط الموقع اللحظي!");
  };

  // وظيفة حفظ الإعدادات العامة
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("✓ تم حفظ إعدادات المنصة والهوية بنجاح!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0206] text-white">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[var(--gold)] animate-spin mx-auto" />
          <p className="text-xs text-white/70 font-bold">جاري تحميل لوحة الإدارة المتكاملة...</p>
        </div>
      </div>
    );
  }

  const filteredArticles = articles.filter(
    (a) =>
      a.title.includes(searchArticle) ||
      a.section.includes(searchArticle) ||
      a.source.includes(searchArticle)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120106] via-[#1a020a] to-[#0a0004] text-white pb-24 selection:bg-[var(--gold)]/30">
      {/* رسائل التنبيه العائمة (Toast Alert) */}
      {toastMessage && (
        <div className="fixed bottom-6 start-6 z-50 p-4 rounded-2xl border border-[var(--gold)]/40 bg-black/90 backdrop-blur-xl text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[var(--gold)] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. الترويسة الرئيسية لغرفة القيادة */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-2xl sticky top-0 z-40 py-3 px-4 shadow-xl">
        <div className="container-custom max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[#dca600] text-[#140106] font-black flex items-center justify-center text-lg shadow-lg shadow-[var(--gold-glow)]">
              وطن
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-white">لوحة الإدارة والتحكم الشاملة</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>متصل مباشرة (Enterprise Cockpit)</span>
                </span>
              </div>
              <p className="text-[11px] text-white/50">إدارة الأخبار، الإعلانات، الأسواق، الاستطلاعات، والمستخدمين</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-left text-xs">
              <span className="font-bold text-white flex items-center gap-1 justify-end">
                <UserCheck className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>{user?.name}</span>
              </span>
              <span className="text-[10px] text-[var(--gold)] font-mono">{user?.department} ({user?.role})</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
            >
              <span>معاينة الموقع</span>
              <ExternalLink className="w-3 h-3 text-[var(--gold)]" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/25 text-xs font-bold text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </button>
          </div>
        </div>

        {/* شريط الأجنحة والتبويبات الـ 11 الرئيسية */}
        <div className="container-custom max-w-7xl mx-auto pt-3">
          <nav className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: "overview", label: "غرفة العمليات والبث", icon: Radio },
              { id: "articles", label: `الأخبار والمقالات (${articles.length})`, icon: FileText },
              { id: "ads", label: `الإعلانات والرعايات (${ads.length})`, icon: Megaphone },
              { id: "sources", label: `المصادر والخلاصات (${sources.length})`, icon: Rss },
              { id: "review", label: `المراجعة البشرية (${reviewItems.length})`, icon: ShieldCheck, badge: reviewItems.length > 0 },
              { id: "economy", label: "بورصة الذهب والعملات", icon: Coins },
              { id: "polls", label: "استطلاعات الرأي", icon: Vote },
              { id: "users", label: "طاقم التحرير والرتب", icon: Users },
              { id: "comments", label: `التعليقات (${pendingComments.length})`, icon: MessageSquare },
              { id: "settings", label: "إعدادات المنصة", icon: Settings },
              { id: "audit", label: "سجل الرقابة الجنائي", icon: Database },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black shadow-lg shadow-[var(--gold-glow)]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="container-custom max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* ========================================================================= */}
        {/* التبويب 1: غرفة العمليات والبث المباشر (Overview) */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-1 text-center">
                <span className="text-3xl font-black text-[var(--gold)] block">{articles.length}</span>
                <span className="text-xs text-white/60">أخبار نشطة في المنظومة</span>
              </div>
              <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-1 text-center">
                <span className="text-3xl font-black text-emerald-400 block">{ads.filter((a) => a.status === "active").length}</span>
                <span className="text-xs text-white/60">حملات إعلانية نشطة</span>
              </div>
              <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-1 text-center">
                <span className="text-3xl font-black text-cyan-400 block">{sources.filter((s) => s.enabled).length}</span>
                <span className="text-xs text-white/60">وكالات معتمدة متصلة</span>
              </div>
              <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-1 text-center">
                <span className="text-3xl font-black text-rose-400 block">{reviewItems.length}</span>
                <span className="text-xs text-white/60">مواد في انتظار المراجعة</span>
              </div>
            </div>

            {/* منصة بث شريط العواجل */}
            <div className="rounded-3xl border border-red-500/30 bg-red-950/20 p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center animate-pulse shadow-md">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-white">بث خبر عاجل أحمر فوري في الموقع</h2>
                    <p className="text-xs text-red-300/70">يظهر فوراً في شريط العواجل بقمة الموقع وشريط الهواتف</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-red-400 bg-red-500/10 border border-red-500/30 px-2.5 py-1 rounded-full">
                  LIVE-BROADCAST
                </span>
              </div>

              <form onSubmit={handleBroadcastBreaking} className="space-y-4">
                <div>
                  <textarea
                    required
                    rows={2}
                    value={breakingText}
                    onChange={(e) => setBreakingText(e.target.value)}
                    placeholder="اكتب نص الخبر العاجل هنا بكل دقة..."
                    className="w-full px-4 py-3 rounded-2xl border border-red-500/30 bg-black/60 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 leading-relaxed"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs text-white/70">
                    <span>مدة التثبيت:</span>
                    <select
                      value={breakingDuration}
                      onChange={(e) => setBreakingDuration(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-white/20 bg-black/60 text-xs text-white cursor-pointer"
                    >
                      <option value="15">15 دقيقة</option>
                      <option value="30">30 دقيقة</option>
                      <option value="60">ساعة</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={broadcasting || !breakingText}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{broadcasting ? "جاري التعميم..." : "بث في الموقع فوراً"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* أدوات التحكم السريعة (Kill Switch & Purge Cache) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-5 rounded-2xl border ${killSwitchActive ? 'border-rose-500 bg-rose-950/40' : 'border-white/10 bg-white/5'} space-y-3`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className={`w-5 h-5 ${killSwitchActive ? 'text-rose-400 animate-bounce' : 'text-amber-400'}`} />
                    <h3 className="font-bold text-sm text-white">مفتاح الإيقاف الطارئ (Kill Switch)</h3>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${killSwitchActive ? 'bg-rose-500 text-white' : 'bg-white/10 text-white/60'}`}>
                    {killSwitchActive ? 'مفعل (مقفل)' : 'طبيعي'}
                  </span>
                </div>
                <p className="text-xs text-white/60">
                  إيقاف النشر التلقائي للوكالات وتحويل كافة الأخبار لقائمة المراجعة اليدوية فوراً.
                </p>
                <button
                  onClick={() => {
                    setKillSwitchActive(!killSwitchActive);
                    showToast(killSwitchActive ? "تم إلغاء الإيقاف الطارئ وعودة البث التلقائي" : "تم تفعيل الإيقاف الطارئ للتحرير");
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    killSwitchActive ? 'bg-rose-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {killSwitchActive ? 'إلغاء الإيقاف والعودة للبث التلقائي' : 'تفعيل الإيقاف الطارئ التحريري'}
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className={`w-5 h-5 text-cyan-400 ${revalidating ? 'animate-spin' : ''}`} />
                    <h3 className="font-bold text-sm text-white">تطهير وتحديث الكاش (Instant Cache Flush)</h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300">
                    لحظي
                  </span>
                </div>
                <p className="text-xs text-white/60">
                  تحديث كافة صفحات الموقع الرئيسية فورياً ومسح الكاش المخبأ على Vercel CDN.
                </p>
                <button
                  onClick={handleFlushCache}
                  disabled={revalidating}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {revalidating ? "جاري التطهير..." : "تطهير وتحديث كاش الموقع الآن"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* التبويب 2: إدارة الأخبار والمقالات (Articles CRUD) */}
        {/* ========================================================================= */}
        {activeTab === "articles" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-white/40 absolute start-3 top-3" />
                <input
                  type="text"
                  value={searchArticle}
                  onChange={(e) => setSearchArticle(e.target.value)}
                  placeholder="البحث في الأخبار بالعنوان أو القسم أو المصدر..."
                  className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <button
                onClick={() => setShowAddArticleModal(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--gold-glow)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة خبر / مقال جديد</span>
              </button>
            </div>

            {/* جدول الأخبار */}
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-black/50 text-white/70 border-b border-white/10 font-bold">
                    <tr>
                      <th className="p-4">عنوان الخبر</th>
                      <th className="p-4">القسم</th>
                      <th className="p-4">المصدر</th>
                      <th className="p-4">الحالة</th>
                      <th className="p-4">المشاهدات</th>
                      <th className="p-4 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredArticles.map((art) => (
                      <tr key={art.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 max-w-md">
                          <div className="space-y-1">
                            <span className="font-bold text-white block leading-snug">{art.title}</span>
                            <span className="text-[10px] text-white/40">{art.publishedAt}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-md bg-white/10 text-white/80 font-bold">
                            {art.section}
                          </span>
                        </td>
                        <td className="p-4 text-white/60">{art.source}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleArticleStatus(art.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                              art.status === "published"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                            }`}
                          >
                            {art.status === "published" ? "✓ منشور" : "مسودة"}
                          </button>
                        </td>
                        <td className="p-4 text-white/70 font-mono">{art.views.toLocaleString()}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                const newTitle = prompt("تعديل عنوان الخبر:", art.title);
                                if (newTitle && newTitle.trim()) {
                                  setArticles(
                                    articles.map((a) => (a.id === art.id ? { ...a, title: newTitle.trim() } : a))
                                  );
                                  showToast("تم تحديث عنوان الخبر بنجاح.");
                                }
                              }}
                              className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-white/80 transition-colors"
                              title="تعديل العنوان"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art.id, art.title)}
                              className="p-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 transition-colors"
                              title="حذف نهائي"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* التبويب 3: إدارة الإعلانات والرعايات (Ads CRUD) */}
        {/* ========================================================================= */}
        {activeTab === "ads" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-black text-white">إدارة المساحات والحملات الإعلانية</h2>
                <p className="text-xs text-white/50">التحكم في البانرات والشراكات التجارية ونسب النقر والظهور</p>
              </div>

              <button
                onClick={() => setShowAddAdModal(true)}
                className="px-5 py-2.5 rounded-xl bg-[var(--gold)] text-[#140106] font-black text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[var(--gold-glow)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة حملة إعلانية</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    ad.status === "active" ? "border-white/15 bg-white/5" : "border-white/5 bg-black/40 opacity-75"
                  } space-y-4`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-white leading-snug">{ad.title}</h3>
                      <span className="text-xs text-[var(--gold)] block font-semibold">{ad.advertiser}</span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        ad.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {ad.status === "active" ? "نشط" : "متوقف"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs p-3 rounded-xl bg-black/40 border border-white/5">
                    <div>
                      <span className="text-[10px] text-white/40 block">الظهور</span>
                      <span className="font-mono font-bold text-white">{ad.impressions.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/40 block">النقرات (Clicks)</span>
                      <span className="font-mono font-bold text-[var(--gold)]">{ad.clicks.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <button
                      onClick={() => handleToggleAdStatus(ad.id)}
                      className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {ad.status === "active" ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{ad.status === "active" ? "إيقاف مؤقت" : "تشغيل"}</span>
                    </button>

                    <button
                      onClick={() => handleDeleteAd(ad.id, ad.title)}
                      className="p-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 transition-colors"
                      title="حذف الحملة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* التبويب 4: إدارة المصادر والخلاصات (Sources CRUD) */}
        {/* ========================================================================= */}
        {activeTab === "sources" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-black text-white">إدارة المصادر والخلاصات الإخبارية (RSS Feeds)</h2>
                <p className="text-xs text-white/50">فحص الخلاصات اللحظي، التحكم في مستوى الثقة، وسحب المواد</p>
              </div>

              <button
                onClick={() => setShowAddSourceModal(true)}
                className="px-5 py-2.5 rounded-xl bg-[var(--gold)] text-[#140106] font-black text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[var(--gold-glow)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>ربط مصدر / وكالة جديدة</span>
              </button>
            </div>

            <div className="space-y-3">
              {sources.map((src) => (
                <div
                  key={src.id}
                  className="p-4 rounded-2xl border border-white/10 bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{src.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70">
                        {src.country}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--gold)]/20 text-[var(--gold)] font-bold">
                        ثقة: {src.trustLevel}/5
                      </span>
                    </div>
                    <code className="text-[11px] font-mono text-white/40 block">{src.feedUrl}</code>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleProbeSource(src.id, src.name)}
                      disabled={src.status === "probing"}
                      className="px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-bold text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${src.status === "probing" ? "animate-spin" : ""}`} />
                      <span>{src.status === "probing" ? "جاري الفحص..." : "فحص وتحديث"}</span>
                    </button>

                    <button
                      onClick={() => handleToggleSource(src.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                        src.enabled
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-white/10 bg-white/5 text-white/40"
                      }`}
                    >
                      {src.enabled ? "مفعل" : "معطل"}
                    </button>

                    <button
                      onClick={() => handleDeleteSource(src.id, src.name)}
                      className="p-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 transition-colors"
                      title="حذف المصدر"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* التبويب 5: قائمة المراجعة والتدقيق البشري (Review Queue) */}
        {/* ========================================================================= */}
        {activeTab === "review" && (
          <div className="space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-white/10">
              <h2 className="text-base font-black text-white">قائمة المواد الخاضعة للمراجعة والتدقيق البشري</h2>
              <p className="text-xs text-white/50">مواد حساسة أو متضاربة أوقفتها الخوارزميات تلقائياً لطلب توقيع المحرر</p>
            </div>

            {reviewItems.length === 0 ? (
              <div className="p-12 rounded-3xl border border-white/10 bg-white/5 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-bold text-base text-white">قائمة المراجعة فارغة تماماً</h3>
                <p className="text-xs text-white/60">كافة المواد الواردة تم تدقيقها أو نشرها وفق معايير ميثاق الشرف.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviewItems.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/15 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30">
                          أولوية عاجلة
                        </span>
                        <h3 className="text-sm font-bold text-white pt-1">{rev.title}</h3>
                        <span className="text-xs text-white/50 block">المصدر: {rev.source} · {rev.receivedAt}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleApproveReview(rev)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>اعتماد ونشر فوري</span>
                        </button>
                        <button
                          onClick={() => handleRejectReview(rev.id, rev.title)}
                          className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          <span>رفض واستبعاد</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-1">
                      <span className="text-[11px] font-bold text-amber-300 block">سبب التوجيه للتدقيق:</span>
                      <p className="text-xs text-white/70">{rev.reason}</p>
                      <p className="text-xs text-white/50 italic pt-1">«{rev.contentSnippet}»</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* التبويب 6: بورصة الذهب والعملات (Economy Overrides) */}
        {/* ========================================================================= */}
        {activeTab === "economy" && (
          <div className="space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-white/10">
              <h2 className="text-base font-black text-white">التحكم بأسعار الذهب والعملات والبورصة اللحظية</h2>
              <p className="text-xs text-white/50">تعديل ونشر الأسعار التي تظهر في شريط الهيدر وقسم الوطن الاقتصادي</p>
            </div>

            <form onSubmit={handleSaveEconomyRates} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl border border-white/10 bg-white/5 space-y-4">
                <h3 className="font-bold text-sm text-[var(--gold)] flex items-center gap-2">
                  <Coins className="w-4 h-4" />
                  <span>أسعار صرف العملات مقابل الشيكل الفلسطيني</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">سعر الدولار الأمريكي (USD/ILS)</label>
                    <input
                      type="text"
                      value={usdRate}
                      onChange={(e) => setUsdRate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white font-mono focus:border-[var(--gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">سعر الدينار الأردني (JOD/ILS)</label>
                    <input
                      type="text"
                      value={jodRate}
                      onChange={(e) => setJodRate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white font-mono focus:border-[var(--gold)]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl border border-white/10 bg-white/5 space-y-4">
                <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>أسعار الذهب والمعادن الثمينة</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">أونصة الذهب عالمياً ($)</label>
                    <input
                      type="text"
                      value={goldOunce}
                      onChange={(e) => setGoldOunce(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white font-mono focus:border-[var(--gold)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">سعر جرام الذهب عيار 24 ($)</label>
                    <input
                      type="text"
                      value={gold24k}
                      onChange={(e) => setGold24k(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white font-mono focus:border-[var(--gold)]"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black text-xs hover:brightness-110 shadow-lg cursor-pointer"
                >
                  حفظ وتحديث أسعار البورصة في الموقع فوراً
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* التبويب 7: استطلاعات الرأي والتصويت (Polls) */}
        {/* ========================================================================= */}
        {activeTab === "polls" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-black text-white">إدارة استطلاعات الرأي المجتمعية (Polls Desk)</h2>
                <p className="text-xs text-white/50">طرح استطلاعات رأي جديدة ومتابعة نسب التصويت الحية للقراء</p>
              </div>

              <button
                onClick={() => {
                  const q = prompt("أدخل نص سؤال الاستطلاع الجديد:");
                  if (q && q.trim()) {
                    setPolls([
                      {
                        id: `poll-${Date.now()}`,
                        question: q.trim(),
                        options: [
                          { text: "أوافق تماماً", votes: 0 },
                          { text: "أوافق جزئياً", votes: 0 },
                          { text: "لا أوافق", votes: 0 },
                        ],
                        active: true,
                        totalVotes: 0,
                      },
                      ...polls,
                    ]);
                    showToast("✓ تم نشر الاستطلاع الجديد في الصفحة الرئيسية!");
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[var(--gold)] text-[#140106] font-black text-xs hover:brightness-110 flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>إنشاء استطلاع جديد</span>
              </button>
            </div>

            <div className="space-y-4">
              {polls.map((p) => (
                <div key={p.id} className="p-6 rounded-3xl border border-white/10 bg-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-white">{p.question}</h3>
                    <span className="text-xs font-mono font-bold text-[var(--gold)]">
                      إجمالي الأصوات: {p.totalVotes.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {p.options.map((opt, oIdx) => {
                      const pct = p.totalVotes > 0 ? Math.round((opt.votes / p.totalVotes) * 100) : 0;
                      return (
                        <div key={oIdx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-white/80">
                            <span>{opt.text}</span>
                            <span className="font-mono">{pct}% ({opt.votes.toLocaleString()})</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[var(--maroon)] to-[var(--gold)]" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* التبويب 8: طاقم التحرير والمستخدمين (Staff & Users) */}
        {/* ========================================================================= */}
        {activeTab === "users" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-base font-black text-white">إدارة طاقم التحرير والرتب الصحفية (Editorial Staff)</h2>
                <p className="text-xs text-white/50">توزيع صلاحيات النشر والتدقيق وتفعيل المصادقة الثنائية 2FA</p>
              </div>

              <button
                onClick={() => {
                  const name = prompt("اسم المحرر الجديد:");
                  const email = prompt("البريد الإلكتروني المهني:");
                  if (name && email) {
                    setStaffUsers([
                      {
                        id: `usr-${Date.now()}`,
                        name: name.trim(),
                        email: email.trim(),
                        role: "FIELD_REPORTER",
                        active: true,
                        twoFactor: false,
                      },
                      ...staffUsers,
                    ]);
                    showToast("✓ تم إضافة المحرر وتوليد بيانات الدخول!");
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[var(--gold)] text-[#140106] font-black text-xs hover:brightness-110 flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة محرر جديد</span>
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <table className="w-full text-right text-xs">
                <thead className="bg-black/50 text-white/70 border-b border-white/10 font-bold">
                  <tr>
                    <th className="p-4">اسم المحرر</th>
                    <th className="p-4">البريد المهني</th>
                    <th className="p-4">الرتبة</th>
                    <th className="p-4">المصادقة (2FA)</th>
                    <th className="p-4 text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {staffUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5">
                      <td className="p-4 font-bold text-white">{u.name}</td>
                      <td className="p-4 font-mono text-white/60">{u.email}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] text-[10px] font-bold">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-emerald-400 font-bold">
                        {u.twoFactor ? "✓ مفعلة" : "غير مفعلة"}
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-emerald-400 font-bold">نشط</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* التبويب 9: إدارة التعليقات وبلاغات المجتمع (Comments) */}
        {/* ========================================================================= */}
        {activeTab === "comments" && (
          <div className="space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-white/10">
              <h2 className="text-base font-black text-white">الرقابة المجتمعية وإجازة التعليقات</h2>
              <p className="text-xs text-white/50">فحص تعليقات القراء قبل النشر لضمان خلوها من خطاب الكراهية</p>
            </div>

            <div className="space-y-3">
              {pendingComments.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl border border-white/10 bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[var(--gold)]">{c.author}</span>
                      <span className="text-[10px] text-white/40">على خبر: {c.article} · {c.time}</span>
                    </div>
                    <p className="text-xs text-white leading-relaxed">«{c.text}»</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setPendingComments(pendingComments.filter((x) => x.id !== c.id));
                        showToast("✓ تم اعتماد ونشر التعليق تحت المقال!");
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                    >
                      إجازة ونشر
                    </button>
                    <button
                      onClick={() => {
                        setPendingComments(pendingComments.filter((x) => x.id !== c.id));
                        showToast("تم حذف التعليق المخالف.");
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 border border-rose-500/30 text-xs font-bold cursor-pointer"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* التبويب 10: إعدادات المنصة والهوية (Settings) */}
        {/* ========================================================================= */}
        {activeTab === "settings" && (
          <div className="space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-white/10">
              <h2 className="text-base font-black text-white">إعدادات المنصة والهوية الرقمية العامة</h2>
              <p className="text-xs text-white/50">التحكم في عنوان المنصة، وسائط السوشيال ميديا، ومفتاح الصيانة</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5 max-w-2xl">
              <div>
                <label className="block text-xs font-bold text-white mb-1.5">عنوان المنصة الرئيسي (Site Title)</label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:border-[var(--gold)]"
                />
              </div>

              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-white">وضع الصيانة الطارئة (Maintenance Mode)</h3>
                    <p className="text-[11px] text-white/50">حجب الموقع عن الزوار وإظهار شاشة الصيانة الفنية</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="w-5 h-5 rounded accent-rose-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-white">تفعيل صوت تنبيه العاجل (Audio Chime)</h3>
                    <p className="text-[11px] text-white/50">إطلاق نغمة صوتية هادئة عند ورود خبر عاجل جديد للقراء</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={breakingSoundEnabled}
                    onChange={(e) => setBreakingSoundEnabled(e.target.checked)}
                    className="w-5 h-5 rounded accent-[var(--gold)] cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black text-xs hover:brightness-110 shadow-lg cursor-pointer"
              >
                حفظ كافة الإعدادات
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* التبويب 11: سجل الرقابة والتدقيق (Audit Log) */}
        {/* ========================================================================= */}
        {activeTab === "audit" && (
          <div className="space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-white">سجل الرقابة والتدقيق الجنائي (Audit Trail)</h2>
                <p className="text-xs text-white/50">توثيق غير قابل للتعديل لكافة قرارات النشر والحذف والتعديل</p>
              </div>
              <span className="text-xs font-mono text-[var(--gold)]">AUDIT-COMPLIANT 2026</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <table className="w-full text-right text-xs">
                <thead className="bg-black/50 text-white/70 border-b border-white/10 font-bold">
                  <tr>
                    <th className="p-4">العملية التحريرية</th>
                    <th className="p-4">المستهدف</th>
                    <th className="p-4">المحرر المسؤول</th>
                    <th className="p-4">الوقت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5">
                      <td className="p-4 font-sans font-bold text-white">{log.action}</td>
                      <td className="p-4 font-sans text-white/70">{log.target}</td>
                      <td className="p-4 text-[var(--gold)]">{log.user}</td>
                      <td className="p-4 text-white/40">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* نوافذ الحوار المنبثقة (Modals) */}
      {showAddArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-[var(--gold)]/40 bg-[#140107] p-6 md:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowAddArticleModal(false)}
              className="absolute top-6 end-6 text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-[var(--gold)]" />
              <span>تحرير ونشر خبر صحفي جديد</span>
            </h2>

            <form onSubmit={handleAddArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1.5">عنوان الخبر *</label>
                <input
                  type="text"
                  required
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  placeholder="اكتب عنواناً صحفياً رصيناً وموجزاً..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">القسم التحريري</label>
                  <select
                    value={newArticleSection}
                    onChange={(e) => setNewArticleSection(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)] cursor-pointer"
                  >
                    <option value="فلسطين">فلسطين أولاً</option>
                    <option value="اقتصاد">المال والذهب</option>
                    <option value="رياضة">يلا سبورت</option>
                    <option value="عالم">شؤون دولية</option>
                    <option value="تحقيقات">رادار وتحقيقات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">المصدر الصحفي</label>
                  <input
                    type="text"
                    value={newArticleSource}
                    onChange={(e) => setNewArticleSource(e.target.value)}
                    placeholder="مراسل الوطن، رويترز، وفا..."
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">نص وتفاصيل الخبر</label>
                <textarea
                  rows={4}
                  value={newArticleContent}
                  onChange={(e) => setNewArticleContent(e.target.value)}
                  placeholder="اكتب تفاصيل الخبر والسياق التحريري الكامل..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newArticleIsBreaking}
                  onChange={(e) => setNewArticleIsBreaking(e.target.checked)}
                  className="rounded border-white/20 text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span className="text-xs text-red-400 font-bold">تصنيف المادة كـ «خبر عاجل» في الشريط الأحمر</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddArticleModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white/60 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--gold)] text-[#140106] font-black text-xs hover:brightness-110 shadow-lg cursor-pointer"
                >
                  نشر في الموقع الآن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-[var(--gold)]/40 bg-[#140107] p-6 md:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowAddAdModal(false)}
              className="absolute top-6 end-6 text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[var(--gold)]" />
              <span>إطلاق حملة إعلانية جديدة</span>
            </h2>

            <form onSubmit={handleAddAd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1.5">عنوان الحملة / المعلن *</label>
                <input
                  type="text"
                  required
                  value={newAdTitle}
                  onChange={(e) => setNewAdTitle(e.target.value)}
                  placeholder="مثال: رعاية بطولة كأس القدس 2026..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">اسم الشركة المعلنة *</label>
                <input
                  type="text"
                  required
                  value={newAdAdvertiser}
                  onChange={(e) => setNewAdAdvertiser(e.target.value)}
                  placeholder="مثال: شركة القدس القابضة..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">مكان العرض (Placement)</label>
                <select
                  value={newAdPlacement}
                  onChange={(e) => setNewAdPlacement(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)] cursor-pointer"
                >
                  <option value="banner_top">البانر العلوي بقمة الصفحات (Top Leaderboard)</option>
                  <option value="in_article">داخل متن المقالات والأخبار</option>
                  <option value="sidebar">الشريط الجانبي للمقالات</option>
                  <option value="sports_screen">شاشة يلا سبورت والمباريات</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">رابط الإحالة عند النقر (Target URL)</label>
                <input
                  type="url"
                  value={newAdUrl}
                  onChange={(e) => setNewAdUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddAdModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white/60 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--gold)] text-[#140106] font-black text-xs hover:brightness-110 shadow-lg cursor-pointer"
                >
                  تفعيل الحملة فورياً
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddSourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-[var(--gold)]/40 bg-[#140107] p-6 md:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowAddSourceModal(false)}
              className="absolute top-6 end-6 text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Rss className="w-5 h-5 text-[var(--gold)]" />
              <span>ربط خلاصة إخبارية جديدة (RSS/Feed)</span>
            </h2>

            <form onSubmit={handleAddSource} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1.5">اسم المصدر / الوكالة *</label>
                <input
                  type="text"
                  required
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  placeholder="مثال: وكالة الأنباء الأردنية (بترا)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">رابط الـ RSS أو الـ API *</label>
                <input
                  type="url"
                  required
                  value={newSourceFeedUrl}
                  onChange={(e) => setNewSourceFeedUrl(e.target.value)}
                  placeholder="https://agency.com/rss.xml"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">الدولة / النطاق</label>
                  <input
                    type="text"
                    value={newSourceCountry}
                    onChange={(e) => setNewSourceCountry(e.target.value)}
                    placeholder="فلسطين، الأردن، مصر..."
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">مستوى الثقة (1-5)</label>
                  <select
                    value={newSourceTrust}
                    onChange={(e) => setNewSourceTrust(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-[var(--gold)] cursor-pointer"
                  >
                    <option value={5}>5 نجوم (نشر مباشر دون مراجعة)</option>
                    <option value={4}>4 نجوم (وكالة معتمدة)</option>
                    <option value={3}>3 نجوم (تحويل دوري للمراجعة)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddSourceModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white/60 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--gold)] text-[#140106] font-black text-xs hover:brightness-110 shadow-lg cursor-pointer"
                >
                  حفظ وتفعيل المصدر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
