const residenceModel = require('../models/residence');
const signedStudentModel = require('../models/signedStudents');

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
    maxPerRoom: data.maxPerRoom,
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
    const hallChecker = await residenceModel.find({ residenceID: newHall.residenceID });

    if (hallChecker.length === 0) {
      const residenceCreated = await residenceModel.create(newHall);
      res.status(200).json({
        message: "Residence created successfully",
        residence: residenceCreated,
      });
    }
    else { res.status(201).json({ message: "residence already exists" }); }

  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
};

exports.regStudent = async (req, res) => {
  try {
    console.log(req.body.regData)
    const block = req.body.regData.block;
    const roomNum = req.body.regData.roomNum;
    const studentId = req.session.uid;
    const student = await studentInfoModel.findById(studentId);
    const residenceName = req.body.regData.tData[0].name;

    const isAlreadyRegisteredInCurrentResidence = await residenceModel.exists({
      "residenceName": residenceName,
      "blocks.rooms.students": studentId
    });

    if (isAlreadyRegisteredInCurrentResidence) {
      console.log("You are already registered in a room in this residence.");
    } else {
      const isAlreadyRegisteredInAnyResidence = await residenceModel.exists({ "blocks.rooms.students": studentId });

      if (isAlreadyRegisteredInAnyResidence) {
        console.log("You are already registered in a room in another residence.");
      } else {
        const residenceCheck = await residenceModel.findOne({ "residenceName": residenceName });

        if (residenceCheck && residenceCheck.blocks && residenceCheck.blocks.length > 0) {
          const blockIndex = residenceCheck.blocks.findIndex(b => b.blockLetter === block);
          if (blockIndex !== -1) {
            const roomIndex = residenceCheck.blocks[blockIndex].rooms.findIndex(r => r.roomNum === parseInt(roomNum));
            if (roomIndex !== -1) {
              const roomStudents = residenceCheck.blocks[blockIndex].rooms[roomIndex].students;
              const maxPerRoom = residenceCheck.maxPerRoom || 4; // Assuming a default value if not specified

              const roomFull = roomStudents.length >= maxPerRoom;
              if (roomFull) {
                console.log("Room is full, please select another room.");
              } else {
                // Check if the same ID exists twice in the room and remove one occurrence
                const studentIndex = roomStudents.indexOf(studentId);
                if (studentIndex !== -1) {
                  roomStudents.splice(studentIndex, 1);
                }

                roomStudents.push(studentId);
                await residenceModel.findOneAndUpdate(
                  { "residenceName": residenceName },
                  { $set: { [`blocks.${blockIndex}.rooms.${roomIndex}.students`]: roomStudents } }
                );

                console.log("User registered successfully.");
              }
            } else {
              console.log("Room not found in the block.");
            }
          } else {
            console.log("Block not found in the residence.");
          }
        } else {
          console.log("Residence not found.");
        }
      }
    }
  }

  // try {
  //   const block = req.body.regData.block;
  //   const roomNum = req.body.regData.roomNum;
  //   const student = await studentInfoModel.findById(req.session.uid);
  //   const residenceCheck = await residenceModel.findOne({ "residenceName": req.body.regData.tData[0].name });
  //   console.log(residenceCheck)

  //   if (residenceCheck && residenceCheck.blocks && residenceCheck.blocks[0].rooms && residenceCheck.blocks[0].rooms[roomNum - 1].students) {
  //     const roomStudents = residenceCheck.blocks[0].rooms[roomNum - 1].students;
  //     const roomFull = roomStudents.length > residenceCheck.maxPerRoom;
  //     const userAlreadyRegistered = roomStudents.includes(req.session.uid);
  //     if(roomFull) {
  //       console.log("room is full select another room")
  //     }
  //     else if (userAlreadyRegistered && roomFull) {
  //       console.log("User already registered and room is full");
  //     } else if (userAlreadyRegistered && !roomFull) {
  //       console.log("User already registered");
  //     } else {
  //       // Check if the same ID exists twice in the room and remove one occurrence
  //       const studentIndex = roomStudents.indexOf(req.session.uid);
  //       if (studentIndex !== -1) {
  //         roomStudents.splice(studentIndex, 1);
  //       }

  //       const updatedResidence = await residenceModel.findOneAndUpdate(
  //         { "residenceName": req.body.regData.tData[0].name },
  //         { $push: { "blocks.$[b].rooms.$[r].students": req.session.uid } },
  //         {
  //           arrayFilters: [
  //             { "b.blockLetter": block },
  //             { "r.roomNum": roomNum }
  //           ],
  //           new: true
  //         }
  //       );

  //       console.log("User registered successfully");
  //     }
  //   }
  // }

  catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
}

exports.signedStudents = async (req, res) => {
  try {
    const students = req.body;
    if (students) {
      const signedchecker = await signedStudentModel.findOne({ studentId: students.id });
      if (!signedchecker) {
        const createSigner = await signedStudentModel.create({
          studentId: students.id,
          matricNo: students.matricNo,
          name: students.name,
          programme: students.programme,
          level: students.level,
          address: students.address,
          block: students.block,
          roomNum: students.roomNum,
          status: 'active'
        });
        console.log('Student signed in:', createSigner);
        res.status(200).json({ message: 'Student signed in successfully' });
      } else {
        console.log('Student already signed in');
        res.status(409).json({ message: 'Student already signed in' });
      }
    } else {
      res.status(400).json({ message: 'Invalid request body' });
    }
  } catch (err) {
    console.error('Error signing in student:', err);
    res.status(500).json({
      message: 'Internal server err'
    });
  }

}
