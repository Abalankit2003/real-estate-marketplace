import mongoose from 'mongoose';

const ls=new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    password:{
        type:String,
        require:true,
    }
},{timestamps: true});

const model=mongoose.model("Success",ls);

export default model;
