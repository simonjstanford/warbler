const mongoose = require("mongoose");
const user = require("./user");

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxlength: 160
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

messageSchema.pre("remove", async function(next) {
    try {
        //find a user
        let foundUser = await user.findById(this.user);
        //remove the id of the message
        foundUser.messages.remove(this.id);
        //save the user
        foundUser.save();

        return next();
    } catch (error) {
        return next(error);
    }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;