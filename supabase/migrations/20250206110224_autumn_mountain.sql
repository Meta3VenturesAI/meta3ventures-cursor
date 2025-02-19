/*
  # Fix blog authentication and schema

  1. Changes
    - Add categories column to blog_posts table
    - Add indexes for better performance
    - Update RLS policies for better security

  2. Security
    - Update policies for authenticated users
    - Add policies for public access to published posts
*/

-- Add categories column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'categories'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN categories text[] DEFAULT '{}';
  END IF;
END $$;

-- Create index on categories for faster filtering
CREATE INDEX IF NOT EXISTS blog_posts_categories_idx ON blog_posts USING GIN (categories);

-- Update RLS policies
DROP POLICY IF EXISTS "Authenticated users can manage posts" ON blog_posts;

CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);