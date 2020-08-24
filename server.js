const express = require("express")
const app = express()
const port = 5000
const morgan = require("morgan")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")

const verify = (req, _, next) => {
  if (jwt.verify(req.header.authentication)) {
    return next()
  } else {
    next(new Error("Unauthorized"))
  }
}

app.use(bodyParser.json())

app.use(morgan("combined"))

app.get("/", (req, res) => res.send("Hello World!"))
app.get("/pao", verify, (req, res) => res.send("Te amo!"))

app.post("/login", (req, res) => {
  const { username, password } = req.body

  if (username === "paolazorrila16@gmail.com" && password === "123456") {
    const token = jwt.sign(
      { name: "Paola", lastName: "Zorrilla", id: "6354awda54784" },
      "secret",
    )
    return res.send(token)
  }
  return res.send("Unauthorized")
})

app.listen(port, () =>
  console.log(
    `Example app listening at http://localhost:${port || process.env.PORT}`,
  ),
)
