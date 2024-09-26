import { compose } from "redux"

export const selectAPosAction = (composedPos) => {
    return {
        type: 'TAKEASEAT',
        composedPos: composedPos,
    }
}