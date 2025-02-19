export interface BlogTemplate {
  id: string;
  name: string;
  layout: string;
  styles: string;
  metadata: Record<string, any>;
}

const defaultTemplate = `
---
layout: blog
title: {{ title }}
author: {{ author }}
date: {{ date }}
---

<article class="blog-post">
  <header class="post-header">
    <h1>{{ title }}</h1>
    <div class="post-meta">
      <span class="author">{{ author }}</span>
      <span class="date">{{ date }}</span>
    </div>
  </header>
  
  <div class="post-content">
    {{ content }}
  </div>
  
  <footer class="post-footer">
    <div class="tags">
      {{ tags }}
    </div>
  </footer>
</article>
`;

export const blogTemplates = {
  default: {
    id: 'default',
    name: 'Default Template',
    layout: defaultTemplate,
    styles: `
      .blog-post {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }
      .post-header {
        margin-bottom: 2rem;
      }
      .post-meta {
        color: #666;
        font-size: 0.9rem;
      }
    `,
    metadata: {}
  }
}; 