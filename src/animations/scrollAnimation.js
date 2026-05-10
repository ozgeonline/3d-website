import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const createPhoneScrollTriggerId = (section, property) => `phone-${section}-${property}`
const CAMERA_SCRUB = 1.8

const createSoundScrollTrigger = (property) => ({
  id: createPhoneScrollTriggerId('sound', property),
  trigger: '.sound-section',
  start: 'top bottom',
  end: 'top top', //The image ends when the top part reaches the very top of the image area.
  scrub: CAMERA_SCRUB,
})

const createDisplayScrollTrigger = (property) => ({
  id: createPhoneScrollTriggerId('display', property),
  trigger: '.display-section',
  start: 'top 85%',
  end: 'top top',
  scrub: CAMERA_SCRUB,
})

export const scrollAnimation = (position, target, isMobile, onUpdate) => {
  gsap.set('.sound-section-content', { opacity: 0 })
  gsap.set('.display-section', { opacity: 0 })

  gsap.to(position, {
    x: !isMobile ? -3.38 : -7.0,
    y: !isMobile ? -10.74 : -12.2,
    z: !isMobile ? -5.93 : -6.0,

    scrollTrigger: createSoundScrollTrigger('position'),
    immediateRender: false, //It won't work until the animation is triggered
    onUpdate,
  })

  gsap.to(target, {
    x: !isMobile ? 1.52 : 0.7,
    y: !isMobile ? 0.77 : 1.9,
    z: !isMobile ? -1.08 : 0.7,
    scrollTrigger: createSoundScrollTrigger('target'),
    immediateRender: false,
  })

  gsap.to('.hero-section', {
    opacity: 0,
    scrollTrigger: createSoundScrollTrigger('hero'),
    immediateRender: false,
  })

  gsap.to('.sound-section-content', {
    opacity: 1,
    scrollTrigger: createSoundScrollTrigger('content'),
    immediateRender: false,
  })

  gsap.to(position, {
    x: !isMobile ? 1.56 : 9.36,
    y: !isMobile ? 5.0 : 10.95,
    z: !isMobile ? 0.01 : 0.09,
    scrollTrigger: createDisplayScrollTrigger('position'),
    immediateRender: false,
    onUpdate,
  })

  gsap.to(target, {
    x: !isMobile ? -0.55 : -1.62,
    y: !isMobile ? 0.32 : 0.02,
    z: !isMobile ? 0.0 : -0.06,
    scrollTrigger: createDisplayScrollTrigger('target'),
    immediateRender: false,
  })

  gsap.to('.display-section', {
    opacity: 1,
    scrollTrigger: createDisplayScrollTrigger('content'),
    immediateRender: false,
  })

  ScrollTrigger.refresh()
}
