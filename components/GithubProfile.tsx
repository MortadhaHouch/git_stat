'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaMapMarkerAlt, FaTwitter, FaBuilding, FaUserFriends, 
  FaCodeBranch, FaStar, FaCode, FaFolder 
} from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { GitHubUser, Repository } from '../../../utils/types';

const GithubProfile = ({ username = 'MortadhaHouch' }: { username?: string }) => {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [recentRepos, setRecentRepos] = useState<Repository[]>([]);
  const [starredCount, setStarredCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoading(true);
        
        // User Data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch GitHub user data');
        const userData: GitHubUser = await userResponse.json();
        setUserData(userData);

        // Repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const repos: Repository[] = await reposResponse.json();
        const sortedRepos = repos
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 6);
        setRecentRepos(sortedRepos);

        // Starred Count
        const starredResponse = await fetch(`https://api.github.com/users/${username}/starred?per_page=1`);
        if (starredResponse.headers.has('link')) {
          const linkHeader = starredResponse.headers.get('link');
          const match = linkHeader?.match(/&page=(\d+)>; rel="last"/);
          setStarredCount(match ? parseInt(match[1], 10) : 0);
        } else {
          const starredData = await starredResponse.json();
          setStarredCount(starredData.length);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error || 'Failed to load GitHub profile'}
      </div>
    );
  }

  const stats = [
    { label: 'Repositories', value: userData.public_repos, icon: <FaCodeBranch className="mr-1 w-8 h-8" />,gradient: "from-emerald-400 to-emerald-600", },
    { label: 'Gists', value: userData.public_gists, icon: <FaCode className="mr-1 w-8 h-8" />,gradient: "from-violet-400 to-violet-600" },
    { label: 'Followers', value: userData.followers, icon: <FaUserFriends className="mr-1 w-8 h-8" />,gradient: "from-green-400 to-green-600" },
    { label: 'Following', value: userData.following, icon: <FaUserFriends className="mr-1 w-8 h-8" />,gradient: "from-blue-400 to-blue-600", },
    { label: 'Starred', value: starredCount, icon: <FaStar className="mr-1 w-8 h-8" />,gradient: "from-amber-400 to-amber-600" },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-gray-50 dark:bg-gray-950"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          My <span className="text-blue-600 dark:text-blue-400">GitHub</span> Profile
        </h2>

        {/* Profile Card */}
        <div className="bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 
                        rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center md:items-start p-8 gap-8">
            
            {/* Avatar */}
            <motion.div whileHover={{ scale: 1.05, rotate: 1 }}>
              <Image
                src={userData.avatar_url}
                alt={`${userData.login}'s avatar`}
                width={160}
                height={160}
                className="rounded-full border-4 border-blue-500 shadow-lg"
              />
            </motion.div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {userData.name || userData.login}
                </h1>
                {userData.hireable ? (
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 
                                  dark:bg-green-800 dark:text-green-200 rounded-full">
                    ✅ Available
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 
                                  dark:bg-red-800 dark:text-red-200 rounded-full">
                    ❌ Not Available
                  </span>
                )}
              </div>
              {userData.bio && <p className="text-gray-600 dark:text-gray-300 italic">{userData.bio}</p>}
              
              {/* Socials */}
              <div className="flex gap-4 mt-2">
                <Link href={userData.html_url} target="_blank" className="text-gray-600 hover:text-blue-500 flex justify-start items-center gap-2">
                  <FaGithub size={22} /><span>{userData.name}</span>
                </Link>
                {userData.twitter_username && (
                  <Link href={`https://twitter.com/${userData.twitter_username}`} 
                        target="_blank" className="text-sky-500 hover:text-sky-400">
                    <FaTwitter size={22} />
                  </Link>
                )}
                {userData.email && (
                  <Link href={`mailto:${userData.email}`} 
                        className="text-gray-600 hover:text-blue-500">
                    <FiMail size={22} />
                  </Link>
                )}
              </div>

              {/* Details */}
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {userData.company && <p className="flex items-center"><FaBuilding className="mr-2" />{userData.company}</p>}
                {userData.location && <p className="flex items-center"><FaMapMarkerAlt className="mr-2" />{userData.location}</p>}
                <p>Member since {formatDate(userData.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
        <StatsCards stats={stats}/>

        {/* Recent Repositories */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center">
            <FaFolder className="mr-2 text-blue-600 dark:text-blue-400" /> Recent Repositories
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {recentRepos.map((repo, i) => (
              <motion.div 
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={repo.html_url} target="_blank"
                      className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md 
                                 hover:shadow-xl hover:scale-[1.02] transition-all border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400">{repo.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {repo.description || 'No description provided'}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center mr-3"><FaStar className="mr-1 text-yellow-500" />{repo.stargazers_count}</span>
                      <span className="flex items-center"><FaCodeBranch className="mr-1" />{repo.forks_count}</span>
                    </div>
                  </div>
                  {repo.language && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{repo.language}</div>
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Updated {formatDate(repo.updated_at)}</div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={`${userData.html_url}?tab=repositories`}
              target="_blank"
              className="inline-flex items-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              View All Repositories <FaGithub className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
interface StarCard {
  label:string,
  value:number,
  icon:React.ReactNode,
  gradient:string
}
function StatsCards({ stats }: { stats: StarCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <Card 
          key={i} 
          className="relative overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-20`} />
          <CardContent className="relative p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-200">{stat.label}</p>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent dark:from-slate-200 dark:to-slate-400">
                {stat.value}
              </h2>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} text-white shadow-lg`}>
              {stat.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default GithubProfile;
