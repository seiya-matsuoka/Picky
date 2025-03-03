const Player = require('../models/player');
const User = require('../models/user');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const players = await Player.find({});
    res.render('players/index', { players });
}

module.exports.renderNewForm = (req, res) => {
    res.render('players/new');
}

module.exports.showPlayers = async (req, res) => {
    const player = await Player.findById(req.params.id)        
    if (!player) {
        req.flash('error', 'プレイヤーは見つかりませんでした');
        return res.redirect('/players');
    }
    res.render('players/show', { player });
}

module.exports.createPlayer = async (req, res) => {
    const player = new Player(req.body.player);
    const user = await User.findById(req.user._id);
    player.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    player.author = req.user._id;
    user.playerid = player._id;
    user.profilecompleted = true;
    await player.save();
    await user.save();
    console.log(player);
    req.flash('success', 'プレイヤーを登録しました');
    res.redirect(`/players/${player._id}`);
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const player = await Player.findById(id);
    if (!player) {
        req.flash('error', 'プレイヤーは見つかりませんでした');
        return res.redirect('/players');
    }
    res.render('players/edit', { player });
}

module.exports.updatePlayer = async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const player = await Player.findByIdAndUpdate(id, { ...req.body.player });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    player.images.push(...imgs);
    await player.save();
    const user = await User.findById(req.user._id);
    user.email = req.body.email;
    await user.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await player.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'プレイヤーを更新しました');
    res.redirect(`/players/${player._id}`);
}
