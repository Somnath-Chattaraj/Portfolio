import React from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";

const AboutDetails = () => {
  return (
    <section className="py-20 w-full">
      <div className="grid grid-cols-12 gap-4 xs:gap-6  md:gap-8 w-full">
        <ItemLayout
          className={
            " col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="  text-xl md:text-2xl text-left w-full capitalize">
            Architect of Enchantment
          </h2>
          <p className="font-light  text-xs sm:text-sm md:text-base   ">
          My journey in web development is driven by a deep passion for crafting digital experiences that resonate. At the heart of my skills lies JavaScript, which I wield with precision to bring ideas to life. Leveraging modern frameworks like React.js and Next.js, I build seamless and responsive platforms that connect users across the web. With the power of Jamstack, I ensure every project is fast, secure, and scalable, while my keen eye for design ensures it is as visually captivating as it is functional. Additionally, I am exploring the exciting world of Web 3.0, delving into blockchain, decentralized technologies, and smart contracts to embrace the future of the internet. As I continue to master new tools and technologies, I remain committed to shaping the future of the web through innovation and creativity.
          </p>
        </ItemLayout>

        

        <ItemLayout
          className={"col-span-full sm:col-span-6 md:col-span-4 !p-0"}
        >
          <img
            className="w-full h-auto"
            src={`https://camo.githubusercontent.com/2759b8f000dff37209fe0bd5d546042e2005e4831adfbaeacbc4d85ab5e3fa02/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170692f746f702d6c616e67732f3f757365726e616d653d536f6d6e6174682d43686174746172616a267468656d653d6461726b26686964655f626f726465723d66616c736526696e636c7564655f616c6c5f636f6d6d6974733d66616c736526636f756e745f707269766174653d66616c7365266c61796f75743d636f6d70616374`}
            alt="Somnath Chattaraj"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-8 !p-0"}>
          <img
            className="w-full h-auto"
            src={`https://camo.githubusercontent.com/94e116e553044a332eba09033e2e383ef50f8a5e6171832d482d2d7661e206e9/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170693f757365726e616d653d536f6d6e6174682d43686174746172616a267468656d653d6461726b26686964655f626f726465723d66616c736526696e636c7564655f616c6c5f636f6d6d6974733d66616c736526636f756e745f707269766174653d66616c7365`}
            alt="Somnath Chattaraj"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full"}>
          <img
            className="w-full h-auto"
            src={`https://skillicons.dev/icons?i=aws,babel,bootstrap,cloudflare,css,docker,figma,firebase,git,github,graphql,html,js,jquery,kubernetes,linux,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,redux,replit,sass,tailwind,vercel,vite,vscode,yarn`}
            alt="Somnath Chattaraj"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <img
            className="w-full h-auto"
            src={`https://camo.githubusercontent.com/d13be5cede70cf7a2a5fc84604029acba8838ab9d7aceec6555fe42f41d83d2a/68747470733a2f2f6769746875622d726561646d652d73747265616b2d73746174732e6865726f6b756170702e636f6d2f3f757365723d536f6d6e6174682d43686174746172616a267468656d653d6461726b26686964655f626f726465723d66616c7365`}
            alt="Somnath Chattaraj"
            loading="lazy"
          />
        </ItemLayout>

        {/* <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <Link
            href="https://github.com/Somnath Chattaraj27/Nextjs-contentlayer-blog"
            target="_blank"
            className="w-full"
          >
            <img
              className="w-full h-auto"
              src={`${process.env.NEXT_PUBLIC_GITHUB_STATS_URL}/api/pin/?username=Somnath Chattaraj27&repo=Nextjs-contentlayer-blog&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false&description_lines_count=2`}
              alt="Somnath Chattaraj"
              loading="lazy"
            />
          </Link>
        </ItemLayout> */}
      </div>
    </section>
  );
};

export default AboutDetails;
