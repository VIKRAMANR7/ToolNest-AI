import { LucideIcon } from "lucide-react";

export interface SocialLink {
  Icon: LucideIcon;
  url: string;
  label: string;
}

export interface CompanyLink {
  label: string;
  to: string;
}

export interface FooterLinks {
  social: SocialLink[];
  company: CompanyLink[];
}

export interface NavItem {
  to: string;
  label: string;
  Icon: LucideIcon;
  end?: boolean;
  premium?: boolean;
}
