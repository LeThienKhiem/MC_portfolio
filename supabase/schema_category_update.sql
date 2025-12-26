-- Update media table to enforce valid categories
-- This ensures only the 5 valid categories can be stored

-- First, drop the existing category column constraint if it exists (if any)
-- Then add the new CHECK constraint

-- Update media table category constraint
ALTER TABLE media 
DROP CONSTRAINT IF EXISTS media_category_check;

ALTER TABLE media
ADD CONSTRAINT media_category_check 
CHECK (
  category IS NULL OR 
  category IN (
    'TV Host',
    'Event Master',
    'Conference Speaker',
    'Team Building',
    'Music Fest'
  )
);

-- Create a comment for documentation
COMMENT ON COLUMN media.category IS 'Valid categories: TV Host, Event Master, Conference Speaker, Team Building, Music Fest';

-- Optional: Update any existing data that doesn't match the new categories
-- Uncomment and modify these if you have existing data to migrate

-- UPDATE media 
-- SET category = 'Music Fest' 
-- WHERE category = 'Music Event';

-- UPDATE media 
-- SET category = 'Event Master' 
-- WHERE category = 'Event Speaker';

