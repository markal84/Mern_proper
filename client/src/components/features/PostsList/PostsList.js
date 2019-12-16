import React from 'react';
import { PropTypes } from 'prop-types';

import PostSummary from '../PostsSummary/PostsSummary';

const PostsList = ({ posts }) => (
  <div>
    <section className="posts-list">
      {posts.map(post => <PostSummary key={post.id} {...post} />)}
    </section>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired //new attribute exercise
    })
  ),
};

export default PostsList;