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

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      friends: [{name: "Courtney", active: true}, {name: 'Josh', active: false}],
      input: ''
    }

    this.handleRemoveFriend = this.handleRemoveFriend.bind(this)
    this.handleAddFriend = this.handleAddFriend.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.clearAllFriends = this.clearAllFriends.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
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
