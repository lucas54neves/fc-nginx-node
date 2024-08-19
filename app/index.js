const express = require("express")
const mysql = require("mysql")
const { faker } = require("@faker-js/faker")

const PORT = 3000
const config = {
  host: "database",
  user: "root",
  password: "password",
  database: "nodedb",
}

const app = express()

app.get("/", (req, res) => {
  const name = faker.person.fullName()

  const connection = mysql.createConnection(config)

  const sql = `INSERT INTO people(name) values('${name}')`

  connection.query(sql)

  connection.query("SELECT name FROM people", (err, rows) => {
    if (err) throw err

    let names = ""
    rows.forEach((row) => {
      names += `<li>${row.name}</li>`
    })

    res.send(`<div><h1>Full Cycle Rocks!</h1><ul>${names}</ul></div>`)
  })

  connection.end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
