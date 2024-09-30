const initialState = {
    isLoggedIn: false,
    userEmail: null,
    nickName: null,
    avatar:null,
  };

const userReducer = (state = initialState, action) => {
    console.log("userReducer", action);
    var userState = null;
    switch (action.type) {
        case 'LOGIN':
            userState = { ...state, isLoggedIn: true, 
                avatar:action.avatar,
                userEmail: action.useremail, nickName: action.nickname };
            localStorage.setItem('user', JSON.stringify(userState)); // 存储登录态
            return userState;

        case 'RESTORE_USER':
            console.log("we are going to restore user", action);
            return { ...state, isLoggedIn: action.isLoggedIn, 
                avatar:action.avatar,
                userEmail: action.userEmail, nickName: action.nickName };
        
        case 'LOGOUT_USER':
            console.log("we are going to logout user", action);
            localStorage.setItem('user', null); // 存储登录态
            return { ...state, isLoggedIn: false, userEmail: null, nickName: null, avatar:null};

        default:
        return state;
    }
};
  
export default userReducer;