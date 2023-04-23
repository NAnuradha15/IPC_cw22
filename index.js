
import express from 'express';

import { initializeApp } from "firebase/app";
import {   getDocs, updateDoc } from
'firebase/firestore/lite';
import { getFirestore, collection } from
'firebase/firestore';

import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJ3D7snUEgOpAwmMae3cpMM5xIy68qqYQ",
    authDomain: "ipccw2-5409e.firebaseapp.com",
    databaseURL: "https://ipccw2-5409e-default-rtdb.firebaseio.com",
    projectId: "ipccw2-5409e",
    storageBucket: "ipccw2-5409e.appspot.com",
    messagingSenderId: "221848359057",
    appId: "1:221848359057:web:ce60ff87f410050c816f30",
    measurementId: "G-P9N9XJLZV5"
  };

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);


async function getCollection(db, colName) {
    const dataCol = collection(db, colName);
    const dataSnapshot = await getDocs(dataCol);
    const DataList = dataSnapshot.docs.map(doc => doc.data());
    return DataList;
}

async function addToCollection(db, colName) {

    const data = {
        ax : ax,
        ay : null,
        az : null,
        Speed : null,
        gx : null,
        gy : null,
        gz : null,
        DeviceID : id,
        Direction : null,
    };

    const UUID = (new Date()).getTime();
    await setDoc(doc(db, colName, UUID.toString()), data);
}

async function addDataToCollection(db, colName, data) {
    const UUID = (new Date()).getTime();
    await setDoc(doc(db, colName, UUID.toString()), data);
}

const api = express();
api.use(express.json());
api.get('/', (req, res) => {
    res.send('Express App Running');
});


api.post('/recordsound', (req, res) => {
    const sensorReading = req.query.temp || 0;
    const id = req.query.ID
    const data = {
        ax : ax,
        ay : ay,
        az : az,
        Speed : speed,
        gx : gx,
        gy : gy,
        gz : gz,
        DeviceID : deviceId,
        Direction : derection,
    }
    addDataToCollection(database, "nibm_IPCCw2", data).then(
        value => {res.send("Done");}
    ).catch(
        err => {
            res.send("Error writing to DB, Please check the API");
            console.log(err);
        }
    )
});

//Deploying the listener
const port = process.env.PORT || 8080;
api.listen(port, () => console.log(`Express server listening on port
${port}`));