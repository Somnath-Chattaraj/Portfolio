import { profile } from "@/data/portfolio";
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${profile.site}/sitemap.xml`,
  };
}
