const Joi = require('joi');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SchemaValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

/***********************************
 *  @desc    Register a New User
 *  @route   /api/v1/register
 *  @method  POST
 *  @access  public
 **********************************/
exports.register = async (req, res) => {
    try {
        const count = await db.User.count({where: {email: req.body.email}});
        if (count !== 0) {
            return res.status(400).send('This email is already in use');
        }

        let validation = SchemaValidation.validate({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });

        if (validation.error) {
            return res.status(400).json(validation.error.details[0].message);
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const response = await db.User.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        });

        res.status(201).send(response);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

/***********************************
 *  @desc    Login User
 *  @route   /api/v1/login
 *  @method  POST
 *  @access  public
 **********************************/
exports.login = async (req, res) => {
    try {
        const user = await db.User.findOne({where: {email: req.body.email}});
        if (!user) {
            return res.status(400).json({
                msg: 'Invalid email or password!',
            });
        }

        const decoded = await bcrypt.compare(req.body.password, user.password);
        if (!decoded) {
            return res.status(400).json({
                msg: 'Invalid email or password!',
            });
        }

        const token = jwt.sign({id: user.id, role: 'user', username: user.username}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
};
