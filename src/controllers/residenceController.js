const residenceModel = require('../models/residence');
const hallModel = require('../models/hall');

exports.newResidence = async (req, res) => {
    try {
        const stuff = req.body

        const newResideinceFromRequest = (data) => {

            const hall = {
                residenceID: data.residenceID,
                residenceName: data.residenceName,
                residenceType: data.residenceType,
                minLevel: data.minLevel,
                maxLevel: data.maxLevel,
                numBlocks: data.numBlocks,
                blocks:[]

            }

            for (let i = 0; i < data.numBlocks; i++) {
                let block = {
                    block_letter: String.fromCharCode(65 + i),
                    numberOfRooms: data.numRooms,
                    rooms: [],
                };

                for (let j = 0; j < data.numRooms; j++) {
                    let room = {
                        room_number: j + 1,
                        students: [],
                    };
                    block.rooms.push(room);
                }

                hall.blocks.push(block);
            }

            console.log(hall);
            console.log(hall.blocks[0].rooms)


        }
        newResideinceFromRequest(stuff);
        res.status(200).json({ message: 'Residence created successfully' })

    } catch (err) {
        res.status(404).json({ message: err.message });
        console.log(err);

    }

}

exports.regStudent = async (req, res) => {
    try {
        const student = req.body
        const id = req.session.uid
        console.log(student, id)

        // const addStudentToRoom = (data) => {
        //     if (blocks[blockIndex].rooms[roomIndex].students.length >= 4) {
        //         console.log('Room is already full');
        //     } else {
        //         hall.blocks[blockIndex].rooms[roomIndex].students.push(studentId);
        //         console.log('Student added to room');
        //     }
        // };

        // addStudentToRoom(student); 

    } catch (err) {
        res.status(404).json({ message: err.message });
        console.log(err);
    }
}