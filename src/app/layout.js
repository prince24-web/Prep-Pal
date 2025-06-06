import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import NavbarWrapper from "./components/NavbarWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://Prep-Pal.vercel.app'),
  title: 'PrepPal - Your Smart Study Companion',
  description:
    'PrepPal summarizes your PDFs, highlights key points, and generates quizzes to help you learn smarter and faster.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/preppal-icon.png" />
        <title>PrepPal - Your Smart Study Companion</title>
        <meta
          name="description"
          content="PrepPal summarizes your PDFs, highlights key points, and generates quizzes to help you learn smarter and faster."
        />
        <meta property="og:title" content="PrepPal - Your Smart Study Companion" />
        <meta
          property="og:description"
          content="PrepPal helps students learn better by summarizing PDFs and creating smart quizzes."
        />
        <meta property="og:image" content="/preppal-icon.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PrepPal - Your Smart Study Companion" />
        <meta
          name="twitter:description"
          content="Summarize PDFs, highlight key points, and test your knowledge with quizzes and generate flash cards."
        />
        <meta name="twitter:image" content="/preppal-icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <NavbarWrapper/>
          {children}
          <Footer />
      </body>
    </html>
  );
}
