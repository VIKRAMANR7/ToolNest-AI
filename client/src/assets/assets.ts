import {
  Eraser,
  FileText,
  Github,
  Hash,
  House,
  Image,
  Linkedin,
  Mail,
  Scissors,
  SquarePen,
  Twitter,
  Users,
} from "lucide-react";

import type { AiTool, Assets, Testimonial } from "../types/assets";
import type { FooterLinks, NavItem } from "../types/footer";
import logo from "./logo.svg";
import star_dull_icon from "./star_dull_icon.svg";
import star_icon from "./star_icon.svg";
import user_group from "./user_group.png";

export const assets: Assets = {
  logo,
  user_group,
  star_icon,
  star_dull_icon,
};

export const articleLengthOptions = [
  { length: 800, text: "Short (500-800 words)" },
  { length: 1200, text: "Medium (1000-1500 words)" },
  { length: 1600, text: "Long (1500+ words)" },
];

export const AiToolsData: AiTool[] = [
  {
    id: "write-article",
    title: "AI Article Writer",
    description:
      "Generate high-quality, engaging articles on any topic with our AI writing technology.",
    Icon: SquarePen,
    bg: { from: "#3588F2", to: "#0BB0D7" },
    path: "/ai/write-article",
  },
  {
    id: "blog-titles",
    title: "Blog Title Generator",
    description:
      "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
    Icon: Hash,
    bg: { from: "#B153EA", to: "#E549A3" },
    path: "/ai/blog-titles",
  },
  {
    id: "generate-images",
    title: "AI Image Generation",
    description:
      "Create stunning visuals with our AI image generation tool. Experience the power of AI.",
    Icon: Image,
    bg: { from: "#20C363", to: "#11B97E" },
    path: "/ai/generate-images",
    premium: true,
  },
  {
    id: "remove-background",
    title: "Background Removal",
    description: "Effortlessly remove backgrounds from your images with our AI-driven tool.",
    Icon: Eraser,
    bg: { from: "#F76C1C", to: "#F04A3C" },
    path: "/ai/remove-background",
    premium: true,
  },
  {
    id: "remove-object",
    title: "Object Removal",
    description:
      "Remove unwanted objects from your images seamlessly with our AI object removal tool.",
    Icon: Scissors,
    bg: { from: "#5C6AF1", to: "#427DF5" },
    path: "/ai/remove-object",
    premium: true,
  },
  {
    id: "review-resume",
    title: "Resume Reviewer",
    description:
      "Get your resume reviewed by AI to improve your chances of landing your dream job.",
    Icon: FileText,
    bg: { from: "#12B7AC", to: "#08B6CE" },
    path: "/ai/review-resume",
    premium: true,
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&h=200&fit=crop",
    name: "John Doe",
    title: "Growth Strategist, PixelEdge Media",
    content:
      "ToolNest AI has completely streamlined how we generate blog titles and write articles. It's like having a full editorial team in one platform. Our content turnaround is faster and more impactful.",
    rating: 5,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&fit=crop",
    name: "Jane Smith",
    title: "Digital Creator, CreativHive",
    content:
      "Whether it's generating stunning images or removing backgrounds for my content, ToolNest AI saves me hours every week. It's my go-to toolkit for creating professional visuals effortlessly.",
    rating: 5,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop",
    name: "Sarah Johnson",
    title: "Career Coach, ResumeCraft",
    content:
      "The resume review feature in ToolNest AI is a game-changer for my clients. It highlights key improvements instantly and makes crafting standout resumes incredibly easy.",
    rating: 4,
  },
];

export const navItems: NavItem[] = [
  { to: "/ai", label: "Dashboard", Icon: House, end: true },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image, premium: true },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser, premium: true },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors, premium: true },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText, premium: true },
  { to: "/ai/community", label: "Community", Icon: Users },
];

export const footerLinks: FooterLinks = {
  company: [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
    { label: "Privacy Policy", to: "/privacy" },
  ],
  social: [
    { Icon: Twitter, url: "https://twitter.com", label: "Twitter" },
    { Icon: Github, url: "https://github.com", label: "GitHub" },
    { Icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" },
    { Icon: Mail, url: "mailto:hello@toolnestai.com", label: "Email" },
  ],
};
