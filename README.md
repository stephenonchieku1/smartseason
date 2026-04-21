# 🌾 SmartSeason Field Monitoring System

SmartSeason is a high-fidelity field monitoring application designed to streamline crop management and coordination. Built with a focus on **minimalist, soft monochrome aesthetics**, it provides Coordinators and Agents with a data-driven overview of the growing season's progress.

---



## ✨ Key Features

### 🏢 Coordinator (Admin) Console
*   **Field Management:** Create new fields and assign them to specific Field Agents instantly.
*   **System Velocity Insight:** Real-time metrics showing update frequency across the entire operation.
*   **Crop Diversity Tracking:** Automated analysis of the dominant crops currently under monitoring.
*   **Global Activity Feed:** A high-level view of every observation made by agents in the system.

### 🚜 Field Agent Console
*   **Assigned Roster:** A focused view of only the fields assigned to the specific agent.
*   **Daily Performance Tracker:** Keeps agents motivated by showing their contribution volume for the day.
*   **Update Modal:** Streamlined status updates for physical growth stages (Planted → Growing → Ready → Harvested).

### 🕒 Observation History (The Logbook)
*   **Audit Trail:** Every status change is recorded as a permanent "Milestone."
*   **Chronological Narrative:** View the entire "Life of the Field" from day one to harvest in a beautiful vertical timeline.
*   **Accountability:** Every note tracks which agent made the observation and exactly when.

### 🧠 Computed Status Logic
Field "Health" is automatically determined by the system based on activity:
- **Completed:** Automatically set when a crop is `HARVESTED`.
- **At Risk:** Automatically triggered if **7 days** pass without an update (to flag neglected fields).
- **Active:** Default state for fields with recent observations.

---

## 🛠 Technical Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons.
- **Backend:** Node.js, Express.
- **Database:** PostgreSQL with **Prisma ORM**.
- **Auth:** JWT-based role protection.

---

## 🚀 Quick Start (One Command)

To get the entire system running instantly with one command:

1. **Complete Setup:**
   ```bash
   bun run setup
   ```
   *This installs all dependencies, generates the database schema, and seeds it with full demo history.*

2. **Launch Application:**
   ```bash
   bun run dev
   ```
   *This fires up both the Backend and Frontend concurrently.*

---

## 🔑 Demo Credentials
- **Admin:** `admin@smartseason.com` / `admin123`
- **Agent:** `john@smartseason.com` / `agent123`
- **Agent:** `mary@smartseason.com` / `agent123`

---

## 📝 Assumptions Made
- Field Agents can only update fields assigned to them.
- The lifecycle is strictly forward: Planted → Growing → Ready → Harvested.

# smartseason
# smartseason
