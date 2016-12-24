# spawngo
A wrapper to spawn mongoimport/export processes

## usage
```javascript
const Spawngo = require('spawngo')

// create a new instance
let spawngo = new Spawngo()
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
Note that [mongoDb sends ALL status updates to stderr](https://jira.mongodb.org/browse/DOCS-8817?focusedCommentId=1386587&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-1386587), so to better determin if your process was successful, you should check the returned status code from the`close` event returned a 0, and not rely on `stderr`.
