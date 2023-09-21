const { Op } = require("sequelize")
const db = require("../Entity")
const bcrypt=require("bcrypt")

const user = db.USER



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
                    res.send({data:valid_user.id,message:"User logged"})
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

    module.exports = {
        create_user,
        login_user
    };