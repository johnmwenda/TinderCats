import { AsyncStorage } from 'react-native';

 let actions = {
	getCatsAsync: function(page) {
		let url = "https://api.thedogapi.com/v1/images/?limit=10&page="+page;
		return (dispatch) => {
			fetch(url, {
				method: "GET",
				headers : {
					'Content-Type': "application/json",
					'x-api-key': "17d94b92-754f-46eb-99a0-65be65b5d18f"
				}
			})
			.then((response)=>response.json())
			.then(responseJson => {
				let photos = responseJson
			
				var value = AsyncStorage.getItem('likes_dislikes').then(
					(values) => {
						if(values != null && values != undefined) {
							let choices_store = JSON.parse(values)

							for(var item in photos) {
								if(choices_store[photos[item]["id"]] ) {
									photos[item]["choice"] = choices_store[photos[item]["id"]]
								}
							}	
							return dispatch(actions.getCats(photos))
						}else {
							return dispatch(actions.getCats(photos))
						}
					});
			})
			.catch(error => console.error('Error:asd', error));
		}	
	}, 

	getCats: function(data) {
		return {
			type: 'ADD_CATS', 
			data: data
		}
	}
}

export default actions