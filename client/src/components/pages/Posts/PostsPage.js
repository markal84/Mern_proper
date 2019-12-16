import React from 'react';
import Posts from '../../features/Posts/PostsContainer';
import PostsCounter from '../../features/PostsCounter/PostsCounterContainer';

const PostsPage = () => (
  <div>
    <Posts />
    <PostsCounter />
  </div>
);

export default PostsPage;