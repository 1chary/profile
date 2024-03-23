import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiBuildingLine} from 'react-icons/ri'
import {IoLocationOutline} from 'react-icons/io5'
import {IoMdLink} from 'react-icons/io'
import LoaderComponent from '../LoaderComponent'
import FailureContainer from '../FailureContainer'
import Header from '../Header'

import './index.css'
import ActiveTab from '../../context/ActiveTab'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    array: [],
    apiStatus: '',
    isStringEmpty: false,
    toDisplayProfilePage: false,
  }

  updateCase = data => ({
    avatarUrl: data.avatar_url,
    bio: data.bio,
    blog: data.blog,
    company: data.company,
    createdAt: data.created_at,
    email: data.email,
    eventsUrl: data.events_url,
    followers: data.followers,
    followersUrl: data.followers_url,
    following: data.following,
    followingUrl: data.following_url,
    gistsUrl: data.gists_url,
    gravatarId: data.gravatar_id,
    hireable: data.hireable,
    htmlUrl: data.html_url,
    id: data.id,
    location: data.location,
    login: data.login,
    name: data.name,
    nodeId: data.node_id,
    organizationsUrl: data.organizations_url,
    publicGists: data.public_gists,
    publicRepos: data.public_repos,
    receivedEventsUrl: data.received_events_url,
    reposUrl: data.repos_url,
    siteAdmin: data.site_admin,
    starredUrl: data.starred_url,
    subscriptionsUrl: data.subscriptions_url,
    twitterUsername: data.twitter_username,
    type: data.type,
    updatedAt: data.updated_at,
    url: data.url,
  })

  getGitHubData = async name => {
    this.setState({apiStatus: apiConstants.loading})
    if (name !== '') {
      const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${name}?api_key=`
      const response = await fetch(apiUrl)
      if (response.ok === true) {
        const data = await response.json()

        const formattedData = this.updateCase(data)
        this.setState({
          array: formattedData,
          apiStatus: apiConstants.success,
          isStringEmpty: false,
          toDisplayProfilePage: true,
        })
      } else {
        this.setState({
          apiStatus: apiConstants.failure,
          toDisplayProfilePage: true,
        })
      }
    } else {
      return this.setState({
        isStringEmpty: true,
      })
    }
    return null
  }

  renderSuccess = () => {
    const {array} = this.state
    const {
      avatarUrl,
      name,
      bio,
      followers,
      following,
      publicRepos,
      company,
      location,
      login,
      url,
    } = array
    return (
      <div className="userDetailsContainer" data-testid="home">
        <img src={avatarUrl} alt={name} className="avatarImage" />
        <p className="userName">{login}</p>
        <p className="bioPara">{bio}</p>
        <div className="followersAndReposContainer">
          <div className="followersContainer">
            <p className="followers">{followers}</p>
            <p className="followersPara">FOLLOWERS</p>
          </div>
          <div className="followersContainer">
            <p className="followers">{following}</p>
            <p className="followersPara">FOLLOWING</p>
          </div>
          <div className="followersContainer">
            <p className="followers">{publicRepos}</p>
            <p className="followersPara">PUBLIC REPOS</p>
          </div>
        </div>
        <div className="companyAndLocationContainer">
          <div className="companyAndLocation">
            <div className="companyContainer">
              <p className="followers">Company</p>
              <div className="iconContainer">
                <RiBuildingLine size={35} color="white" />
                <p className="companyName">{company}</p>
              </div>
            </div>
            <div className="companyContainer">
              <p className="followers">LOCATION</p>
              <div className="iconContainer">
                <IoLocationOutline size={35} color="white" />
                <p className="companyName">{location}</p>
              </div>
            </div>
          </div>
          <div className="companyUrlContainer">
            <p className="followers">COMPANY URL</p>
            <div className="iconContainer">
              <IoMdLink size={30} color="white" />
              <p className="companyUrl">{url}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  tryAgain = () => this.getGitHubData()

  renderFailure = () => <FailureContainer onClickTryAgain={this.tryAgain} />

  renderLoading = () => <LoaderComponent />

  getAllTypeOfViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderFailure()
      case apiConstants.loader:
        return this.renderLoading()
      default:
        return null
    }
  }

  renderInitial = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709456020/Group_2_isxax0.png"
        alt="github profile visualizer home page"
      />
    </div>
  )

  retryAgain = () => {
    this.renderInitial()
    this.setState({isStringEmpty: false})
  }

  renderUsernameFailure = () => (
    <div className="stringEmptyContainer">
      <img
        src="https://res.cloudinary.com/dowjvitxs/image/upload/v1709307868/Group_7522_e6aek6.png"
        alt="github profile visualizer home page"
        className="emptyStringImage"
      />
      <p>Something went wrong. Please try again</p>
      <button className="retryButton" type="button" onClick={this.retryAgain}>
        Try again
      </button>
    </div>
  )

  render() {
    return (
      <>
        <Header />

        <ActiveTab.Consumer>
          {value => {
            const {username, changeUserName} = value
            const {isStringEmpty, toDisplayProfilePage} = this.state

            const colorOFTheBorder = isStringEmpty ? 'redBorder' : ''

            const renderImage = isStringEmpty
              ? this.renderUsernameFailure()
              : this.renderInitial()

            const onSearchInput = event => {
              changeUserName(event.target.value)
            }

            return (
              <div className="container">
                <div className="searchContainer">
                  <input
                    type="search"
                    value={username}
                    className={`searchBox ${colorOFTheBorder}`}
                    onChange={onSearchInput}
                    placeholder="Enter github username"
                  />
                  <div className="searchIconContainer">
                    <button
                      type="button"
                      data-testid="searchButton"
                      className="searchIcon"
                      onClick={() => this.getGitHubData(username)}
                    >
                      <HiOutlineSearch
                        size={30}
                        color="white"
                        aria-label="25"
                      />
                    </button>
                  </div>
                </div>
                {isStringEmpty && (
                  <p className="errorUserName">
                    Enter the valid github username
                  </p>
                )}
                {toDisplayProfilePage ? (
                  ''
                ) : (
                  <h1 className="mainHeading">Github Profile Visualizer</h1>
                )}
                {toDisplayProfilePage ? this.getAllTypeOfViews() : renderImage}
              </div>
            )
          }}
        </ActiveTab.Consumer>
      </>
    )
  }
}

export default Home
