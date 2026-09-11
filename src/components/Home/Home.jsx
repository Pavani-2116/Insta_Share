import {useState} from 'react'
import Header from '../Header/Header'
import UserStories from '../UserStories/UserStories'
import PostsList from '../PostsList/PostsList'
import {API} from '../../utils/api'
import './Home.css'

const Home = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchUrl, setSearchUrl] = useState(null)

  const onSearch = event => {
    event.preventDefault()

    const searchValue = searchInput.trim()

    if (searchValue === '') {
      setSearchUrl(null)
      return
    }

    setSearchUrl(API.search(searchValue))
  }

  const clearSearch = () => {
    setSearchInput('')
    setSearchUrl(null)
  }

  return (
    <div className="home-page">
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={onSearch}
      />

      <main className="home-content">
        <UserStories />

        <section className="posts-wrapper">
          {searchUrl && (
            <div className="search-result-header">
              <p>
                Search results for:
                <strong> {searchInput}</strong>
              </p>

              <button
                type="button"
                onClick={clearSearch}
              >
                Clear
              </button>
            </div>
          )}

          <PostsList searchUrl={searchUrl} />
        </section>
      </main>
    </div>
  )
}

export default Home