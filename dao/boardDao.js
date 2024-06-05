import  Board  from '../models/board.js';


const boardDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Board.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  
  selectOne(params) {
    return new Promise((resolve, reject) => {
      Board.findOne({
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
      Board.findAll({
      }).then((selectedAll) => {
        resolve(selectedAll);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  
  selectAllById(params) {
    return new Promise((resolve, reject) => {
      Board.findAll({
        where: {
          userId: params.id 
        }
      }).then((selectedAll) => {
        resolve(selectedAll);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  update(params) {
    return new Promise((resolve, reject) => {
      Board.update(
        params,
        {
          where: { id: params.boardId },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: data });
      }).catch((err) => {
        reject(err);
      });
    });
  },

  delete(params) {
    return new Promise((resolve, reject) => {
      Board.destroy({
        where: { id: params.boardId },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },






}

export default boardDao;