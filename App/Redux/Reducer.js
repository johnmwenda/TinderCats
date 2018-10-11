let reducer = function(state, action) {
	switch(action.type) {
		case 'ADD_CATS':
			return Object.assign({}, state, {
				cats: [...action.data, ...state.cats]
			})
		default:
			return state
	}
}

export default reducer