import React from 'react'
import {Modal } from 'semantic-ui-react'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "./",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

const ModalCont = () => (
<Modal.Content>
        <p>
          Sign in or Sign up with your Google account to save documents in the cloud ☁
        </p>
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
</Modal.Content>
)

export default ModalCont
