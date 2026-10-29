/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      {
        source: "/resume.pdf",
        destination:
          "https://drive.google.com/file/d/1Y0cYe2Wn00wkJPzraxF0t-fhAatGkaKd/view",
        permanent: false,
      },
    ];
  },
};
export default nextConfig;
