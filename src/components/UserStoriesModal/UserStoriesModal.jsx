import {useEffect, useState} from 'react'
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPaperPlane,
} from 'react-icons/fa'
import './UserStoriesModal.css'

const UserStoriesModal = ({
  story,
  onClose,
  onNext,
  onPrevious,
}) => {
  const [message, setMessage] = useState('')
  const [sentMessage, setSentMessage] = useState('')

  /*
    Close with Escape key.
  */
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  /*
    Clear message when changing story.
  */
  useEffect(() => {
    setMessage('')
    setSentMessage('')
  }, [story])

  if (!story) {
    return null
  }

  /*
    Send message.
    
    IMPORTANT:
    The Insta Share assignment does not provide
    a story-message API.

    So this is a working frontend interaction.
  */
  const submitMessage = event => {
    event.preventDefault()

    const text = message.trim()

    if (!text) {
      return
    }

    setSentMessage(text)
    setMessage('')
  }

  /*
    Previous button.
  */
  const handlePrevious = event => {
    event.stopPropagation()
    onPrevious()
  }

  /*
    Next button.
  */
  const handleNext = event => {
    event.stopPropagation()
    onNext()
  }

  return (
    <div
      className="story-modal-overlay"
      onClick={onClose}
    >

      <div
        className="story-viewer"
        onClick={event =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="story-viewer-top">

          <div className="story-viewer-user">

            <img
              src={story.profile_pic}
              alt={`${story.user_name} profile`}
              className="story-viewer-profile"
            />

            <div>
              <p className="story-viewer-name">
                {story.user_name}
              </p>

              <p className="story-viewer-time">
                Just now
              </p>
            </div>

          </div>

          <button
            type="button"
            className="story-close-button"
            onClick={onClose}
            aria-label="Close story"
          >
            <FaTimes />
          </button>

        </div>

        {/* PROGRESS */}

        <div className="story-progress-container">
          <div className="story-progress"></div>
        </div>

        {/* IMAGE */}

        <div className="story-image-wrapper">

          <img
            src={story.story_url}
            alt={`${story.user_name} story`}
            className="story-viewer-image"
          />

          {/* PREVIOUS */}

          <button
            type="button"
            className="story-navigation story-left-button"
            onClick={handlePrevious}
            aria-label="Previous story"
          >
            <FaChevronLeft />
          </button>

          {/* NEXT */}

          <button
            type="button"
            className="story-navigation story-right-button"
            onClick={handleNext}
            aria-label="Next story"
          >
            <FaChevronRight />
          </button>

          {/* CATEGORY */}

          <div className="story-category">
            <span>
              {story.categoryEmoji}
            </span>

            <span>
              {story.categoryName}
            </span>
          </div>

        </div>

        {/* MESSAGE */}

        <div className="story-bottom">

          {sentMessage && (
            <div className="sent-message">
              <span>✓</span>
              Message sent: "{sentMessage}"
            </div>
          )}

          <form
            className="story-reply-box"
            onSubmit={submitMessage}
          >

            <input
              type="text"
              value={message}
              onChange={event =>
                setMessage(event.target.value)
              }
              placeholder={`Message ${story.user_name}...`}
              aria-label="Send message"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default UserStoriesModal