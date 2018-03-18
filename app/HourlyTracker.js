import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Body, Title } from 'native-base';

const tasks = [
  'Task 1',
  'Task 2',
  'Task 3',
  'Task 4'
];

export default class HourlyTracker extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { listViewData: tasks };
  }

  _addTask() {

  }

  _deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  _editRow(rowId, text) {

  }

  render() {
    return (
      <Container>
        <Content>
          <Header noShadow style={{ backgroundColor: '#fff' }}>
            <Body>
              <Title style={{ color:'#000' }}>Tasks</Title>
            </Body>
          </Header>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text> {data} </Text>
              </ListItem>}
            renderLeftHiddenRow={(data, rowId) =>
              <Button onEndEditing={(text) => this._editRow(rowId, text)}>
                <Icon active name="md-create" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={() => this._deleteRow(secId, rowId, rowMap)}>
                <Icon active name="md-trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>
          <Button rounded 
            style={{ position: 'absolute', bottom: 40, right: 20, width: 60, height: 60, justifyContent: 'center' }}
            onPress={() => { this._addTask() }}
          >
              <Icon name="md-add" />
          </Button>
      </Container>
    );
  }
}
