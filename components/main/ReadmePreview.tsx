// In components/main/ReadmePreview.tsx
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Loader2 } from 'lucide-react';

interface ReadmePreviewProps {
  content: string;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export default function ReadmePreview({ 
  content,
  isLoading = false,
  error = null,
  className = '' 
}: ReadmePreviewProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl py-8 flex justify-center">
        <div className="animate-spin h-8 w-8 text-blue-500">
          <Loader2 className="h-full w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl py-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="w-full max-w-7xl py-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6 text-center">
          <p className="text-blue-600 dark:text-blue-400">No README available for this profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-7xl ${className}`}>
      <div className="prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:rounded-lg max-w-none">
        <MarkdownPreview 
          source={content}
          style={{ 
            backgroundColor: 'transparent',
            color: 'inherit',
            padding: 0,
          }}
          components={{
            a: ({ node, ...props }) => (
              <a 
                {...props} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              />
            ),
            code: ({ node, ...props }) => (
              <code 
                {...props} 
                className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm"
              />
            ),
            pre: ({ node, ...props }) => (
              <div className="not-prose">
                <pre 
                  {...props} 
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"
                />
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}