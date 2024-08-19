"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="search" placeholder="Pesquisar Produtos" />
        <Button variant="outline" type="submit" onClick={() => {}}>
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <ModeToggle />
          <Button variant="ghost" className="relative">
            <Bell className="cursor-pointer" size={24} />
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </Button>
          <hr className="w-0 h-7 border border-solid border-l border-gra-300 mx-3" />
          <Button variant="ghost" className="flex items-center gap-3 cursor-pointer">
            <div>
              <Image
                src="https://github.com/moabdev.png"
                className="h-7 w-7 flex-shrink-0 rounded-full"
                width={50}
                height={50}
                alt="Avatar"
              />
            </div>
            <span className="font-semibold">Moab Macena</span>
          </Button>
        </div>
        <Link href="/settings">
          <Button variant="ghost">
            <Settings size={24} className="cursor-pointer" />
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
