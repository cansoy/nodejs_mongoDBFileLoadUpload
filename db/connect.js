const mongoose=require('mongoose')
const uri="URI"
const options={ useNewUrlParser: true, useUnifiedTopology: true }

const connection=()=>{
    mongoose.connect(uri,options)
    .then(res=>{
        console.log('connected')
    })
    .catch(err=>{
        console.log('not connected!!!')
    })
}

module.exports={
    connection
}
