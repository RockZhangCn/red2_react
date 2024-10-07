export const userLoginAction = (user) => {
    return {
        type: 'LOGIN',
        useremail: user.useremail,
        nickname: user.nickname,
        avatar: user.avatar,
    }
}


export const restoreUserStateAction = (user) => {
    return {
        type: 'RESTORE_USER',
        userEmail: user.userEmail,
        nickName: user.nickName,
        avatar: user.avatar,
        isLoggedIn: user.isLoggedIn
    }
}

export const userLogoutAction = (user) => {
    return {
        type: 'LOGOUT_USER',
        userEmail: user.userEmail,
    }
}