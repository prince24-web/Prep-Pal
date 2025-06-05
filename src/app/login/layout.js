export const metadata = {
  title: 'Login or Sign Up | PrepPal',
  description: 'Access PrepPal to summarize PDFs, generate quizzes, and study smarter with AI. Log in or create an account to begin.',
  openGraph: {
    title: 'Access PrepPal – Login or Sign Up',
    description: 'Start using PrepPal’s AI to create summaries, flashcards, and quizzes from your notes. Log in or register to get started.',
    url: 'https://yourdomain.com/auth',
    siteName: 'PrepPal',
    images: [
      {
        url: '/og-auth.png',
        width: 1200,
        height: 630,
        alt: 'PrepPal login and signup page',
      },
    ],
    type: 'website',
  },
};

export default function AuthLayout({ children }) {
  return <>{children}</>;
}
