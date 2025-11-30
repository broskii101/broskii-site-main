/*
  # Create Val Thorens trip record

  1. New Records
    - Insert Val Thorens 2026 trip with proper UUID
    - Set capacity and status for the trip

  2. Purpose
    - Provides a valid trip_id for waitlist functionality
    - Matches the hardcoded trip details in the frontend
*/

-- Insert the Val Thorens trip with a proper UUID
INSERT INTO trips (id, name, capacity, booked_count, status) 
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'SKI 3 VALLEYS - Val Thorens 2026',
  60,
  60,
  'full'
) ON CONFLICT (id) DO NOTHING;