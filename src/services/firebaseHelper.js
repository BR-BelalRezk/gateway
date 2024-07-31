// Example: Reading Data
import firebase from './firebase';

function readNotifications(){
    const database = firebase.database();
    database.ref('notifications').on('value', (snapshot) => {
        const notifications = snapshot.val();
        //console.log('Notifications:', notifications);
      });

}


