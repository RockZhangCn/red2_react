export const userLoginAction = (user) => {
    return {
        type: 'LOGIN',
        useremail: user.useremail,
        nickname: user.nickname,
    }
}

