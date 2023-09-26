module.exports = (sequelize, DataTypes) => {
    const Tickets = sequelize.define('bookings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        numberOfTickets: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    },{
        timestamps: false, // This disables createdAt and updatedAt fields
    });

    return Tickets;
}