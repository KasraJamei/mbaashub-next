// app/page.tsx
import LandingHeader from '@/app/components/landing/LandingHeader';
import LandingHero from '@/app/components/landing/LandingHero';
import LandingUsers from '@/app/components/landing/LandingUsers';
import LandingCapabilities from '@/app/components/landing/LandingCapabilities';
import LandingDesk from '@/app/components/landing/LandingDesk';
import LandingFooter from '@/app/components/landing/LandingFooter';

export default function HomePage() {
  return (
    <main dir="rtl">
      <LandingHeader />
      <LandingHero />
      <LandingUsers />
      <LandingCapabilities />
      <LandingDesk />
      <LandingFooter />
    </main>
  );
}
