import * as express from 'express'

const app = express()
const port = 4001

app.get('/', (req, res, next) => {
  res.json('Hello world')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
});
