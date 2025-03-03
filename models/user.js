const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: String,
    usertype: {
        type: String,
        enum: ["player", "sponsor"],
        required: true
    },
    profilecompleted: {
        type: Boolean,
        default: false
    },
    playerid: {
        type: Schema.Types.ObjectId,
        ref: 'Player'
    },
    sponsorid: {
        type: Schema.Types.ObjectId,
        ref: 'Sponsor'
    }
});

userSchema.plugin(passportLocalMongoose, {
    errorMessages: {
        UserExistsError: 'そのユーザー名はすでに使われています。',
        MissingPasswordError: 'パスワードを入力してください。',
        AttemptTooSoonError: 'アカウントがロックされてます。時間をあけて再度試してください。',
        TooManyAttemptsError: 'ログインの失敗が続いたため、アカウントをロックしました。',
        NoSaltValueStoredError: '認証ができませんでした。',
        IncorrectPasswordError: 'パスワードまたはユーザー名が間違っています。',
        IncorrectUsernameError: 'パスワードまたはユーザー名が間違っています。',
    }
});

module.exports = mongoose.model('User', userSchema);