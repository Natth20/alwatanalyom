import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "الوطن اليوم — منصة الأخبار والتحقق",
    short_name: "الوطن اليوم",
    description: "المكان الرئيسي لجميع الأخبار العربية والعالمية بمصادرها الأصلية وسياقها التحريري",
    start_url: "/",
    display: "standalone",
    background_color: "#0F1115",
    theme_color: "#0B5D3B",
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

