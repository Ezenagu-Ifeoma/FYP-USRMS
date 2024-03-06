const residenceModel = require("../models/residence");

const studentInfoModel = require('../models/studentInfo');

const newResideinceFromRequest = (data = {}) => {
  const hall = {
    residenceID: data.residenceID,
    residenceName: data.residenceName,
    residenceType: data.residenceType,
    capacity: data.capacity,
    availableSpace: data.availableSpace,
    minLevel: data.minLevel,
    maxLevel: data.maxLevel,
    numBlocks: data.numBlocks,
    numRooms: data.numRooms,
    blocks: [],
  };

  for (let i = 0; i < data.numBlocks; i++) {
    let block = {
      blockLetter: String.fromCharCode(65 + i),
      numRooms: data.numRooms,
      rooms: [],
    };

    for (let j = 0; j < data.numRooms; j++) {
      let room = {
        roomNum: j + 1,
        students: [],
      };
      block.rooms.push(room);
    }

    hall.blocks.push(block);
  };

  return hall;
};

exports.newResidence = async (req, res) => {
  try {
    const stuff = req.body;
    const newHall = newResideinceFromRequest(stuff);
    const hallChecker = await residenceModel.find({ residenceID: newHall.residenceID })
    if (hallChecker) { res.status(404).json({ message: "residence already exists" }); }
    else {
      const residenceCreated = await residenceModel.create(newHall);
      res.status(200).json({
        message: "Residence created successfully",
        residence: residenceCreated,
      });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
};

exports.regStudent = async (req, res) => {
  try {
    const block = req.body.regData.block;
    const roomNum = req.body.regData.roomNum;
    const student = await studentInfoModel.findById(req.session.uid);
    const residenceCheck = await residenceModel.findOne(
      { "residenceName": req.body.regData.tData[0].name })

    if (residenceCheck && residenceCheck.blocks && residenceCheck.blocks[0].rooms && residenceCheck.blocks[0].rooms[roomNum - 1].students) {
      const roomFull = residenceCheck.blocks[0].rooms[roomNum - 1].students.length >= 4;
    
      const userAlreadyRegistered = residenceCheck.blocks[0].rooms[roomNum - 1].students.includes(req.session.uid);
    
      if (userAlreadyRegistered && roomFull) {
        console.log("User already registered and room is full");
      } else if (userAlreadyRegistered && !roomFull) {
        console.log("User already registered");
      } else {
        const residence = await residenceModel.findOneAndUpdate(
          { "residenceName": req.body.regData.tData[0].name },
          { $push: { "blocks.$[b].rooms.$[r].students": req.session.uid } },
          {
            arrayFilters: [
              { "b.blockLetter": block },
              { "r.roomNum": roomNum }
            ],
            new: true
          }
        );
      }
    }

  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
}
