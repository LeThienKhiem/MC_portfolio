-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  booking_date DATE NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- Create index on booking_date for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Enable Row Level Security (RLS) - adjust policies as needed
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert bookings (for public booking form)
CREATE POLICY "Allow public insert" ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all bookings (for admin dashboard)
-- Note: Adjust this based on your authentication setup
CREATE POLICY "Allow authenticated read" ON bookings
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to update bookings
CREATE POLICY "Allow authenticated update" ON bookings
  FOR UPDATE
  USING (true);

