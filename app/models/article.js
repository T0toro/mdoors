/**
 * Article
 *
 * @module       :: model
 * @description  :: Represent articles in database
 */

/*
 * Module variables
 */

var mongoose, Schema, ArticleSchema;

/*
 * Module dependencies
 */

mongoose = require('mongoose');
Schema = mongoose.Schema;

/*
 * ArticleSchema
 */

ArticleSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    slug: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: ''
    }
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

ArticleSchema.method({

});

/**
 * Statics
 */

ArticleSchema.static({

});

/**
 * Register
 */

mongoose.model('Article', ArticleSchema);
