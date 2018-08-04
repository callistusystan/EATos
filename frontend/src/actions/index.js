export const SET_PROFILE = 'SET_PROFILE';
export const SET_FOOD = 'SET_FOOD';
export const SET_SALES = 'SET_SALES';

export const setProfile = payload => {
    return {
        type: SET_PROFILE,
        payload: payload
    };
};

export const setFood = payload => {
    return {
        type: SET_FOOD,
        payload: payload
    };
};

export const setSales = payload => {
    return {
        type: SET_SALES,
        payload: payload
    };
};