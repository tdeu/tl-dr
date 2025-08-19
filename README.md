# TL;DR - Personal Portfolio

A clean, modern React portfolio website that embodies the "Too Long; Didn't Read" philosophy - keeping things simple, concise, and focused on what matters.

## About

This is my personal portfolio website showcasing my approach to life and work: keeping codes and words simple and concise. The site features:

- **About Section**: Personal introduction and links to GitHub and Medium profiles
- **Codes and Words**: Unified feed displaying latest GitHub activity, repositories, and articles
- **Calendar**: Interactive calendar component
- **Responsive Design**: Mobile-friendly interface with hamburger navigation

## Features

- Modern React application with CSS modules
- Real-time GitHub API integration showing recent commits, repositories, and activity
- Language detection with visual icons for programming languages
- Responsive design with mobile optimization
- Clean, minimalist UI reflecting the TL;DR philosophy

## GitHub API Setup

To display GitHub activity, set up a Personal Access Token:

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "TLDR Portfolio")
4. Select scopes: `public_repo` and `read:user`
5. Click "Generate token"
6. Create a `.env` file in your project root:
   ```
   REACT_APP_GITHUB_TOKEN=your_token_here
   ```
7. Restart your development server

**Note:** Without a token, you're limited to 60 API requests per hour.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Tech Stack

- **React 18** - Modern React with hooks
- **CSS Modules** - Scoped styling
- **GitHub API** - Real-time repository and activity data
- **Responsive Design** - Mobile-first approach

## Project Structure

```
src/
├── components/
│   ├── AboutSection/          # Personal introduction
│   ├── Calendar/              # Calendar component
│   ├── Footer.js              # Site footer
│   ├── Hamburger/             # Mobile navigation
│   ├── Homepage/              # Triangle animation
│   └── UnifiedGitHubFeed/     # GitHub activity feed
├── images/                    # Static assets and logos
└── global.css                 # Global styles
```

## Deployment

The site is configured for deployment to [t-l-d-r.be](https://t-l-d-r.be) using the custom deploy script:

```bash
npm run deploy
```

This builds the project and copies files to the web server directory.

## License

Personal portfolio project.
