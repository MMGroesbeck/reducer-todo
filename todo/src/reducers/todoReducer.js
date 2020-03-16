var moment = require('moment');

export const initialState = [
    {
        item: "Meet MVP",
        completed: false,
        id: 1,
        due: moment(),
        done: 0
    }
];

export const todoReducer = (state,action) => {
    switch (action.type) {
        case "TOGGLE_COMPLETED":
            return [...state.map(item=>(
                (item.id === action.payload)? 
                {...item, completed: !item.completed, done: moment()} : 
                {...item}))];
        case "ADD_ITEM":
            return [...state, {
                item: action.payload.item,
                completed: false,
                id: moment(),
                due: moment(action.payload.due, "MM/DD/YYYY")
            }];
        case "CLEAR_DONE":
            return state.filter(item=>!(item.completed));
        default:
            return state;
    }
}