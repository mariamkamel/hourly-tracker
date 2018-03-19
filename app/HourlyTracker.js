import React, { Component } from 'react';
import { ListView, View, TextInput } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Body, Title } from 'native-base';
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';

const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4'];

export default class HourlyTracker extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: tasks,
      dialogTitle: 'd',
      currentlyEditingTask: -1
    };
  }

  _addTask(taskName) {}

  _deleteTask(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    console.log(rowId, secId);
    this.setState({ listViewData: newData });
  }

  _editTask(rowId, text) {
    let newData = [...this.state.listViewData];
    newData[rowId] = text;
    console.log(rowId);
    this.setState({ listViewData: newData });
  }

  render() {
    return (
      <Container>
        <Content>
          <Header noShadow style={{ backgroundColor: '#fff' }}>
            <Body>
              <Title style={{ color: '#000' }}>Tasks</Title>
            </Body>
          </Header>

          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data => (
              <ListItem>
                <Text> {data} </Text>
              </ListItem>
            )}
            renderLeftHiddenRow={(data, secId, rowId) => (
              <Button
                onPress={() => {
                  this.setState({ dialogTitle: 'Edit Task' });
                  this.popupDialog.show();
                  this.setState({ currentlyEditingTask: rowId });
                }}
              >
                <Icon active name="md-create" />
              </Button>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button full danger onPress={() => this._deleteTask(secId, rowId, rowMap)}>
                <Icon active name="md-trash" />
              </Button>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>

        <Button
          rounded
          style={{ position: 'absolute', bottom: 40, right: 20, width: 60, height: 60, justifyContent: 'center' }}
          onPress={() => {
            this.setState({ dialogTitle: 'Add Task' });
            this.popupDialog.show();
          }}
        >
          <Icon name="md-add" />
        </Button>

        <PopupDialog
          width={0.7}
          height={0.3}
          containerStyle={{ alignItems: 'center' }}
          dialogTitle={<DialogTitle title={this.state.dialogTitle} />}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
        >
          <View style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0)' }}>
            <TextInput style={{ margin: 10 }} placeholder="Task Name" onChangeText={text => this.setState({ text })} />
            <DialogButton
              text="Submit"
              onPress={() => {
                this.popupDialog.dismiss();
                if (this.state.dialogTitle == 'Add Task') this._addTask(this.state.text);
                else this._editTask(this.state.currentlyEditingTask, this.state.text);
              }}
            />
          </View>
        </PopupDialog>
      </Container>
    );
  }
}
