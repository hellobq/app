import pymongo
from bson.objectid import ObjectId
import jieba
import jieba.analyse

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['web-pro']
collection = db['reports']
results = collection.find()
for result in results:
  desc = str(result.get('description'))
  seg_list = jieba.analyse.extract_tags(desc)[:6]
  collection.update_one({ 'description': desc }, {
    '$set': {
      'keywords': ' '.join(seg_list)
    }
  })
  print(' '.join(seg_list))
