import React from 'react';
import {StyleSheet, View} from 'react-native';
import CollapsibleChecklist from './src/CollapsibleChecklist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: '00',
          lists: [
            {
              id: '001',
              title: 'sublist item 01',
              isSelectedByUser: false,
            },
            {
              id: '002',
              title: 'sublist item 02',
              isSelectedByUser: false,
            },
            {
              id: '003',
              title: 'sublist item 03',
              isSelectedByUser: false,
            },
          ],
          title: 'header 1',
        },
        {
          id: '01',
          lists: [
            {
              id: '011',
              title: 'sublist item 11',
              isSelectedByUser: false,
            },
            {
              id: '012',
              title: 'sublist item 12',
              isSelectedByUser: false,
            },
            {
              id: '013',
              title: 'sublist item 13',
              isSelectedByUser: false,
            },
          ],
          title: 'header 2',
        },
      ],
    };
  }
  render() {
    let dummyData = this.state.data;
    return (
      <View style={styles.container}>
        <CollapsibleChecklist data={dummyData} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
  },
});

export default App;
