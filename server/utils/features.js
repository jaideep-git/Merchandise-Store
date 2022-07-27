class Features {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.search
      ? {
          name: {
            $regex: this.queryStr.search,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    // making copy of the query string
    const queryDuplicate = { ...this.queryStr };
    const removeFields = ["search", "page", "limit"];

    // removing terms from the query string
    removeFields.forEach((key) => delete queryDuplicate[key]);

    // Price and rating filter
    let queryStr = JSON.stringify(queryDuplicate);
    // Adds $ infront of gt,lt,lte and gte
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = Features;
