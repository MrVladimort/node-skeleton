const Router = require('express-promise-router');
const homeController = require('../controllers/home.controller');
const router = Router();

router.get('/', homeController.getHome);

module.exports = router;
