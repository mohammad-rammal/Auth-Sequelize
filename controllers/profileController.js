const db = require('../models');

/***********************************
 *  @desc    Get All Profiles
 *  @route   /api/v1/profiles
 *  @method  GET
 *  @access  public
 **********************************/
exports.getAllProfiles = async (req, res) => {
    try {
        const response = await db.Profile.findAndCountAll({
            include: [
                {
                    model: db.User,
                    attributes: {exclude: ['id']},
                },
            ],
            attributes: {exclude: ['UserId']},
        });
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

/***********************************
 *  @desc    Get Profile By ID
 *  @route   /api/v1/profiles/:id
 *  @method  GET
 *  @access  public
 **********************************/
exports.getProfileById = async (req, res) => {
    try {
        const response = await db.Profile.findOne({
            where: {id: req.params.id},
            include: [db.User],
        });
        if (!response) {
            return res.status(404).send({message: 'Profile not found'});
        }
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

/***********************************
 *  @desc    Create Profile
 *  @route   /api/v1/profiles
 *  @method  POST
 *  @access  public
 **********************************/
exports.createProfile = async (req, res) => {
    try {
        const response = await db.Profile.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            country: req.body.country,
            UserId: req.body.UserId,
        });
        res.status(201).send(response);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

/***********************************
 *  @desc    Update Profile
 *  @route   /api/v1/profiles/:id
 *  @method  PATCH
 *  @access  public
 **********************************/
exports.updateProfile = async (req, res) => {
    try {
        const [updated] = await db.Profile.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                country: req.body.country,
            },
            {where: {id: req.params.id}}
        );

        if (updated) {
            const updatedProfile = await db.Profile.findOne({
                where: {id: req.params.id},
            });
            res.status(200).send(updatedProfile);
        } else {
            res.status(404).send({message: 'Profile not found'});
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

/***********************************
 *  @desc    Delete Profile
 *  @route   /api/v1/profiles/:id
 *  @method  DELETE
 *  @access  public
 **********************************/
exports.deleteProfile = async (req, res) => {
    try {
        const deleted = await db.Profile.destroy({
            where: {id: req.params.id},
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({message: 'Profile not found'});
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};
