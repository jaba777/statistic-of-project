import fs from 'fs';

const people = JSON.parse( fs.readFileSync('./db/personaldata.json').toString())

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

export const addPersonHandler=async(req,res) =>{

    try {

        people.push(req.body);
        fs.writeFileSync('./db/personaldata.json',JSON.stringify(people));
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in add person object",
            error: error.message
          })
    }

}