import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {BsGrid3X3, BsHeartFill} from 'react-icons/bs'
import {FaRegComment, FaTimes} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Header from '../Header/Header'
import {API, authOptions} from '../../utils/api'
import './MyProfile.css'

const PROFILE_STORAGE_KEY = 'insta_share_profile_edits'

const MyProfile = () => {
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState('loading')

  const [selectedPost, setSelectedPost] = useState(null)
  const [postStatus, setPostStatus] = useState('idle')

  const [showEditModal, setShowEditModal] = useState(false)

  const [editForm, setEditForm] = useState({
    username: '',
    name: '',
    bio: '',
    profilePic: '',
  })

  /* =========================================
     GET PROFILE
  ========================================= */

  const getMyProfile = async () => {
    setStatus('loading')

    try {
      const response = await fetch(
        API.myProfile,
        authOptions(),
      )

      if (response.status === 401) {
        document.cookie = 'jwt_token=; path=/; max-age=0'

        navigate('/login', {replace: true})
        return
      }

      if (!response.ok) {
        throw new Error('Profile request failed')
      }

      const data = await response.json()

      const profileData = data.profile || data

      /*
        Get locally edited profile data if available.
      */
      const savedEdits =
        JSON.parse(
          localStorage.getItem(PROFILE_STORAGE_KEY),
        ) || {}

      const updatedProfile = {
        ...profileData,
        ...savedEdits,
      }

      setProfile(updatedProfile)

      setEditForm({
        username:
          updatedProfile.user_name || '',
        name:
          updatedProfile.name ||
          updatedProfile.user_name ||
          '',
        bio:
          updatedProfile.user_bio ||
          updatedProfile.bio ||
          '',
        profilePic:
          updatedProfile.profile_pic ||
          '',
      })

      setStatus('success')
    } catch (error) {
      console.error('My Profile Error:', error)

      setStatus('failure')
    }
  }

  useEffect(() => {
    getMyProfile()
  }, [])


  /* =========================================
     OPEN EDIT PROFILE
  ========================================= */

  const onClickEditProfile = () => {
    setEditForm({
      username:
        profile.user_name || '',
      name:
        profile.name ||
        profile.user_name ||
        '',
      bio:
        profile.user_bio ||
        profile.bio ||
        '',
      profilePic:
        profile.profile_pic ||
        '',
    })

    setShowEditModal(true)
  }


  /* =========================================
     EDIT FORM CHANGE
  ========================================= */

  const onChangeEditForm = event => {
    const {name, value} = event.target

    setEditForm(previousForm => ({
      ...previousForm,
      [name]: value,
    }))
  }


  /* =========================================
     SAVE PROFILE
  ========================================= */

  const onSaveProfile = event => {
    event.preventDefault()

    const updatedProfile = {
      ...profile,

      user_name: editForm.username.trim(),
      name: editForm.name.trim(),
      user_bio: editForm.bio.trim(),
      profile_pic: editForm.profilePic.trim(),
    }

    /*
      Save locally because the Insta Share API
      does not provide an Edit Profile endpoint.
    */
    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({
        user_name: updatedProfile.user_name,
        name: updatedProfile.name,
        user_bio: updatedProfile.user_bio,
        profile_pic: updatedProfile.profile_pic,
      }),
    )

    setProfile(updatedProfile)

    setShowEditModal(false)
  }


  /* =========================================
     CLOSE EDIT MODAL
  ========================================= */

  const onCloseEditModal = () => {
    setShowEditModal(false)
  }


  /* =========================================
     OPEN POST
  ========================================= */

  const onClickPost = async post => {
    setPostStatus('loading')
    setSelectedPost(null)

    try {
      /*
        Profile API gives only:
        id + image

        Posts API gives:
        post_id
        user_id
        user_name
        profile_pic
        post_details
        likes_count
        comments
        created_at
      */

      const response = await fetch(
        API.posts,
        authOptions(),
      )

      if (response.status === 401) {
        document.cookie =
          'jwt_token=; path=/; max-age=0'

        navigate('/login', {replace: true})

        return
      }

      if (!response.ok) {
        throw new Error('Posts request failed')
      }

      const data = await response.json()

      const allPosts = data.posts || []

      /*
        Find the clicked profile post
        using its image URL.
      */

      const completePost = allPosts.find(
        eachPost =>
          eachPost.post_details &&
          eachPost.post_details.image_url ===
            post.image,
      )

      if (completePost) {
        setSelectedPost(completePost)
      } else {
        /*
          Fallback if the API doesn't return
          the matching post.
        */

        setSelectedPost({
          post_id: post.id,
          user_id:
            profile.user_id ||
            profile.user_name,
          user_name:
            profile.user_name,
          profile_pic:
            profile.profile_pic,
          post_details: {
            image_url: post.image,
            caption: '',
          },
          likes_count: 0,
          comments: [],
          created_at: '',
        })
      }

      setPostStatus('success')
    } catch (error) {
      console.error('Post Error:', error)

      setPostStatus('failure')
    }
  }


  /* =========================================
     CLOSE POST MODAL
  ========================================= */

  const onClosePost = () => {
    setSelectedPost(null)
    setPostStatus('idle')
  }


  /* =========================================
     LOADING
  ========================================= */

  if (status === 'loading') {
    return (
      <div className="profile-page">

        <Header />

        <div
          className="profile-loader"
          data-testid="loader"
        >
          <div className="profile-spinner"></div>
        </div>

      </div>
    )
  }


  /* =========================================
     FAILURE
  ========================================= */

  if (status === 'failure') {
    return (
      <div className="profile-page">

        <Header />

        <div className="profile-message">

          <img
            src="https://assets.ccbp.in/frontend/react-js/insta-share-failure-view.png"
            alt="failure view"
            className="failure-image"
          />

          <h2>
            Something went wrong
          </h2>

          <p>
            We are having trouble loading your
            profile. Please try again.
          </p>

          <button
            type="button"
            onClick={getMyProfile}
            className="try-again-button"
          >
            Try again
          </button>

        </div>

      </div>
    )
  }


  if (!profile) {
    return (
      <div className="profile-page">

        <Header />

        <div className="profile-message">

          <h2>
            Profile not found
          </h2>

        </div>

      </div>
    )
  }


  /* =========================================
     PROFILE DATA
  ========================================= */

  const posts =
    profile.posts ||
    profile.user_posts ||
    []

  const username =
    profile.user_name ||
    'Rahul'

  const name =
    profile.name ||
    profile.user_name ||
    'Rahul'

  const bio =
    profile.user_bio ||
    profile.bio ||
    ''

  const profileImage =
    profile.profile_pic ||
    profile.profile_image

  const postsCount =
    profile.posts_count !== undefined
      ? profile.posts_count
      : posts.length

  const followersCount =
    profile.followers_count || 0

  const followingCount =
    profile.following_count || 0


  return (
    <div className="profile-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <Header
        searchInput=""
        setSearchInput={() => {}}
        onSearch={event =>
          event.preventDefault()
        }
      />


      {/* =====================================
          PROFILE CONTENT
      ===================================== */}

      <main className="profile-container">

        {/* PROFILE HEADER */}

        <section className="profile-header">

          {/* PROFILE IMAGE */}

          <div className="profile-image-wrapper">

            <img
              src={profileImage}
              alt="my profile"
              className="profile-image"
            />

          </div>


          {/* PROFILE INFO */}

          <div className="profile-information">

            {/* USERNAME + EDIT */}

            <div className="profile-title-row">

              <h1 className="profile-username">
                {username}
              </h1>

              <button
                type="button"
                className="edit-profile-button"
                onClick={onClickEditProfile}
              >
                Edit profile
              </button>

            </div>


            {/* STATS */}

            <div className="profile-stats">

              <div className="profile-stat">
                <strong>
                  {postsCount}
                </strong>

                <span>
                  posts
                </span>
              </div>


              <div className="profile-stat">
                <strong>
                  {followersCount}
                </strong>

                <span>
                  followers
                </span>
              </div>


              <div className="profile-stat">
                <strong>
                  {followingCount}
                </strong>

                <span>
                  following
                </span>
              </div>

            </div>


            {/* NAME */}

            <h2 className="profile-name">
              {name}
            </h2>


            {/* BIO */}

            {bio && (
              <p className="profile-bio">
                {bio}
              </p>
            )}

          </div>

        </section>


        {/* DIVIDER */}

        <div className="profile-divider"></div>


        {/* =================================
            POSTS
        ================================= */}

        <section className="profile-posts">

          <div className="posts-title">

            <BsGrid3X3 />

            <h2>
              Posts
            </h2>

          </div>


          {posts.length === 0 ? (

            <div className="no-profile-posts">

              <div className="empty-post-icon">
                <BsGrid3X3 />
              </div>

              <h2>
                No Posts Yet
              </h2>

              <p>
                When you share photos,
                they will appear here.
              </p>

            </div>

          ) : (

            <div className="profile-post-grid">

              {posts.map((post, index) => (

                <button
                  type="button"
                  className="profile-post-item"
                  key={post.id || index}
                  onClick={() =>
                    onClickPost(post)
                  }
                >

                  <img
                    src={post.image}
                    alt="my post"
                    className="profile-post-image"
                  />

                  <div className="post-hover">

                    <span>
                      View post
                    </span>

                  </div>

                </button>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* =====================================
          EDIT PROFILE MODAL
      ===================================== */}

      {showEditModal && (

        <div
          className="modal-overlay"
          onClick={onCloseEditModal}
        >

          <div
            className="edit-modal"
            onClick={event =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <h2>
                Edit Profile
              </h2>

              <button
                type="button"
                className="modal-close-button"
                onClick={onCloseEditModal}
              >
                <FaTimes />
              </button>

            </div>


            <form
              className="edit-profile-form"
              onSubmit={onSaveProfile}
            >

              {/* USERNAME */}

              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={editForm.username}
                onChange={onChangeEditForm}
                required
              />


              {/* NAME */}

              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={editForm.name}
                onChange={onChangeEditForm}
                required
              />


              {/* BIO */}

              <label htmlFor="bio">
                Bio
              </label>

              <textarea
                id="bio"
                name="bio"
                value={editForm.bio}
                onChange={onChangeEditForm}
                rows="4"
                maxLength="150"
                placeholder="Write something about yourself..."
              />


              {/* PROFILE IMAGE URL */}

              <label htmlFor="profilePic">
                Profile Picture URL
              </label>

              <input
                id="profilePic"
                name="profilePic"
                type="url"
                value={editForm.profilePic}
                onChange={onChangeEditForm}
                placeholder="https://..."
              />


              {/* BUTTONS */}

              <div className="edit-form-buttons">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={onCloseEditModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  Save
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =====================================
          POST MODAL
      ===================================== */}

      {postStatus === 'loading' && (

        <div className="modal-overlay">

          <div className="post-modal-loading">

            <div className="profile-spinner"></div>

          </div>

        </div>

      )}


      {postStatus === 'failure' && (

        <div
          className="modal-overlay"
          onClick={onClosePost}
        >

          <div
            className="post-modal-error"
            onClick={event =>
              event.stopPropagation()
            }
          >

            <h2>
              Unable to open post
            </h2>

            <button
              type="button"
              onClick={onClosePost}
            >
              Close
            </button>

          </div>

        </div>

      )}


      {selectedPost && postStatus === 'success' && (

        <div
          className="modal-overlay"
          onClick={onClosePost}
        >

          <div
            className="post-detail-modal"
            onClick={event =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              className="post-modal-close"
              onClick={onClosePost}
              aria-label="Close post"
            >
              <FaTimes />
            </button>


            {/* POST */}

            <div className="post-modal-left">

              <img
                src={
                  selectedPost.post_details
                    ?.image_url
                }
                alt="post"
                className="post-modal-image"
              />

            </div>


            <div className="post-modal-right">

              {/* AUTHOR */}

              <div className="post-modal-author">

                <img
                  src={
                    selectedPost.profile_pic
                  }
                  alt="post author profile"
                />

                <strong>
                  {selectedPost.user_name}
                </strong>

              </div>


              {/* CAPTION */}

              {selectedPost.post_details
                ?.caption && (

                <div className="post-modal-caption">

                  <strong>
                    {selectedPost.user_name}
                  </strong>

                  <span>
                    {' '}
                    {selectedPost.post_details.caption}
                  </span>

                </div>

              )}


              {/* COMMENTS */}

              <div className="post-modal-comments">

                {selectedPost.comments &&
                selectedPost.comments.length > 0 ? (

                  selectedPost.comments.map(
                    (comment, index) => (

                      <div
                        className="post-modal-comment"
                        key={
                          comment.comment_id ||
                          index
                        }
                      >

                        <strong>
                          {comment.user_name}
                        </strong>

                        <span>
                          {' '}
                          {comment.comment}
                        </span>

                      </div>

                    ),
                  )

                ) : (

                  <p className="no-comments">
                    No comments yet.
                  </p>

                )}

              </div>


              {/* ACTIONS */}

              <div className="post-modal-actions">

                <div className="modal-action-buttons">

                  <button
                    type="button"
                    aria-label="Like"
                  >
                    <BsHeartFill />
                  </button>

                  <button
                    type="button"
                    aria-label="Comment"
                  >
                    <FaRegComment />
                  </button>

                  <button
                    type="button"
                    aria-label="Share"
                  >
                    <BiShareAlt />
                  </button>

                </div>

                <strong>
                  {selectedPost.likes_count || 0}{' '}
                  likes
                </strong>

              </div>


              {/* DATE */}

              {selectedPost.created_at && (

                <p className="post-created-at">
                  {selectedPost.created_at}
                </p>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default MyProfile