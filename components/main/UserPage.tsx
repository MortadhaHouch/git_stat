import GithubProfile from "@/components/main/GithubProfile";
import { GitHubStats } from "@/components/main/GitHubStats";


export default function UserPage({
  username
}: {
  username: string;
}) {
  return (
    <main>
      <GithubProfile username={username}/>
      <GitHubStats username={username}/>
    </main>
  )
}