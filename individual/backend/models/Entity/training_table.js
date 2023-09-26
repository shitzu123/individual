module.exports = (sequelize, DataTypes) => {
    const Training = sequelize.define('admin_trainings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        event_organizer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        place: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startdate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        enddate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        no_of_seats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // initial_seats: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        isdelete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
            
    },{
        timestamps: false, 
    });

    return Training;
}
