import { useEffect, useState } from 'preact/hooks'
import { createPortal } from 'preact/compat'
import type { Project } from '../types/projects'

type ProjectModalProps = {
  projects: Project[]
}

const ProjectModal = ({ projects }: ProjectModalProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const handleCardClick = (e: Event) => {
      const target = e.target as HTMLElement
      const card = target.closest('.card') as HTMLElement
      if (card) {
        const projectId = card.dataset.projectId
        const project = projects.find(p => p.id === projectId)
        if (project) {
          setSelectedProject(project)
          setCurrentImageIndex(0)
        }
      }
    }

    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', handleCardClick)
    })

    return () => {
      document.querySelectorAll('.card').forEach(card => {
        card.removeEventListener('click', handleCardClick)
      })
    }
  }, [projects])

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const closeModal = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const images = selectedProject?.images || []
  const hasMultipleImages = images.length > 1

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length)
  }

  const modalContent = selectedProject ? (
    <div class="modal-overlay" onClick={closeModal}>
      <div class="modal-container" onClick={e => e.stopPropagation()}>
        <button class="close-button" onClick={closeModal}>
          ×
        </button>

        <div class="modal-content">
          <div class="modal-header">
            <h1 class="project-title">
              {selectedProject.name} <span class="year">{selectedProject.year}</span>
            </h1>
            <div class="project-icons">
              {selectedProject.icons.map(icon => (
                <span class="icon-badge">{icon}</span>
              ))}
            </div>
          </div>

          {images.length > 0 && (
            <div class="image-gallery">
              <img
                src={`${import.meta.env.PUBLIC_POCKETBASE_IMAGES_URL}/${selectedProject.collectionName}/${selectedProject.id}/${images[currentImageIndex]}`}
                alt={selectedProject.name}
                class="gallery-image"
              />
              {hasMultipleImages && (
                <>
                  <button class="nav-button prev" onClick={prevImage}>
                    ‹
                  </button>
                  <button class="nav-button next" onClick={nextImage}>
                    ›
                  </button>
                  <div class="image-indicators">
                    {images.map((_, index) => (
                      <button
                        class={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div class="project-description">
            <p>{selectedProject.long_desc || selectedProject.short_desc}</p>
          </div>

          {selectedProject.go_to && (
            <a
              href={selectedProject.go_to}
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
            >
              View Project →
            </a>
          )}
        </div>
      </div>
    </div>
  ) : null

  const modalRoot = typeof document !== 'undefined' ? document.getElementById('modal-root') : null

  if (!modalRoot || !modalContent) return null

  return createPortal(modalContent, modalRoot)
}

export default ProjectModal
