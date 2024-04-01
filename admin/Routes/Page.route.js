const express = require('express');
const router = express.Router();

const PageController = require('../Controllers/Page.Controller');


router.post('/', PageController.createNewPage);
router.get('/', PageController.getAllPages);
router.get('/all', PageController.getPages);
router.get('/all/:type', PageController.getPagesByType);
router.get('/get-home-text', PageController.getHomePageText);
router.get('/:id', PageController.findPageById);
router.get('/slug/:slug', PageController.findPageBySlug);
router.put('/update-home-text', PageController.updateHomePageText);
router.put('/:id', PageController.updatePage);
router.delete('/:id', PageController.deletePage);

module.exports = router;