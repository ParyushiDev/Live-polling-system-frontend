import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import PollForm from "./components/PollForm";
import KickOut from "./components/KickOut";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/teacher",
    element: <TeacherPage />,
  },
  {
    path: "/student",
    element: <StudentPage />,
  },
  {
    path: "/polling-form",
    element: <PollForm />,
  },
  {
    path: "/kick-out",
    element: <KickOut />,
  },
]);
function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;
