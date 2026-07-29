// =============================================================================
// Intent & classification
// =============================================================================

export type IntentType = "REPORT" | "INFORMATION" | "CLARIFICATION" | "CHAT";
export type IncidentCategory = string & { __brand: "IncidentCategory" };
export type UrgencyLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type ChatRole = "user" | "assistant" | "system";
export type MediaAttachmentType = "image" | "audio" | "video";


/**
 * Returned from CitizenAssist AI
 * /api/chat_test
 */
export interface SimulationResult {
  chatId: string;
  response: string;
  analysis: IntentAnalysis;
  routing: RoutingResult;
  // rag: RagDocument[];
  evidence?: MediaResult;
  // metrics?: SimulationMetrics;
}



/**
 * Intent analysis from analyzeMessage()
 */
// export interface IntentAnalysis {
//   intent_type:
//     | "REPORT"
//     | "INFORMATION"
//     | "CLARIFICATION"
//     | "CHAT";
//   confidence: number;
//   requiresGps: boolean;
//   requiresEscalation?: boolean;
//   reason?: string;
// }

export interface IntentAnalysis {
  intent_type: IntentType;
  category: IncidentCategory;
  urgency: UrgencyLevel;
  requires_immediate_gps: boolean;
  confidence: number;
  extracted_entities: Record<string, unknown>;
  missing_fields: string[];
  ready_for_submission: boolean;
  follow_up_question: string | null;
  reason: string;
}



/**
 * Agency routing output
 */
export type RoutingStatus =
  | "SKIPPED"
  | "NEEDS_MORE_INFORMATION"
  | "DISPATCHED"
  | "AWAITING_LOCATION_TRIGGER"
  | "DISPATCH_QUEUED"
  | "INTERNAL_HANDLED";

export interface RoutingResult {
  status: RoutingStatus;
  response_context?: string | null;
  missing_fields?: string[];
  incidentId?: string;
  dispatchId?: string;
  target_agency?: string;
}



/**
 * RAG retrieved document
 */
export interface RagDocument {
  id?: string;
  title: string;
  content?: string;
  similarity: number;
  agency?: string;
}



/**
 * Image/audio/video processing
 */
export interface MediaResult {
  hasMedia: boolean;
  mediaType: string;
  extracted: boolean;
  // type:
  //   | "image"
  //   | "audio"
  //   | "video";
  // processed: boolean;
  // extractedText?: string;
  // transcription?: string;
}

// export interface SimulationMetrics {
//   model?: string;
//   totalLatencyMs?: number;
//   mediaProcessingMs?: number;
//   analysisMs?: number;
//   ragMs?: number;
//   routingMs?: number;
//   responseMs?: number;
// }

export interface SimulatorMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
  result?: SimulationResult;
  media?: {
    type:MediaAttachmentType;
    fileName?: string;
    url?: string;
  };
  error?: string;
  isLoading?: boolean;
}