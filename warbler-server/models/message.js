const mongoose = require("mongoose");
const user = require("./user");

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

messageSchema.pre("remove", async function(next) {
    try {
        //find a user
        let user = await user.findById(this.userId);
        //remove the id of the message
        user.message.remove(this.id);
        //save the user
        user.save();

        return next();
    } catch (error) {
        return next(error);
    }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;