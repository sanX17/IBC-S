"use client";

import AboutIBC from "@/components/about-ibc";
import ContactUs from "@/components/contact-us";
import EventPartners from "@/components/event-partners";
import Footer from "@/components/footer";
import Header from "@/components/header";
import WhatIsBiotope from "@/components/what-is-biotope";
import HeroSection from "@/components/hero-section";
import MeetJudges from "@/components/meet-judges";
import Objectives from "@/components/objectives";
import Organizers from "@/components/organizers";
import Prizes from "@/components/prizes";
import RulesGuidelines from "@/components/rules-guidelines";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WhatIsBiotope />
        <Objectives />
        <AboutIBC />
        <MeetJudges />
        <Prizes />
        <RulesGuidelines />
        <EventPartners />
        <Organizers />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
