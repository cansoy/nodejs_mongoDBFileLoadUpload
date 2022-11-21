const mongoose=require('mongoose')

const FileSchema=new mongoose.Schema({
    writer:{
        type:String
    },
    registerTime:{
        type:Date
    },
    myFile:{
        type:Buffer
    },
    fileExt:{
        type:String
    }
})

const fileSchema=mongoose.model('FileSchema',FileSchema)

module.exports={
    fileSchema
}

