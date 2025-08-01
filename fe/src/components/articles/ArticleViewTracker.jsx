'use client';

import { useEffect } from 'react';
import { articleService } from '../../services/api';

export default function ArticleViewTracker({ articleId }) {
  useEffect(() => {
    // Increment view count when component mounts
    if (articleId) {
      articleService.incrementViews(articleId).catch(console.error);
    }
  }, [articleId]);

  return null; // This component doesn't render anything
}