// components/NavbarWrapper.js
'use client';

import { usePathname } from 'next/navigation';
import ResponsiveNavbar from './navbar';


export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbarRoutes = ['/upload']; // Add more paths if needed

  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <ResponsiveNavbar />;
}
