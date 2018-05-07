const model = require('../models/posts')

console.log('controllers')

function getAll (req, res, next) {
  const limit = req.query.limit
  const data = model.getAll(limit)
  res.status(200).json({ data })
}

function getOne (req, res, next) {
  const id = req.params.id
  const data = model.getOne(id)
  res.status(200).json({ data })
}

function create (req, res, next) {
  const title = req.body.title
  const content = req.body.content
  const data = model.create(title, content)

  if(data.errors) {
    return next({ status: 400, message: `Could not create new post`, errors: data.errors })
  }
  res.status(201).json({ data })
}

function update (req, res, next) {
  const id = req.params.id
  const title = req.body.title
  const content = req.body.content
  const newPost = model.update(id, title, content)
  res.status(200).json({ data: newPost })
}

function remove (req, res, next) {
  const id = req.params.id
  const removedPost = model.remove(id)
  res.status(200).json({ data: removedPost })
}

function addAuthorId (req, res, next) {
  return uuid()
}


module.exports = { getAll, getOne, create, update, remove }
