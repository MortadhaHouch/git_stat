import UserPage from "@/components/main/UserPage";
import { Metadata } from "next";

export default function User() {
  
  return (
    <UserPage username="MortadhaHouch"/>
  )
}
interface UserPageProps {
  params: Promise<{ username?: string }>;
}
export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const username = (await params).username;
  
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