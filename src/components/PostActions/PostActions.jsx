import {useState} from 'react'
import {BsHeart, BsHeartFill} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {API, authOptions} from '../../utils/api'
import './PostActions.css'

const PostActions = ({
  postId,
  isLiked,
  likesCount,
  onLikeChange,
  onCommentClick,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const onClickLike = async () => {
    if (isLoading) {
      return
    }

    const newLikeStatus = !isLiked

    setIsLoading(true)

    try {
      const response = await fetch(
        API.like(postId),
        authOptions('POST', {
          like_status: newLikeStatus,
        }),
      )

      if (response.status === 401) {
        document.cookie =
          'jwt_token=; path=/; max-age=0'

        window.location.href = '/login'

        return
      }

      if (!response.ok) {
        throw new Error('Like request failed')
      }

      onLikeChange(newLikeStatus)

    } catch (error) {
      console.error('Like Error:', error)

    } finally {
      setIsLoading(false)
    }
  }

  const onClickShare = async () => {
    const shareUrl = window.location.href

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Insta Share',
          text: 'Check out this post',
          url: shareUrl,
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)

        alert('Post link copied')
      }

    } catch (error) {
      console.log('Share cancelled')
    }
  }

  return (
    <div className="post-actions">

      <div className="post-action-buttons">

        {/* LIKE */}
        <button
          type="button"
          className="action-button"
          data-testid={
            isLiked ? 'unLikeIcon' : 'likeIcon'
          }
          aria-label={
            isLiked ? 'Unlike' : 'Like'
          }
          onClick={onClickLike}
          disabled={isLoading}
        >
          {isLiked ? (
            <BsHeartFill className="liked-icon" />
          ) : (
            <BsHeart />
          )}
        </button>


        {/* COMMENT */}
        <button
          type="button"
          className="action-button"
          aria-label="Comment"
          onClick={onCommentClick}
        >
          <FaRegComment />
        </button>


        {/* SHARE */}
        <button
          type="button"
          className="action-button"
          aria-label="Share"
          onClick={onClickShare}
        >
          <BiShareAlt />
        </button>

      </div>


      {/* LIKES */}
      <p className="likes-count">
        {likesCount} likes
      </p>

    </div>
  )
}

export default PostActions