import axios from 'axios'; // much simpler sendin req to server
import { API_URL, BASE_URL } from '../config'; 


/* SELECTORS */

export const getPosts = ({ posts }) => posts.data;
export const getPostsCounter = ({ posts }) => posts.data.length; //new selector to count posts on posts page
export const getRequest = ({ posts }) => posts.request;
export const getSinglePost = ({ posts }) => posts.singlePost; //SinglePost exercise
export const getPages = ({ posts }) => Math.ceil(posts.amount / posts.postsPerPage); // pagination exercise
export const getPostsPerPage = ({ posts }) => posts.postsPerPage; //pagination exercise 

/* ACTIONS */
// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

export const LOAD_POSTS = createActionName('LOAD_POSTS');
export const LOAD_SINGLE_POST = createActionName('LOAD_SINGLE_POST'); //SinglePost exercise
export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const RESET_REQUEST = createActionName('RESET_REQUEST'); //add post exercise
export const LOAD_POSTS_PAGE = createActionName('LOAD_POSTS_PAGE'); //pagination exercise

export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const loadSinglePost = payload => ({ payload, type: LOAD_SINGLE_POST }) //singlePost exercise
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = error => ({ error, type: ERROR_REQUEST });
export const resetRequest = () => ({ type: RESET_REQUEST }); //single post exercise
export const loadPostsByPage = payload => ({ payload, type: LOAD_POSTS_PAGE }); //pagination exercise


/* INITIAL STATE */

const initialState = {
  data: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
  amount: 0, //pagination exercise
  postsPerPage: 10, //pagination exercise
  presentPage: 1, //pagination exercise
  singlePost: [] //singlePost exercise
};


/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
    switch (action.type) {
      case LOAD_POSTS:
        return { ...statePart, data: action.payload };
      case LOAD_SINGLE_POST:
        return { ...statePart, singlePost: action.payload }; //singlePost exercise
      case LOAD_POSTS_PAGE: //pagination exercise
        return {
          ...statePart,
          postsPerPage: action.payload.postsPerPage,
          presentPage: action.payload.presentPage,
          amount: action.payload.amount,
          data: [...action.payload.posts],
          };  
      case START_REQUEST:
        return { ...statePart, request: { pending: true, error: null, success: null } };
      case END_REQUEST:
        return { ...statePart, request: { pending: false, error: null, success: true } };
      case ERROR_REQUEST:
        return { ...statePart, request: { pending: false, error: action.error, success: false } }; 
      case RESET_REQUEST:
        return { ...statePart, request: { pending: false, error: null, success: null } };  
      default:
        return statePart;
    }
};

/* THUNKS */

export const loadPostsRequest = () => {
  return async dispatch => {

    dispatch(startRequest());
    try {

      let res = await axios.get(`${BASE_URL}${API_URL}/posts`);
      
      dispatch(loadPosts(res.data));
      dispatch(endRequest());

    } catch(e) {
      dispatch(errorRequest(e.message));
    }

  };
};

export const loadSinglePostRequest = (id) => { //singlePost exercise
  return async dispatch => {

    dispatch(startRequest());
    try {
      let res = await axios.get(`${BASE_URL}${API_URL}/posts/${id}`);
      
      dispatch(loadSinglePost(res.data));
      dispatch(endRequest());

    } catch(e) {
      dispatch(errorRequest(e.message));
    }

  };
};

export const loadPostsByPageRequest = (page, postsPerPage) => {
  return async dispatch => {

    dispatch(startRequest());
    try {

      //const postsPerPage = 10;

      const startAt = (page - 1) * postsPerPage;
      const limit = postsPerPage;

      let res = await axios.get(`${BASE_URL}${API_URL}/posts/range/${startAt}/${limit}`);
      

      const payload = {
        posts: res.data.posts,
        amount: res.data.amount,
        postsPerPage,
        presentPage: page,
      };

      dispatch(loadPostsByPage(payload));
      dispatch(endRequest());

    } catch(e) {
      dispatch(errorRequest(e.message));
    }

  };
};

export const addPostRequest = (post) => { //add post exercise
  return async dispatch => {

    dispatch(startRequest());
    try {

      let res = await axios.post(`${BASE_URL}${API_URL}/posts`, post);
      
      dispatch(endRequest());

    } catch(e) {
      dispatch(errorRequest(e.message));
    }

  };
};