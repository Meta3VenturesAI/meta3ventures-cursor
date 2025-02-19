/*
  # Create blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `excerpt` (text)
      - `content` (text)
      - `image` (text)
      - `created_at` (timestamp)
      - `published_at` (timestamp)
      - `author_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access
    - Add policy for authenticated users to manage their own posts
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image text,
  created_at timestamptz DEFAULT now(),
  published_at timestamptz,
  author_id uuid REFERENCES auth.users(id)
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Public can view published posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (published_at IS NOT NULL AND published_at <= now());

-- Authors can manage their own posts
CREATE POLICY "Authors can manage own posts"
  ON blog_posts
  USING (auth.uid() = author_id);