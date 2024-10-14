import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import PastResults from "./pages/PastResults";

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
    path: "/past-results",
    element: <PastResults />
  },
]);
function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;
