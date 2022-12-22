module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  users.associate = function(models){
    // Assocations define here
    users.hasMany(models.users_address, {
      foreignKey: 'users_id'
    })
  }

  return users
}
  