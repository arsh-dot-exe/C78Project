import * as React from 'react';
import { ListItem } from 'react-native-elements';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class DonateScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			items: [],
		};
	}

	componentDidMount() {
		db.collection('requested_items').onSnapshot((snapshot) => {
			var requestedItemList = snapshot.docs.map((document) => document.data());
			this.setState({
				items: requestedItemList,
			});
			console.log(requestedItemList);
		});
	}

	renderItem = ({ item, i }) => {
		return (
			<ListItem
				key={i}
				title={item.itemName}
				subtitle={item.itemInfo}
				titleStyle={{ color: 'black', fontWeight: 'bold' }}
				rightElement={
					<TouchableOpacity onPress={() => {}}>
						<Text> View </Text>
					</TouchableOpacity>
				}
				bottomDivider></ListItem>
		);
	};

	keyExtractor = (item, index) => {
		index.toString();
	};
	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList data={this.state.items} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
			</View>
		);
	}
}
