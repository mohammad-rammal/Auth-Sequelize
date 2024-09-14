/***********************************
 *  @desc    Get All Users
 *  @route   /api/v1/user
 *  @method  GET
 *  @access  public
 **********************************/
exports.getAllUsers = async (req, res) => {
    try {
        const response = await db.User.findAndCountAll();
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err);
    }
};

/***********************************
 *  @desc    Get User By ID
 *  @route   /api/v1/user/:id
 *  @method  GET
 *  @access  public
 **********************************/
exports.getUserById = async (req, res) => {
    try {
        const response = await db.User.findOne({where: {id: req.params.id}, include: [db.Profile, db.Product]});
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err);
    }
};

/***********************************
 *  @desc    Update User
 *  @route   /api/v1/user/:id
 *  @method  PATCH
 *  @access  public
 **********************************/
exports.updateUser = async (req, res) => {
    try {
        const [updated] = await db.User.update(
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            },
            {where: {id: req.params.id}}
        );

        if (updated) {
            const updatedUser = await db.User.findOne({where: {id: req.params.id}});
            res.status(200).send(updatedUser);
        } else {
            res.status(404).send({message: 'User not found'});
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

/***********************************
 *  @desc    Delete User
 *  @route   /api/v1/user/:id
 *  @method  DELETE
 *  @access  public
 **********************************/
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await db.User.destroy({where: {id: req.params.id}});

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({message: 'User not found'});
        }
    } catch (err) {
        res.status(400).send(err);
    }
};
