export function reducer(state = {}, action) {
    if (action.type == "GET_FRIENDS") {
        state = {
            ...state,
            users: action.users,
            pending: action.pending
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
            users: state.users.filter(user => user.id != action.id),
            pending: state.pending.filter(user => user.id != action.id)
        };
    }

 
    if (action.type == "CHAT") {
        state = {
            ...state,
            messages: action.messages.reverse()
        };
    }

    if (action.type == "NEW") {
        state = {
            ...state,
            messages: state.messages.concat(action.message)
        };
    }

    if (action.type === 'ONLINE_USERS') {
        return { ...state, onlineUsers: action.onlineUsers };
    }

    return state;
}