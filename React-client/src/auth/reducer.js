const initialState = {
  userName:
    sessionStorage.getItem("token") == null
      ? ""
      : sessionStorage.getItem("userName"),
  token:
    sessionStorage.getItem("token") == null
      ? ""
      : sessionStorage.getItem("token"),
  imagetoShow: null,
  isAuthenticated: sessionStorage.getItem("token") == null ? false : true
};

const reducer = (state = initialState, action) => {
  if (action.type === "signin") {
    sessionStorage.setItem("token", action.token);
    sessionStorage.setItem("userName", action.userName);
    return {
      ...state,
      userName: action.userName,
      isAuthenticated: true,
      token: action.token
    };
  } else if (action.type === "logout") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    return {
      ...state,
      userName: "",
      token: "",
      imageToShow: null,
      isAuthenticated: false
    };
  } else if (action.type === "setpicture") {
    return {
      ...state,
      imageToShow: action.picture
    };
  } else if (action.type === "update") {
    return {
      ...state,
      userName: action.userName
    };
  }
  return state;
};

export default reducer;
