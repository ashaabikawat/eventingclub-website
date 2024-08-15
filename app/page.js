import Artists from "@/components/artist/Artists";
import Categories from "@/components/category/Category";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Artists />
      <Footer />
    </>
  );
}
