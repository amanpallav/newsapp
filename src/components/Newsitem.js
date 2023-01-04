import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div>
        <div className="card" style={{width: '18rem'}}>
          <img src={this.props.imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className='card-text'><small className='text-muted'>By {this.props.author} on {this.props.date}</small></p>
              <a href={newsUrl} className="btn btn-primary btn-sm">Read more</a>

            </div>
        </div>
      </div>
    )
  }
}

