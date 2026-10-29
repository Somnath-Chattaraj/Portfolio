import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Footer from "@/components/Footer";
import styles from "@/components/Portfolio.module.css";
export default function Home() {
  return (
    <div id="top" className={styles.shell}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <About />
      </main>
      <Footer />
    </div>
  );
}
