import { IconCircleArrowLeft } from "@tabler/icons-react";
import { Archive, Bolt, ChartBar, CircleDollarSign, Clipboard, User } from "lucide-react";

export const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <ChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Inventário",
    href: "/inventario",
    icon: (
      <Archive className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Usuários",
    href: "/usuarios",
    icon: (
      <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Produtos",
    href: "/produtos",
    icon: (
      <Clipboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Contas",
    href: "/contas",
    icon: (
      <CircleDollarSign className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Configurações",
    href: "/configuracoes",
    icon: (
      <Bolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Logout",
    href: "/logout",
    icon: (
      <IconCircleArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];