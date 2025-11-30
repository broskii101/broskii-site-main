/*
  # Create waitlist table for trip bookings

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `trip_id` (text, for now - can be changed to uuid later if needed)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for public users to insert waitlist entries
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert waitlist entries"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);