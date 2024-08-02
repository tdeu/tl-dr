import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MediumArticles.module.css';

const MediumArticles = ({ username }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // We're using a CORS proxy here. You might want to set up your own proxy server for production.
        const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`);
        setArticles(response.data.items);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch articles');
        setLoading(false);
      }
    };

    fetchArticles();
  }, [username]);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.articleList}>
      <ul>
        {articles.map(article => (
          <li key={article.guid} className={styles.articleItem}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.pubDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediumArticles;