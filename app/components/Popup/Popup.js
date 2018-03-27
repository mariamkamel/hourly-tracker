import React, { Component } from 'react';
import { ListView, View, TextInput } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text, Body, Title } from 'native-base';
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';

export default class Popup extends Component {
show(){
this.popupDialog.show();
}
     render() {
    return (
     <PopupDialog
          width={0.7}
          height={0.3}
          containerStyle={{ alignItems: 'center' }}
          dialogTitle={<DialogTitle title={this.props.title} />}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
        >
          <View style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0)' }}>
            <TextInput style={{ margin: 10 }} placeholder="Task Name" onChangeText={text => this.props.Submit(text) } />
            <DialogButton
              text="Submit"
              onPress={() => {
                this.popupDialog.dismiss();
              }}
            />
          </View>
        </PopupDialog>

    )};
}