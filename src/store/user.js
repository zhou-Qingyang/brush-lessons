const initialState = {
    userAvatar: '',
    token: window.localStorage.getItem('token') || '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        case 'REMOVE_TOKEN':
            return {
                ...state,
                token: '',
            };
        default:
            return state;
    }
};

export default userReducer;