import { Add_Item, Remove_Item } from '../Action/ActionType'

const initialState = []

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Add_Item:

            let index = state.findIndex(el => el.Id == action.payload.Id);

            if (index == -1)
                return [
                    ...state,
                    action.payload
                ]


        case Remove_Item:

            const deletArray = state.filter((item, index) => {
                return index !== action.payload
            })
            return deletArray

        default: {
            return state
        }
    }
}