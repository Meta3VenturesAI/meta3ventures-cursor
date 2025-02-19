/*
  # Contact Messages and Demo Requests Schema

  1. New Tables
    - contact_messages
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - company (text)
      - phone (text)
      - message (text)
      - type (text) - For different types of contacts (demo, contact, etc.)
      - preferred_date (date)
      - preferred_time (text)
      - timezone (text)
      - status (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for public submission and admin access
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  message text NOT NULL,
  type text NOT NULL,
  preferred_date date,
  preferred_time text,
  timezone text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public to submit messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to view messages
CREATE POLICY "Authenticated users can view messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);