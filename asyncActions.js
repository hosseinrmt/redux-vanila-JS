const { default: axios } = require("axios");
const redux = require("redux");
const { default: logger } = require("redux-logger");
const reduxThunk = require("redux-thunk").default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

// action:
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

// action creators
function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST,
  };
}
function fetchUsersFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
}
function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
}

// reducer
const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { loading: true };

    case FETCH_USERS_FAILURE:
      return { loading: false, error: action.payload };

    case FETCH_USERS_SUCCESS:
      return { loading: false, data: action.payload };

    default:
      return state;
  }
};

// store

// async action creator:
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const userId = res.data.map((u) => u.id);
        dispatch(fetchUsersSuccess(userId));
      })
      .catch((err) => {
        dispatch(fetchUsersError(err));
      });
  };
};

const store = createStore(reducer, applyMiddleware(reduxThunk, logger));

store.dispatch(fetchUsers());
