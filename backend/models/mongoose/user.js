import {Schema, model} from 'mongoose';

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    username: {
        type: String,
        unique: [true, 'There is already an username with that name'],
        required: [true, 'The username is required']
    },
    email: {
        type: String,
        unique: [true, 'There is already and email with that name'],
        required: [true, 'The email is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    age: {
        type: Number,
        required: [true, 'Your age is rerquired']
    },
    id: {
        type: Number,
        unique: [true, 'There is an account with that id already'],
        required: [true, 'You must provide an ID']
    },
    portafolio: {
        type: Schema.Types.ObjectId,
        ref: 'portafolios',
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false,
        required: false
    }

}, {timestamps: true});


export default model('users', userSchema);