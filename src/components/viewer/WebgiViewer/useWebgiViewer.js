import { useCallback, useEffect, useState } from 'react'
import {
  ViewerApp, //eklentilerin entegre oldugu ana uygulama
  AssetManagerPlugin, //yonetim ve yuklenmeden sorumlu bir eklenti
  GBufferPlugin, //derinlik, normaller ve malzeme ozellikleri gibi cesitli bilgileri saklar
  ProgressivePlugin, //buyuk modellerin goruntulenmesi performansini artiran asamali goruntu olusturmayi etkinlestirir.
  TonemapPlugin,//parlakligi ve kontrasti ayarlayan ton eslemeyi uygular
  SSRPlugin,// goruntudeki yuzeylere gercekci yansimalar ekleyen ekran alani yansimalarini etkinlestirir.
  SSAOPlugin, //goruntudeki nesnelerin koselerine ve kenarlarina golgeler ekler
  BloomPlugin,//parlak nesnelerin etrafinda parlak bir etki yaratan ciceklenme ekler.
  GammaCorrectionPlugin,//farkli ekranlarda daha gercekci gorunmesi icin goruntunun parlakligini ayarlayan, olusturulan goruntuye gama duzeltmesi uygular.
  mobileAndTabletCheck
} from "webgi";
import { scrollAnimation } from '@/animations/scrollAnimation';

export const useWebgiViewer = ({ canvasRef, onDeviceModeChange, onViewerReady }) => {
  const [viewerRef, setViewerRef] = useState(null)
  const [targetRef, setTargetRef] = useState(null)
  const [cameraRef, setCameraRef] = useState(null)
  const [positionRef, setPositionRef] = useState(null)
  const [isMobile, setIsMobile] = useState(null)

  const memoziedScrollAnimation = useCallback(
    (position, target, isMobile, onUpdate) => {
      if(position && target && onUpdate) {
        scrollAnimation(position, target, isMobile, onUpdate)
      }
    }, []
  )

  const setupViewer = useCallback(async () => {
    if (!canvasRef.current) return

    try {
        // Initialize the viewer
      const viewer = new ViewerApp({
        canvas: canvasRef.current,
      })

      setViewerRef(viewer)
      const isMobileOrTablet = mobileAndTabletCheck()
      setIsMobile(isMobileOrTablet)
      onDeviceModeChange(isMobileOrTablet)

      const manager = await viewer.addPlugin(AssetManagerPlugin)
      const camera = viewer.scene.activeCamera;
      const position = camera.position;
      const target = camera.target;

      setCameraRef(camera)
      setPositionRef(position)
      setTargetRef(target)

      await viewer.addPlugin(GBufferPlugin)
      await viewer.addPlugin(new ProgressivePlugin(32))
      await viewer.addPlugin(new TonemapPlugin(true))
      await viewer.addPlugin(GammaCorrectionPlugin)
      await viewer.addPlugin(SSRPlugin)
      await viewer.addPlugin(SSAOPlugin)
      await viewer.addPlugin(BloomPlugin)

      viewer.renderer.refreshPipeline()

      await manager.addFromPath("scene-black.glb")

      //BG black. nav geri geldi
      viewer.getPlugin(TonemapPlugin).config.clipBackground = true

      //yuklendikten sonra kullanici 3d modeli dondurmemesi icin
      viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false})

      if (isMobileOrTablet) {
        position.set(-16.7, 1.17, 11.7)
        target.set(0, 1.37, 0)
      }

      window.scrollTo(0,0) //yeniden yuklemede ekran top tan baslayacak
      let needsUpdate = true;

      const onUpdate = () => {
        needsUpdate = true
        viewer.setDirty() //kamera ve kullanicinin guncellenmesi gerektigini belirtir.
      }
      //kamera guncellemesi
      viewer.addEventListener("preFrame", () => {
        if(needsUpdate) {
          camera.positionTargetUpdated(true)
          needsUpdate = false
        }
      })

      memoziedScrollAnimation(position, target, isMobileOrTablet, onUpdate)
      onViewerReady?.()

    } catch (error) {
      console.log(error);
    }

  },[canvasRef, memoziedScrollAnimation, onDeviceModeChange, onViewerReady])

  useEffect(() => {
    setupViewer()
  },[setupViewer])

  return {
    cameraRef,
    isMobile,
    positionRef,
    targetRef,
    viewerRef,
  }
}
