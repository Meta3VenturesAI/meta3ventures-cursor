/*
  # Create resources table

  1. New Tables
    - `resources`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `icon` (text)
      - `categories` (text[])
      - `content` (text)
      - `slug` (text, unique)
      - `is_published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `author_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `resources` table
    - Add policy for public read access to published resources
    - Add policy for authors to manage their own resources
*/

CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  categories text[] NOT NULL,
  content text NOT NULL,
  slug text UNIQUE NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES auth.users(id)
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published resources
CREATE POLICY "Public can view published resources"
  ON resources
  FOR SELECT
  TO public
  USING (is_published = true);

-- Authors can manage their own resources
CREATE POLICY "Authors can manage own resources"
  ON resources
  USING (auth.uid() = author_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();