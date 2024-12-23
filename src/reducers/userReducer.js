const initialState = {
  isLoggedIn: false,
  userEmail: null,
  nickName: null,
  avatar: 0,
};

const userReducer = (state = initialState, action) => {
  console.log("userReducer", action);
  var userState = null;
  switch (action.type) {
    case "LOGIN":
      userState = {
        ...state,
        isLoggedIn: true,
        avatar: action.avatar,
        userEmail: action.useremail,
        nickName: action.nickname,
      };
      localStorage.setItem("user", JSON.stringify(userState)); // 存储登录态
      return userState;

    case "RESTORE_USER":
      console.log("we are going to restore user", action);
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        avatar: action.avatar,
        userEmail: action.userEmail,
        nickName: action.nickName,
      };

    case "LOGOUT_USER":
      console.log("we are going to logout user", action);
      localStorage.removeItem("user"); // 存储登录态
      localStorage.removeItem("gamehall");
      return {
        ...state,
        isLoggedIn: false,
        userEmail: null,
        nickName: null,
        avatar: null,
      };

    default:
      return state;
  }
};

export default userReducer;
