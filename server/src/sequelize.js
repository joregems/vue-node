const { Sequelize, DataTypes, Model } = require('sequelize');
const env = process.env
const mode = process.env.NODE_ENV || 'development';
const credentials = require(__dirname + '/../config/config')[mode];


module.exports.credentials = credentials


async function connect(credentials, close = false, mode = 'connect') {
  response = null
  error = null
  const sequelize = new Sequelize(
    credentials
  );

  try {
    await sequelize.authenticate();
    response = 'Connection has been established successfully.';
  }
  catch (error_) {
    error = 'Unable to connect to the database:'
  }
  if (close) {
    await sequelize.close()
  }
  switch (mode) {
    case 'check':
      return { response, error }
    case 'connect':
      return sequelize
  }
}
module.exports.connect = connect


//crear tabla, ejemplo
function create_table(sequelize_con) {
  const Book = sequelize_con.define("books", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATEONLY,
    },
    subject: {
      type: DataTypes.INTEGER,
    }
  });
};


//create a table called Books if is executed directly
main = async () => {
  sequalize_c = await connect(credentials);
  await create_table(sequelize_con = sequalize_c)
};


if (require.main === module) {
  main();
}
