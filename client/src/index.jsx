import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    $.get('http://localhost:1128/repos', (data) => {
      console.log('componentdidmount got: ', data);
      this.setState({repos: data})
    }) 
  }

  search (term) {
    console.log(`${term} was searched`);
    $.post('http://localhost:1128/repos', {username: term}, () => {
      window.location.reload();
      console.log('success!')
    })
    // TODO
  }

  clear() {
    $.get('http://localhost:1128/clear', () => {
      window.location.reload();
      console.log('cleared');
    })
  }

  render () {
    return (<div>
      <h1>||| Github Fetcher |||</h1><button onClick={this.clear}>Clear</button>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));