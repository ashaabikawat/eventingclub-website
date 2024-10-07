import Artists from "@/components/artist/Artists";
import Categories from "@/components/category/Category";
import TourEvents from "@/components/event tour/EventTour";
import Featuredevents from "@/components/featuredEvents/Featuredevents";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import OnlineEvents from "@/components/onlineEvents/OnlineEvents";
import UpcomingEvents from "@/components/upcomingEvents/UpcomingEvents";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <OnlineEvents />
      <TourEvents />
      <UpcomingEvents />
      <Artists />
      <Featuredevents />
    </>
  );
}
