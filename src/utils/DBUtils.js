import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)

db.defaults({ posts: [] })
  .write()

export const addPost = (post) => {
  db.get('posts')
    .push(post)
    .write()
}

export const clearPost = () => {
  db.get('posts')
    .remove()
    .write()
}

export const getPosts = () => {
  return db.get('posts')
    .value()
}
