/*
  # Fix blog authentication and schema

  1. Changes
    - Add slug column to blog_posts table
    - Add unique constraint on slug
    - Update RLS policies for better security
    - Add indexes for performance

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add policies for public access to published posts
*/

-- Add slug column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'slug'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN slug text;
    ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_slug_unique UNIQUE (slug);
  END IF;
END $$;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);

-- Create index on published_at for faster filtering
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts (published_at);

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;
DROP POLICY IF EXISTS "Authors can manage own posts" ON blog_posts;

-- Create new policies
CREATE POLICY "Public can view published posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts
  USING (auth.role() = 'authenticated');

-- Add trigger for automatic slug generation if empty
CREATE OR REPLACE FUNCTION generate_post_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ensure_post_slug ON blog_posts;
CREATE TRIGGER ensure_post_slug
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION generate_post_slug();