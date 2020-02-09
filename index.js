const app = require('./src/app')
const port = process.env.port ? process.env.port : 5000
app.listen(port, () => console.log(`express server listening on port ${port}`))
