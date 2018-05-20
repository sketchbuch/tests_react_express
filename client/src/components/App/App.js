// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

type Props = {};
type State = {
  response: string,
  user: null | Object,
};

const callApi = async (path: string) => {
  console.log('callApi', path);

  const response = await fetch(path);
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};

class App extends Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      response: '',
      user: null,
    };
  }

  componentDidMount() {
    callApi('/api/hello')
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));

    callApi('/api/users')
      .then(res => console.log('users response', res))
      .catch(err => console.log('users error', err));

    callApi('/api/users/1')
      .then(res => this.setState({ user: res.user }))
      .catch(err => console.log('user 1 error', err));

    callApi('/api/users/8')
      .then(res => console.log('user 8 response', res))
      .catch(err => console.log('user 8 error', err));
  }

  render() {
    const username = (this.state.user !== null) ? this.state.user.fname : 'User';

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome {username} to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
