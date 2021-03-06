import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    state = {
        users: []
    }
  render() {
    return (
      <div>
          <div>
            <button onClick={this.logout}>Logout</button>
          </div>
          <ul>
              {this.state.users.map(user => <li key={user.id}>{user.username}</li>)}
          </ul>
      </div>
    );
  }
  componentDidMount() {
      const token = localStorage.getItem('jwt');
      const reqOptions = {
          headers: {
              Authorization: token,
          }
      }
    axios
        .get('http://localhost:3300/api/users', reqOptions)
        .then(res => {
            console.log('Users Data:', res.data)
            this.setState({ users: res.data })
        })
        .catch(err => {
            console.log(err);
            this.props.history.push('/');
        })
  }

  logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin');
  }
}

export default Users;
