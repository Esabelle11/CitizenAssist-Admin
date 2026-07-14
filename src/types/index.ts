export type UrgencyLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type DispatchChannel = "API_WEBHOOK" | "EMAIL" | "INTERNAL";
// export type UserRole = "Admin" | "Operator" | "Viewer";
export type MessageRole = "user" | "assistant" | "system";
export type DispatchStatus = "QUEUED" | "SENT" | "DELIVERED" | "FAILED" | "RETRYING";
export type IncidentStatus = "PENDING_GPS" | "PENDING" | "DISPATCHED" | "RESOLVED" | "CLOSED";
export type Language = "en" | "ms";

export interface AgencyRouting {
  id: string;
  category_code: string;
  keywords: string[];
  agency_name: string;
  endpoint: string;
  channel: DispatchChannel;
  requires_gps: boolean;
  trigger_examples?: string;
  default_urgency: UrgencyLevel;
  metadata_schema: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeEntry {
  id: number;
  category: string;
  name: string;
  search_summary: string;
  content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrackedIncident {
  incident_id: string;
  chat_id: string;
  category: string;
  urgency_level: UrgencyLevel;
  extracted_metadata: Record<string, unknown>;
  dispatch_status: IncidentStatus;
  gps_lat?: number;
  gps_lng?: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  message_id: string;
  chat_id: string;
  role: MessageRole;
  content: string;
  media_type: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface ChatSession {
  chat_id: string;
  user_identifier: string;
  status: "active" | "closed";
  message_count: number;
  last_message_at: string;
  created_at: string;
}

export interface IncidentDispatch {
  dispatch_id: string;
  incident_id: string;
  target_agency: string;
  channel_used: string;
  destination_address: string;
  status: DispatchStatus;
  payload: Record<string, unknown>;
  dispatched_at?: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
}

export interface AIConfig {
  system_prompt: string;
  response_temperature: number;
  max_tokens: number;
  supported_languages: Language[];
  classification_threshold: number;
  enable_gps_prompt: boolean;
}

export interface DashboardStats {
  activeChatSessions: number;
  totalIncidents: number;
  pendingDispatches: number;
  criticalCases: number;
}

export interface AIActivity {
  id: string;
  type: "classification" | "routing" | "dispatch" | "error";
  description: string;
  timestamp: string;
}

export interface SimulatorResult {
  category: string;
  agency: string;
  urgency: UrgencyLevel;
  confidence: number;
  matched_keywords: string[];
}
