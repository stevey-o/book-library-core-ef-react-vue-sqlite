
---

## Getting Started

### 1. Backend API (ASP.NET Core)

#### a. Open and Run the API

1. Open `LibrarySolution.sln` in Visual Studio 2022.
2. Set `LibraryAPI` as the startup project.
3. Run the project (F5 or Ctrl+F5).
4. The API will be available at:
   - `https://localhost:5001`
   - `http://localhost:5000`
5. Data is persisted in a local SQLite database (`library.db`).

#### b. API Documentation (Swagger)

- Access Swagger UI for API exploration at:  
  [https://localhost:5001/swagger/index.html](https://localhost:5001/swagger/index.html)

---

### 2. Frontend Options

#### Option A: React Frontend

1. **Install Node.js and npm** (if not already installed):  
   [Download Node.js](https://nodejs.org/)

2. **Start the React App:**
   - Open a command prompt.
   - Navigate to the `frontend` directory:
     ```
     cd frontend
     ```
   - Install dependencies (first time only):
     ```
     npm install
     ```
   - Start the development server:
     ```
     npm run dev
     ```
   - The app will run at [http://localhost:5173](http://localhost:5173) (required for CORS).

#### Option B: No-Build Vue Frontend

1. **Serve the App Locally:**
   - Open the `alternative-no-build-frontend` directory in VS Code or your preferred editor.
   - Use an extension like "Live Server" to serve the files.
   - Ensure the server runs on port **5500** (required for CORS).
   - Access the app at [http://localhost:5500/alternative-no-build-frontend/library-alt-no-build.html](http://localhost:5500/alternative-no-build-frontend/library-alt-no-build.html).

---

## Notes

- **CORS:**  
  The backend is configured to allow requests from ports `5173` (React) and `5500` (no-build Vue).
- **Database:**  
  Data is stored in a local SQLite file (`library.db`). Do not delete this file if you want to persist your data.
- **API Reference:**  
  Use Swagger UI for testing and exploring API endpoints.

---

## Troubleshooting

- If you do not see your data persisting, ensure you are running the backend from the correct directory and not recreating the database.
- If you encounter CORS errors, verify you are using the correct ports as described above.

---

Enjoy!"# book-library-core-ef-react-vue-sqlite" 
