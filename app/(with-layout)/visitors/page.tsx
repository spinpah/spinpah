
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import Link from "next/link";
import type { Metadata } from "next/types";
import Section from "@/components/section";


export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: "",
  },
};

const About = () => {
  return (
    <div className="justify-between md:flex animate-in fade-in duration-500">
      <div className="md:max-w-[450px] flex flex-col md:gap-y-0 gap-y-6">
        <Link
          href="/"
          className="flex gap-x-1 bg-accent text-gray-12 w-fit rounded-sm pl-0.5 pr-1 py-0.5 leading-none items-center hover:bg-accent/50 transition duration-100 mx-1 md:mx-4"
          aria-label="Back"
        >
          <ArrowLeft size={16} className="shrink-0" />
          <span className="text-sm font-medium">Index</span>
        </Link>
        
        <Section heading="Coming soon ...">
          <div className="space-y-4">
           
          </div>
        </Section>
      </div>
      
    </div>
  );
};

export default About;
