import { AIOutput, AIOutputSchema } from "@awt/shared";
import { buildClassificationPrompt } from "./prompts/classify";

export interface AIClientOptions {
  apiKey?: string;
  dailyBudgetUsd?: number;
}

export class AIClient {
  private apiKey: string;
  private provider: "gemini" | "claude" | "mock";

  constructor(options?: AIClientOptions) {
    const geminiKey = process.env["GEMINI_API_KEY"] || process.env["GOOGLE_AI_KEY"] || "";
    const anthropicKey = process.env["ANTHROPIC_API_KEY"] || "";
    
    if (options?.apiKey) {
      this.apiKey = options.apiKey;
      this.provider = options.apiKey.startsWith("sk-ant") ? "claude" : "gemini";
    } else if (geminiKey) {
      this.apiKey = geminiKey;
      this.provider = "gemini";
    } else if (anthropicKey && !anthropicKey.startsWith("sk-ant-api...")) {
      this.apiKey = anthropicKey;
      this.provider = "claude";
    } else {
      this.apiKey = "";
      this.provider = "mock";
    }
  }

  /**
   * تصنيف وترجمة وتلخيص الخبر
   */
  async classifyAndTranslate(title: string, summary?: string, lang = "ar"): Promise<AIOutput> {
    const prompt = buildClassificationPrompt(title, summary, lang);

    if (this.provider === "mock" || !this.apiKey) {
      return this.mockClassify(title, summary, lang);
    }

    try {
      let text = "";

      if (this.provider === "gemini") {
        // الاتصال بنموذج Google Gemini Flash
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.1,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as any;
        text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } else {
        // الاتصال بـ Anthropic Claude API
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this.apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-5-haiku-latest",
            max_tokens: 1000,
            temperature: 0.1,
            messages: [{ role: "user", content: prompt }],
          }),
        });

        if (!response.ok) {
          throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
        }

        const data = (await response.json()) as any;
        text = data.content?.[0]?.text || "";
      }

      // استخراج JSON من الرد
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("لم يتم العثور على كائن JSON صالح في رد النموذج");
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return AIOutputSchema.parse(parsed);
    } catch (err) {
      console.warn("⚠️ AI API call failed, falling back to heuristic parsing:", err);
      return this.mockClassify(title, summary, lang);
    }
  }

  private mockClassify(title: string, summary?: string, _lang = "ar"): AIOutput {
    // تصنيف تجريبي تلقائي بناءً على الكلمات المفتاحية
    const lower = `${title} ${summary || ""}`.toLowerCase();
    let section = "world";
    const countryCodes: string[] = [];

    if (lower.includes("غزة") || lower.includes("فلسطين") || lower.includes("القدس") || lower.includes("الضفة")) {
      section = "palestine";
      countryCodes.push("PS");
    } else if (lower.includes("مصر") || lower.includes("السعودية") || lower.includes("الأردن") || lower.includes("لبنان") || lower.includes("سوريا")) {
      section = "arab-world";
    } else if (lower.includes("دولار") || lower.includes("ذهب") || lower.includes("نفط") || lower.includes("اقتصاد") || lower.includes("تضخم")) {
      section = "economy";
    } else if (lower.includes("ذكاء اصطناعي") || lower.includes("هاتف") || lower.includes("تقنية") || lower.includes("أبل") || lower.includes("جوجل")) {
      section = "tech";
    } else if (lower.includes("مباراة") || lower.includes("دوري") || lower.includes("ريال مدريد") || lower.includes("برشلونة") || lower.includes("كرة")) {
      section = "sports";
    }

    const isBreaking = title.startsWith("عاجل") || title.includes("عاجل:");
    const cleanTitle = title.replace(/^(عاجل|هام)\s*[:：\-–—]\s*/gi, "").trim();

    return {
      titleAr: cleanTitle,
      summaryAr: summary ? summary.slice(0, 300) : "متابعة إخبارية وتفاصيل أوفى لاحقاً من غرفة الأخبار.",
      sectionSlug: section,
      countryCodes,
      entities: [],
      kind: isBreaking ? "BREAKING" : "NEWS",
      isBreaking,
      importance: isBreaking ? 90 : 50,
      sensitivity: lower.includes("شهيد") || lower.includes("قتيل") || lower.includes("ضحايا") ? ["casualties"] : [],
      alsoIn: [],
      confidence: 0.9,
    };
  }
}

