//typegoose
A common problem when using Mongoose with TypeScript is that you have to define both the Mongoose model and the TypeScript interface. If the model changes, you also have to keep the TypeScript interface file in sync or the TypeScript interface would not represent the real data structure of the model.

Typegoose aims to solve this problem by defining only a TypeScript interface (class), which needs to be enhanced with special Typegoose decorators (like @prop).

//namespace

//ODM & ORM

ORM (Object Relational Mapper) maps the relations between data, where as ODM (Object Document Mapper) deals with documents
