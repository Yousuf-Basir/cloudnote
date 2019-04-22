import React, { Component } from "react";
import './App.css';

import firebase from "firebase";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./components/firebaseConfig";
import ModalCont from './components/modal';
import CustomToolbar from './components/toolbar';
import { Menu, Header, Icon, Modal, Button } from "semantic-ui-react";

//const CustomButton = () => <span className="octicon octicon-star" />

const database = firebase.database();
//let loggedIn = false;

function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

//https://codepen.io/alexkrolick/pen/NapmrE


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logginState: false,
      text: "",
      userData: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  saveNote=()=>{
    if(this.state.userData.displayName){
      const noteRef = database.ref().child("myNotes").child(this.state.userData.uid);
      noteRef.set(this.state.text);
    }else{
      console.log("user is not signed in.")
    }
  }
  handleChange(value) {
    this.setState({ text: value });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setState({
          logginState: true,
          userData: user
        });

        const noteRef = database.ref("myNotes/"+this.state.userData.uid);
        noteRef.on("value", snap => {
          console.log(noteRef.toString());
          this.setState({
            text: snap.val()
          });
        });
      } else {
        console.log("user is not signed in");
        this.setState({ logginState: false });
      }
    });
  }

  logOut() {
    firebase.auth().signOut().then(() => {
          this.setState({ logginState: false });
        },
        error => {
          console.log("An error occured diring logging out" + error);
        }
      );
  }

  handleItemClick = () => {
    console.log("clicked");
  };


  render() {
    return (
      <div>
        <Menu>
        <Menu.Item name="Save" active={false} onClick={this.saveNote}/>
          <Menu.Menu position="right">
            <Menu.Item>
              <img src={this.state.userData.photoURL} />
            </Menu.Item>
              {
                this.state.logginState ? (
                  <Menu.Item name="Logout" active={false} onClick={this.logOut}/>
                ) : (
                  <Modal trigger={<Menu.Item name="Login" active={false} onClick={this.handleItemClick}/>}
                  basic size="small" closeIcon>
                    <Header icon="user circle" content="Sign in or Sign up" />
                    <ModalCont />
                  </Modal>
                )
              }
            
          </Menu.Menu>
        </Menu>

        <CustomToolbar />
        <ReactQuill
          style={this.qlContainerStyle}
          value={this.state.text}
          onChange={this.handleChange}
          modules={App.modules}
        />
      </div>
    );
  }
}

App.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertStar: insertStar
    },
    size: []
  },

  clipboard: {
    matchVisual: false
  }
};

export default App;
