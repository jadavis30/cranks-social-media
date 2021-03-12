const dateFormat = require('../utils/dateFormat');
const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
        type: String
        },
        username: {
          type: String
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => dateFormat(createdAtVal)
        }
    },
{
    toJSON: {
        getters: true
    },
}
);
const ThoughtSchema = new Schema({
    thoughtText: { 
      type: String,
      required: 'Please share your thought!',
      min: 1,
      max: 280

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
    },
    reactions: [ReactionSchema]

},
{
    toJSON: {
        virtual: true,
        getters: true
    },
}
);
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

