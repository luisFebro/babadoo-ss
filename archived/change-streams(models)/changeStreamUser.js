const mongoose = require('mongoose');
const Pusher = require('pusher');
const { pusherKey, pusherSecret } = require('../../config/keys');
const db = mongoose.connection;

const pusher = new Pusher({
    appId: '882281',
    key: pusherKey,
    secret: pusherSecret,
    cluster: 'us2',
    useTLS: true,
});

function changeStreamTask() {
    db.on('error', console.error.bind(console, 'Connection Error:'));
    db.once('open', () => {
        //watching any update in tasks collection
        const targetCollection = db.collection('all-users');
        const changeStream = targetCollection.watch();

        changeStream.on('change', change => {
            console.log("typechangeStream:", change.operationType);
            console.log("datachangeStream:", change);
            //When there’s a change in the collection,
            //  a change event is received. In particular,
            //  the following changes are supported:
            //  Insert, Update, Replace, Delete, Invalidate
           const channel = 'babadoo';
           let event = null;
           let dataReceived = null;
           let dataToPush = null;
           switch(change.operationType) {
               case 'update':
                   event = 'updated';
                   dataReceived = change.updateDescription.updatedFields;
                   dataToPush = dataReceived;
                   console.log("updated", dataToPush);
                   // id: task._id,
                   // task: task.task,
                   return pusher.trigger(channel, event, dataToPush);
               case 'insert':
                   event = 'inserted';
                   dataReceived = change.fullDocument;
                   dataToPush = {}
                   return pusher.trigger(channel, event, dataToPush);
               case 'delete':
                   event = 'deleted';
                   dataReceived = change;
                   dataToPush = dataReceived;// change.documentKey._id;
                   console.log("deleted", dataToPush);
                   // return pusher.trigger(channel, event, dataToPush);
               default:
                   console.log("default change Stream. Did not match anything");
           }
        });
    });
}

module.exports = changeStreamTask;