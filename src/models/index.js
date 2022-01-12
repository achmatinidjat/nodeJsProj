const User = require("./user");
const CourseId = require("./course_id");
const Disciplines = require("./disciplines");
const Grades = require("./grades");
const Table = require("./table");
const Teachers = require("./teachers");
const UserInfo = require("./user_info");
const Courses = require("./courses");

Courses.belongsTo(User, {through: CourseId, foreignKey:"course_id"});
User.hasMany({foreignKey: "id"});

UserInfo.belongsTo(User,{foreignKey:"user_id"});
User.belongsTo(UserInfo,{foreignKey:"user_id"});

Teachers.belongsTo(User,{foreignKey:"user_id"})