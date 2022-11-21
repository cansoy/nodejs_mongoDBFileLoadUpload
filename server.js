const fs=require('fs')
const path =require('path')
const express=require('express')
const server=express()
const multer =require('multer')
const upload =multer()
const uuid=require('uuid')
const mongoose=require('mongoose')
const connect=require('./db/connect')
const schema=require('./schema/schema')
const stream=require('stream')

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(express.static(path.join(__dirname,'./public')))
server.set('view engine','ejs')
server.set('views',path.join(__dirname,'./views'))

server.get('/',async (req,res)=>{
    await connect.connection()
    const existDataNumber= await schema.fileSchema.count()
    res.render('index',{existDataNumber:existDataNumber})
})

server.post('/posted',upload.single('file'),async(req,res)=>{
    const reqBody=req.body
    const reqFile=req.file
    if (reqFile != undefined) {
        const buffer= Buffer.from(reqFile.buffer)
        const fileExt=path.parse(reqFile.originalname).ext
        // const writeStream=fs.createWriteStream(`./data/name${reqBody.name}_surname${reqBody.surname}_${uuid.v4()}_${fileExt}`)
        // writeStream.write(buffer)

        // const readableStream=stream.Readable.from(buffer)
        // const writeStream=fs.createWriteStream(`./data/name${reqBody.name}_surname${reqBody.surname}_${uuid.v4()}_${fileExt}`)
        // readableStream.pipe(writeStream)
        connect.connection()
        const FileSchema=new schema.fileSchema({
            writer:req.body.name,
            registerTime:new Date().getTime(),
            myFile:buffer,
            fileExt:path.parse(reqFile.originalname).ext 
        })
        try {
            await FileSchema.save()
            console.log('saved succesfully')
        } catch (error) {
            console.log('couldnt save on db')
        }
    }
    res.redirect('/posted')
})

server.get('/posted',(req,res)=>{
    fs.readdir(path.join(__dirname,'./data'),(err,files)=>{
        if (err) {
            console.log(err)
            return
        }
        res.render('posted',{files:files})
    })
})

server.get('/query',async(req,res)=>{
    await connect.connection()
    const findAll=await schema.fileSchema.find()
    const arrFindAll=Array.from(findAll)
    const files=[]
    arrFindAll.forEach(item=>{
        const buffer=Buffer.from(item.myFile.buffer) 
        const readableStream=stream.Readable.from(buffer)
        const writeStream=fs.createWriteStream(`./public/new${item.writer}${item.fileExt}`)
        readableStream.pipe(writeStream)
        files.push(`${item.writer}${item.fileExt}`)
    })
    console.log(files)
    res.render("findall",{files:files})

})  

server.listen(3000,()=>{
    console.log('/////////////////////////////////////////////////////////')
})

