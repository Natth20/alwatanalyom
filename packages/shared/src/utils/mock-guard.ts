/**
 * حارس النزاهة وحجب بيانات العرض التجريبي (Mock Guard)
 * يضمن تطبيق القاعدة 6 من القسم 2:
 * "بيانات العرض التجريبي تعمل فقط في بيئة التطوير، ومحجوبة تماماً في الإنتاج بآلية برمجية مع اختبار يفشل إن ظهرت"
 */

export function isMockDataAllowed(): boolean {
  // محجوبة تماماً في بيئة الإنتاج بدون أي استثناء
  if (process.env.NODE_ENV === "production") {
    return false;
  }

  // في غير الإنتاج: تشترط وجود راية بيئية صريحة
  return process.env["ENABLE_MOCK_DATA"] === "true";
}

/**
 * دالة حماية صارمة: ترمي خطأ فوري إن حُووِل استدعاء بيانات تجريبية في الإنتاج
 */
export function assertNoMockInProduction(context: string): void {
  if (process.env.NODE_ENV === "production") {
    throw new Error(`[INTEGRITY_VIOLATION] محاولة تسريب بيانات تجريبية (Mock) في الإنتاج ضمن: ${context}`);
  }
}

