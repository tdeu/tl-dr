// UnifiedGitHubFeed.js
import React, { useState, useEffect } from 'react';
import styles from './UnifiedGitHubFeed.module.css';

// Import language logos
import jsLogo from '../../images/logos/javascript.svg';
import tsLogo from '../../images/logos/typescript.svg';
import pythonLogo from '../../images/logos/python.svg';
import htmlLogo from '../../images/logos/html.svg';
import cssLogo from '../../images/logos/css.svg';
import reactLogo from '../../images/logos/react.svg';
import solidityLogo from '../../images/logos/solidity.svg';

const UnifiedGitHubFeed = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  const GITHUB_USERNAME = 'tdeu';

  // Debug logging
  useEffect(() => {
    testGitHubToken();
    fetchUnifiedFeed();
  }, []);

  // Test token validity
  const testGitHubToken = async () => {
    console.log('🔍 Test Token button clicked!');
    
    if (!GITHUB_TOKEN) {
      console.log('❌ No GitHub token found');
      return false;
    }
    
    console.log('🔑 Testing token:', GITHUB_TOKEN.substring(0, 8) + '...');
    
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      console.log('📡 API Response status:', response.status, response.statusText);
      
      if (response.ok) {
        const user = await response.json();
        console.log('✅ Token is valid for user:', user.login);
        return true;
      } else {
        const errorText = await response.text();
        console.error('❌ Token validation failed:', response.status, response.statusText, errorText);
        return false;
      }
    } catch (err) {
      console.error('💥 Error testing token:', err);
      return false;
    }
  };

  useEffect(() => {
    testGitHubToken();
    fetchUnifiedFeed();
  }, []);

  const fetchUnifiedFeed = async () => {
    try {
      setLoading(true);
      
      // Fetch user events (includes pushes, commits, etc.)
      const eventsResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=200`,
        {
          headers: GITHUB_TOKEN ? {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          } : {
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!eventsResponse.ok) {
        const errorText = await eventsResponse.text();
        console.error('GitHub API response:', eventsResponse.status, eventsResponse.statusText, errorText);
        
        if (eventsResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later or add a GitHub token.');
        } else if (eventsResponse.status === 401) {
          throw new Error('GitHub API unauthorized. Please check your token is valid and has the correct permissions (public_repo, read:user).');
        } else if (eventsResponse.status === 404) {
          throw new Error('GitHub user not found. Please check the username.');
        } else if (eventsResponse.status >= 500) {
          throw new Error('GitHub API server error. Please try again later.');
        } else {
          throw new Error(`GitHub API error: ${eventsResponse.status} ${eventsResponse.statusText}`);
        }
      }

      const events = await eventsResponse.json();
      
      // Process events and create unified feed items
      const processedItems = await processEvents(events);
      
      console.log(`📊 Processed ${processedItems.length} items from GitHub events`);
      
      // Sort by date and limit to 15 items to ensure we have enough variety
      const sortedItems = processedItems
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 15);
      
      console.log(`🎯 Displaying ${sortedItems.length} items in the feed`);
      
      setFeedItems(sortedItems);
    } catch (err) {
      console.error('Error fetching unified feed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const processEvents = async (events) => {
    const items = [];
    const seenRepos = new Set();
    let processedCount = 0;
    const maxItems = 25; // Process more items to ensure variety

    for (const event of events) {
      // Process more event types and allow more variety
      if ((event.type === 'PushEvent' || event.type === 'CreateEvent' || event.type === 'ForkEvent') && 
          !seenRepos.has(event.repo.name) && processedCount < maxItems) {
        seenRepos.add(event.repo.name);
        processedCount++;
        
        try {
          // Get repository details
          const repoResponse = await fetch(
            `https://api.github.com/repos/${event.repo.name}`,
            {
              headers: GITHUB_TOKEN ? {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
              } : {
                'Accept': 'application/vnd.github.v3+json'
              }
            }
          );

          if (!repoResponse.ok) continue;
          
          const repo = await repoResponse.json();
          
          // Get repository languages
          const languagesResponse = await fetch(
            `https://api.github.com/repos/${event.repo.name}/languages`,
            {
              headers: GITHUB_TOKEN ? {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
              } : {
                'Accept': 'application/vnd.github.v3+json'
              }
            }
          );
          
          let languages = [];
          if (languagesResponse.ok) {
            const languagesData = await languagesResponse.json();
            // Convert languages object to array and sort by bytes (most used first)
            languages = Object.entries(languagesData)
              .sort(([,a], [,b]) => b - a)
              .map(([lang]) => lang);
          } else {
            // Fallback to primary language if languages API fails
            languages = repo.language ? [repo.language] : [];
          }
          
          // Check if this is an article commit (tl-dr repo with .md files)
          let isArticle = false;
          let articleTitle = '';
          
          if (event.repo.name === 'tdeu/tl-dr' && event.payload.commits) {
            // Check if any commit added/modified .md files in articles folder
            for (const commit of event.payload.commits) {
              if (commit.message.toLowerCase().includes('article') || 
                  commit.message.toLowerCase().includes('.md')) {
                isArticle = true;
                articleTitle = extractArticleTitle(commit.message);
                break;
              }
            }
          }

          const item = {
            id: `${event.repo.name}-${event.created_at}`,
            type: isArticle ? 'article' : 'code',
            name: repo.name.split('/')[1], // Just the repo name without username
            full_name: repo.full_name,
            description: repo.description || '',
            updated_at: event.created_at,
            html_url: repo.html_url,
            languages: languages,
            private: repo.private,
            commit_message: event.payload.commits?.[0]?.message || 'Updated repository',
            article_title: articleTitle,
            stars: repo.stargazers_count,
            forks: repo.forks_count
          };

          items.push(item);
        } catch (err) {
          console.error(`Error processing repo ${event.repo.name}:`, err);
        }
      }
    }

    return items;
  };

  const extractArticleTitle = (commitMessage) => {
    // Extract article title from commit message
    // Patterns: "Add article: Title", "Article: Title", "New article: Title"
    const patterns = [
      /(?:add|new|update)\s+article\s*:\s*(.+)/i,
      /article\s*:\s*(.+)/i,
      /(?:add|new|update)\s+(.+\.md)/i
    ];

    for (const pattern of patterns) {
      const match = commitMessage.match(pattern);
      if (match) {
        return match[1].replace('.md', '').trim();
      }
    }

    return commitMessage;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getLanguageDisplay = (language) => {
    // Map of language names to their actual logo imports
    const languageLogos = {
      JavaScript: jsLogo,
      TypeScript: tsLogo,
      Python: pythonLogo,
      HTML: htmlLogo,
      CSS: cssLogo,
      React: reactLogo,
      Vue: null,
      Java: null,
      'C++': null,
      C: null,
      PHP: null,
      Ruby: null,
      Go: null,
      Rust: null,
      Swift: null,
      Kotlin: null,
      'C#': null,
      Solidity: solidityLogo
    };
    
    // Fallback icons if logos aren't available
    const fallbackIcons = {
      JavaScript: 'JS',
      TypeScript: 'TS',
      Python: 'Py',
      HTML: 'HTML',
      CSS: 'CSS',
      React: '⚛️',
      Vue: 'Vue',
      Java: 'Java',
      'C++': 'C++',
      C: 'C',
      PHP: 'PHP',
      Ruby: 'Ruby',
      Go: 'Go',
      Rust: 'Rust',
      Swift: 'Swift',
      Kotlin: 'Kt',
      'C#': 'C#',
      Solidity: 'Sol'
    };
    
    const logoFile = languageLogos[language];
    const fallback = fallbackIcons[language] || language;
    
    return {
      logoFile,
      fallback,
      hasLogo: !!logoFile
    };
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading latest activity...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Codes and Words</h2>
        <p className={styles.subtitle}>
          Latest experiments, ideas, and articles from my digital workshop
        </p>
        <div className={styles.error}>
          <p>Error: {error}</p>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.8 }}>
            {!GITHUB_TOKEN && (
              <>
                💡 <strong>Tip:</strong> Add a GitHub token to your environment variables 
                (REACT_APP_GITHUB_TOKEN) to avoid rate limiting and access private repositories.
              </>
            )}
            {GITHUB_TOKEN && error.includes('401') && (
              <>
                🔑 <strong>Token Issue:</strong> Your GitHub token appears to be invalid or expired. 
                Please check the console for debugging info and regenerate your token.
              </>
            )}
          </p>
          <button 
            onClick={fetchUnifiedFeed} 
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            Try Again
          </button>
          <button 
            onClick={testGitHubToken} 
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Test Token
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Codes and Words</h2>
      <p className={styles.subtitle}>
        Latest experiments, ideas, and articles from my digital workshop
      </p>
      
      <div className={styles.feedList}>
        {feedItems.map((item) => (
          <div key={item.id} className={styles.feedItem}>
            <div className={styles.itemHeader}>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>
                  {item.type === 'article' && item.article_title ? (
                    <span className={styles.articleTitle}>{item.article_title}</span>
                  ) : (
                    <>
                      <a 
                        href={item.html_url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.itemLink}
                      >
                        {item.full_name}
                      </a>
                      <span className={styles.commitMessage}> • {item.commit_message}</span>
                    </>
                  )}
                </h3>
                {item.description && (
                  <p className={styles.description}>{item.description}</p>
                )}
              </div>
              
              <div className={styles.itemMeta}>
                {item.languages && item.languages.length > 0 && (
                  <div className={styles.language}>
                    {item.languages.slice(0, 3).map((lang) => (
                      <span 
                        key={lang} 
                        className={styles.languageTag}
                      >
                        {lang}
                      </span>
                    ))}
                    {item.languages.length > 3 && (
                      <span className={styles.languageTag}>+{item.languages.length - 3}</span>
                    )}
                  </div>
                )}
                <span className={styles.date}>
                  Updated on: {formatDate(item.updated_at)}
                </span>
              </div>
            </div>

            <div className={styles.itemStats}>
              <span className={styles.stat}>⭐ {item.stars}</span>
              <span className={styles.stat}>🍴 {item.forks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnifiedGitHubFeed;