const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');



const app =express();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json())

const PORT=8065;
const DB_URL='mongodb+srv://admin_itpm:root@cluster1.5dls4qn.mongodb.net/AuroraDB?retryWrites=true&w=majority&appName=Cluster1'
mongoose.connect(DB_URL)
.then(()=>{
    console.log('DB connected');

})
.catch((err)=>console.log('DB connection error',err));

const schemaData=mongoose.Schema({
    name:String,
    email:String,
    feedback:String,
},{
    timestamps : true
})

const userModel=mongoose.model("Feedback",schemaData)

//read
//http://localhost:8065/
app.get("/",async(req,res)=>{
    const data=await userModel.find({})

    res.json({Success:true,data:data});
});

//save data
//http://localhost:8065/create
/* {
    name
    email
    feedback
}  */
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data=new userModel(req.body)
    await data.save()
    
    res.send({success : true,message: "data save successfully",data:data})

    

})


//http://localhost:8065/update
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {id,...rest}=req.body
    console.log(rest)


    await userModel.updateOne({_id:req.body.id},rest)
    res.send({success:true,message:"data update successfully"})

  
})

//delete
//http://localhost:8065/delete/:id

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    await userModel.deleteOne({_id:id})
    res.send({success:true,message:"data delete successfully"})

})



app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
});