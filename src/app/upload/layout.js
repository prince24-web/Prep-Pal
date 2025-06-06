// app/upload/layout.js

import PrepPalNavbar from "./uniqueNavbar";

export default function UploadLayout({ children }) {
  return (
    <>
      <PrepPalNavbar/>
      {children}
    </>
  );
}