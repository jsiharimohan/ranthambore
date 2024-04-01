const express = require('express');
const router = express.Router();

const MarqueeController = require('../Controllers/Marquee.Controller');


router.get('/', MarqueeController.getAllMarquees);

router.post('/', MarqueeController.createNewMarquee);
router.patch('/:id', MarqueeController.updateMarquee);

//Get a setting by id
router.get('/:id', MarqueeController.findMarqueeById);

//Delete a setting by id
router.delete('/:id', MarqueeController.deleteAMarquee);

module.exports = router;