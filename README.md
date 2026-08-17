# CitizenAssist AI — Admin Portal

The **CitizenAssist AI Admin Portal** is the management and operations interface for the CitizenAssist AI platform.

It provides administrators and authorized personnel with a centralized interface to monitor citizen interactions, manage incidents, configure agency routing, maintain the knowledge base, and support operational workflows.

The portal acts as the **administrative control layer** of CitizenAssist AI, complementing the citizen-facing conversational application.

---

## 📋 Table of Contents

* [Features](#features)
* [Admin Portal Architecture](#admin-portal-architecture)
* [Admin Modules](#admin-modules)
  * [Users](#users)
  * [Dashboard](#dashboard)
  * [Agency Routing](#agency-routing)
  * [Knowledge Base](#knowledge-base)
  * [Chat Monitoring](#chat-monitoring)
  * [Incidents](#incidents)
  * [Dispatch](#dispatch)
  * [Simulator](#simulator)
* [Operational Workflow](#operational-workflow)
* [Navigation](#navigation)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Run Development Server](#run-development-server)
* [Purpose](#purpose)
* [Future Development](#future-development)

---

# Features

* **User Management** — manage and review platform users
* **Dashboard** — centralized overview of platform activity and operational data
* **Agency Routing** — manage how incidents are routed to relevant agencies
* **Knowledge Base** — manage information used by the AI system
* **Chat Monitoring** — monitor citizen-AI conversations
* **Incident Management** — review and manage reported incidents
* **Dispatch** — support operational dispatch workflows
* **Simulator** — test and simulate CitizenAssist AI workflows

---

# Admin Portal Architecture

```text
                         ┌─────────────────────┐
                         │   CitizenAssist AI  │
                         │   Citizen Platform  │
                         └──────────┬──────────┘
                                    │
                         Citizen conversations
                         & incident reports
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Backend       │
                         │                     │
                         │ AI Orchestration    │
                         │ Incident Routing    │
                         │ Database            │
                         └──────────┬──────────┘
                                    │
                                    ▼
                    ┌────────────────────────────────┐
                    │       Admin Portal              │
                    └────────────────┬───────────────┘
                                     │
       ┌──────────────┬──────────────┼──────────────┬──────────────┐
       │              │              │              │              │
       ▼              ▼              ▼              ▼              ▼
    Users         Dashboard      Agency        Knowledge      Chat
                                Routing           Base       Monitoring
       │              │              │              │              │
       └──────────────┴──────────────┼──────────────┴──────────────┘
                                     │
                              ┌──────┴──────┐
                              │             │
                              ▼             ▼
                         Incidents       Dispatch
                              │
                              │
                              ▼
                          Simulator
```

---

# Admin Modules

## Users

The **Users** module provides administrative access to user-related information within the CitizenAssist AI platform.

It provides the foundation for managing and reviewing platform users from the administrative side.

---

## Dashboard

The **Dashboard** provides a centralized overview of CitizenAssist AI activity.

It is designed to give administrators a high-level view of the platform and its operational state without requiring them to inspect individual records.

---

## Agency Routing

The **Agency Routing** module manages the relationship between reported civic issues and the agencies responsible for handling them.

It supports the routing layer used by CitizenAssist AI when processing `REPORT` workflows.

```text
Citizen Report
      ↓
Incident Analysis
      ↓
Agency Routing
      ↓
Relevant Agency
```

This separates routing configuration from the citizen-facing application.

---

## Knowledge Base

The **Knowledge Base** provides an administrative interface for managing information used by the AI system.

This allows administrators to maintain the information layer that supports CitizenAssist AI's information and conversational workflows.

The knowledge base can evolve independently from the core application logic.

---

## Chat Monitoring

The **Chat Monitoring** module allows administrators to inspect citizen-AI conversations.

This provides visibility into:

* Citizen conversations
* AI responses
* Conversation context
* Report-related interactions

Chat monitoring is particularly useful for understanding how the AI is handling real-world interactions.

---

## Incidents

The **Incidents** module provides an operational view of reported civic incidents.

It acts as the administrative counterpart to the citizen-facing `REPORT` workflow.

```text
Citizen
   ↓
AI Report Workflow
   ↓
Incident
   ↓
Admin Portal
   ↓
Review / Operations
```

Administrators can use this area to review incidents and follow their operational lifecycle.

---

## Dispatch

The **Dispatch** module supports the operational side of incident handling.

After an incident has been reviewed and is ready for action, dispatch provides the interface for moving the issue toward the appropriate operational response.

This creates a separation between:

```text
Incident Detection
       ↓
Incident Management
       ↓
Dispatch
       ↓
Operational Response
```

---

## Simulator

The **Simulator** provides a controlled environment for testing CitizenAssist AI workflows.

It is useful for validating system behavior without relying entirely on live citizen interactions.

The simulator can be used as part of development and testing for conversational, routing, and incident workflows.

---

# Operational Workflow

The Admin Portal supports the broader CitizenAssist AI workflow:

```text
Citizen
   │
   ▼
Conversational AI
   │
   ├── Chat
   ├── Information
   ├── Clarification
   │
   └── Report
         │
         ▼
   Incident Routing
         │
         ▼
      Incident
         │
         ▼
   Admin Portal
         │
    ┌────┴────┐
    │         │
    ▼         ▼
 Review     Routing
    │         │
    └────┬────┘
         ▼
      Dispatch
         │
         ▼
 Operational Response
```

The portal therefore provides visibility and operational controls around the AI-driven citizen workflow.

---

# Navigation

The Admin Portal is organized into the following modules:

```text
/users
/dashboard
/agency-routing
/knowledge-base
/chat-monitoring
/incidents
/dispatch
/simulator
```

| Module          | Purpose                         |
| --------------- | ------------------------------- |
| Users           | User management                 |
| Dashboard       | Platform overview               |
| Agency Routing  | Incident routing configuration  |
| Knowledge Base  | AI information management       |
| Chat Monitoring | Conversation monitoring         |
| Incidents       | Incident management             |
| Dispatch        | Operational dispatch            |
| Simulator       | Workflow testing and simulation |

---

# Tech Stack

### Frontend

* Next.js
* React
* TypeScript

### Backend / Data

* Supabase
* PostgreSQL
* API-based application architecture

### AI Platform

* CitizenAssist AI orchestration
* Intent analysis
* Incident routing
* Knowledge-based responses

---

# Getting Started

## Installation

```bash
git clone <repository-url>
cd citizenassist-admin
npm install
```

## Environment Variables

Create a `.env.local` file with the required application configuration.

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Additional application configuration
...
```

## Run Development Server

```bash
npm run dev
```

---

# Purpose

The CitizenAssist AI Admin Portal provides the operational layer required to manage an AI-powered civic assistance platform.

Instead of treating the AI chatbot as an isolated application, the portal connects the entire workflow:

```text
Citizen Interaction
       ↓
AI Understanding
       ↓
Incident / Information Workflow
       ↓
Agency Routing
       ↓
Administrative Review
       ↓
Dispatch
```

This creates a unified platform for **citizen interaction, AI-assisted decision making, incident management, and administrative operations**.

---

# Future Development

Potential future improvements include:

* More granular administrative roles and permissions
* Advanced incident lifecycle management
* Real-time incident updates
* Agency performance monitoring
* Expanded routing configuration
* Knowledge-base versioning
* AI response quality monitoring
* Operational analytics
* More comprehensive simulation and testing tools
