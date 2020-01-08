import React, { Component } from 'react';
import propTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '3122566763e808384e4b',
      clientSecret: '50d2e908741b4f81ba170d2e2c781ef3f10d8f1a',
      count: 5,
      sort: 'created: asc',
      repos: [],
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const {
      count, sort, clientId, clientSecret,
    } = this.state;
    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({ repos: data });
      }).catch(err => console.log(err));
  }


  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="col-md-6">
          <h4>
            <a href={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer">{repo.name}</a>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">
            Forks: {repo.forks_count}
          </span>
        </div>
      </div>
    ));
    return (
      <div style="padding-bottom: 50px; margin-bottom: 50px;">
        <hr />
        <h3 className="mb-4">
          Latest Github Repositories
        </h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: propTypes.string.isRequired,
};

export default ProfileGithub;
