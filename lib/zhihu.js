import request from 'superagent'

const ColumnList ='https://zhuanlan.zhihu.com/api/recommendations/columns?limit=1000'
const Column = 'https://zhuanlan.zhihu.com/api/columns'
const Post = 'https://zhuanlan.zhihu.com/api/posts'


let ZHIHU = {}

ZHIHU.getColumns = (seed, callback) => {
  const uri = `${ColumnList}&seed=${seed}`
  request.get(uri)
    .end((error, res) => {
      if(error) {
        return callback(error)
      }
      return callback(null, res)
    })
}

ZHIHU.getColumnDetail = (name, callback) => {
  const uri = `${Column}/${name}`
  request.get(uri)
    .end((error, res) => {
      if(error) {
        return callback(error)
      }
      return callback(null, res)
    })
}

ZHIHU.getPostListByColumnName = (name, callback) => {
  const uri = `${Column}/${name}/posts`
  request.get(uri)
    .end((error, res) => {
      if(error) {
        return callback(error)
      }
      return callback(null, res)
    })
}

ZHIHU.getPostDetailByPostId = (postId, callback) => {
  const uri = `${Post}/${postId}`
  request.get(uri)
    .end((error, res) => {
      if(error) {
        return callback(error)
      }
      return callback(null, res)
    })
}

export default ZHIHU
