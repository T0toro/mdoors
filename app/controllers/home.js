/*!
 * Module dependencies.
 */

const mongoose = require('mongoose');

const News = mongoose.model('News');

/*!
 * Expos
 */

exports.index = async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });

  return res.render('dashboard/home/index', { news });
};
