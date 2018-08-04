import { SET_PROFILE } from '../actions';

const INITIAL_STATE = { name: 'test123' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PROFILE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}