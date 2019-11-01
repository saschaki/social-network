export function reducer(state = {}, action){
    console.log("state",state);

    return state;
}
// spread operator is goof to make a copy of an array
/*
state = {
    ...state
}

let arr = [2,3,4]
let newArr = [ 1,...arr,5]

map - array method, it's a loop that will allow us to change all or some item in an array. returns a new array
filter - array method. it's a loop and it's used whenever we need to remove an item or items from an array. it returns a new array that does not include the items we filetered out.

*/