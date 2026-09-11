import './UserStory.css'

const UserStory = ({story, onClick}) => {
  return (
    <button
      type="button"
      className="story-item"
      onClick={onClick}
      aria-label={`Open ${story.user_name} story`}
    >
      <div className="story-image-container">

        <img
          src={story.profile_pic}
          alt={`${story.user_name} profile`}
          className="story-image"
        />

      </div>

      <p className="story-user-name">
        {story.user_name}
      </p>

      <span className="story-category-name">
        {story.categoryEmoji} {story.categoryName}
      </span>
    </button>
  )
}

export default UserStory