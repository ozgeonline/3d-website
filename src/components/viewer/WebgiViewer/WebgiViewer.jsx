import {
  forwardRef, //ana bilesenden bir alt bilesene bir basvuruyu iletir
  useCallback, //bagimliliklari degistiginde yeniden olusturulur
  useImperativeHandle, //ana bilesenin alt bilesenin ornegine zorunlu olarak erismesinin ve onu kontrol etmesinin bir yolu
  useRef,
  useState
} from 'react'
//useRef html ogesine referans alir. dom manipulasyonu
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //sayfanin kaydirilmasiyla tetiklenen animasyonlarda kullanilir.
import { useWebgiViewer } from './useWebgiViewer';


gsap.registerPlugin(ScrollTrigger); //ScrollTrigger eklentisini GSAP'ye kaydeder. Eklentiyi GSAP ile kullanmak icin bu gereklidir.

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
    viewerRef?.setDirty()
    //yeniden olusturulmasi gerektigi anlamina geliyor. Bu, sahne veya kamera degistiginde gereklidir;
    //boylece izleyici, sahnenin ve kameranin yeni durumunu yansitacak sekilde ekrani guncelleyebilir.
    cameraRef?.positionTargetUpdated(true) //ScrollTrigger tarafindan cagrilir.Animasyon ogesinin konumunun guncellenmesinden sorumludur.
  }, [cameraRef, viewerRef])

  const enablePreviewControls = useCallback(() => {
    //Canvas da points olaylarini etkinlestirir.
    viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true })
  }, [viewerRef])

  const setPreviewModeState = useCallback((nextPreviewMode) => {
    setPreviewMode(nextPreviewMode)
    onPreviewModeChange(nextPreviewMode)
  }, [onPreviewModeChange])

  useImperativeHandle(ref, () => ({
    triggerPreview() { //onizleme animasyonunun tetiklenmesinden sorumludur.
      if (!viewerRef || !positionRef || !targetRef || !cameraRef) return

      setPreviewModeState(true)
      enablePreviewControls()

      gsap.to(positionRef, {
        ...PREVIEW_CAMERA_POSITION,
        duration: 2,
        onUpdate: updateCamera
      })

      gsap.to(targetRef, { ...PREVIEW_CAMERA_TARGET, duration: 2})
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
  },[cameraRef, isMobile, positionRef, setPreviewModeState, targetRef, updateCamera, viewerRef])

  return (
    <div id='webgi-canvas-container' className={previewMode ? 'is-preview-mode' : ''}>
      <canvas id='webgi-canvas' ref={canvasRef}/>
      {
        previewMode && (
          <button className='button' onClick={handleExit}>Exit</button>
        )
      }
    </div>
  )
})

export default WebgiViewer
