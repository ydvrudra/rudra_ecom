class Apifeatures {
    constructor(query,queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
                },
        } 
        : {}
        this.query = this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy = { ...this.queryStr };
        // removing some fields for category
        const exclude = ['keyword', 'limit', 'page'];
        exclude.forEach(el => delete queryCopy[el]);

        // filter for price and rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(key)=> `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pegination(resultperPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultperPage * (currentPage - 1);

        this.query = this.query.limit(resultperPage).skip(skip);
        return this;
    }
};

module.exports = Apifeatures;