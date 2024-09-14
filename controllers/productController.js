const db = require('../models');

/***********************************
 *  @desc    Get All Products
 *  @method  GET
 *  @access  public
 **********************************/
exports.getAllProducts = async (req, res) => {
    try {
        const response = await db.Product.findAndCountAll({
            include: [
                {
                    model: db.User,
                    attributes: {exclude: ['UserId']},
                },
            ],
            attributes: {exclude: ['id']},
        });
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err);
    }
};

/***********************************
 *  @desc    Get Product By ID
 *  @method  GET
 *  @access  public
 **********************************/
exports.getProductById = async (req, res) => {
    try {
        const response = await db.Product.findOne({
            where: {id: req.params.id},
            include: [db.User],
        });
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err);
    }
};

/***********************************
 *  @desc    Create Product
 *  @method  POST
 *  @access  public
 **********************************/
exports.createProduct = async (req, res) => {
    try {
        const response = await db.Product.create({
            name: req.body.name,
            price: req.body.price,
            UserId: req.body.UserId,
        });
        res.status(201).send(response);
    } catch (err) {
        res.status(400).send(err);
    }
};

/***********************************
 *  @desc    Update Product
 *  @method  PATCH
 *  @access  public
 **********************************/
exports.updateProduct = async (req, res) => {
    try {
        const [updated] = await db.Product.update(
            {
                name: req.body.name,
                price: req.body.price,
                userId: req.body.userId,
            },
            {where: {id: req.params.id}}
        );

        if (updated) {
            const updatedProduct = await db.Product.findOne({where: {id: req.params.id}});
            res.status(200).send(updatedProduct);
        } else {
            res.status(404).send({message: 'Product not found'});
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

/***********************************
 *  @desc    Delete Product
 *  @method  DELETE
 *  @access  public
 **********************************/
exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await db.Product.destroy({where: {id: req.params.id}});

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send({message: 'Product not found'});
        }
    } catch (err) {
        res.status(400).send(err);
    }
};
