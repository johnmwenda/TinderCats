import { StackNavigator } from 'react-navigation'
import Home from './Home'

const AppNavigation = StackNavigator({
  Home: { screen: Home }
	}, 
	{
		initialRouteName: "Home",  
		headerMode: "none"
	}
)

export default AppNavigation