-- Citizen Assist AI Admin Portal — Database Schema
-- Run this in your Supabase SQL editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- Chat sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  chat_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_identifier TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agency routing rules
CREATE TABLE IF NOT EXISTS agency_routing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_code TEXT UNIQUE NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  agency_name TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('API_WEBHOOK', 'EMAIL', 'INTERNAL')),
  requires_gps BOOLEAN DEFAULT FALSE,
  trigger_examples TEXT,
  default_urgency TEXT DEFAULT 'MEDIUM' CHECK (default_urgency IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
  metadata_schema JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge base (information_base)
CREATE TABLE IF NOT EXISTS information_base (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category TEXT,
  name TEXT,
  search_summary TEXT,
  content TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracked incidents
CREATE TABLE IF NOT EXISTS tracked_incidents (
  incident_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID REFERENCES chat_sessions(chat_id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  urgency_level TEXT NOT NULL,
  extracted_metadata JSONB DEFAULT '{}',
  dispatch_status TEXT DEFAULT 'PENDING_GPS',
  gps_lat DOUBLE PRECISION,
  gps_lng DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID REFERENCES chat_sessions(chat_id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  media_type TEXT DEFAULT 'text',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Incident dispatches
CREATE TABLE IF NOT EXISTS incident_dispatches (
  dispatch_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id UUID REFERENCES tracked_incidents(incident_id) ON DELETE CASCADE,
  target_agency TEXT NOT NULL,
  channel_used TEXT NOT NULL,
  destination_address TEXT NOT NULL,
  status TEXT DEFAULT 'QUEUED',
  payload JSONB DEFAULT '{}',
  dispatched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER agency_routing_updated_at
  BEFORE UPDATE ON agency_routing
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER information_base_updated_at
  BEFORE UPDATE ON information_base
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tracked_incidents_updated_at
  BEFORE UPDATE ON tracked_incidents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
