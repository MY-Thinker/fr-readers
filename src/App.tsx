import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Lectures from "@/pages/Lectures";
import Tasks from "@/pages/Tasks";
import Insights from "@/pages/Insights";
import AdminVideos from "@/pages/AdminVideos";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/admin/videos" element={<AdminVideos />} />
      </Routes>
    </Router>
  );
}
