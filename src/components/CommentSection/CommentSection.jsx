import './CommentSection.css'

const CommentSection = ({comments = []}) => {
  if (!comments || comments.length === 0) {
    return null
  }

  return (
    <div className="comments-section">

      {comments.map((comment, index) => (
        <div
          className="comment-item"
          key={
            comment.comment_id ||
            `${comment.user_id}-${index}`
          }
        >
          <span className="comment-user">
            {comment.user_name}
          </span>

          <span className="comment-text">
            {comment.comment}
          </span>
        </div>
      ))}

    </div>
  )
}

export default CommentSection