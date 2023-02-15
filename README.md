//typegoose
A common problem when using Mongoose with TypeScript is that you have to define both the Mongoose model and the TypeScript interface. If the model changes, you also have to keep the TypeScript interface file in sync or the TypeScript interface would not represent the real data structure of the model.

Typegoose aims to solve this problem by defining only a TypeScript interface (class), which needs to be enhanced with special Typegoose decorators (like @prop).

//namespace

//ODM & ORM

ORM (Object Relational Mapper) maps the relations between data, where as ODM (Object Document Mapper) deals with documents

MySQL is an example of a relational database - you would use an ORM to translate between your objects in code and the relational representation of the data.

Examples of ORMs are nHibernate, Entity Framework, Dapper and more...

MongoDB is an example of a document database - you would use an ODM to translate between your objects in code and the document representation of the data (if needed).

Essencially, an ORM use a SQL database Driver like ODBC, JDBC or OLEDB to translate the object notation to relational notation and an ODM use a JSON or JSONB api to translate the Object notation to Document notation.

There are different kind of implementations under the hood.

PS: JSONB is a JSON text document notation stored in a binary format as used by MongoDB

//more explanation on ODM and ORM
Object-Relational Mapping (ORM) is a technique that lets you query and manipulate data from a database using an object-oriented paradigm. When talking about ORM, most people are referring to a library that implements the Object-Relational Mapping technique, hence the phrase "an ORM

while ODM does the same thing but only with documents

we store data in JSON format (ODM) and we store data in table format (ORM)
