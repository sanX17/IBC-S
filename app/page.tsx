import AboutIBC from "@/components/about-ibc";
import ContactUs from "@/components/contact-us";
import EventPartners from "@/components/event-partners";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";
import GiftHampers from "@/components/gift-hamper";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import MeetJudges from "@/components/meet-judges";
import Objectives from "@/components/objectives";
import Organizers from "@/components/organizers";
import Prizes from "@/components/prizes";
import RulesGuidelines from "@/components/rules-guidelines";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-background overflow-hidden">
      <Header />
      <HeroSection />
      <section className="relative w-full overflow-hidden">
        <div className="water-banner relative aspect-[16/7] w-full overflow-hidden">
          <Image
            src="/img1.jpg"
            alt="Underwater biotope landscape"
            fill
            className="water-banner-image object-cover"
            priority={false}
          />
          <div className="water-banner-surface" />
          <div className="water-banner-ripple" />
          <div className="water-banner-caustics" />
          <div className="water-banner-shimmer" />
        </div>
      </section>
      <AboutIBC />
      <Objectives />
      <Gallery />
      <EventPartners />
      <Organizers />
      <MeetJudges />
      <Prizes />
      <GiftHampers />
      <RulesGuidelines />
      {/* <SubmitEntry /> */}
      <ContactUs />
      <Footer />
    </main>
  );
}
