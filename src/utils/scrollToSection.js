export const scrollToSection = (selector) => {
  const section = document.querySelector(selector)

  if (!section) return

  const sectionTop = section.getBoundingClientRect().top + window.scrollY

  window.scrollTo({
    top: sectionTop,
    left: 0,
    behavior: 'smooth',
  })
}
