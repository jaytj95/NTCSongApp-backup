import { StackNavigator } from 'react-navigation';
import SongList from "../screens/SongList";
import SongView from "../screens/SongView";

export const RouteNavigator = StackNavigator({
    SongList: {screen: SongList},
    SongView: {screen: SongView},
});