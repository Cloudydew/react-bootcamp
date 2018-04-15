indow.API = {
 fetchPopularRepos(language) {
   // "language" can be "javascript", "ruby", "python", or "all"
   const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

   return fetch(encodedURI)
     .then((data) => data.json())
     .then((repos) => repos.items)
     .catch((error) => {
       console.warn(error)
       return null
     });
 }


lass Loading extends React.Component {
 constructor(props) {
   super(props);

   this.state = {
     text: 'Loading'
   };
 }
 componentDidMount() {
   const stopper = this.state.text + '...';

   this.interval = window.setInterval(() => {
     this.state.text === stopper
       ? this.setState(() => ({ text: 'Loading' }))
       : this.setState((prevState) => ({ text: prevState.text + '.' }))
   }, 300)
 }
 componentWillUnmount() {
   window.clearInterval(this.interval);
 }
 render() {
   return (
     <p>
       {this.state.text}
     </p>
   )
 }


lass Repos extends React.Component {
     constructor(props) {
     super(props)

     this.state = { repos: [] }
     }

     componentDidMount() {
       API.fetchPopularRepos(this.props.topic).then((repos) => this.setState({repos: repos}))
     }
     componentDidUpdate() {
       API.fetchPopularRepos(this.props.topic).then((repos) => this.setState({repos: repos}))
     }
     render(props) {
     return (
     this.state.repos.map((repo) => <h1>{repo.url}</h1>)
     )

     }


lass LanguageSwitcher extends React.Component {
     render(props) {
     return (
       <ul>
         <li onClick={() => this.props.onSwitchTopic('All')}>All</li>
         <li onClick={() => this.props.onSwitchTopic('Ruby')}>Ruby</li>
         <li onClick={() => this.props.onSwitchTopic('Python')}>Python</li>
         <li onClick={() => this.props.onSwitchTopic('Javascript')}>Javascript</li>
       </ul>
     )
     }



lass App extends React.Component {
       constructor(props) {
       super(props)

       this.state = { topic: 'All' }

       this.switchTopic = this.switchTopic.bind(this)
       }

       switchTopic(topic) {
         this.setState({topic: topic})
       }

 render() {
   return (
       <div>
     <LanguageSwitcher topic={this.state.topic} onSwitchTopic={this.switchTopic} setState={() => console.log('test')} />
     <Repos topic={this.state.topic} />
       </div>
   )
 }


eactDOM.render(
 <App />,
 document.getElementById('app')

