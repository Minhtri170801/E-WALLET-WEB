const { Sequelize, DataTypes} = require('sequelize');
/**
* Kết nối MySQL.
*/
var school
switch(process.env.MODE) {
  case 'production':
    school = new Sequelize('', '', '', {
        host: '',
        dialect: 'mysql'
    });
    break;
  default:
    school = new Sequelize('school', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
    });
}

//Kiểm tra kết nối
school.authenticate().then(() => console.log("Kết nối MySQL thành công!"))
 .catch((e) => console.log(e));

const student = school.define('Student', {
    // Model attributes are defined here
    MSSV: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fee: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }
});

//Tự động tạo bảng student
school.sync();

module.exports = student;
