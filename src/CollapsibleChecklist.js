import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default class SkillList extends Component {
  static navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  constructor(props) {
    super(props);
    // skillSet = this;
    this.state = {
      talents: this.props.data,
      selectedData: null,
      type: 0,
      adventureId: '',
      skillsMarked: null,
      selectedTalent: 0,
    };
  }

  updateTalent = (updatedTalent, index) => {
    let tempList = this.state.talents;
    tempList[index] = updatedTalent;
    this.setState({talents: tempList});
  };
  testIsOpen = (currentlyOpenedTalentIndex) => {
    this.setState({selectedTalent: currentlyOpenedTalentIndex});
  };

  render() {
    const {talents, type} = this.state;
    return (
      <View flex-1 style={styles.container}>
        <StatusBar
          backgroundColor="rgba(0,0,0,0)"
          showHideTransition="slide"
          barStyle="dark-content"
          translucent={true}
          hidden={false}
        />
        {/* <OfflineNotice /> */}

        <ScrollView>
          <View padding-20>
            {talents &&
              talents.map((talent, index) => {
                return (
                  <Talent
                    key={index}
                    talentIndex={index}
                    isOpenIndex={this.state.selectedTalent}
                    talentData={talent}
                    callBackFromSkillList={this.updateTalent}
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

let talentSet;
class Talent extends Component {
  constructor(props) {
    super(props);
    talentSet = this;
    this.state = {
      isOpen: false,
      isOpenIndex: this.props.isOpenIndex,
      index: this.props.talentIndex,
      talent: this.props.talentData,
    };
  }
  componentDidMount() {
    if (this.props.isOpenIndex === this.props.talentIndex) {
      this.setState({isOpen: true});
    } else {
      this.setState({isOpen: false});
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.isOpenIndex !== nextProps.isOpenIndex) {
      console.log(
        this.props.isOpenIndex,
        nextProps.isOpenIndex,
        this.props.talentIndex,
      );

      if (nextProps.isOpenIndex === this.props.talentIndex) {
        this.setState({isOpen: true});
      } else {
        this.setState({isOpen: false});
      }
    }

    return true;
  }

  updateSkill = (skillToUpdate, index) => {
    let tempTalent = this.state.talent;
    tempTalent.skills[index] = skillToUpdate;
    this.setState({talent: tempTalent}, () => {
      this.props.callBackFromSkillList(this.state.talent, this.state.index);
    });
  };

  render() {
    const {isOpen, talent} = this.state;
    let selectedArray = [];
    talent &&
      talent.skills.map((skill) => {
        if (skill.isSelectedByUser === true) {
          selectedArray.push(skill.title);
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
            <Text>{talent.title}</Text>
          </View>
        </TouchableOpacity>
        {isOpen && (
          <View style={{marginLeft: 20}}>
            {talent &&
              talent.skills &&
              talent.skills.map((skill, index) => {
                return (
                  <Skill
                    key={index}
                    skillIndex={index}
                    skillData={skill}
                    callBack={this.updateSkill}
                  />
                );
              })}
          </View>
        )}
        {!isOpen && (
          <View style={{marginLeft: 20}}>
            {selectedArray.length > 0 &&
              selectedArray.map((title) => {
                return (
                  <View style={styles.talentContainer}>
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

let skillObject;
class Skill extends Component {
  constructor(props) {
    super(props);
    skillObject = this;
    this.state = {
      index: this.props.skillIndex,
      isSelected: this.props.skillData.isSelectedByUser,
      skill: this.props.skillData,
    };
  }

  render() {
    const {index, isSelected, skill} = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={async () => {
            await this.setState({isSelected: !isSelected}, async () => {
              let newStateOfSkill;
              if (this.state.isSelected === true) {
                newStateOfSkill = {...skill, isSelectedByUser: true};
              } else {
                newStateOfSkill = {...skill, isSelectedByUser: false};
              }
              await this.setState({skill: newStateOfSkill}, () => {
                this.props.callBack(newStateOfSkill, index);
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
            <Text>{skill.title}</Text>
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
  talentContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 5,
  },
  input: {width: '100%', color: 'black', borderBottomWidth: 0},
  subTexts: {fontSize: 13},
});
