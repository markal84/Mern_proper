import React from 'react';
import { PropTypes } from 'prop-types';
import '../PostsSummary/PostsSummary.scss';
import { Link } from 'react-router-dom'; //single post exercise

import HtmlBox from '../../common/HtmlBox/HtmlBox';
import Button from '../../common/Button/Button';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import cutText from '../../common/cutText/cutText';

const PostSummary = ({ id, title, content, author }) => (
    <article className="post-summary">
      <SmallTitle>{title}</SmallTitle>
      <p>Author: {author}</p>
      <HtmlBox>{cutText(content, 250)}</HtmlBox>
      <Button variant="primary"> 
        <Link to={`/posts/${id}`}>Read more</Link> 
      </Button>
    </article>
);

PostSummary.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.string
};

export default PostSummary;