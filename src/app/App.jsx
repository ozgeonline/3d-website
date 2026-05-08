import { useRef, useState } from "react";
import Loader from "@/components/layout/Loader";
import Nav from "@/components/layout/Nav";
import DisplaySection from "@/components/sections/DisplaySection";
import HeroSection from "@/components/sections/HeroSection";
import SoundSection from "@/components/sections/SoundSection";
import WebgiViewer from "@/components/viewer/WebgiViewer";
import { usePageLoaded } from "@/hooks/usePageLoaded";


function App() {
  const webgiViewerRef = useRef()
  const isPageLoaded = usePageLoaded()
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)

  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview()
  }

  const contentClassName = [
    "app-content",
    isPreviewMode ? "is-preview-mode" : "",
    isMobileOrTablet ? "mobile-or-tablet" : "",
  ].filter(Boolean).join(" ")

  return (
    <div className="App">
      {!isPageLoaded && <Loader />}
      <div className={contentClassName}>
        <Nav />
        <HeroSection />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview} />
      </div>
      <WebgiViewer
        ref={webgiViewerRef}
        onDeviceModeChange={setIsMobileOrTablet}
        onPreviewModeChange={setIsPreviewMode}
      />
    </div>
  );
}

export default App;
