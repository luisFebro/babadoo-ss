const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = "product-backups";

const data = {
    subject: String,
    backup: {
        type: Object
    },
    runningBackup: {
        type: Boolean,
        default: true
    }
}

const backupSchema = new Schema(data, { timestamps: true });
module.exports = mongoose.model('BackupProduct', backupSchema, collectionName);



