import ZHIHU from './zhihu'
import _ from 'lodash'
import async from 'async'
import r from 'rethinkdb'

const fetch = (seed) => {
  const getColumns = (callback) => {
    ZHIHU.getColumns(seed, (err, res) => {
      callback(err, res.body)
    })
  }

  const getColumnDetail = (list, callback) => {
    const slugs = _.map(list, 'slug')
    async.eachLimit(slugs, 5, (slug, cb) => {
      ZHIHU.getColumnDetail(slug, (err, res) => {
        console.log(res.body)
        let connection = null;
        if(!res.body) {
          return cb(null)
        }
        r.connect( {host: 'localhost', port: 48015, db: 'mohu'}, function(err, conn) {
          if (err) throw err;
          connection = conn;
          r.table("column").insert(res.body).run(conn, (err, res) => {
            if(err) {
              console.log(err)
            } else {
              console.log(res)
            }
          })
        })
        cb(null)
      })
    }, (err) => {
      callback(slugs)
    })
  }

  async.waterfall([
    getColumns,
    getColumnDetail
  ], (err, res) => {
    console.log(res)
  })
}

export default fetch
