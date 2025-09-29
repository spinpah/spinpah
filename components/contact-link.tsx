"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Copy } from "@phosphor-icons/react/dist/ssr/index";

//@ts-ignore
import useSound from "use-sound";
import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher";

export const ContactCopyItem = ({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) => {
  const [play] = useSound("/sounds/copy.mp3");
  const [copied, setCopied] = React.useState(false);
  const handleCopy = (text: string) => {
    play();
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    navigator.clipboard.writeText(text);
    setCopied(true);
  };
  return (
    <button onClick={() => handleCopy(copy)}>
      {copied ? "Copied to clipboard!" : title}
    </button>
  );
};

export const ContactItem = ({
  icon,
  children,
  className,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("group relative text-gray-11 hover:text-gray-1", className)}
    >
      <Slot>{children}</Slot>
      <div
        className="group-hover:opacity-100 opacity-0 absolute -right-4 bottom-[5px] rounded-sm bg-accent shrink-0 block w-3 h-3 text-[black]"
        aria-hidden={true}
      >
        {icon}
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <Section>
      <div className="flex flex-wrap mt-12 md:flex-col md:gap-y-0 gap-y-2 gap-x-6 md:items-end md:mt-0">
        <ContactItem icon={<Copy />}>
          <ContactCopyItem title="Email" copy="aymene16boudjelida@gmail.com" />
        </ContactItem>
      

        <ContactItem icon={<ArrowUpRight />}>
          <a href="https://twitter.com/spinpah" target="_blank">
            Twitter
          </a>
        </ContactItem>
        <ContactItem icon={<ArrowUpRight />}>
          <a href="https://instagram.com/spinpah" target="_blank">
            Instagram
          </a>
        </ContactItem>
        <ContactItem icon={<Copy />}>
          <ContactCopyItem title="Discord" copy="@spinpah" />
        </ContactItem>
        <ContactItem icon={<ArrowUpRight />}>
          <a href="https://github.com/spinpah" target="_blank">
            GitHub
          </a>
        </ContactItem>
        <ContactItem icon={<ArrowUpRight />}>
          <a href="https://drive.google.com/file/d/1gh1p-ekzjdjCEayBVRA5BpMiOiEpNMss/view?usp=sharing" target="_blank">
            CV
          </a>
        </ContactItem>
      </div>
      <div className="md:text-right mt-4">
        <ThemeSwitcher />
      </div>
    </Section>
  );
};

export default Contact;
