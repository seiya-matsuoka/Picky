const Sponsor = require('../models/sponsor');
const User = require('../models/user');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const sponsors = await Sponsor.find({});
    res.render('sponsors/index', { sponsors });
}

module.exports.renderNewForm = (req, res) => {
    res.render('sponsors/new');
}

module.exports.showSponsors = async (req, res) => {
    const sponsor = await Sponsor.findById(req.params.id)        
    if (!sponsor) {
        req.flash('error', 'スポンサーは見つかりませんでした');
        return res.redirect('/sponsors');
    }
    res.render('sponsors/show', { sponsor });
}

module.exports.createSponsor = async (req, res) => {
    const sponsor = new Sponsor(req.body.sponsor);
    const user = await User.findById(req.user._id);
    sponsor.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    sponsor.author = req.user._id;
    user.sponsorid = sponsor._id;
    user.profilecompleted = true;
    await sponsor.save();
    await user.save();
    console.log(sponsor);
    req.flash('success', 'スポンサーを登録しました');
    res.redirect(`/sponsors/${sponsor._id}`);
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const sponsor = await Sponsor.findById(id);
    if (!sponsor) {
        req.flash('error', 'スポンサーは見つかりませんでした');
        return res.redirect('/sponsors');
    }
    res.render('sponsors/edit', { sponsor });
}

module.exports.updateSponsor = async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const sponsor = await Sponsor.findByIdAndUpdate(id, { ...req.body.sponsor });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    sponsor.images.push(...imgs);
    await sponsor.save();
    const user = await User.findById(req.user._id);
    user.email = req.body.email;
    await user.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await sponsor.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'スポンサーを更新しました');
    res.redirect(`/sponsors/${sponsor._id}`);
}
