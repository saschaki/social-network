export function reducer(state = {}, action) {
    if (action.type == "GET_FRIENDS") {
        state = {
            ...state,
            users: action.users
        };
    }
    if (action.type == "ACCEPT_REQUEST") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: true
                    };
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "END_FRIENDSHIP") {
        state = {
            ...state,
            users: state.users.filter(user => user.id != action.id)
        };
    }
    return state;
}