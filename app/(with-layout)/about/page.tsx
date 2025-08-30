import Photo from "@/components/photo";
import LinkPrimitive from "@/components/link-primitive";
import { beliefs, bucketList, Status } from "@/content";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { cva } from "class-variance-authority";
import Link from "next/link";
import type { Metadata } from "next/types";
import Section from "@/components/section";
import Gallery from "@/components/gallery";

export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: "https://spinpah.vercel.app/about",
  },
};

const bucketItem = cva(["self-start"], {
  variants: {
    status: {
      none: "",
      completed: ["line-through", "text-gray-11"],
      progress: [
        "before:content-['']",
        "before:w-1",
        "before:h-1",
        "before:bg-accent",
        "before:inline-flex",
        "before:-mt-px",
        "before:rounded-full",
        "before:animate-pulse",
        "before:mr-1",
        "flex",
        "items-center",
      ],
    },
  },
});

const BucketItem = ({
  item,
  status,
}: {
  item: string;
  status: keyof typeof Status;
}) => {
  return <li className={bucketItem({ status: Status[status] })}>{item}</li>;
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
        <div className="my-1 md:my-4 lg:hidden">
          <Gallery
            photos={[
              {
                src: "/images/me-1.jpg",
                alt: "Photo of myself",
              }
              
            ]}
          />
        </div>
        <Section heading="Software Engineer">
  <div className="space-y-4">
    <p>
      Hey, my name is Aimen and welcome to my website. I'm a{" "}
      <LinkPrimitive href="">
        Software Engineer
      </LinkPrimitive>{" "}
      based in Algeria, specializing in designing and building modern applications.
    </p>
    <p>
      My passion for software development started with a curiosity about how 
      applications are built and optimized to provide great user experiences. 
      I believe in the power of technology to create impactful solutions that 
      improve everyday life.
    </p>
    <p>
      Having completed my Master's in Information Systems Security at Université
      Houari Boumediene, I now focus on practical applications of software engineering, 
      from full-stack web and mobile development to API design and cloud integration.
    </p>
    <p>
      I'm committed to continuous learning and contributing to the developer 
      community through open-source projects, research, and knowledge sharing.
    </p>
  </div>
</Section>

        <Section heading="Beliefs">
          <ul className="flex flex-col gap-y-1">
            {beliefs.map((belief) => {
              return <li key={belief}>{belief}</li>;
            })}
          </ul>
        </Section>
        <Section heading="Bucket List">
          <ul className="flex flex-col gap-y-1">
            {bucketList.map((item) => {
              return (
                <BucketItem
                  key={item.item}
                  item={item.item}
                  status={item.status}
                />
              );
            })}
          </ul>
        </Section>
      </div>
      <div className="hidden px-1 my-4 mt-10 lg:flex gap-x-2 md:px-4">
        <Photo
          src={"/images/me-1.jpg"}
          alt="A photo of myself"
          priority
        />
       
      </div>
    </div>
  );
};

export default About;
