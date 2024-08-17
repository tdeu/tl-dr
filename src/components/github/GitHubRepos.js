import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './GitHubRepos.module.css';

const GitHubRepos = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        const filteredRepos = response.data.filter(repo => {
          const updatedDate = new Date(repo.updated_at);
          const createdDate = new Date(repo.created_at);
          return updatedDate > sixtyDaysAgo || createdDate > sixtyDaysAgo;
        });

        setRepos(filteredRepos);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch repositories');
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) return <div>Loading repositories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.repoList}>
      <ul>
        {repos.map(repo => (
          <li key={repo.id} className={styles.repoItem}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description}</p>
            <p className={styles.repoDate}>
              Last updated: {new Date(repo.updated_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubRepos;