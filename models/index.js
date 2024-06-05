import sequelize from "./connection.js";
import User from "./user.js";
import Board from "./board.js";

const db = {}

db.sequelize = sequelize;

db.User = User;
db.Board = Board;


User.init(sequelize);
Board.init(sequelize);


export default db;