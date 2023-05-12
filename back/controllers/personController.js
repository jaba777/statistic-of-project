import fs from 'fs';

const people = JSON.parse( fs.readFileSync('./db/personalData.json').toString())

export const FullPersonalController=async(req,res)=>{
    try {
        res.status(200).json(people)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Getting personal data",
            error: error.message
          })
    }
} 