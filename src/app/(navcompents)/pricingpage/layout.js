
export const metadata = {
  title: 'PrepPal Pricing – Choose a Plan That Fits You',
  description: 'Start free or unlock full AI features with PrepPal Pro. See what’s included in each plan.',
  openGraph: {
    title: 'Pricing – PrepPal Plans',
    description: 'Affordable AI study plans for students and educators.',
    url: 'https://prep-pal-blond.vercel.app/pricingpage',
    siteName: 'PrepPal',
    images: [{ url: '/og-pricing.png', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default function PricingPageLayout({children}){
    return <>{children}</>;
}