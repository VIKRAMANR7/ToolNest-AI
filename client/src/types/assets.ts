import { LucideIcon } from "lucide-react";

export interface Assets {
  logo: string;
  user_group: string;
  star_icon: string;
  star_dull_icon: string;
}

export interface AiTool {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  bg: {
    from: string;
    to: string;
  };
  path: string;
  premium?: boolean;
}

export interface Testimonial {
  id: number;
  image: string;
  name: string;
  title: string;
  content: string;
  rating: number;
}
