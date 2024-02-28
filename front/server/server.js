// 'use strict';
const cors = require('cors');
const express = require('express');
const { sequelize, User, Post, Product } = require('./models')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const env = process.env
const os = require('os');
const { hashPassword, comparePassword } = require('./src/encript')
const PORT = 8080;
const HOST = '0.0.0.0';


// App
const app = express();


// Add headers before the routes are defined
app.use(cors({
  credentials: true,
  origin: env.FRONT_HOST
}));

app.use(express.json());
app.use(cookieParser());

const cookies_opt = {
  secure: process.env.NODE_ENV !== "development",
  httpOnly: true,
  sameSite: process.env.NODE_ENV !== "development" ? 'none':'strict'
}

///create token
const create_token = async (obj) => {
  obj.expire = obj.expire ?? parseInt(env.DEFAULT_EXPIRE_TOKEN)
  obj.type = obj.type ?? "access"
  const token = jwt.sign({
    ...obj.data
  }, env.TOKEN_SECRET, { expiresIn: obj.expire });
  return token;
}


//handle token refresh
const handleRefreshToken = async (req, res) => {
  const token = req.cookies.refresh_token;
  try {
    const data = jwt.verify(token, env.TOKEN_SECRET);
    const access_token = await create_token({
      data: { uuid: data.uuid, name: data.name },
      // expire:30
    })
    res.cookie('access_token', access_token, cookies_opt);
    res.json();
  }
  catch (err){
    if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError)
      res.status(401)
    else
    res.status(403)
  res.json(err)
  }
  return req, res;
}


//middleware for check if is auth
async function isAuth(req, res, next) {
  const all_correct = (data, req, res, next) => {
    req.creds = data;
    return next();
  }
  const token = req.cookies.access_token;
  try {
    if (!token)
      throw "there is no access token";
    const data = jwt.verify(token, env.TOKEN_SECRET);
    return all_correct(data, req, res, next);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError)
      res.status(401)
    else
    res.status(403)
  res.json(err)
    return res;
  }
}


//check if is auth the user
app.post('/check', isAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { uuid: req.creds.uuid }
    })
    res.json({name:user.name, role:user.role})
    
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something whent wrong' })
  }
  return res
})

//refresh auth token
app.post('/refresh', async (req, res) => {
  req, res = handleRefreshToken(req, res)
  return res;
});

//login user
app.post('/login', async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ where: { email } })
    const valid_password = await comparePassword(password, user.password);
    if (!valid_password)
      throw { errors: "user or password don't match" };

    const data = {
        name: user.name,
        uuid: user.uuid
      }
    const access_token = await create_token({
      data: {
        name: user.name,
        uuid: user.uuid
      }
    })
    const refresh_token = await create_token({
      data: {
        name: user.name,
        uuid: user.uuid
      },
      type: "refresh",
      expire: parseInt(env.DEFAULT_EXPIRE_REFRESH_TOKEN)
    })
    res.cookie('access_token', access_token, cookies_opt);
    res.cookie('refresh_token', refresh_token, cookies_opt);
    res.json(user)
  } catch (err) {
    console.log(err);
    res.status(500).json(err.errors)
  }
  return res;
});


//logout user
app.get('/logout', isAuth, async (req, res) => {
  res.clearCookie("access_token");
  res.cookie('access_token', "", cookies_opt)
  res.clearCookie("refresh_token");
  res.cookie('refresh_token', "", cookies_opt)
  res.end();
})


///////////////////////crud user//////////////////////
//create user
app.post('/users', async (req, res) => {
  const { name, password, email, role } = req.body;
  try {
    const user = await User.create({ name, password, email, role });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.errors);
  }
  return res;
});


// read user
app.get('/users', isAuth, async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something whent wrong' })
  }
  return res
})


//update user
app.put('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  const user_to_replace = req.body;
  try {
    const user = await User.findOne({
      where: { uuid }
    })
    if (!user)
      throw "something went wrong"
    await user.update({ ...user_to_replace})
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
  return res
});


//delete user
app.delete('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid }
    })
    if (!user)
      throw "something went wrong"

    await user.destroy();
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
  return res
});


//find user
app.get('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({
      where: { uuid }
    })
    if (!user)
      throw "something went wrong"

    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
  return res
});


app.post('/posts', async (req, res) => {
  const { body, userUuid } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const post = await Post.create({ body, userId: user.id });
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.errors);
  }
  return res;
});


app.get('/posts', async (req, res) => {
  try {
    // const posts = await Post.findAll({include: [User]});
    const posts = await Post.findAll({
      // include: ['user']
      raw : true // <--- HERE

      });
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.errors)
  }
  return res
});



//create product
app.post('/products', isAuth, async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const product = await Product.create({ name, description, price }) 
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.errors);
  }
  return res;
});



app.get('/products', isAuth, async (req, res) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something whent wrong' })
  }
  return res
})


// Valid

function sum(a, b) {
  return a + b;
}
module.exports.sum = sum;

// if (require.main === module) {
//   main();
// }


//deploying server
app.listen(PORT, HOST, async () => {
  console.log(`Running on http://${HOST}:${PORT}`);
  console.log(os.uptime())
  await sequelize.authenticate()
  console.log("Database Connected")
});