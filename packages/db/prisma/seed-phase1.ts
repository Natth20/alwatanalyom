import { prisma } from "../src/index";
import { SITE_SECTIONS, LEGACY_CATEGORY_REDIRECT_MAP } from "@awt/shared";

async function main() {
  console.log("🌱 بدء تحديث أقسام المنصة ونظام التحويلات للمرحلة 1...");

  // 1. تحديث الأقسام في قاعدة البيانات
  for (const sec of SITE_SECTIONS) {
    await prisma.section.upsert({
      where: { slug: sec.slug },
      update: {
        nameAr: sec.nameAr,
        nameEn: sec.nameEn,
        sortOrder: sec.order,
        showInNav: sec.showInNav,
      },
      create: {
        slug: sec.slug,
        nameAr: sec.nameAr,
        nameEn: sec.nameEn,
        sortOrder: sec.order,
        showInNav: sec.showInNav,
      },
    });
    console.log(`✅ قسم تم تحديثه: ${sec.nameAr} (${sec.slug})`);
  }

  // 2. إدخال تحويلات التصنيفات القديمة الدائمة (301 Redirects)
  for (const [legacySlug, newPath] of Object.entries(LEGACY_CATEGORY_REDIRECT_MAP)) {
    const legacyPath = `/category/${encodeURIComponent(legacySlug)}/`;
    const legacyPathDecoded = `/category/${legacySlug}/`;

    await prisma.redirect.upsert({
      where: { fromPath: legacyPathDecoded },
      update: { toPath: newPath, statusCode: 301, enabled: true },
      create: {
        fromPath: legacyPathDecoded,
        toPath: newPath,
        statusCode: 301,
        notes: `تحويل تصنيف ووردبريس قديم: ${legacySlug}`,
      },
    });
  }

  const sectionsCount = await prisma.section.count();
  const redirectsCount = await prisma.redirect.count();
  console.log(`🎉 تم بنجاح! إجمالي الأقسام: ${sectionsCount}، إجمالي التحويلات: ${redirectsCount}`);
}

main()
  .catch((e) => {
    console.error("❌ خطأ:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

