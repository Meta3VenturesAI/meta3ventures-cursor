interface ShareOptions {
  title: string;
  url: string;
  description?: string;
  image?: string;
  tags?: string[];
}

export class SocialSharing {
  static async shareToTwitter(options: ShareOptions) {
    const url = new URL('https://twitter.com/intent/tweet');
    url.searchParams.append('text', options.title);
    url.searchParams.append('url', options.url);
    if (options.tags) {
      url.searchParams.append('hashtags', options.tags.join(','));
    }
    window.open(url.toString(), '_blank');
  }

  static async shareToLinkedIn(options: ShareOptions) {
    const url = new URL('https://www.linkedin.com/sharing/share-offsite/');
    url.searchParams.append('url', options.url);
    window.open(url.toString(), '_blank');
  }

  static async generateEmbedCode(resourceId: string) {
    const { data: resource } = await supabase
      .from('resources')
      .select('*')
      .eq('id', resourceId)
      .single();

    return `
      <iframe 
        src="${window.location.origin}/embed/${resourceId}"
        width="100%"
        height="400"
        frameborder="0"
        allowfullscreen>
      </iframe>
    `;
  }
} 