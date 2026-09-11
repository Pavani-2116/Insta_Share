import {useEffect, useState} from 'react'
import UserStory from '../UserStory/UserStory'
import UserStoriesModal from '../UserStoriesModal/UserStoriesModal'
import FailureView from '../FailureView/FailureView'
import {API, authOptions} from '../../utils/api'
import './UserStories.css'

const UserStories = () => {
  const [stories, setStories] = useState([])
  const [status, setStatus] = useState('loading')
  const [selectedIndex, setSelectedIndex] = useState(null)

  const getStories = async () => {
    setStatus('loading')

    try {
      // Get stories from API
      const storiesResponse = await fetch(
        API.stories,
        authOptions(),
      )

      if (storiesResponse.status === 401) {
        document.cookie = 'jwt_token=; path=/; max-age=0'
        window.location.href = '/login'
        return
      }

      if (!storiesResponse.ok) {
        throw new Error('Stories request failed')
      }

      const storiesData = await storiesResponse.json()

      const storiesList = storiesData.users_stories || []

      // Get posts because posts API gives us profile pictures
      const postsResponse = await fetch(
        API.posts,
        authOptions(),
      )

      if (!postsResponse.ok) {
        throw new Error('Posts request failed')
      }

      const postsData = await postsResponse.json()

      const postsList = postsData.posts || []

      /*
        Create a profile picture map.

        user_id -> profile_pic

        Example:

        Rahul -> profile image
        Prabuddha_Dasgupta -> profile image
      */
      const profilePictures = {}

      postsList.forEach(post => {
        if (post.user_id && post.profile_pic) {
          profilePictures[post.user_id] = post.profile_pic
        }
      })

      /*
        Category names are kept here.
        No separate stories.js file is needed.
      */
      const categories = [
        {
          name: 'Coding',
          emoji: '💻',
        },
        {
          name: 'Travel',
          emoji: '✈️',
        },
        {
          name: 'Nature',
          emoji: '🌿',
        },
        {
          name: 'Lifestyle',
          emoji: '☕',
        },
        {
          name: 'Music',
          emoji: '🎵',
        },
        {
          name: 'Friends',
          emoji: '🫶',
        },
        {
          name: 'Food',
          emoji: '🍕',
        },
        {
          name: 'Devotional',
          emoji: '🙏',
        },
      ]

      /*
        Add profile picture and category to every story.
      */
      const updatedStories = storiesList.map(
        (story, index) => {
          const category = categories[index % categories.length]

          return {
            ...story,

            // Real profile picture from API
            profile_pic:
              profilePictures[story.user_id] ||
              story.story_url,

            // Category
            categoryName: category.name,
            categoryEmoji: category.emoji,
          }
        },
      )

      setStories(updatedStories)
      setStatus('success')
    } catch (error) {
      console.error('Stories Error:', error)
      setStatus('failure')
    }
  }

  useEffect(() => {
    getStories()
  }, [])

  // Open story
  const openStory = index => {
    setSelectedIndex(index)
  }

  // Close story
  const closeStory = () => {
    setSelectedIndex(null)
  }

  // Previous story
  const showPreviousStory = () => {
    setSelectedIndex(currentIndex => {
      if (currentIndex === null) {
        return null
      }

      if (currentIndex === 0) {
        return stories.length - 1
      }

      return currentIndex - 1
    })
  }

  // Next story
  const showNextStory = () => {
    setSelectedIndex(currentIndex => {
      if (currentIndex === null) {
        return null
      }

      if (currentIndex === stories.length - 1) {
        return 0
      }

      return currentIndex + 1
    })
  }

  // Loading
  if (status === 'loading') {
    return (
      <section className="stories-section">
        <div
          className="stories-loader"
          data-testid="loader"
        >
          <div className="spinner"></div>
        </div>
      </section>
    )
  }

  // Failure
  if (status === 'failure') {
    return (
      <section className="stories-section">
        <FailureView onRetry={getStories} />
      </section>
    )
  }

  // No stories
  if (stories.length === 0) {
    return null
  }

  const selectedStory =
    selectedIndex !== null
      ? stories[selectedIndex]
      : null

  return (
    <>
      <section className="stories-section">

        <div className="stories-list">

          {stories.map((story, index) => (
            <UserStory
              key={story.user_id}
              story={story}
              onClick={() => openStory(index)}
            />
          ))}

        </div>

      </section>

      {selectedStory && (
        <UserStoriesModal
          story={selectedStory}
          onClose={closeStory}
          onNext={showNextStory}
          onPrevious={showPreviousStory}
        />
      )}
    </>
  )
}

export default UserStories