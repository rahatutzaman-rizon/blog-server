const express = require('express');
const cors = require('cors');
const app = express();

const { MongoClient,ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json())

// MongoDB URI

//hCIZLQVPK0Bj0fey
//redwantamim525

const uri = "mongodb+srv://redwan1:m0AsOwKeOfg87BIL@cluster0.bdroz0j.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const blogCollection = client.db('doodle').collection('blog');
    const commentCollection=client.db('doodle').collection('comment');
    const favouriteCollection=client.db('doodle').collection('favourite');
   
    app.get("/blog", async (req, res) => {
      const cursor = blogCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/fav", async (req, res) => {
      const cursor = favouriteCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });


    app.post('/blog', async(req,res)=>{
      const newProduct = req.body;
     console.log(newProduct);
     const result = await blogCollection.insertOne(newProduct);
     res.send(result);
  })


  app.post('/comment', async(req,res)=>{
    const newProduct = req.body;
   console.log(newProduct);
   const result = await blogCollection.insertOne(newProduct);
   res.send(result);
})

  //delete

  app.delete("/blog/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await blogCollection.deleteOne(query);
    res.send(result);
  })

  app.delete("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await blogCollection.deleteOne(query);
    res.send(result);
  })

    app.get("/blog/:id", async (req, res) => {
      const id=req.params.id;

     const query=  {_id: new ObjectId(id)};
     console.log(query)
      const result = await blogCollection.findOne(query) ;
      res.send(result);
    });



    app.get("/comment", async (req, res) => {
      const cursor = commentCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });


    app.get("/comment/:id", async (req, res) => {
      const blogId=req.params.blogId;
     
     const query={
      blogId : parseInt(blogId)
     }
     console.log(query)
      const result = await commentCollection.findOne(query) ;
      res.send(result);
    });


 
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', async (req, res) => {
  res.send('server is running');
});

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});