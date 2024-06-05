import express from 'express';
import boardService from '../services/boardService.js'

const router = express.Router();


router.post('/', async (req, res) => {
  console.log(req.headers);
  console.log(req.body);

  try {
    const params = {
      userId: req.body.userId,
      title: req.body.title,
    }
    
    const result = await boardService.register(params);
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
    const result = await boardService.list();
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
    const result = await boardService.getOneBoard(params);
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

router.put('/:userId/:boardId', async (req, res) => {
  const params = {
    userId: req.params.userId,
    boardId: req.params.boardId,
    title: req.body.title,
    
  }

  try {
    const result = await boardService.updateBoard(params);
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

router.delete('/:userId/:boardId', async (req, res) => {
  const params = {
    userId: req.params.userId,
    boardId: req.params.boardId,
  }

  try {
    const result = await boardService.deleteBoard(params);
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});



export default router;