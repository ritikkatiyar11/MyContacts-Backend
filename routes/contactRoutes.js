const express = require('express')
const router = express.Router();
const contactController=require('../controllers/contactController')

router.route('/').get(contactController.getAllContacts)

router.route('/:id').get(contactController.getContacts)

router.route('/').post(contactController.createContacts)

router.route('/:id').put(contactController.updateContacts)

router.route('/:id').delete(contactController.deleteContacts)
module.exports = router;