module.exports = (sequelize, Datatype) => {
    const User = sequelize.define('User', {
        username: {
            type: Datatype.STRING,
            allowNull: false,
        },
        email: {
            type: Datatype.STRING,
            allowNull: false,
        },
        password: {
            type: Datatype.STRING,
            allowNull: false,
        },
    });

    User.associate = (models) => {
        User.hasMany(models.Product, {
            onDelete: 'cascade', // when delete the USER will delete the all his products too
        });
        User.hasOne(models.Profile, {
            onDelete: 'cascade',
        });
    };
    return User;
};
