const productService = require("../services/course");
const NotAcceptableError = require("../errors/NotAcceptableError");
const Response = require("../helpers/response");
const fileHandler = require("../helpers/fileHandler");
const NotFoundError = require("../errors/NotFoundError");

class ProductController {

    async create(req, res, next) {

        const productData = req.body;

        try {

            await productService.create(productData);

            res.json(new Response("Creation successful", 200));

        } catch (err) {

            return next(new NotAcceptableError("Creation failed"));

        }
    }

    async addTag(req, res, next) {

        const productId = req.params.id;
        const tagName = req.query.tagName;

        try {

            await productService.addTag(productId, tagName);

            res.json(new Response("Creation successful", 200));

        } catch (err) {

            return next(new NotAcceptableError("Creation failed"));

        }

    }

    async deleteTag(req, res, next) {

        const productId = req.params.productId;
        const tagName = req.query.tagName;

        try {

            await productService.deleteTag(productId, tagName);

            res.json(new Response("Delete successful", 200));

        } catch (err) {

            return next(err);

        }

    }

    async listTags(req, res, next) {

        try {

            let productId = req.params.id;

            res.json(await productService.listTags(productId));

        } catch (err) {

            return next(err);

        }

    }

    async searchByTags(req, res, next) {

        try{

            let tags = req.body;

            res.json(await productService.searchByTags(tags));

        }catch(err){

            next(err);

        }
    }

    async searchByName(req, res, next) {

        try{

            let name = req.query.name;

            res.json(await productService.searchByName(name));

        }catch(err){

            console.log(err)

            next(err);

        }

    }

    async getImage(req, res, next) {

        try{

            const id = req.params.id;

            const product = await productService.read(id);

            const imageName = product.image;

            if(!imageName){

                throw new NotFoundError("File not found");

            }

            fileHandler.get(imageName, res, next);

        }catch (err) {

            return next(err);

        }
    }

    async setImage(req, res, next) {

        try{

            if(!req.file) {

                throw new NotAcceptableError("File was not loaded");

            }

            const productId = req.params.id;
            const productData = {

                image: req.file.filename

            }

            const product = await productService.read(productId);
            const oldImageName = product.image;

            if (oldImageName && oldImageName !== "no_url"){

                fileHandler.delete(oldImageName);

            }

            await productService.update(productId, productData);

            res.json(new Response("Image added successful", 200));

        }catch (err) {

            if(req.file) {

                fileHandler.delete(req.file.filename);

            }

            return next(err);

        }
    }

    async update(req, res, next) {

        const productId = req.params.id;
        const productData = req.body;

        try {

            await productService.update(productId, productData);

            res.json(new Response("Update successful", 200));

        } catch (err) {

            return next(err);

        }
    }

    async delete(req, res, next) {

        const productId = req.params.id;

        try {

            await productService.delete(productId);

            res.json(new Response("Delete successful", 200));

        } catch (err) {

            return next(err);

        }
    }

    async list(req, res, next) {

        try {

            let params = req.query;

            res.json(await productService.list(params));

        } catch (err) {

            return next(err);

        }
    }

    async setMark(req, res, next) {

        try {

            let userId = req.session.user.id;
            let productId = req.params.id;
            let markValue = req.query.value;

            await productService.setMark(userId, productId, markValue);

            res.json(new Response("Mark set successful", 200));

        } catch (err) {

            console.log(err);

            return next(err);

        }
    }

    async deleteMark(req, res, next) {

        try {

            let userId = req.session.user.id;
            let productId = req.params.id;

            await productService.deleteMark(userId, productId);

            res.json(new Response("Mark deleted successful", 200));

        } catch (err) {

            return next(err);

        }
    }
}

module.exports = new ProductController();
