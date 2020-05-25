import React from 'react'
import PropTypes from 'prop-types'
import { filter } from 'lodash'

import Post from './Post'
import './storywall.scss'
import {
  calcGridSize,
  getNumColumns
} from '../utils';


class GridView extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
    }
  }

  componentDidMount() {

    this.setState({columns : getNumColumns()})
    calcGridSize('.story-wall', '.story-wall .card-container');
    const me = this;
    window.addEventListener("resize",  () => {
      calcGridSize('.story-wall', '.story-wall .card-container');
      me.setState({
        columns: getNumColumns()
      })
    })
  }

  onSize = (size, id) => {
    calcGridSize('.story-wall', '.story-wall .card-container');
  }

  handleEnter = (event, id) => {
    if (!this.state[id]) {

      this.setState({
        [id]: true
      })
    }
  }

  getColumnOne = () => {
      const {
        posts
      } = this.props;
      const numberColumns = this.state.columns;
      return filter(posts, (post, index) => {
        return index % numberColumns === 0
      })
  }
    
  getColumnTwo = () => {
    const {
      posts
    } = this.props;
    
    const numberColumns = this.state.columns;
    if (numberColumns < 2) {
      return []
    }
    return filter(posts, (post, index) => {
      const number = index + 1;
      return number % numberColumns === 0
    })

  }

    getColumnThree = () => {
      const {
        posts
      } = this.props;
      const numberColumns = this.state.columns;
      if (numberColumns < 3) {
        return []
      }
      return filter(posts, (post, index) => {
        const number = index + 2;
        return number % numberColumns === 0
      })

    }

  render() {

    const columnOne = this.getColumnOne()
    const columnTwo = this.getColumnTwo()
    const columnThree = this.getColumnThree()
    return (<div className="columns is-multiline story-wall grid-container">
       <div className = "grid-col grid-col--1">
              {columnOne.map(({ node: post }, index) => (
              <Post 
                post={post}
                key={post.fields.slug}
                load={this.state[post.id] || index < 4}
                onSize={(size) => this.onSize(size, post.id)}
                index={index}
                handleEnter={(event) => this.handleEnter(event, post.id)}
              />
          ))}
        </div>
        {columnTwo.length > 0 && (<div className="grid-col grid-col--2">
            {columnTwo.map(({ node: post }, index) => (
              <Post 
                post={post}
                key={post.fields.slug}
                load={this.state[post.id] || index < 4}
                handleMount={this.handleMount}
                onSize={(size) => this.onSize(size, post.id)}
                index={index}
                handleEnter={(event) => this.handleEnter(event, post.id)}
              />
          ))}
          </div>)}
        
        {columnThree.length > 0 &&
        (<div className="grid-col grid-col--3">
          {columnThree.map(({ node: post }, index) => (
              <Post 
                post={post}
                key={post.fields.slug}
                load={this.state[post.id] || index < 4}
                handleMount={this.handleMount}
                onSize={(size) => this.onSize(size, post.id)}
                index={index}
                handleEnter={(event) => this.handleEnter(event, post.id)}
              />
              ))}
          </div>)}

      </div>)
  }
}

GridView.propTypes = {
  posts: PropTypes.array
}

export default GridView