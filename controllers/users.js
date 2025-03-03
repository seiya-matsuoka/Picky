const User = require('../models/user');
const Player = require('../models/player');
const Sponsor = require('../models/sponsor');
const Contact = require('../models/contact');
const { cloudinary } = require('../cloudinary');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, usertype, username, password } = req.body;
        const user = new User({ email, usertype, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'ようこそ！');
            res.redirect('/players');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'おかえりなさい！！');
    const redirectUrl = req.session.returnTo || '/players';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'ログアウトしました');
    res.redirect('/login');
}

module.exports.deleteUser = async (req, res) => {
    const id = req.user._id;
    if (req.user.usertype === "player" && req.user.playerid) {
        const player = await Player.findById(req.user.playerid);
        if (player && player.images.length > 0) {
            for (let image of player.images) {
                await cloudinary.uploader.destroy(image.filename);
            }
        }
        const deleteplayer = await Player.findByIdAndDelete(req.user.playerid);
        console.log(deleteplayer);
    } else if (req.user.usertype === "sponsor" && req.user.sponsorid) {
        const sponsor = await Sponsor.findById(req.user.sponsorid);
        if (sponsor && sponsor.images.length > 0) {
            for (let image of sponsor.images) {
                await cloudinary.uploader.destroy(image.filename);
            }
        }
        const deletesponsor = await Sponsor.findByIdAndDelete(req.user.sponsorid);
        console.log(deletesponsor);
    }    
    const sent = await Contact.deleteMany({ senderid: id });
    console.log(sent);  
    const received = await Contact.deleteMany({ receiverid: id });
    console.log(received);        
    const user = await User.findByIdAndDelete(id);
    console.log(user);    
    req.flash('success', 'ユーザーを削除しました');
    res.redirect('/register');
}