const express = require ('express')
const {registerUser,loginUser,showUsers} = require('../controllers/userController');
const {updateUser} = require('../controllers/userController');
const {deleteUser} = require('../controllers/userController');
const auth = require('../middlewares/authMiddlewares');
const router = express.Router();


// API's

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/usersData',auth,showUsers);
router.put('/users/:_id',updateUser);
router.delete('/users/:_id',deleteUser);


module.exports = router;

