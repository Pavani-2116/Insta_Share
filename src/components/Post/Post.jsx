import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import PostActions from '../PostActions/PostActions'
import CommentSection from '../CommentSection/CommentSection'
import './Post.css'

const Post = ({post}) => {
  const navigate = useNavigate()

  const postDetails = post.post_details || {}

  const [isLiked, setIsLiked] = useState(Boolean(post.liked))
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)

  const [comments, setComments] = useState(
    Array.isArray(post.comments) ? post.comments : [],
  )

  const [commentText, setCommentText] = useState('')

  const onLikeChange = liked => {
    setIsLiked(liked)

    setLikesCount(previousCount =>
      liked
        ? previousCount + 1
        : Math.max(0, previousCount - 1),
    )
  }

  const onClickProfile = () => {
    navigate(`/users/${post.user_id}`)
  }

  const onSubmitComment = event => {
    event.preventDefault()

    const trimmedComment = commentText.trim()

    if (trimmedComment === '') {
      return
    }

    const newComment = {
      comment_id: `${post.post_id}-${Date.now()}`,
      user_id: 'rahul',
      user_name: 'Rahul',
      comment: trimmedComment,
    }

    setComments(previousComments => [
      ...previousComments,
      newComment,
    ])

    setCommentText('')
  }

  const onCommentClick = () => {
    const input = document.getElementById(
      `comment-${post.post_id}`,
    )

    if (input) {
      input.focus()
    }
  }

  return (
    <article className="post-card">

      {/* POST HEADER */}
      <div className="post-header">

        <button
          type="button"
          className="post-user-button"
          onClick={onClickProfile}
        >
          <img
            src={post.profile_pic}
            alt={post.user_name}
            className="post-profile-image"
          />

          <span className="post-user-name">
            {post.user_name}
          </span>
        </button>

      </div>

      {/* POST IMAGE */}
      <img
        src={postDetails.image_url}
        alt="post"
        className="post-image"
      />

      {/* POST CONTENT */}
      <div className="post-content">

        {/* LIKE / COMMENT / SHARE */}
        <PostActions
          postId={post.post_id}
          isLiked={isLiked}
          likesCount={likesCount}
          onLikeChange={onLikeChange}
          onCommentClick={onCommentClick}
        />

        {/* CAPTION */}
        <p className="post-caption">
          <strong>{post.user_name}</strong>{' '}
          {postDetails.caption}
        </p>

        {/* EXISTING COMMENTS */}
        <CommentSection comments={comments} />

        {/* ADD COMMENT */}
        <form
          className="comment-form"
          onSubmit={onSubmitComment}
        >
          <input
            id={`comment-${post.post_id}`}
            type="text"
            value={commentText}
            onChange={event =>
              setCommentText(event.target.value)
            }
            placeholder="Add a comment..."
          />

          <button
            type="submit"
            disabled={commentText.trim() === ''}
          >
            Post
          </button>
        </form>

      </div>

    </article>
  )
}

export default Post