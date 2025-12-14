import { SparklesCore } from "../ui/sparkles";

export function SparklesPreview({
    title,
    children
}:{
    title: string,
    children?: React.ReactNode
}) {
  return (
    <div className="h-160 w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center relative z-20">
        {title}
      </h1>
      <div className="h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-linear-to-r from-transparent via-indigo-500 to-transparent h-0.5 w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-linear-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-linear-to-r from-transparent via-sky-500 to-transparent h-1.25 w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-linear-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
        />
        {children}
        <div className="absolute inset-0 w-full h-full mask-[radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
