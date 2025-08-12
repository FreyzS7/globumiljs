"use client"

 
import { Menu, Transition } from '@headlessui/react';
import { BASE_URL} from '../utils/constant';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import SearchModal from './search/SearchModal';
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/artikel' },
  { name: 'Products', href: '/produk_kami' },
  { name: 'About', href: '/tentang_kami' },
];




export default function Navbar() {
  const pathName = usePathname();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  return (
    <header className="bg-[#FFF6F6] w-full shadow-md">
      <nav className="w-full mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo and Brand */}
        <div className="w-[50%] flex items-center gap-3 ml-[5%]"> 
            <Link href={"/"} >
              <img
                src="/images/LogoGlobumil.png"
                alt="Globumil Logo"
                className="h-[80%] w-[50%] object-contain"
              />
              </Link> 
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-1 md:gap-12">
          <div className="hover:text-pink-500 transition-colors w-10 h-10 flex items-center justify-center"
            aria-label="Search"
          >
             <button
              onClick={() => setIsSearchModalOpen(true)}
              aria-label="Search"
              className='bg-[#fff6f6]'
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
           
          </div>
          <div className="hover:text-pink-500 transition-colors w-10 h-10 flex items-center justify-center">
            <Link href={"/cart"} aria-label="Shopping Cart">
              <ShoppingBagIcon className="h-6 w-6" style={{color: 'black'}} />
            </Link>
          </div>
          
          <div className="hover:text-pink-500 transition-colors w-10 h-10 flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button aria-label="Open menu" className='bg-[#fff6f6]'>
                  <Bars3Icon className="h-7 w-7" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-35 text-black">
                <DropdownMenuItem asChild>
                  <Link style={{color: 'black'}}  href="/produk_kami">Produk</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link style={{color: 'black'}}  href="/artikel">Artikel</Link>
                </DropdownMenuItem>
               
                <DropdownMenuItem asChild>
                  <Link style={{color: 'black'}}  href="/tentang_kami">Tentang Kami</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </header>
  );
} 