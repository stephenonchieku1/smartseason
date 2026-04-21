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
- **Database:** PostgreSQL compatible (Using **SQLite** for instant local evaluation) with **Prisma ORM**.
- **Auth:** JWT-based role protection.

---

## 🚀 Quick Start (One Command)

To get the entire system running instantly, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone git@github.com:stephenonchieku1/smartseason.git
   ```

2. **Navigate to the project folder:**
   ```bash
   cd smartseason
   ```

3. **Complete Setup:**
   ```bash
   bun run setup
   ```
   *This installs all dependencies, generates the database schema, and seeds it with full demo history.*

4. **Launch Application:**
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

## 🖼️ UI/UX Flow

### Admin Dashboard flow
---
<img width="955" height="411" alt="image" src="https://github.com/user-attachments/assets/6c80a724-2853-4e8f-8c41-58a1635ef627" />
<br>
<img width="957" height="415" alt="image" src="https://github.com/user-attachments/assets/9bc4bfff-4f92-47e0-8213-ec87e48f0443" />
<br>
<img width="959" height="411" alt="image" src="https://github.com/user-attachments/assets/bcb01a88-c690-45f4-961c-b2326ee2ed9b" />

### Agent Dashboard flow
---
<img width="958" height="410" alt="image" src="https://github.com/user-attachments/assets/a5f7cd1e-0579-4a10-8056-50deae1bd76e" />
<br>
<img width="955" height="412" alt="image" src="https://github.com/user-attachments/assets/ca301d52-6e9c-485c-9704-ce3a1c905d05" />
<br>
<img width="953" height="410" alt="image" src="https://github.com/user-attachments/assets/a94eb5cb-791e-4c43-a719-67b23b901621" />
<br>
<img width="949" height="406" alt="image" src="https://github.com/user-attachments/assets/71e751a7-2ba7-4cd1-95dd-f9376b1700ea" />
<br>
<img width="959" height="419" alt="image" src="https://github.com/user-attachments/assets/d9fcb21c-e62f-4164-aa76-4f04bce0fe33" />

---

## 📝 Assumptions Made
- Field Agents can only update fields assigned to them. They cannot reassign fields to others or create new fields.
- The lifecycle is strictly forward: Planted → Growing → Ready → Harvested.

