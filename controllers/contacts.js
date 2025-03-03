const Contact = require('../models/contact');

module.exports.showReceivedList = async (req, res) => {
    const contacts = await Contact.find({receiverid: req.params.id})
        .populate('senderid');
    res.render('contacts/received', { contacts });
}

module.exports.showSentList = async (req, res) => {
    const contacts = await Contact.find({senderid: req.params.id})
        .populate('receiverid');
    res.render('contacts/sent', { contacts });
}

module.exports.createContact = async (req, res) => { 
    console.log(req.body.contact, req.body.playerid, req.body.sponsorid); 
    const contact = new Contact(req.body.contact);
    await contact.save();    
    if (req.body.playerid) {
        req.flash('success', 'プレイヤーへメッセージを送信しました');
        res.redirect(`/players/${req.body.playerid}`);
    } else if (req.body.sponsorid) {
        req.flash('success', 'スポンサーへメッセージを送信しました');
        res.redirect(`/sponsors/${req.body.sponsorid}`);
    } else {
        req.flash('error', '送信先が見つかりませんでした');
        return res.redirect('/players');
    }    
}

module.exports.changeApproved = async (req, res) => { 
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, { status: "approved" }, { new: true })
        .populate('senderid');
    console.log(contact); 
    req.flash('success', `${contact.senderid.username}様のコンタクトを承認しました`);
    res.redirect(`/contacts/received/${contact.receiverid}`);
}

// 拒否したコンタクトは完全に削除する仕様で実装
module.exports.changeRejected = async (req, res) => { 
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    console.log(contact); 
    req.flash('success', 'コンタクトを拒否しました（拒否したコンタクトは完全に削除されました）');
    res.redirect(`/contacts/received/${contact.receiverid}`);
}

// 削除ボタン用。拒否ボタン押下と処理内容は同じ。
module.exports.deleteContacts = async (req, res) => { 
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    console.log(contact);
    req.flash('success', 'コンタクトを削除しました');
    if (req.body.target && req.body.target === "sent") { 
        return res.redirect(`/contacts/sent/${contact.senderid}`);
    } else {
        return res.redirect(`/contacts/received/${contact.receiverid}`);
    }
}