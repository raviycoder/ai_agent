# Full-Stack AI Agents App

This application provides an AI-driven platform for managing agents and real-time chats, featuring both frontend and backend integration for seamless performance.

## 📄 Features
1. **Authentication**:
   - Secure login and signup using JWT (`/auth/login` and `/auth/sign-up`).
2. **Dashboard** (`/`):
   - View, start, and manage chats with AI agents.
3. **Chat Interface**:
   - Real-time chat interactions, chat history, and easy navigation.
4. **Agent Management**:
   - CRUD operations for agents, including customization with titles, tasks, and icons.
5. **Search & Infinite Scroll**:
   - Search by keywords and dynamically load data.
6. **Real-Time Updates**:
   - Live notifications and updates with Socket.IO.
7. **Upcoming Enhancements**:
   - Password reset, daily credits system, and advanced agent customization.

## 🛠️ Tech Stack
- **Frontend**:
  - Framework: Next.js
  - Language: TypeScript
  - UI: Tailwind CSS, ShadCN UI
  - State Management: React Hook Form
  - Real-Time: Socket.IO
- **Backend**:
  - Framework: Node.js, Express.js
  - Database: MongoDB
  - API Integration: Hugging Face Inference API
  - Authentication: JWT, Bcrypt
- **Utilities**:
  - Validation: Zod
  - Config: Dotenv, CORS

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system.

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/raviycoder/ai_agent.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ai_agent
   ```

### Frontend
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Access the app at `http://localhost:3000`.

### Backend
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Set up environment variables:
   - `MONGO_URI`: MongoDB connection string.
   - `JWT_SECRET`: Secret key for JWT.
   - `HUGGINGFACE_API_TOKEN`: Hugging Face API token.
3. Start the server:
   ```bash
   npm start
   ```
4. Backend runs on `http://localhost:5000`.

## 🌟 Contribution
Contributions are welcome! If you find this project helpful, give it a **star** 🌟. For issues or feature requests, feel free to open a pull request or create an issue.