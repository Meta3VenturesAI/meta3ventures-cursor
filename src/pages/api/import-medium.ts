import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  try {
    const { url } = await request.json();
    
    // Validate Medium URL
    if (!url.includes('medium.com')) {
      return new Response(JSON.stringify({ error: 'Invalid Medium URL' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Fetch Medium post content
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch Medium post');
    
    const html = await response.text();
    
    // Extract post data using regex (basic example)
    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const contentMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
    
    // Generate slug from title
    const title = titleMatch?.[1] || '';
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Extract first paragraph for excerpt
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentMatch?.[1] || '';
    const firstParagraph = tempDiv.querySelector('p')?.textContent || '';
    
    return new Response(JSON.stringify({
      title,
      excerpt: firstParagraph.slice(0, 200) + '...',
      content: contentMatch?.[1] || '',
      image: imageMatch?.[1] || '',
      slug
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error importing from Medium:', error);
    return new Response(JSON.stringify({ error: 'Failed to import Medium post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}