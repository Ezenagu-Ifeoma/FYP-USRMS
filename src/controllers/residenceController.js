const residenceModel = require('../models/residence');

exports.newResidence = async (req, res) =>{
    try{
        const resi = await residenceModel.create(req.body);
               res.status(200).json({message: 'Residence created successfully'})

    }catch(err){
        res.status(404).json({ message: err.message });
        console.log(err);

    }

}
// exports.getAllResidence = async (req, res) => {
//     try{
//      const allResidence = await residenceModel.find();
//      console.log(allResidence)


//     }catch(err){

//     }
// } 