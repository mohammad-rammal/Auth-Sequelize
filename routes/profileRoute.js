const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profiles', profileController.getAllProfiles);

router.get('/profiles/:id', profileController.getProfileById);

router.post('/profiles', profileController.createProfile);

router.patch('/profiles/:id', profileController.updateProfile);

router.delete('/profiles/:id', profileController.deleteProfile);

module.exports = router;
