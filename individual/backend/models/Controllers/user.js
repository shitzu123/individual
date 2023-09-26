const { Op } = require("sequelize")
const db = require("../Entity")
const bcrypt=require("bcrypt")


const user = db.USER
const admin = db.ADMIN_TRAINING
const tickets = db.TICKETS



const login_user = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    const isValid = /@jmangroup\.com$/.test(email);
    if (!isValid) {
        res.send("invaild mail")
    }
    else if (!passwordRegex.test(password)){
        res.send("Passoword is weak")
    }
    else {
        try {
        
            const valid_user = await user.findOne({
                where: {
                    mail: req.body.email,
                   
                }})
                const valid=await bcrypt.compare(password,valid_user.password)
                if (valid) {
                    // const token = jwt.sign({ userId: valid_user.id, email: valid_user.mail}, secretkey, {
                    //     expiresIn: '1h',
                    //   });
                    res.send({data:valid_user.id,role:valid_user.role,message:"User logged"})
                }
                // else if (!valid_user.isadmin && valid)  {
                //     const token = jwt.sign({ userId: valid_user.id, email: valid_user.mail}, secretkey, {
                //         expiresIn: '1h',
                //       });
                //     res.send({data:valid_user.id,message:"User logged"})
                // }
                else{
                    res.send("Unauthorized user")
                }
            
        } catch (error) {
            res.send("user not exist")
        }
    }
}

const create_user = async (req, res) => { 
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    const isValid = /@jmangroup\.com$/
    try {
        if (req.body.name && req.body.email && req.body.password) {
            console.log(req.body)
            var { name, email, password } = req.body
            if(!passwordRegex.test(password))
            {
                res.send("Passoword is weak")
            }
            else if(!isValid.test(email))
            {
                res.send("not an organisation mail")
            }
            
            else{
                const hash= await bcrypt.hash(password, 10);
                password=hash
                console.log(password,"hello")
                await user.create({
                    name: name,
                    mail:email,
                    password: password
                });

                res.send({ statusCode: 200, message: 'response success' })
            }
        }
        else {
            res.send("Response failed to add to DB")
        }
    } catch (error) {
        res.send({ statusCode: 400, message: 'username or mail id already exists' })

    }}


    const create_training = async (req, res) => {
        console.log('data',req.body)
        try {
                    console.log("entered")
                    await admin.create({
                        event_organizer: req.body.event_organizer,
                        place:req.body.place,
                        description:req.body.description,
                        domain:req.body.domain,
                        startdate:req.body.startDate.toLocaleString(),
                        enddate:req.body.endDate,
                        no_of_seats:req.body.seats,
                        // initial_seats:req.body.seats,
                        
                    });
                    res.send({ statusCode: 200, message: 'response success' })

           
        } catch (error) {
            res.send({ statusCode: 400, message: 'response failed' })
    
        }}

        const view_events= async(req,res)=>{
            console.log(req.body)
            try {
                const view= await admin.findAll({
                    where:{
                        isdelete:false
                    }
                }).then((data)=>{
                    if(data){
                        res.send({message:"View success",data})        
                    }
                    else{
                        res.send({message:'Failed to view'})
                    }
                })
            } catch (error) {
                res.send({message:"Failed to retrieve from DB"})
                
            }
        
        }

        const sports_event= async(req,res)=>{
            console.log(req.body)
            try {
                console.log('chintu')
                const display= await admin.findAll({
                    where:{
                        domain:'sports'
                    }
                }).then((data)=>{
                    if(data){
                        res.send({message:"View success",data})        
                    }
                    else{
                        res.send({message:'Failed to view'})
                    }
                })
            } catch (error) {
                res.send({message:"Failed to retrieve from DB"})
                
            }
        
        }

        

        const music_event= async(req,res)=>{
            console.log(req.body)
            try {
                console.log('xyz')
                const view= await admin.findAll({
                    where:{
                        domain:'music&dance'
                    }
                }).then((data)=>{
                    if(data){
                        res.send({message:"View success",data})        
                    }
                    else{
                        res.send({message:'Failed to view'})
                    }
                })
            } catch (error) {
                res.send({message:"Failed to retrieve from DB"})
                
            }
        
        }



        const display_bookings= async(req,res)=>{
            console.log(req.body)
            try {
                console.log('display bookings')
                const view= await tickets.findAll({
                  include: admin
                }).then((data)=>{
                    if(data){
                        res.send({message:"View success",data})        
                    }
                    else{
                        res.send({message:'Failed to view'})
                    }
                })
                
            } catch (error) {
                res.send({message:"Failed to retrieve from DB"}) 
            }
        }




        const yoga_event= async(req,res)=>{
            console.log(req.body)
            try {
                const view= await admin.findAll({
                    where:{
                        domain:'yoga'
                    }
                }).then((data)=>{
                    if(data){
                        res.send({message:"View success",data})        
                    }
                    else{
                        res.send({message:'Failed to view'})
                    }
                })
            } catch (error) {
                res.send({message:"Failed to retrieve from DB"})
                
            }
        
        }

        const delete_event=async (req,res)=>{
    
            console.log("request",req.body)
            try{
                if(req.body.training_id)
                {
                    
                    const del= await admin.findOne({
                        where:{
                            id:req.body.training_id
                        }
                    }).then((data)=>{
                        if(data.isdelete!==true){
                        data.isdelete=true
                        data.save()
                        res.send({statusCode:200,message:"Training deleted successfully"})
                    }   else{
                        res.send({statusCode:400,message:"Training already deleted"})
                    }
                    })
                    
                }
                else{
                    res.send({statusCode:400,message:"Failed to fetch"})
                }
            }
            catch(error)
            {
                res.send({statusCode:400,message:"Training Id is invalid"})
            }
        
        }

        const book_tickets = async (req, res) => {
            console.log('data',req.body)
            try {
                        console.log("entered")
                        await tickets.create({
                            eventId: req.body.eventId,
                            numberOfTickets:req.body.numberOfTickets,
                        });
                        console.log('finished');
                        res.send({ statusCode: 200, message: 'response success' })
    
               
            } catch (error) {
                console.log('start')
                res.send({ statusCode: 400, message: 'response failed' })

        
            }}


    module.exports = {
        create_user,
        login_user,
        create_training,
        view_events,
        delete_event,
        music_event,
        sports_event,
        yoga_event,
        book_tickets,
        display_bookings,
    };