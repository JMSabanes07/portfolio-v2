// @ts-ignore
window.scrollToAnchor = function (id) {
  const element = document.querySelector(`[section-id="${id}"]`)
  if (element) {
    const offset = 50 // Ajusta según el tamaño del header
    const top = element.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}

// Get all sections and navigation links
const sections = document.querySelectorAll('[section-id]') // Select all divs with IDs
const navLinks = document.querySelectorAll('#nav li a')

// Intersection Observer configuration
const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 0.8, // Trigger when 80% of the section is visible
}

// Create the Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // Get the ID of the section being observed
    const id = entry.target.getAttribute('section-id')

    // Find the corresponding navigation link
    const correspondingLink = document.querySelector(`#nav li[data-id="${id}"] a`)

    // // If the section is in view, add the active class
    if (entry.isIntersecting) {
      // Remove active class from all links
      navLinks.forEach(link => link.classList.remove('active'))

      // Add active class to the corresponding link
      if (correspondingLink) {
        correspondingLink.classList.add('active')
      }
    }
  })
}, observerOptions)

// // Observe all sections (divs with IDs)
sections.forEach(section => {
  observer.observe(section)
})
