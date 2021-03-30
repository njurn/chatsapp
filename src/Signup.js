import React, { useReducer, useState } from 'react';
import { firebaseApp, db, firebase } from './firebase'

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cb = () => {
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      //XXX: not transactional
      console.log(result)
      db.collection('user')
      .add({
        uid: result.user.uid,
        email: result.user.email,
        creaated: firebase.firestore.Timestamp.now().seconds
      })
      .then((ref) => {
        setEmail("");
        setPassword("");
        //history.push('/signup');
      })
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    })
  }

  return (
    <div>
      <div>email<input onChange={(event) => {setEmail(event.target.value)}} value={email}></input></div>
      <div>password<input onChange={(event) => {setPassword(event.target.value)}} value={password}></input></div>
      <button className="button" onClick={cb}>Sign Up</button>
    </div>
  );
}

export default Signup;
