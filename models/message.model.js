const { Schema, model } = require('mongoose')
const { ObjectId, String } = Schema.Types
const messageSchema = new Schema({
    fromUser: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    toUser: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true})

messageSchema.methods.values = function() {
	
}

module.exports = model('Comment', messageSchema)