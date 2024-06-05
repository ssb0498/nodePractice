import express from 'express';
import userService from '../services/userService.js'

const router = express.Router();


router.post('/', async (req, res) => {
  console.log(req.headers);
  console.log(req.body);

  try {
    const params = {
      name: req.body.name,
      userId: req.body.userId,
      password:  req.body.password,
    }
    
    const result = await userService.register(params);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post('/duplicate', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
    }
    
    const result = await userService.checkDuplicate(params);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//이 요청은 개발단계에서 등록된 모든 사용자를 보기 위한 api입니다.
//후에 관리자가 이 api를 쓸 것으로 예상됩니다.
router.get('/all', async (req, res) => {
  console.log(req.headers);
  console.log(req.body);

  try {
    const result = await userService.list();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});



router.get('/board/:id', async (req, res) => {
  const params = {
    id: req.params.id,
  }

  try {
    const result = await userService.getUserBoard(params);
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

router.get('/:id', async (req, res) => {
  const params = {
    id: req.params.id,
  }

  try {
    const result = await userService.getOneUser(params);
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});



export default router;