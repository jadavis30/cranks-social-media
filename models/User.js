const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const UserSchema = new Schema (
    {
        username: {
            type: String,
            trim: true,
            required: 'Username is required.',
            unique: true
        },
        email: {
            type: String,
            trim: true,
            required: 'A valid e-mail is required.',
            unique: true,
            //Uses validator function that tests the regex and passes a message for errors.
            validate: {
                validator: function(v) {
                    return /.+\@.+\..+/.test(v);
                },
                message: 'E-mail required'
            }
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id:false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;