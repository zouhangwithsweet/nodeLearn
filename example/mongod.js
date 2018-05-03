var mg = require('mongoose');
mg.Promise = global.Promise
mg.connect("mongodb://zouhangsweet:147369wads@ds046267.mlab.com:46267/zouhangsweetdb", function(err, db) {
    if (err) {
        console.log(err+'链接失败') 
        return
    }
    const Schema = mg.Schema

    const mySchema = new Schema({
        title: String,
        author: String,
        body: String,
        comments: [{body: String, date: Date}],
        date: {type: Date, default: Date.now},
        hidden: Boolean,
        meta: {
            votes: Number,
            fave: Number
        },
        size: String
    })

    const MyModel = mg.model('zzModel', mySchema)
    const doc1 = new MyModel({
        size: 'small'
    })
    doc1.save((err, doc) => {
        console.log(doc)
    })
})
