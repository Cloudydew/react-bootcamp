window.API = {
  fetchFriends() {
    return new Promise((res, rej) => {
      const friends = [
        {name: "Courtney", active: true}, {name: 'Josh', active: false}
      ]

      setTimeout(() => res(friends), 2000)
    })
  }
}

function FriendsList (props) {
  return (
    <div>
      <h3>Active Friends</h3>
      <ul>
        {props.list.filter((friend) => friend.active == true).map((friend) => (
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={() => props.onRemoveFriend(friend.name)}>Remove</button>
            <button onClick={() => props.toggleActive(friend.name)}>Make Inactive</button>
          </li>
        ))}
      </ul>

      <h3>Inactive Friends</h3>
      <ul>
        {props.list.filter((friend) => friend.active == false).map((friend) => (
          <li key={friend.name}>
            <span>{friend.name}</span>
            <button onClick={() => props.onRemoveFriend(friend.name)}>Remove</button>
            <button onClick={() => props.toggleActive(friend.name)}>Make Active</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: "Loading"
    }
  }

  componentDidMount() {
    const stopper = this.state.text + "..."

    this.interval = window.setInterval(() => (
      this.setState((currentState) => (
        {
          text: currentState.text == stopper ? "Loading" : currentState.text + "."
        })
      )), 300)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return <p>{this.state.text}</p>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      friends: [],
      input: '',
      loading: true
    }

    this.handleRemoveFriend = this.handleRemoveFriend.bind(this)
    this.handleAddFriend = this.handleAddFriend.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.clearAllFriends = this.clearAllFriends.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
  }

  componentDidMount() {
    API.fetchFriends().then((friends) => {
      this.setState({friends: friends, loading: false})
    })
  }

  handleAddFriend() {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.concat([{name: this.state.input, active: true}]),
        input: ''
      }
    })
  }

  handleRemoveFriend(name) {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.filter((friend) => friend.name !== name)
      }
    })
  }

  toggleActive(name) {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.map((friend) => friend.name == name ? {name: friend.name, active: !friend.active} : friend)
      }
    })
  }

  clearAllFriends() {
    this.setState({friends: []})
  }

  updateInput(e) {
    const value = e.target.value

    this.setState({input: value})
  }

  render() {
    if(this.state.loading == true) {
      return <Loading />
    }

    return (
      <div>
        <input type="text" placeholder="New friend" value={this.state.input} onChange={this.updateInput} />
        <button onClick={this.handleAddFriend}>Submit</button>
        <button onClick={this.clearAllFriends}>Clear All Friends</button>

        <FriendsList
          list={this.state.friends}
          onRemoveFriend={this.handleRemoveFriend}
          toggleActive={this.toggleActive}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
