import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicPortal from "./pages/PublicPortal";
import ImageDetection from "./pages/ImageDetection";
import VideoDetection from "./pages/VideoDetection";
import Dashboard from "./pages/Dashboard";
import EvidenceUpload from "./pages/EvidenceUpload";
import SubmitReport from "./components/SubmitReport";
import VoiceRecording from "./pages/VoiceRecording";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPortal />} />
        <Route path="/image-detect" element={<ImageDetection />} />
        <Route path="/video-detect" element={<VideoDetection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/evidence" element={<EvidenceUpload />} />
        <Route path="/voice-to-fir" element={<VoiceRecording />} />
        <Route path="/case-log" element={<Dashboard />} />
        <Route path="/submit-report" element={<SubmitReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
