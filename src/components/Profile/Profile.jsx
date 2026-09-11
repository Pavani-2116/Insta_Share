import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './Profile.css'

const Profile = ({profile, isMine = false}) => {
  const posts = profile.posts || []

  return (
    <section className="profile-page">

      {/* PROFILE HEADER */}

      <div className="profile-top">

        <img
          className="profile-avatar"
          src={profile.profile_pic}
          alt={isMine ? 'my profile' : 'user profile'}
        />

        <div className="profile-info">

          <h1>{profile.user_name}</h1>

          <div className="profile-stats">

            <span>
              <b>{profile.posts_count ?? posts.length}</b>
              {' '}posts
            </span>

            <span>
              <b>{profile.followers_count ?? 0}</b>
              {' '}followers
            </span>

            <span>
              <b>{profile.following_count ?? 0}</b>
              {' '}following
            </span>

          </div>

          <p>{profile.user_bio}</p>

        </div>

      </div>

      <div className="profile-divider" />

      {/* POSTS HEADING */}

      <h2 className="posts-heading">
        <BsGrid3X3 />
        {' '}Posts
      </h2>

      {/* POSTS */}

      {posts.length === 0 ? (

        <div className="no-posts">

          <BiCamera />

          <h3>No Posts</h3>

          <p>
            When you share photos, they will appear here.
          </p>

        </div>

      ) : (

        <div className="profile-grid">

          {posts.map((post, index) => (

            <div
              className="profile-post"
              key={post.id || post.post_id || index}
            >

              <img
                src={post.image}
                alt={isMine ? 'my post' : 'user post'}
                className="profile-post-image"
              />

            </div>

          ))}

        </div>

      )}

    </section>
  )
}

export default Profile