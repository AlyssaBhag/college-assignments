import Product from '../models/product.js'; 

class ProductService {
    constructor() {}

    async retrieveProduct(productId) {
        const product = await Product.findById(productId);
        return product;
    }

    async retrieveProductName(name) {
        const namedProduct = await Product.findOne({name});
        if(namedProduct && namedProduct.length > 0)
            {
                return true;
            } 
        return false;
    }
    
    async createProduct({ name, price, stock, description, owner, createdDate = new Date() }) {
        const product = await Product.create({ name, price, stock, description, owner, createdDate });
        return product;
    }
    

    async updateProduct(productId, { name, price, stock, description}) {
    const filter = {_id: productId};
    const update = { name, price, stock, description };
    const product = await Product.findOneAndUpdate(filter, update, {new: true});
    return product;
    }

    async deleteProduct(productId) {
        const filter = {_id: productId};
        const product = await Product.findOneAndDelete(filter);
        return product;
    }

    async searchProduct(page = 1, perPage = 3) {
        const filters = {};
        const count = await Product.countDocuments(filters);
        const pages = Math.ceil(count / perPage);

        const pagination = {
            page: parseInt(page),
            perPage: parseInt(perPage),
            count,
            pages
        };

        const fields = {
            __v: 0
        };

        const options = {
            skip: (page - 1) * perPage,
            limit: perPage,
            sort: { createdAt: -1 }
        };

        const records = await Product.find(filters, fields, options);
        return { records, pagination };
    }
}

export default new ProductService();