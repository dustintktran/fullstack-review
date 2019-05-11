import React from 'react';

const RepoList = (props) => {
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      {props.repos.map((item, index) => {
        return <div className="repo">
          <a href={item.html_url}>{item.name}</a><br/>
          <span>Created by: </span><a href={item.owner_url}>{item.owner}</a>
        </div>
      })}
    </div>
  )
}

export default RepoList;