import './FailureView.css'

const FailureView = ({onRetry}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/insta-share/failure-view.png"
        alt="failure view"
        className="failure-image"
      />

      <h1 className="failure-title">
        Something went wrong
      </h1>

      <p className="failure-description">
        We are having trouble loading this page.
        Please try again.
      </p>

      <button
        type="button"
        className="retry-button"
        onClick={handleRetry}
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView