import { compose } from "redux"

export const selectAPosAction = (composedPos) => {
    return {
        type: 'TAKEASEAT',
        composedPos: composedPos,
    }
}

export const gameHallRTDataAction = (data) => {
    return {
        type: 'GAMEHALL_RT_DATA',
        data: data,
    }
}

export const restoreGameHallDataAction = (data) => {
    return {
        type: 'RESTORE_GAMEHALL_DATA',
        data: data,
    }
}
