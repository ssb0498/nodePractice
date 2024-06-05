import  User  from '../models/user.js';


const userDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  
  selectUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userId', 'password'],
        where: { userId: params.userId },
      }).then((selectedOne) => {
        resolve(selectedOne);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectOneUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userId', 'password'],
        where: { id: params.id },
      }).then((selectedOne) => {
        resolve(selectedOne);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  
  selectAll() {
    return new Promise((resolve, reject) => {
      User.findAll({
        attributes: ['id', 'userId', 'password'],
      }).then((selectedAll) => {
        resolve(selectedAll);
      }).catch((err) => {
        reject(err);
      });
    });
  },







}

export default userDao;