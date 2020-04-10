import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default class listList extends Component {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      checklist: this.props.data,
      selectedData: null,
      type: 0,
      adventureId: '',
      listsMarked: null,
      selectedHeader: 0,
    };
  }

  updateChecklist = (updatedHeader, index) => {
    let tempList = this.state.checklist;
    tempList[index] = updatedHeader;
    this.setState({checklist: tempList});
  };
  testIsOpen = currentlyOpenedHeaderIndex => {
    this.setState({selectedHeader: currentlyOpenedHeaderIndex});
  };

  render() {
    const {checklist, type} = this.state;
    return (
      <View flex-1 style={styles.container}>
        <ScrollView>
          <View padding-20>
            {checklist &&
              checklist.map((checklistElement, index) => {
                return (
                  <Header
                    key={index}
                    checklistElementIndex={index}
                    isOpenIndex={this.state.selectedHeader}
                    checklistElement={checklistElement}
                    callBackFromlistList={this.updateChecklist}
                    callBackForIsOpen={this.testIsOpen}
                  />
                );
              })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenIndex: this.props.isOpenIndex,
      index: this.props.checklistElementIndex,
      checklistElement: this.props.checklistElement,
    };
  }
  componentDidMount() {
    if (this.props.isOpenIndex === this.props.checklistElementIndex) {
      this.setState({isOpen: true});
    } else {
      this.setState({isOpen: false});
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.isOpenIndex !== nextProps.isOpenIndex) {
      if (nextProps.isOpenIndex === this.props.checklistElementIndex) {
        this.setState({isOpen: true});
      } else {
        this.setState({isOpen: false});
      }
    }

    return true;
  }

  updatelist = (listToUpdate, index) => {
    let tempchecklistElement = this.state.checklistElement;
    tempchecklistElement.lists[index] = listToUpdate;
    this.setState({checklistElement: tempchecklistElement}, () => {
      this.props.callBackFromlistList(
        this.state.checklistElement,
        this.state.index,
      );
    });
  };

  render() {
    const {isOpen, checklistElement} = this.state;
    let selectedArray = [];
    checklistElement &&
      checklistElement.lists.map(list => {
        if (list.isSelectedByUser === true) {
          selectedArray.push(list.title);
        }
      });
    return (
      <View style={{padding: 10}}>
        <TouchableOpacity
          onPress={() => {
            this.setState({isOpen: !isOpen});
            this.props.callBackForIsOpen(this.state.index);
          }}>
          <View
            style={{alignItems: 'center', flexDirection: 'row', paddinTop: 10}}>
            <Image
              source={
                isOpen === true
                  ? require('../src/Icons/downBlack.png')
                  : require('../src/Icons/forwardBlack.png')
              }
              style={styles.dropDownButton}
            />
            <Text>{checklistElement.title}</Text>
          </View>
        </TouchableOpacity>
        {isOpen && (
          <View style={{marginLeft: 20}}>
            {checklistElement &&
              checklistElement.lists &&
              checklistElement.lists.map((list, index) => {
                return (
                  <List
                    key={index}
                    listIndex={index}
                    listData={list}
                    callBack={this.updatelist}
                  />
                );
              })}
          </View>
        )}
        {!isOpen && (
          <View style={{marginLeft: 20}}>
            {selectedArray.length > 0 &&
              selectedArray.map(title => {
                return (
                  <View style={styles.checklistElementContainer}>
                    <Image
                      source={require('../src/Icons/greenTick.png')}
                      style={styles.greenTick}
                    />
                    <Text>{title}</Text>
                  </View>
                );
              })}
          </View>
        )}
      </View>
    );
  }
}

let listObject;
class List extends Component {
  constructor(props) {
    super(props);
    listObject = this;
    this.state = {
      index: this.props.listIndex,
      isSelected: this.props.listData.isSelectedByUser,
      list: this.props.listData,
    };
  }

  render() {
    const {index, isSelected, list} = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={async () => {
            await this.setState({isSelected: !isSelected}, async () => {
              let newStateOflist;
              if (this.state.isSelected === true) {
                newStateOflist = {...list, isSelectedByUser: true};
              } else {
                newStateOflist = {...list, isSelectedByUser: false};
              }
              await this.setState({list: newStateOflist}, () => {
                this.props.callBack(newStateOflist, index);
              });
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              alignItems: 'center',
            }}>
            <Image
              source={
                isSelected === true
                  ? require('../src/Icons/greenTick.png')
                  : null
              }
              style={styles.greenTick}
            />
            <Text>{list.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  header: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 20,
  },
  headerText: {
    color: 'black',
    fontSize: 16,
  },
  headerSubText: {fontSize: 12},

  headerBack: {
    color: 'black',
    fontSize: 16,
  },
  buttonContainer1: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer2: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 50,
    paddingTop: 10,
  },
  buttons: {
    color: 'black',
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: '#F7F7F7',
    padding: 10,
    height: 200,
  },
  dropDownButton: {width: 20, height: 20, marginRight: 10},
  greenTick: {width: 20, height: 20, marginRight: 5},
  checklistElementContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 5,
  },
  input: {width: '100%', color: 'black', borderBottomWidth: 0},
  subTexts: {fontSize: 13},
});
