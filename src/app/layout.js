import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import ResponsiveNavbar from "./components/navbar";
import { ThemeProvider } from "./context/themecontext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: 'PrepPal - Your Smart Study Companion',
  description: 'PrepPal summarizes your PDFs, highlights key points, and generates quizzes to help you learn smarter and faster.',
  icons: {
    icon: '/preppal-icon.png',
  },
  openGraph: {
    title: 'PrepPal - Your Smart Study Companion',
    description: 'PrepPal helps students learn better by summarizing PDFs and creating smart quizzes.',
    images: ['/preppal-icon.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrepPal - Your Smart Study Companion',
    description: 'Summarize PDFs, highlight key points, and test your knowledge with quizzes.',
    images: ['/preppal-icon.png'],
  },
};



export default function RootLayout({ children }) {
  return (
    // app/layout.js
    // app/layout.js
  <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><ThemeProvider>
        <ResponsiveNavbar/>
        {children}
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
