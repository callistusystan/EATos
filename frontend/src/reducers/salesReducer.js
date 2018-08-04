import { SET_SALES } from '../actions/index';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_SALES:
            return action.payload;
        default:
            return state;
    }
}