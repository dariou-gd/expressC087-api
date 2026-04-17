import mongoose, {Schema, model} from "mongoose"

const vehicleSchema = new Schema({
    driverId:{
        type: mongoose.Schema.Types.ObjectId,
                ref: "Driver"
    },
    plate:{
        type: String
    },
    model:{
        type: String
    },
    capacity:{
        type: String
    },
    status:{
        type: String
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Vehicle", vehicleSchema)