const initialState = {
    isLoggedIn: false,
    userEmail: null,
    nickName: null,
  };

const userReducer = (state = initialState, action) => {
    console.log("authReducer", action);
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true, userEmail: action.useremail, nickName: action.nickname };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, userEmail: null, nickName: null };
        default:
        return state;
    }
};
  
export default userReducer;