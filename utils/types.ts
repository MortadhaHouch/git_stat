export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  hireable: boolean | null;
  type: string;
  site_admin: boolean;
  repos_url: string;
}

export type GitHubUserPreview = Pick<GitHubUser,"avatar_url"|"name"|"login"|"html_url"|"id">

export interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

export interface GitHubStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  contributions: ContributionDay[];
}

export type Feature = {
  name: string;
  description: string;
  icon: string;
}

export interface GitHubSearchResponse {
  items: GitHubUserPreview[];
  total_count: number;
  incomplete_results: boolean;
}