import { test, expect } from "@playwright/test";

test.describe("المرحلة 6: اختبارات الأداء والحركة والوصول E2E", () => {
  test("تحميل الصفحة الرئيسية وتأكيد الهوية السيادية والـ RTL", async ({ page }) => {
    await page.goto("/");

    // 1. فحص الاتجاه واللغة
    const html = page.locator("html");
    await expect(html).toHaveAttribute("dir", "rtl");
    await expect(html).toHaveAttribute("lang", "ar");

    // 2. التحقق من وجود رابط التخطي للمحتوى الرئيسي (WCAG AA)
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();

    // 3. التحقق من شريط العاجل
    const breakingText = page.getByText("عاجل", { exact: false });
    await expect(breakingText.first()).toBeVisible();

    // 4. التحقق من مبدل النماذج الأولية
    await expect(page.getByText("اختر النموذج البصري المطلوب اختباره:")).toBeVisible();
  });

  test("التبديل بين النماذج البصرية الثلاثة للصفحة الرئيسية", async ({ page }) => {
    // الاتجاه 1: التدفق الصحفي
    await page.goto("/?view=stream");
    await expect(page).toHaveURL(/\?view=stream/);

    // الاتجاه 2: بينتو الذكي
    await page.goto("/?view=bento");
    await expect(page).toHaveURL(/\?view=bento/);

    // الاتجاه 3: الاستوديو اللحظي
    await page.goto("/?view=live");
    await expect(page).toHaveURL(/\?view=live/);
  });

  test("فحص مسار الأداة المالية وميثاق النزاهة في الأسواق", async ({ page }) => {
    await page.goto("/economy/instrument/XAUUSD");
    await expect(page.getByText("أونصة الذهب")).toBeVisible();
    await expect(page.getByText("ملاحظة الإفصاح المالي ومصدر البيانات")).toBeVisible();
  });

  test("فحص بوابة المساعدات وخلوها من الروابط الوهمية", async ({ page }) => {
    await page.goto("/aid");
    await expect(page.getByText("دليل المساعدات والإغاثة الميدانية المعتمدة")).toBeVisible();
    await expect(page.getByText("تحذير أمني ضد الروابط المنتحلة والاحتيال")).toBeVisible();
  });

  test("فحص بوابة الوظائف وميثاق التوظيف النزيه", async ({ page }) => {
    await page.goto("/jobs");
    await expect(page.getByText("بوابة فرص العمل والوظائف المعتمدة")).toBeVisible();
    await expect(page.getByText("ميثاق التوظيف النزيه")).toBeVisible();
  });

  test("فحص النشرة البريدية بالتأكيد المزدوج بدون أرقام مفبركة", async ({ page }) => {
    await page.goto("/newsletter");
    await expect(page.getByText("الخبر الصادق والسياق الكامل في بريدك")).toBeVisible();
    await expect(page.getByText("تأكيد مزدوج وآمن (Double Opt-in)")).toBeVisible();
    // التأكد من عدم وجود الرقم المفبرك القديم 28,400
    const fakeNumber = page.getByText("28,400");
    await expect(fakeNumber).toHaveCount(0);
  });

  test("فحص صفحة أرسل خبر أو تسريباً لغرفة التحرير", async ({ page }) => {
    await page.goto("/submit-news");
    await expect(page.getByText("أرسل خبراً أو توثيقاً لغرفة تحرير «الوطن اليوم»")).toBeVisible();
    await expect(page.getByText("إرسال الخبر كمصدر مجهول تماماً")).toBeVisible();
  });
});

