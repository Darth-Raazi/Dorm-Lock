Creating local instance of database server for macos:

1) Install brew
2) Run the following commands: 

brew tap mongodb/brew

brew install mongodb-community@6.0

To start the server run: 

mongod --config /opt/homebrew/etc/mongod.conf --fork

You can view the DB by installing mongoDB Atlas which provides a UI to interact with database. https://www.mongodb.com/try/download/compass

