'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaMapMarkerAlt, FaTwitter, FaBuilding, FaUserFriends, 
  FaCodeBranch, FaStar, FaCode, FaFolder, 
  FaLinkedin,
  FaShareAlt
} from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { GitHubUser,Repository } from '@/utils/types';
import { notFound, usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import QRCode from 'react-qr-code';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ChevronDown, QrCode, X } from 'lucide-react';
import { Input } from '../ui/input';
import ReadmePreview from './ReadmePreview';
import fetchData from '@/utils/fetchData';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

const GithubProfile = ({ username = 'MortadhaHouch' }: { username?: string }) => {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [recentRepos, setRecentRepos] = useState<Repository[]>([]);
  const [starredCount, setStarredCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  // In GithubProfile.tsx
const [readme, setReadme] = useState<string>('');
const [isReadmeLoading, setIsReadmeLoading] = useState(false);
const [readmeError, setReadmeError] = useState<string | null>(null);

// Fetch README separately
const fetchReadme = useCallback(async (username: string) => {
  if (!username) return;
  
  setIsReadmeLoading(true);
  setReadmeError(null);
  
  try {
    const readmeResponse = await fetch(
      `https://api.github.com/repos/${username}/${username}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.raw"
        }
      }
    )
    const readme = await readmeResponse.text();
    setReadme(readme);
  } catch (error) {
    console.log('No README found or error fetching README:', error);
    setReadmeError('No README available');
    setReadme('');
  } finally {
    setIsReadmeLoading(false);
  }
}, []);

useEffect(() => {
  const fetchGitHubData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch main data in parallel
      const [userResponse, reposResponse, starredResponse] = await Promise.all([
        fetchData<GitHubUser>(`https://api.github.com/users/${username}`),
        fetchData<Repository[]>(`https://api.github.com/users/${username}/repos`),
        fetchData<any[]>(`https://api.github.com/users/${username}/starred?per_page=1`, {
          // We need the headers for the link header
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        })
      ]);

      // Set user data
      setUserData(userResponse);

      // Set repositories
      const sortedRepos = reposResponse
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 6);
      setRecentRepos(sortedRepos);

      // Handle starred count
      const linkHeader = starredResponse?.headers?.get('link');
      if (linkHeader) {
        const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (match) {
          setStarredCount(parseInt(match[1], 10));
        }
      } else {
        setStarredCount(starredResponse?.length || 0);
      }

      // Fetch README in parallel after main data is loaded
      fetchReadme(username);

    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setError('Failed to load profile data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  fetchGitHubData();
}, [username, fetchReadme]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  };

  const handleCopyURL = useCallback(async() => {
    await navigator.clipboard.writeText(`${window.location.origin}${pathname}`);
  }, [pathname]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !userData) {
    return notFound();
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
      className="py-16 bg-gray-50 dark:bg-gray-950 flex flex-col gap-2 items-center justify-center"
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
          <div>
            <h2 className="text-xl font-semibold mb-4 flex flex-col justify-center items-center gap-4 mt-10">Share Profile</h2>
            <div className="flex justify-center space-x-4">
              <Button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </Button>
              <Button className="p-3 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </Button>
              <Button className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors">
                <FaShareAlt className="h-5 w-5" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <QrCode className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Profile QR Code</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <QRCode value={`${window.location.origin}${pathname}`} size={200} />
                    <div className="flex flex-row gap-2 w-full">
                      <Input disabled readOnly value={`${window.location.origin}${pathname}`} className="flex-1" />
                      <Button variant="ghost" onClick={()=>handleCopyURL()}>
                        Copy URL
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose className="flex justify-center items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors">
                      <X className="h-4 w-4" />
                      <span>Close</span>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      {
        isReadmeLoading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          // In GithubProfile.tsx
          <Collapsible className="w-full max-w-7xl">
            <div className="flex items-center justify-center w-full mb-4">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 group"
                >
                  <span>View README</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="w-full">
              <ReadmePreview 
                content={readme}
                isLoading={isReadmeLoading}
                error={readmeError}
                className="mt-4"
              />
            </CollapsibleContent>
          </Collapsible>
        )
      }
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
          <div className={`absolute inset-0 bg-linear-to-r ${stat.gradient} opacity-20`} />
          <CardContent className="relative p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-200">{stat.label}</p>
              <h2 className="text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent dark:from-slate-200 dark:to-slate-400">
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
