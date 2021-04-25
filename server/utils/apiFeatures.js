
class APIFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        //1a)Filtering
        let excludingFields = ['limit','page','fields','sort'];
        let object = {...this.queryString};
        excludingFields.forEach(el => delete object[el]);
        
        //1b)Advanced Filtering
        let queryStr = JSON.stringify(object);
        queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        this.query =  this.query.find(JSON.parse(queryStr));
        
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            let sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else{
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    fields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields;
            this.query = this.query.select(fields); //select the method is projecting 
        }else{
            this.query = this.query.select('-__v') ; // excluding __v
        }
        return this;
    }

    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit *1 ||100;
        const skip = (page-1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}
module.exports = APIFeatures;