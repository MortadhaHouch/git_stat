import { Metadata } from 'next';
import SearchBox from "@/components/main/SearchBox";
import { HeroSection } from '@/components/main/HeroSection';
import { SparklesPreview } from '@/components/main/Sparkles';

export const metadata: Metadata = {
  title: 'GitStat | Track GitHub User Statistics',
  description: 'Explore detailed GitHub user statistics, repository insights, and coding activity. Get comprehensive analytics for any GitHub profile.',
  keywords: ['GitHub', 'GitHub stats', 'developer analytics', 'GitHub profile', 'code statistics'],
  authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
  openGraph: {
    title: 'GitStat | Track GitHub User Statistics',
    description: 'Get detailed GitHub user statistics and coding insights in one place.',
    url: 'https://yourwebsite.com',
    siteName: 'GitStat',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: 'https://yourwebsite.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'GitStat - GitHub User Statistics',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitStat | Track GitHub User Statistics',
    description: 'Get detailed GitHub user statistics and coding insights in one place.',
    images: ['https://yourwebsite.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
};

export default function Home() {
  return (
    <main className="w-full mx-auto">
      <HeroSection className="min-h-screen flex flex-col items-center justify-center">
        <SparklesPreview
          title="GitStat"
        >
          <p className="text-lg text-center text-gray-600 dark:text-gray-400">
            A Professional View of GitHub Profiles — All in One Place
          </p>
        </SparklesPreview>
      </HeroSection>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <SearchBox/>
      </section>
    </main>
  );
}