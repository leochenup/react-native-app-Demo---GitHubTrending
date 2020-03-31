import Types from '../../action/types'

const defaultState = {
    theme: '#1E90FF'
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme
            }
        default:
            return state
    }
}