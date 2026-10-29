import { prisma } from "@awt/db";
import { MockQuoteProvider, QuoteProvider } from "@awt/ingest";

const provider: QuoteProvider = new MockQuoteProvider();

export async function processPricePoll() {
  const instruments = await prisma.instrument.findMany({
    where: { enabled: true },
  });

  if (instruments.length === 0) return;

  const symbols = instruments.map((i) => i.symbol);
  const rawQuotes = await provider.fetchQuotes(symbols);

  const now = Date.now();

  for (const raw of rawQuotes) {
    const inst = instruments.find((i) => i.symbol === raw.symbol);
    if (!inst) continue;

    let finalStatus = raw.status;

    // فحص التقادم (Staleness Logic):
    // إذا كان وقت السعر أقدم من 30 دقيقة يتحول إلى متأخر DELAYED
    // وإذا تجاوز 6 ساعات يتحول إلى غير متاح UNAVAILABLE
    if (raw.asOf) {
      const ageMs = now - raw.asOf.getTime();
      if (ageMs > 6 * 60 * 60 * 1000) {
        finalStatus = "UNAVAILABLE";
      } else if (ageMs > 30 * 60 * 1000) {
        finalStatus = "DELAYED";
      }
    }

    if (raw.price !== null) {
      await prisma.quote.create({
        data: {
          instrumentId: inst.id,
          price: raw.price,
          change: raw.change || null,
          changePct: raw.changePct || null,
          status: finalStatus as any,
          asOf: raw.asOf || new Date(),
        },
      });
    }
  }

  console.log(`📈 Polled prices for ${rawQuotes.length} instruments successfully.`);
}
