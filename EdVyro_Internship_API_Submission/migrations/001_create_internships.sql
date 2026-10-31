CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(160) NOT NULL,
  company VARCHAR(120) NOT NULL,
  domain VARCHAR(80) NOT NULL,
  location VARCHAR(120) NOT NULL,
  mode VARCHAR(10) NOT NULL CHECK (mode IN ('remote', 'hybrid', 'onsite')),
  description TEXT NOT NULL,
  requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
  stipend NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (stipend >= 0),
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  application_url TEXT NOT NULL,
  status VARCHAR(10) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'draft')),
  deadline DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_internships_domain_lower ON internships (LOWER(domain));
CREATE INDEX IF NOT EXISTS idx_internships_location_lower ON internships (LOWER(location));
CREATE INDEX IF NOT EXISTS idx_internships_status ON internships (status);
CREATE INDEX IF NOT EXISTS idx_internships_created_at ON internships (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_internships_search ON internships USING GIN
  (to_tsvector('english', title || ' ' || company || ' ' || description));
