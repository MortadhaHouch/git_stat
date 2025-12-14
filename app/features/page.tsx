import { cn } from "@/lib/utils";
import { type Feature } from "@/utils/types";
import { Metadata } from "next";

const features:Feature[] = [
  {
    name: "GitHub Stats",
    description: "Get your GitHub stats in one place",
    icon: "github"
  },
  {
    name:"Recent Repositories",
    description:"Show your recent repositories",
    icon:"github"
  },{
    name:"Export Stats",
    description:"Export your stats to an image",
    icon:"github"
  },{
    name:"Share Stats",
    description:"Share your stats on social media or with your friends via link or QR code",
    icon:"github"
  }
]
export default function Features() {
  return (
    <main className="relative z-10 py-10 w-full min-h-screen mx-auto flex flex-col items-center justify-center">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl">
        {features.map((feature, index) => (
          <Feature key={feature.name} {...feature} index={index} />
        ))}
      </section>
    </main>
  );
}

const Feature = ({
  name,
  description,
  icon,
  index,
}: {
  name: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {name}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
export const metadata: Metadata = {
  title: 'Features | GitStat',
  description: 'Discover the powerful features of GitStat for analyzing GitHub profiles and repositories. Get insights into coding activity and contributions.',
  keywords: ['GitHub features', 'code analytics', 'developer insights', 'GitHub metrics'],
  openGraph: {
    title: 'Features | GitStat',
    description: 'Explore the powerful features of GitStat for GitHub analytics and insights.',
    url: 'https://yourwebsite.com/features',
  },
  twitter: {
    title: 'Features | GitStat',
    description: 'Discover what makes GitStat the best tool for GitHub analytics and insights.',
  },
};