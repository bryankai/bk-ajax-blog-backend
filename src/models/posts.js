const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const file = path.join(__dirname, 'posts.json')
let index

console.log('models')

function getAll (limit) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  return limit ? posts.slice(0, limit) : posts
}

function getOne (id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const post = posts.find(post => post.id === id)
  index = posts.indexOf(post)
  if (!post) return { errors:  `can not find ${id}`}
  return post
}

function create (title, content) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const errors = []
  let response
  if (!title) {
    errors.push('title is required')
    response = { errors }
  } else if (!content) {
      errors.push('content is required')
      response = { errors }
  } else {
    const post = { id: uuid(), title: title, content: content }
    posts.push(post)
    response = post
    const json = JSON.stringify(posts)
    fs.writeFileSync(file, json)
  }
  return response
}

function update (id, title, content) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const post = getOne(id)
  const errors = []
  console.log(posts[index]);
  if (!title) {
    errors.push('title is required')
    response = { errors }
  } else if (!content) {
    errors.push('content is required')
    response = { errors }
  } else {
    posts[index].title = title
    posts[index].content = content
    const json = JSON.stringify(posts)
    fs.writeFileSync(file, json)
    response = posts[index]
  }
  return response
}

function remove (id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(contents)
  const post = getOne(id)
  const removedPost = posts.splice(index,1)
  const json = JSON.stringify(posts)
  fs.writeFileSync(file, json)
  return removedPost
}




module.exports = { getAll, getOne, create, update, remove }
