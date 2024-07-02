const User = require('../models/userModel');
const Property = require('../models/propertyModel');

exports.getAllUsers = async (req, res)=>{
    try{
        usersAll = await User.find()

        if(!usersAll){
            return res.status(400).send({message: "Failed to get all the users", usersAll})
        }

        res.status(200).send({message : "Managed to get all users", usersAll})
        
    }catch(err){
        res.status(500).send("Could not get all the users", err)
    }
}

exports.getOne = async (req, res)=>{
    try{
        const {email} = req.body

        if(!email){
            return res.status(400).send("Email cannot be empty") 
        }

        let user  = await User.findOne({email})

        if(!user){
            return res.status(400).send({message:"Cannot get user with email : ", email}) 
        }

        res.status(200).send({message: "Got user by email :", email})


    }catch(err){
        res.status(500).send({message:"Could not get the user", err})
    }
}

exports.updateOne = async (req, res)=>{
    try{
        
        const id = req.params.id

        // Are you assigning the user email in line 45? Output the relevant message in line 50

        if(!id){
            return res.status(400).send("Email cannot be empty") 
        }

        let updatedUser  = await User.findByIdAndUpdate(id, req.body)

        //Are you really getting the user by email here?
        if(!updatedUser){
            return res.status(404).send({message:"Cannot get user with email : ", email}) 
        }


        await updatedUser.save()

        res.status(200).send({message: "Got user by email :", updatedUser})

    }catch(err){
        res.status(500).send({message:"Could not get the user", err})
    }
}


exports.addFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const property = await Property.findById(req.body.propertyId);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (!user.favorites.includes(property._id)) {
            user.favorites.push(property._id);
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.favorites.pull(req.body.propertyId);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

