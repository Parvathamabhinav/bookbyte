const router = require("express").Router();
const User=require("../models/user")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {authenticateToken}=require("./userAuth")

//Sign up
router.post("/sign-up",async(req,res)=>{
    try{
        const {username,email,password,address}=req.body;

        if(username.length<4){
            return res.status(400).json({message:"Username length>=4"})
        }
        //check username already exists
        const existingUsername=await User.findOne({username:username})
        if(existingUsername){
            return res.status(201).json({message:"user already exists"})
        }

        //check email
        const existingEmail=await User.findOne({email:email})
        if(existingEmail){
            return res.status(200).json({message:"Email already exists"})
        }
        //check password
        if(password.length<=5){
            return res.status(200).json({message:"password length >5"})
       
        }
        //bcrpytjs  for hashing

        const hashPass=await bcrypt.hash(password,10)
        //how do u create a new user
        const newUser= new User({
            username:username,
            email:email,
            password:hashPass,
            address:address,
            
        });
        //to save new user to atlas
        await newUser.save();
        
        //useful when we r using thunderclient
        return res.status(201).json({message:"SignUp-Successful"})
       
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

//sign in
router.post("/sign-in",async(req,res)=>{
    try{
        const {username,password}=req.body;
        const existingUser= await User.findOne({username});
        if(!existingUser){
            res.status(400).json({message:"Invalid credentials"});
        }
        //how to compare two passwords?
        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            //what is data
            if(data){
                //know the below lines
                const authClaims=[
                    {
                        name:existingUser.username
                    },
                    {
                        role:existingUser.role
                    },
                ];
                //creating token 
                const token=jwt.sign({authClaims},"abhi",{expiresIn:"30d",});
                res.status(200).json({
                    id:existingUser.id,
                    role:existingUser.role,
                    token:token
                });
            }else{
                res.status(400).json({message:"Invalid password"});
            }
        })
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

//chatgpt
// router.post("/sign-in", async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const existingUser = await User.findOne({ username });

//         if (!existingUser) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Use await to properly handle bcrypt.compare
//         const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Invalid password" });
//         }

//         const authClaims = {
//             name: existingUser.username,
//             role: existingUser.role,
//         };

//         const token = jwt.sign(authClaims, "abhinav", { expiresIn: "30d" });

//         return res.status(200).json({
//             id: existingUser.id,
//             role: existingUser.role,
//             token: token
//         });

//     } catch (error) {
//         return res.status(500).json({ message: "Internal server error" });
//     }
// });



//get-user-info
router.get("/get-user-information",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const data=await User.findById(id).select("-password");
        return res.status(200).json(data);

    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})
//update adress
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated succesfully"});
    }catch(error){
        res.status(500).json({messsage:"Internal error"})
    }
})







module.exports=router;