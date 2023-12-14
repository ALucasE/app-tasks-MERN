import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { TaskProvider } from "./context/TaskContext";
import { NavBar } from "./components/NavBar";
//PAGES
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import TasksFormPage from "./pages/TasksFormPage";
import ProfilePage from "./pages/ProfilePage";
const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <NavBar />
          <main className="container mx-auto px-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/new" element={<TasksFormPage />} />
                <Route path="/tasks/:id" element={<TasksFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
};
export default App;
