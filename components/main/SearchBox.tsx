'use client';

import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "../ui/popover";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import fetchUsers, { FetchOptions } from "@/utils/fetchData";
import { GitHubSearchResponse, GitHubUserPreview } from "@/utils/types";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [previews, setPreviews] = useState<GitHubUserPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setPreviews([]);
      return;
    }

    controllerRef.current?.abort();
    setIsLoading(true);

    controllerRef.current = new AbortController();

    try {
      const options: FetchOptions = {
        signal: controllerRef.current.signal,
        headers: { Accept: "application/vnd.github+json" },
      };

      const res = await fetchUsers<GitHubSearchResponse>(
        `https://api.github.com/search/users?q=${encodeURIComponent(
          query
        )}+in:login&per_page=5`,
        options
      );

      setPreviews(res?.items ?? []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChange = (value: string) => {
    setSearch(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      searchUsers(value);
    }, 300);
  };

  const open = search.length > 0 && (isLoading || previews.length > 0);

  return (
    <motion.section 
        className="w-full min-h-screen flex items-center justify-center"
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
        }}
    >
      <Popover open={open}>
        <PopoverAnchor asChild>
          <div className="relative w-full max-w-7xl flex flex-col items-center justify-center gap-2">
            <h1 className="mt-8 bg-linear-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Start searching for GitHub users
            </h1>
            <div className="flex items-center justify-center gap-2 w-full max-w-3xl">
              <Input
                value={search}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search GitHub users..."
              />
              <Button variant="outline">
                <Search size={16} />
              </Button>
            </div>
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          side="bottom"
          className="w-[--radix-popover-trigger-width] p-1"
        >
          {isLoading && (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Loading...
            </div>
          )}

          {previews.map((user) => (
            <Link
              key={user.id}
              href={`/user/${user.login}`}
              target="_blank"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent"
            >
              <Image
                src={user.avatar_url}
                alt={user.login}
                width={32}
                height={32}
                className="rounded-full"
              />
              <h2 className="text-sm font-semibold text-foreground">{user.login}</h2>
            </Link>
          ))}
        </PopoverContent>
      </Popover>
    </motion.section>
  );
}
