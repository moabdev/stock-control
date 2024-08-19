import Link from "next/link";
import { motion } from "framer-motion";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <ChartNoAxesColumnIncreasing className="h-8 w-6 text-white flex-shrink-0 rounded"/>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-lg text-black dark:text-white whitespace-pre"
      >
        Stock Control
      </motion.span>
    </Link>
  );
};
