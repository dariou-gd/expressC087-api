import mongoose, {Schema, model} from "mongoose"
import { type } from "node:os"

const packageSchema = new Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
                ref: "Driver"
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
                ref: "Customer"
    },
    trackingNumber:{
        type: String
    },
    weight:{
        type: String
    },
    dimensions:{
        type: String
    },
    description:{
        type: String
    },
    status:{
        type: String
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Package", packageSchema)