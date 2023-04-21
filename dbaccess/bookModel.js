const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookModel = () => {
    const collectionName = "book";
    const bookSchema = new Schema({
        book_id : { type: String, required: true },
        bookName : { type: String, required: true },
        author : { type: String, required: true },
        published_year : { type: Number, required: true },
        publisher_name : { type: String, required: true },
        issue_date : { type: String, required: false },
        return_date : { type: String, required: false },
        member_id : { type: String, required: false },
        is_returned : { type: Boolean, required: true },
        is_issuable : { type: Boolean, required: true },
        member_name : { type: String, required: false },
        member_email : { type: String, required: false },
    })
    bookSchema.index({book_id : 1}, {unique: true});

    return {collectionName, bookSchema};
}

module.exports = bookModel;