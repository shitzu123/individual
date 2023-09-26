const { Sequelize, DataTypes } = require("sequelize");
const db_config = require("../../config/db-config.js")
const sql = require("mysql2/promise")

sql.
    createConnection({ user: db_config.USER, password: db_config.PASSWORD })
    .then(()=>
    {
        console.log("db CONNECTED successfully")
    })

const sequelize= new Sequelize(
    db_config.DATABASE,
    db_config.USER,
    db_config.PASSWORD,{
        host:db_config.HOST,
        dialect:db_config.DIALECT,
        // timezone: '+05:30'
    }
) 

const db={}
db.sequelize=sequelize
db.USER=require("./user_table.js")(sequelize,DataTypes)
db.ADMIN_TRAINING=require("./training_table.js")(sequelize,DataTypes)
db.TICKETS = require('./booking_tickets.js')(sequelize,DataTypes)




db.ADMIN_TRAINING.hasMany(db.TICKETS,{ foreignKey: 'eventId' })
db.TICKETS.belongsTo(db.ADMIN_TRAINING, { foreignKey: 'eventId' });
db.sequelize.sync({ force: false }, () => {

    console.log("Sync done");
  
  });
  

  
  module.exports = db;

console.log('connection successful !!!')