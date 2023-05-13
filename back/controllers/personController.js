import fs from 'fs';

let people = JSON.parse( fs.readFileSync('./db/personaldata.json').toString())

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

        const {id,name,gender,email,address,phone} = req.body;
        if(!id || !name || !gender || !email || !address || !phone){
            res.status(502).send({
                message: 'error'
            })
        }  else{

            people.push(req.body);
            fs.writeFileSync('./db/personaldata.json',JSON.stringify(people));
            res.status(200).send(people);

        }

      
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in add person object",
            error: error.message
          })
    }

}


export const deletePersonHandler=async(req,res) =>{

    try {

        const {id} = req.params;

        people=people.filter(item=> item.id.toString() !== id);
        fs.writeFileSync('./db/personaldata.json',JSON.stringify(people));
        res.status(200).send(people)
        console.log(typeof id)
      
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in delete person object",
            error: error.message
          })
    }

}

export const countPeople=async(req,res)=>{
    const data=[]
    people.forEach((item,index)=>{
        if(index == 1){
            data.push({type: item.address.city,value:1})
        }
        
       
    })

    res.status(200).send(data)
}