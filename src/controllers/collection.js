const { User, Collection, Report } = require('../db/Schema');
const handleErr = require('./handleErr');

const getCollectionList = async (ctx, next) => {
  const { name_id } = ctx.query, arr = []
  const { collections } = await User.findOne({ _id: name_id }).populate('collections', '_id date report collector');

  for (let i = 0; i < collections.length; ++i) {
    const { _id, date, report } = collections[i];
    const { type, image, href, title, description } = await Report.findById(report);
    arr.push({
      _id,
      date,
      report: {
        type,
        image,
        href, 
        title, 
        description
      }
    });
  };

  ctx.body = {
    success: true,
    data: arr
  };
}

// toogleCollection
const toogleCollection = async (ctx, next) => {
  const { name_id, report_id } = ctx.request.body;
  const { collections } = await User.findOne({
    _id: name_id
  });

  if (collections.length) {
    // 收藏了部分内容

    let i = 0;
    for (; i < collections.length; ++i) {
      const hasCollected = await Collection.findOne({ _id: collections[i], report: report_id });
      if (hasCollected) {
        // 已经对该内容收藏

        await Collection.deleteOne({
          _id: collections[i]
        });

        await User.updateOne({
          _id: name_id
        }, {
          $pull: {
            collections: collections[i]
          }
        });
        break;
      }
    }

    if (i === collections.length) {
      // 未收藏该内容

      const { _id } = await Collection.create({
        date: new Date(),
        report: report_id,
        collector: name_id
      });

      await User.updateOne({
        _id: name_id
      }, {
        $push: {
          collections: _id
        }
      });
    }
  } else {
    // 未收藏任何内容

    const { _id } = await Collection.create({
      date: new Date(),
      report: report_id,
      collector: name_id
    });

    await User.updateOne({
      _id: name_id
    }, {
      $push: {
        collections: _id
      }
    });
  }

  ctx.body = {
    success: true
  };
}
const collection = async (ctx, next) => {
  const { name_id, report_id, collection_id } = ctx.request.body;

  const { collections } = await User.findOne({
    _id: name_id
  });

  // toggle collection
  if (collections.findIndex(item => item + '' === collection_id) !== -1) {
    await Collection.deleteOne({
      _id: collection_id
    });

    await User.updateOne({
      _id: name_id
    }, {
      $pull: {
        collections: collection_id
      }
    });
  } else {
    const { _id } = await Collection.create({
      date: new Date(),
      collector: name_id,
      report: report_id
    });

    await User.updateOne({
      _id: name_id
    }, {
      $push: {
        collections: _id
      }
    });
  }

  ctx.body = {
    success: true,
    message: 'ok'
  };
};

module.exports = { 
  toogleCollection,
  getCollectionList
};
