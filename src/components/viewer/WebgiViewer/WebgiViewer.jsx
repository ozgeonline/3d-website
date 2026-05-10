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

const getPhoneScrollTriggers = () => (
  ScrollTrigger.getAll().filter(({ vars }) => vars.id?.startsWith('phone-'))
)

const setPhoneScrollTriggersEnabled = (isEnabled) => {
  getPhoneScrollTriggers().forEach((trigger) => {
    if (isEnabled) {
      trigger.enable(false)
      return
    }

    trigger.disable(false)
  })
}

const WebgiViewer = forwardRef(({ onDeviceModeChange, onPreviewModeChange, onViewerReady }, ref) => {

  const canvasRef = useRef(null)
  const cameraTweenRef = useRef(null)
  const [previewMode, setPreviewMode] = useState(false)
  const { cameraRef, isMobile, positionRef, targetRef, viewerRef } = useWebgiViewer({
    canvasRef,
    onDeviceModeChange,
    onViewerReady,
  })

  const updateCamera = useCallback(() => {
    viewerRef?.setDirty() // Marks the scene as dirty so the viewer re-renders when the scene or camera changes.
    cameraRef?.positionTargetUpdated(true) // Called by ScrollTrigger. Responsible for updating the animation element's position.
  }, [cameraRef, viewerRef])

  const enablePreviewControls = useCallback(() => {
    // Enables pointer events on the canvas.
    viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true })
  }, [viewerRef])

  const disablePreviewControls = useCallback(() => {
    viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false })
  }, [viewerRef])

  const animateCamera = useCallback(({ position, target, duration, onComplete }) => {
    cameraTweenRef.current?.kill()

    cameraTweenRef.current = gsap.timeline({
      defaults: {
        duration,
        ease: 'power2.out',
      },
      onUpdate: updateCamera,
      onComplete,
    })
      .to(positionRef, position, 0)
      .to(targetRef, target, 0)
  }, [positionRef, targetRef, updateCamera])

  const setPreviewModeState = useCallback((nextPreviewMode) => {
    setPreviewMode(nextPreviewMode)
    onPreviewModeChange(nextPreviewMode)
  }, [onPreviewModeChange])

  useImperativeHandle(ref, () => ({
    triggerPreview() { // Responsible for triggering the preview animation.
      if (!viewerRef || !positionRef || !targetRef || !cameraRef) return

      setPhoneScrollTriggersEnabled(false)
      setPreviewModeState(true)
      disablePreviewControls()

      animateCamera({
        position: PREVIEW_CAMERA_POSITION,
        target: PREVIEW_CAMERA_TARGET,
        duration: 2,
        onComplete: enablePreviewControls,
      })
    }
  }), [animateCamera, cameraRef, disablePreviewControls, enablePreviewControls, positionRef, setPreviewModeState, targetRef, viewerRef])

  const handleExit = useCallback(() => {
    if (!viewerRef || !positionRef || !targetRef || !cameraRef) return

    const position = isMobile ? EXIT_CAMERA_POSITION.mobile : EXIT_CAMERA_POSITION.desktop
    const target = isMobile ? EXIT_CAMERA_TARGET.mobile : EXIT_CAMERA_TARGET.desktop

    disablePreviewControls()
    setPreviewModeState(false)

    animateCamera({
      position,
      target,
      duration: 1,
      onComplete: () => {
        setPhoneScrollTriggersEnabled(true)
        ScrollTrigger.refresh()
      },
    })
  }, [animateCamera, cameraRef, disablePreviewControls, isMobile, positionRef, setPreviewModeState, targetRef, viewerRef])

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
