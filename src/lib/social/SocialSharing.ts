import { supabase } from '../supabase';
import { trackError } from '../monitoring';

interface ShareableResource {
  id: string;
  title: string;
  description: string;
  url: string;
  image_url?: string;
}

interface ShareStats {
  platform: string;
  count: number;
}

interface ShareOptions {
  platform: 'twitter' | 'linkedin' | 'facebook';
  customMessage?: string;
}

export async function shareResource(resourceId: string, options: ShareOptions): Promise<void> {
  try {
    const { data: resource, error } = await supabase
      .from('resources')
      .select('*')
      .eq('id', resourceId)
      .single();

    if (error) throw error;
    if (!resource) throw new Error('Resource not found');

    const shareUrl = constructShareUrl(resource, options);
    
    // Track sharing activity
    await supabase
      .from('share_events')
      .insert({
        resource_id: resourceId,
        platform: options.platform,
        timestamp: new Date().toISOString()
      });

    // Open share dialog
    window.open(shareUrl, '_blank', 'width=600,height=400');
  } catch (error) {
    trackError(error instanceof Error ? error : new Error('Failed to share resource'));
    throw error;
  }
}

function constructShareUrl(resource: ShareableResource, options: ShareOptions): string {
  const text = options.customMessage || resource.title;
  const url = encodeURIComponent(resource.url);
  
  switch (options.platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    default:
      throw new Error('Unsupported sharing platform');
  }
}

export async function getShareStats(resourceId: string): Promise<ShareStats[]> {
  try {
    // Using a raw SQL query with Supabase to get the share counts
    const { data, error } = await supabase
      .rpc('get_share_stats', { resource_id: resourceId });

    if (error) throw error;
    return data || [];
  } catch (error) {
    trackError(error instanceof Error ? error : new Error('Failed to get share stats'));
    throw error;
  }
}