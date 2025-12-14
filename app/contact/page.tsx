import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | GitStat',
  description: 'Get in touch with the GitStat team. We\'d love to hear your feedback and suggestions!',
  keywords: ['contact', 'support', 'feedback', 'GitStat support', 'GitHub stats help'],
  openGraph: {
    title: 'Contact Us | GitStat',
    description: 'Reach out to the GitStat team for support and feedback.',
    url: 'https://yourwebsite.com/contact',
  },
  twitter: {
    title: 'Contact Us | GitStat',
    description: 'Reach out to the GitStat team for support and feedback.',
  },
};

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      {/* Add your contact form or information here */}
    </div>
  );
}