# GitHub Stats Viewer

[![Next.js](https://img.shields.io/badge/Next.js-14.0+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-000000)](https://ui.shadcn.com/)

A modern, responsive web application built with Next.js that allows users to view and explore GitHub user profiles and statistics. Features a sleek dark/light mode toggle, interactive components, and a user-friendly interface for discovering GitHub insights.

## ✨ Features

- **User Profile Exploration**: Search and view detailed GitHub user profiles
- **GitHub Statistics**: Display comprehensive stats including repositories, followers, and contributions
- **Interactive UI**: Built with shadcn/ui components for a polished experience
- **Dark/Light Mode**: Seamless theme switching with mode toggle
- **Responsive Design**: Optimized for desktop and mobile devices
- **Fast Performance**: Powered by Next.js 14 with optimized fonts and images
- **TypeScript Support**: Fully typed for better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MortadhaHouch/git_stat.git
   cd git_stat
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
git_stat/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── contact/           # Contact page
│   ├── features/          # Features page
│   └── user/[username]/   # Dynamic user pages
├── components/            # Reusable components
│   ├── main/             # Main application components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility libraries
├── providers/            # Context providers
├── public/               # Static assets
└── utils/                # Helper functions and types
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Fonts**: [Geist](https://vercel.com/font) (optimized by Next.js)
- **Linting**: ESLint
- **Build Tool**: Next.js built-in

## 📖 Usage

1. **Home Page**: Start by searching for a GitHub username
2. **User Profile**: View detailed profile information and statistics
3. **Features Page**: Explore available features and capabilities
4. **Contact Page**: Get in touch with the project maintainers

## 🐳 Docker Support

Build and run with Docker:

```bash
# Build the image
docker build -t git-stat .

# Run the container
docker run -p 3000:3000 git-stat
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

This app can be deployed to any platform supporting Node.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [GitHub API](https://docs.github.com/en/rest) - For fetching user data

---

Built with ❤️ using Next.js and TypeScript
