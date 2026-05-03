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
import WhatIsBiotope from "@/components/what-is-biotope";

export default function HomePage() {
  return (
    <main className="bg-background overflow-hidden">
      <Header />
      <HeroSection />
      <WhatIsBiotope />
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
