import {useEffect, useState} from 'react'
import Post from '../Post/Post'
import FailureView from '../FailureView/FailureView'
import {API, authOptions} from '../../utils/api'
import './PostsList.css'

const PostsList = ({searchUrl = null}) => {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading')

  const getPosts = async () => {
    setStatus('loading')

    try {
      const url = searchUrl || API.posts

      const response = await fetch(
        url,
        authOptions(),
      )

      // JWT expired / invalid
      if (response.status === 401) {
        document.cookie =
          'jwt_token=; path=/; max-age=0'

        window.location.href = '/login'
        return
      }

      // Other API errors
      if (!response.ok) {
        throw new Error('Posts request failed')
      }

      const data = await response.json()

      setPosts(data.posts || [])
      setStatus('success')
    } catch (error) {
      console.error('Posts Error:', error)
      setStatus('failure')
    }
  }

  useEffect(() => {
    getPosts()
  }, [searchUrl])

  // LOADING
  if (status === 'loading') {
    return (
      <div
        className="posts-loader"
        data-testid="loader"
      >
        <div className="posts-spinner"></div>
      </div>
    )
  }

  // API FAILURE
  if (status === 'failure') {
    return (
      <FailureView
        onRetry={getPosts}
      />
    )
  }

  // SEARCH HAS NO RESULTS
  if (posts.length === 0 && searchUrl) {
    return (
      <div className="search-not-found">
        <div className="search-icon">
          🔍
        </div>

        <h2>
          Search Not Found
        </h2>

        <p>
          Sorry, we couldn't find any posts matching your search.
        </p>
      </div>
    )
  }

  // HOME HAS NO POSTS
  if (posts.length === 0) {
    return (
      <div className="no-posts">
        <h2>
          No Posts Found
        </h2>

        <p>
          There are no posts available right now.
        </p>
      </div>
    )
  }

  // POSTS
  return (
    <section className="posts-list">
      {posts.map(eachPost => (
        <Post
          key={eachPost.post_id}
          post={eachPost}
        />
      ))}
    </section>
  )
}

export default PostsList