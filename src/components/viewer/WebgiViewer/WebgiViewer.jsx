import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWebgiViewer } from './useWebgiViewer';


gsap.registerPlugin(ScrollTrigger);

const PREVIEW_CAMERA_POSITION = {
  x: 13.04,
  y: -2.01,
  z: 2.29,
}

const PREVIEW_CAMERA_TARGET = {
  x: 0.11,
  y: 0.0,
  z: 0.0,
}

const EXIT_CAMERA_POSITION = {
  desktop: { x: 1.56, y: 5.0, z: 0.01 },
  mobile: { x: 9.36, y: 10.95, z: 0.09 },
}

const EXIT_CAMERA_TARGET = {
  desktop: { x: -0.55, y: 0.32, z: 0.0 },
  mobile: { x: -1.62, y: 0.02, z: -0.06 },
}

const DISPLAY_SCROLL_TRIGGER = {
  trigger: '.display-section',
  start: 'top bottom',
  end: 'top top',
  scrub: 2,
  immediateRender: false
}

const WebgiViewer = forwardRef(({ onDeviceModeChange, onPreviewModeChange }, ref) => {

  const canvasRef = useRef(null)
  const [previewMode, setPreviewMode] = useState(false)
  const { cameraRef, isMobile, positionRef, targetRef, viewerRef } = useWebgiViewer({
    canvasRef,
    onDeviceModeChange,
  })

  const updateCamera = useCallback(() => {
    viewerRef?.setDirty() // Marks the scene as dirty so the viewer re-renders when the scene or camera changes.
    cameraRef?.positionTargetUpdated(true) // Called by ScrollTrigger. Responsible for updating the animation element's position.
  }, [cameraRef, viewerRef])

  const enablePreviewControls = useCallback(() => {
    // Enables pointer events on the canvas.
    viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true })
  }, [viewerRef])

  const setPreviewModeState = useCallback((nextPreviewMode) => {
    setPreviewMode(nextPreviewMode)
    onPreviewModeChange(nextPreviewMode)
  }, [onPreviewModeChange])

  useImperativeHandle(ref, () => ({
    triggerPreview() { // Responsible for triggering the preview animation.
      if (!viewerRef || !positionRef || !targetRef || !cameraRef) return

      setPreviewModeState(true)
      enablePreviewControls()

      gsap.to(positionRef, {
        ...PREVIEW_CAMERA_POSITION,
        duration: 2,
        onUpdate: updateCamera
      })

      gsap.to(targetRef, { ...PREVIEW_CAMERA_TARGET, duration: 2 })
    }
  }), [cameraRef, enablePreviewControls, positionRef, setPreviewModeState, targetRef, updateCamera, viewerRef])

  const handleExit = useCallback(() => {
    if (!viewerRef || !positionRef || !targetRef || !cameraRef) return

    const position = isMobile ? EXIT_CAMERA_POSITION.mobile : EXIT_CAMERA_POSITION.desktop
    const target = isMobile ? EXIT_CAMERA_TARGET.mobile : EXIT_CAMERA_TARGET.desktop

    viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false })
    setPreviewModeState(false)

    gsap.to(positionRef, {
      ...position,
      scrollTrigger: DISPLAY_SCROLL_TRIGGER,
      onUpdate: updateCamera
    });

    gsap.to(targetRef, {
      ...target,
      scrollTrigger: DISPLAY_SCROLL_TRIGGER
    })
  }, [cameraRef, isMobile, positionRef, setPreviewModeState, targetRef, updateCamera, viewerRef])

  return (
    <div id='webgi-canvas-container' className={previewMode ? 'is-preview-mode' : ''}>
      <canvas id='webgi-canvas' ref={canvasRef} />
      {
        previewMode && (
          <button className='button' onClick={handleExit}>Exit</button>
        )
      }
    </div>
  )
})

export default WebgiViewer
