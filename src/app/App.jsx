import { useCallback, useRef, useState } from "react";
import Loader from "@/components/layout/Loader";
import Nav from "@/components/layout/Nav";
import DisplaySection from "@/components/sections/DisplaySection";
import HeroSection from "@/components/sections/HeroSection";
import SoundSection from "@/components/sections/SoundSection";
import ScrollTopButton from "@/components/ui/ScrollTopButton";
import WebgiViewer from "@/components/viewer/WebgiViewer";
import { usePageLoaded } from "@/hooks/usePageLoaded";


function App() {
  const webgiViewerRef = useRef()
  const isPageLoaded = usePageLoaded()
  const [isViewerReady, setIsViewerReady] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)
  const isAppReady = isPageLoaded && isViewerReady

  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview()
  }

  const handleViewerReady = useCallback(() => {
    setIsViewerReady(true)
  }, [])

  const contentClassName = [
    "app-content",
    isPreviewMode ? "is-preview-mode" : "",
    isMobileOrTablet ? "mobile-or-tablet" : "",
  ].filter(Boolean).join(" ")

  return (
    <div className="App">
      {!isAppReady && <Loader />}
      <div className={contentClassName}>
        <Nav />
        <HeroSection />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview} />
        <ScrollTopButton />
      </div>
      <WebgiViewer
        ref={webgiViewerRef}
        onDeviceModeChange={setIsMobileOrTablet}
        onPreviewModeChange={setIsPreviewMode}
        onViewerReady={handleViewerReady}
      />
    </div>
  );
}

export default App;
