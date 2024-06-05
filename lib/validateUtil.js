import validator from 'validator';



const validate = {

  checkUserId(userId) {
    if (!validator.isLength(userId,{ min: 4, max: 12 }))  return false
    
    if (!validator.isAlphanumeric(userId))  return false;

    if (validator.isEmpty(userId))  return false;

    return true;
  },
  
  checkUserPassword(userPw) {
    if (!validator.isLength(userPw,{ min: 8, max: undefined })) return false;
    
    if (!validator.isAlphanumeric(userPw))  return false;

    if (validator.isEmpty(userPw))  return false;
  
    return true;
    
  },
  
  checkUserName(userName) {
    if (!validator.isLength(userName,{ min: 2, max: 10 }))  return false;
    
    if (!validator.isAlpha(userName)) return false;

    if (validator.isEmpty(userName))  return false;
  
    return true;

  },

}

export default validate;