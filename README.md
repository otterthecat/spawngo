# spawngo
A wrapper to spawn mongoimport/export processes

## usage
```javascript
const Spawngo = require('spawngo')

// create a new instance
let spawngo = new Spawngo({
  user: 'foo',
  pw: 'bar',
  'collection': 'bang'
})
// call #import() function and pass a file to import into mongoDb
// this will return a child process object
let childProcess = spawngo.import('my.json')

// handle events as needed
childProcess.stdout.on('data', function (data) {
  // block to handle stdout
})

childProcess.stderr.on('data', function (data) {
  // block to handle stderr
})

childProcess.on('close', function (data) {
  // block to handle close
})

```
**Note** that [mongoDb sends ALL status updates to stderr](https://jira.mongodb.org/browse/DOCS-8817?focusedCommentId=1386587&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-1386587), so to better determine if your process was successful, you should ensure the status code from the`close` event returned a 0, and not rely on `stderr`.

Exporting is nearly identical to the above, but instead of `import()`, you would call `export()`
```javascript
let childProcess = spawngo.export('collectionName')
```

## api
**Constructor(options)**
*options (Object)*: Configuration object. Allowed properties are as follows (displayed with default values)
 * host: 'localhost'
 * user: ''
 * pwd: ''
 * db: ''
 * collection: ''
 * jsonArray: `true`
 * upsertFields: `undefined`
 * cpus: [default is number of machine's [cpu cores](https://nodejs.org/dist/latest-v6.x/docs/api/os.html#os_os_cpus)]
 * drop: `false`

Instead of passing `options` to constructor, you can also apply your settings by using the `.set()` function.

If no user and password are set, then the call to `mongoimport` will not use authentication.

**import(fileName)**

*fileName (String)*: Path of the json/csv/tsv file to import

*returns*: ChildProcess of the spawned query.

**export(collection)**

*collection (String)*: Name of the collection to export. The exported `json` file will be named after the collection (i.e `collectionName.json`).

*returns*: ChildProcess of the spawned query.

**set(optsObj or key, value)**

*optsObj (Object)*: Configuration object. See `Constructor` above to see all available options.

*key (String), value (String)*: to update a single congiguration property, you may pass a key/value pair of strings as an argument: `spawngo.set('collection', 'myThings')`.

*returns*: The spawngo instance.