import express from 'express'
const app = express()
const PORT = 4001

const sumObject = (obj: { a: number; b: number }) => {
  for (let i = 0; i < 10; i++) {
    console.log(i)
  }
  return obj.a + obj.b
}

app.get('/', (req, res) => {
  const data: { a: number; b: number } = { a: 7, b: 100 }
  const value = sumObject(data)
  res.send(`Hello world, ${value}`)
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
