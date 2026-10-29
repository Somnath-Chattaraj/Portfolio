import { profile } from "@/data/portfolio";
export default function sitemap() {
  return [{ url: profile.site, changeFrequency: "monthly", priority: 1 }];
}
