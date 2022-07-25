const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User, Product, Role } = require('../models/index');
const product = require('../models/product');

class Controller {
    static async login(req, res, next) {
        if(req.session.isAuth){
            res.redirect('/dashboard')
            return
        }
    
        const body = req.body;
        let titlePage = 'Login';

        // post
        if(Object.keys(body).length > 0){
            const { email, password } = body;
            const checkUser = await User.findOne({
                where: {
                    email: email,
                    password: password
                }
            });

            if(checkUser){
                req.session.isAuth = true;
                req.session.userLoggin = checkUser.id;
              
                res.redirect('/')
                return
            }
        }

        res.render('auth/login', { titlePage});
        
    }

    static logout(req, res) {
        req.session.isAuth = false;
        req.session.userId = 0;
        res.redirect('/');
    }

    static home(req, res) {
        if(!req.session.isAuth){
            res.redirect('/login')
            return;
        }
        res.redirect('/dashboard')
    }

    static async dashboard(req, res, next) {
        if(!req.session.isAuth){
            res.redirect('/login')
            return
        }
        const userLoggin = req.session.userLoggin;
        
        let titlePage = 'Dashboard';
        let searchFilter = req.query.search??"";

        let user = await User.findOne({
            where: {
                id: userLoggin,
            },
            include: [{
                model: Product,
            }]
        })
      
        let products = user.Products

        if (searchFilter.length) {
            products = await Product.findAll({
                where: {
                    userId: userLoggin,
                    name: {
                        [Op.like]: `%${searchFilter}%`
                    }
                },
            });
        }

        res.render('dashboard/index', { titlePage, products, user});
    }


    static async editProduct(req, res) {
        if(!req.session.isAuth){
            res.redirect('/login')
            return
        }
        let productId = req.params.id;

        let product = await Product.findOne({
            where: {
                id: productId,
            },
        });
        let titlePage = `Edit ${product.name}`;
        const body = req.body;

        // post
        if(Object.keys(body).length > 0){
            const { name, stok, harga } = body;
            const product = await Product.update(
                {
                    name: name,
                    stock: parseInt(stok),
                    harga: parseInt(harga)
                },
                {
                    where: {
                        id: productId
                    }
                }
            )

            res.redirect('/dashboard')
            return
        }

        res.render('product/edit', { titlePage, product});

    }

    static async addProduct(req, res) {
        var titlePage = 'Add Product'
        var product = []
        const userLoggin = req.session.userLoggin;
        const body = req.body;

        // post
        if(Object.keys(body).length > 0){
            const { name, stok, harga } = body;
            const product = await Product.create(
                {
                    name: name,
                    stock: parseInt(stok),
                    harga: parseInt(harga),
                    userId: userLoggin
                }
            )

            res.redirect('/dashboard')
            return
        }


        res.render('product/edit', { product,titlePage});
    }

    static async deleteProduct(req, res) {
        if(!req.session.isAuth){
            res.redirect('/login')
            return
        }
        let productId = req.params.id;

       let product = await Product.destroy({
            where: {
                id: productId,
            },
        });
        

        res.redirect('/dashboard')
    }
}

module.exports = Controller;