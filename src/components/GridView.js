import React from 'react'
import PropTypes from 'prop-types'
import Colcade from 'colcade';
import Post from './Post'
import './storywall.scss'
import { calcGridSize } from '../utils';


class GridView extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
    }
  }

  componentDidMount() {

    
    calcGridSize('.story-wall', '.story-wall .card-container');

    window.addEventListener("resize", function () {
      calcGridSize('.story-wall', '.story-wall .card-container');
    })
  }


  handleMount = (id) => {
    const {
      posts
    } = this.props;

 
    if (id === posts.length -1 ) {
      var grid = document.querySelector('.story-wall');

      this.colc = new Colcade(grid, {
        columns: '.grid-col',
        items: '.card-container'
      });
    }
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
    

  render() {
    const {
      posts
    } = this.props;
    return (<div className="columns is-multiline story-wall grid-container">
        <div className="grid-col grid-col--1"></div>
        <div className="grid-col grid-col--2"></div>
        <div className="grid-col grid-col--3"></div>
        {posts &&
          posts.map(({ node: post }, index) => (
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
      </div>)
  }
}

GridView.propTypes = {
  posts: PropTypes.array
}

export default GridView