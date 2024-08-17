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
        const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`);
        setArticles(response.data.items.slice(0, 5)); // Only take the first 5 articles
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
            <p>Published on: {new Date(article.pubDate).toLocaleDateString()}</p>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default MediumArticles;