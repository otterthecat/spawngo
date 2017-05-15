'use strict'

exports.generateAuth = function (opts) {
  let authdb = opts.authenticationDatabase || opts.db
  return opts.user && opts.pwd ? `-u ${opts.user} -p ${opts.pwd} --authenticationDatabase ${authdb}` : ''
}

exports.generateHeaderline = function (opts) {
  let fileExtension = opts.file.substring(opts.file.lastIndexOf('.') + 1).toLowerCase()
  return fileExtension !== 'json' ? '--headerline' : ''
}

exports.generateJSONArray = function (opts) {
  return opts.jsonArray ? '--jsonArray' : ''
}

exports.generateType = function (file) {
  return `--type ${file.substring(file.lastIndexOf('.') + 1).toLowerCase()}`
}

exports.generateUpsertFields = function (val) {
  return val ? `--upsertFields ${val.join(',')}` : ''
}

exports.generateInsertionWorkers = function (num) {
  return `--numInsertionWorkers ${num}`
}

exports.generateDrop = function (bool) {
  return bool ? '--drop' : ''
}
