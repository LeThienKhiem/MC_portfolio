-- Upgrade existing bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS is_finished BOOLEAN DEFAULT false;

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  category TEXT CHECK (
    category IS NULL OR 
    category IN (
      'TV Host',
      'Event Master',
      'Conference Speaker',
      'Team Building',
      'Music Fest'
    )
  ),
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_media_category ON media(category);
CREATE INDEX IF NOT EXISTS idx_media_type ON media(type);
CREATE INDEX IF NOT EXISTS idx_news_created ON news(created_at DESC);

-- Enable Row Level Security
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policies for media
CREATE POLICY "Allow public insert media" ON media
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read media" ON media
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated update media" ON media
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow authenticated delete media" ON media
  FOR DELETE
  USING (true);

-- Policies for news
CREATE POLICY "Allow public insert news" ON news
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read news" ON news
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated update news" ON news
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow authenticated delete news" ON news
  FOR DELETE
  USING (true);

