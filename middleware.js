const Player = require('./models/player');
const Sponsor = require('./models/sponsor');
// const ExpressError = require('./utils/ExpressError');
// const { playerSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'ログインしてください');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    if (req.user.usertype === "player") {
        const player = await Player.findById(id);
        if (!player || !player.author || !player.author.equals(req.user._id)) {
            req.flash('error', 'そのアクションの権限がありません');
            return res.redirect('/players');
        }    
    } else {
        const sponsor = await Sponsor.findById(id);
        if (!sponsor || !sponsor.author || !sponsor.author.equals(req.user._id)) {
            req.flash('error', 'そのアクションの権限がありません');
            return res.redirect('/sponsors');
        }   
    }
    next();
}

// サーバ側のバリデーション未実装
// module.exports.validatePlayer = (req, res, next) => {
//     const { error } = playerSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(detail => detail.message).join(',');
//         throw new ExpressError(msg, 400);
//     } else {
//         next();
//     }
// }
