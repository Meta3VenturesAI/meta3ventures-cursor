/*
  # Create applications table

  1. New Tables
    - `applications`
      - `id` (uuid, primary key)
      - `founder_name` (text)
      - `company_name` (text)
      - `email` (text)
      - `website` (text)
      - `linkedin` (text)
      - `company_usp` (text)
      - `status` (text)
      - `pitch` (text)
      - `resume_url` (text)
      - `pitch_deck_url` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `applications` table
    - Add policy for inserting applications
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_name text NOT NULL,
  company_name text NOT NULL,
  email text NOT NULL,
  website text,
  linkedin text NOT NULL,
  company_usp text NOT NULL,
  status text NOT NULL,
  pitch text NOT NULL,
  resume_url text,
  pitch_deck_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert applications"
  ON applications
  FOR INSERT
  TO public
  WITH CHECK (true);