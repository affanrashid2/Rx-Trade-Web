import { CachedIcon, CategoryIcon, HourglassFullIcon, ScienceIcon, SpaIcon } from "@/assets";

export const TOKEN_KEY = "@ACCESS_TOKEN";
export const URL = process.env.NEXT_PUBLIC_API_URL;
export const drawerWidth = 240;

export const filteredProducts = [
  {
    icon: CachedIcon,
    title: "Purchase Again",
    value: "purchase-again",
  },
  {
    icon: HourglassFullIcon,
    title: "Top Short Dates",
    value: "top-short-dates",
  },
  {
    icon: CategoryIcon,
    title: "Top OTC`s",
    value: "top-otc",
  },
  {
    icon: SpaIcon,
    title: "Top Generics",
    value: "top-generics",
  },
  {
    icon: ScienceIcon,
    title: "Top Brands",
    value: "top-brands",
  },
];
