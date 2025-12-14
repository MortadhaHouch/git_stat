import { Metadata } from 'next';
import Link from 'next/link';
import { FiGithub, FiHome, FiSearch } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <FiGithub className="text-6xl text-gray-800 dark:text-gray-200" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">User Not Found</h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Oops! We couldn&apos;t find the GitHub user you&apos;re looking for. The profile might not exist or may have been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <FiHome />
            Return Home
          </Link>
          
          <Link 
            href="/"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <FiSearch />
            Search Again
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-500">
          <p>Looking for something else? Check out our <Link href="/features" className="text-blue-600 dark:text-blue-400 hover:underline">features</Link> page.</p>
        </div>
      </div>
    </div>
  );
}
interface UserPageProps {
  params: { username: string };
}
export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const username = params.username;
  
  return {
    title: `${username} | GitHub Profile Stats | GitStat`,
    description: `View detailed GitHub statistics and insights for ${username}. Track contributions, repositories, and coding activity.`,
    openGraph: {
      title: `${username} | GitHub Profile Stats | GitStat`,
      description: `Explore ${username}'s GitHub profile statistics and coding activity.`,
      url: `https://yourwebsite.com/user/${username}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${username} | GitHub Profile Stats | GitStat`,
      description: `View ${username}'s GitHub statistics and coding insights.`,
    },
    alternates: {
      canonical: `https://yourwebsite.com/user/${username}`,
    },
  };
}