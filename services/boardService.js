import userDao from '../dao/userDao.js';
import boardDao from '../dao/boardDao.js';

const boardService = {
  async register(params){

    try {
      const insert = await boardDao.insert(params);
      return insert;
    } catch (error) {
      throw new Error(error);
    }
  },


  async list() {
    let allBoard = null;
    try {
      allBoard = await boardDao.selectAll();
      
      return new Promise((resolve) => {
        resolve(allBoard);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async getOneBoard(params) {
    let oneBoard = null;
    try {
      oneBoard = await boardDao.selectOne(params);
      
      return new Promise((resolve) => {
        resolve(oneBoard);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async updateBoard(params) {
    const { userId, boardId } = params;

    try {
      const checkBoard = await boardDao.selectOne({id: boardId});
      if (checkBoard.userId !== Number(userId)) {
        throw new Error('삭제할 권한이 없습니다.');
      }
      const updatedBoard = await boardDao.update(params);
      return updatedBoard;
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async deleteBoard(params) {
    const { userId, boardId } = params;
    
    try {
      const checkBoard = await boardDao.selectOne({id: boardId});
      if (checkBoard.userId !== Number(userId)) {
        throw new Error('삭제할 권한이 없습니다.');
      }
      const deleteBoard = await boardDao.delete(params);
      
      return new Promise((resolve) => {
        resolve(deleteBoard);
      });
    } catch (error) {
      console.log(error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }

}

export default boardService;