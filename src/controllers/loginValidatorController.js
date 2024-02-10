

exports.validateUser =  async(req, res)=>{
    try{
        const {user, password} =   req.body;
         const checker = await student


    }catch(err){
        res.status(404).json({message: err.message});

    }
} 