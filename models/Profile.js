module.exports = (sequelize, Datatype) => {
    const Profile = sequelize.define('Profile', {
        firstName: {
            type: Datatype.STRING,
            allowNull: false,
        },
        lastName: {
            type: Datatype.STRING,
            allowNull: false,
        },
        country: {
            type: Datatype.STRING,
            allowNull: false,
        },
    });

    Profile.associate = (models) => {
        Profile.belongsTo(models.User, {
            onDelete: 'cascade',
        });
    };
    return Profile;
};
