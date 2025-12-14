'use client'
import { motion } from "framer-motion";
import { Meteors } from "../ui/meteors";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { GitHubUserPreview } from "@/utils/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import fetchUsers, { FetchOptions } from "@/utils/fetchData";

interface GitHubSearchResponse {
    items: GitHubUserPreview[];
    total_count: number;
    incomplete_results: boolean;
}

export default function SearchBox() {
    const [search, setSearch] = useState('');
    const [previews, setPreviews] = useState<GitHubUserPreview[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    // Cleanup function to clear timeouts and abort pending requests
    const cleanup = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = null;
        }
    }, []);

    // Fetch users with debounce and proper cleanup
    const searchUsers = useCallback(async (query: string) => {
        if (!query.trim()) {
            setPreviews([]);
            setError(null);
            return;
        }

        cleanup();
        setIsLoading(true);
        setError(null);

        // Create new AbortController for this request
        controllerRef.current = new AbortController();
        
        try {
            const options: FetchOptions = {
                signal: controllerRef.current.signal,
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            };
            
            const response = await fetchUsers<GitHubSearchResponse>(
                `https://api.github.com/search/users?q=${encodeURIComponent(query)}+in:login&per_page=5`,
                options
            );
            
            if (response && response.items) {
                setPreviews(response.items);
            } else {
                setPreviews([]);
            }
        } catch (err) {
            const error = err as Error;
            if (error.name !== 'AbortError') {
                console.error('Search failed:', error);
                setError('Failed to fetch users. Please try again.');
                setPreviews([]);
            }
        } finally {
            if (controllerRef.current) {
                controllerRef.current = null;
            }
            setIsLoading(false);
        }
    }, [cleanup]);

    // Debounce the search
    const handleSearchChange = useCallback((value: string) => {
        setSearch(value);
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (!value.trim()) {
            setPreviews([]);
            setError(null);
            return;
        }

        timeoutRef.current = setTimeout(() => {
            searchUsers(value);
        }, 300); // 300ms debounce time
    }, [searchUsers]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);
  return (
    <motion.section className="w-full min-h-screen flex items-center justify-center">
        <div className="flex max-w-md items-center gap-2">
            <Input 
                className="w-full" 
                value={search} 
                onChange={(e) => {
                    handleSearchChange(e.target.value)
                }}
            />
            <DropdownMenu open={search.length > 0}>
                <DropdownMenuContent>
                    {
                        previews.map((p,idx)=>{
                            return (
                                <DropdownMenuItem key={idx}>
                                    <Link 
                                        href={p.avatar_url}
                                        className="grid"
                                    >
                                        <Image 
                                            width={100} 
                                            height={100} 
                                            src={p.html_url}
                                            alt=""
                                            className="col-span-1 row-span-2"
                                        />
                                        <h2 className="col-span-2 row-span-1">{p.name}</h2>
                                        <h3 className="col-span-2 row-span-1">{p.login}</h3>
                                    </Link>
                                </DropdownMenuItem>
                            )
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <Button
                variant="outline"
                className="flex items-center gap-2"
            >
                <Search/><span>Seach</span>
            </Button>
            {/* <Meteors/> */}
        </div>
    </motion.section>
  )
}
