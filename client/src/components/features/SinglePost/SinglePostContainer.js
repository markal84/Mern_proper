import { connect } from 'react-redux';
import { getSinglePost, getRequest, loadSinglePostRequest, resetRequest } from '../../../redux/postsRedux';
import SinglePost from './SinglePost';

const mapStateToProps = state => ({
    post: getSinglePost(state),
    request: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
    loadSinglePost: (id) => dispatch(loadSinglePostRequest(id)), //it must have an id attribute
    resetRequest: () => dispatch(resetRequest()), // add post exercise 
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);