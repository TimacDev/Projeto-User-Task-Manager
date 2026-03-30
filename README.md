**Name:** Tiago Machado
**Repository Link:** https://github.com/TimacDev/Projeto-User-Task-Manager.git
**Branch:** `api_integration`


## Steps to Run

- Node.js installed
- Backend API running on `http://localhost:3000`
- On server/API cors has two ports to guarantee to work with Live Server:
app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"]
}));

1. Clone the repository: git clone https://github.com/TimacDev/Projeto-User-Task-Manager.git
   
2. Switch to the correct branch: git checkout api_integration
   
3. Compile TypeScript: tsc

4. Start the backend API (separate project) on port 3000

5. Open `task.html` or `user.html` in a browser


## Architecture Decisions

### 1. Separate API layer (`src/api/`)

All HTTP calls live in dedicated files, isolated from business logic. This keeps the services clean and makes it easy to change endpoints without touching the rest of the code.

### 2. Local array + `loadData()` sync pattern

The frontend keeps a local array (`taskList`, `userList`) for rendering. After every POST, PUT, or DELETE, we re-fetch the full list from the API to stay in sync. This guarantees the UI always reflects the real state of the database.

### 3. Callback system for UI updates

Each service exposes a `setOnUpdate` function. The UI registers a callback that re-renders whenever data changes.

### 4. Services as the single access point

The UI never calls the API directly. It always goes through the service layer (`taskService`, `userService`, `tagService`), which handles validation, state management, and API synchronization.