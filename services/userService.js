import userDao from '../dao/userDao.js';
import hashUtil from '../lib/hashUtil.js';
import validate from '../lib/validateUtil.js';
import boardDao from '../dao/boardDao.js';

const userService = {
  async register(params){

    if (!validate.checkUserId(params.userId)) {
      return new Promise((resolve, reject) => {
        reject(new Error('아이디는 4 ~ 12자, 영어나 숫자만 가능합니다.'));
      });
    }

    if (!validate.checkUserPassword(params.password)) {
      return new Promise((resolve, reject) => {
        reject(new Error('비밀번호는 8글자 이상, 영문, 숫자만 가능'));
      });
    }

    if (!validate.checkUserName(params.name)) {
      return new Promise((resolve, reject) => {
        reject(new Error('이름은 2 ~ 10자, 영어만 가능'));
      });
    }

    
    let hashPassword = null;

    try{
      hashPassword = await hashUtil.makeHashPassword(params.password);
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    const newParams = {
      ...params, 
      password: hashPassword,
    };
    try {
      const insert = await userDao.insert(newParams);
      return insert;
    } catch (error) {
      throw new Error(error);
    }
  },

  async checkDuplicate(params) {
    let user = null;
    try {
      user = await userDao.selectUser(params);
      if (!user) {
        return new Promise((resolve, reject) => {
          resolve('true');
        })
        
      } else {
        return new Promise((resolve, reject) => {
          resolve('false');
        })
      }
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

  },


  async list() {
    let allUser = null;
    try {
      allUser = await userDao.selectAll();
      
      if(!allUser) {
        const err = new Error('No user');
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
      return new Promise((resolve) => {
        resolve(allUser);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async getUserBoard(params) {
    let oneUser = null;
    try {
      oneUser = await boardDao.selectAllById(params);
      
      return new Promise((resolve) => {
        resolve(oneUser);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async getOneUser(params) {
    let oneUser = null;
    try {
      oneUser = await userDao.selectOneUser(params);
      
      return new Promise((resolve) => {
        resolve(oneUser);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },

  async login(params) {
    let user = null;
    try {
      user = await userDao.selectUser(params);
      // 해당 사용자가 없는 경우 튕겨냄
      if (!user) {
        const err = new Error('Incorect userid');
        
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    // 2. 비밀번호 비교
    try {
      const checkPassword = await hashUtil.checkPasswordHash(params.password, user.password);

      // 비밀번호 틀린 경우 튕겨냄
      if (!checkPassword) {
        const err = new Error('Incorect password');

        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(user);
    });
  }

  


}

export default userService;