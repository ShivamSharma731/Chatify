* dotenv.config() => loads environment variables from a .env file into process.env, making them accessible in your application.
* mongoose.connect(url) => establishes a connection to a MongoDB database using Mongoose, allowing you to interact with the database from your Node.js application.

* folders in server : 
=> controllers : contains the logic of different features in our site
=> models : contains the schema of our database
=> routes : contains routes API's
=> middleware : its checks the request before sending it to the server

* mongoose.Schema() => defines the structure and data types of documents in a MongoDB collection. It sets rules for how documents should be structured, including:

Field Names and Types: Specifies what fields a document should have and their data types.
Validation: Defines validation rules for data.
Default Values: Sets default values for fields.
Indexes: Configures indexes to optimize queries.

* userSchema.pre("save" ,function) =>  in Mongoose is a middleware function that executes before saving a document to the database.

* mongoose.model(name,schema) => creates a Mongoose model based on a schema. A model in Mongoose is a constructor function that provides an interface to interact with a MongoDB collection. It allows you to perform CRUD operations (Create, Read, Update, Delete) on documents in the collection.


* so when i send the data using state management to the other page ,like auth userinfo to the profile page then after reloading the page that data loses , so to solve that we will fetch the data before and check with using JWT token