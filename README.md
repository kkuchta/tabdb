# TabDB

If you feel like you use your browser tabs as a database, why not make it official?

![demo gif](https://media.giphy.com/media/cPl0frYGok7Cr8RA7I/giphy.gif)

This is an in-browser database that uses tab titles for storage.

Every time you run an SQL query, it grabs all the data stored in the neighboring tabs' titles, concatenates it, unzips it, and loads it into an in-memory sqlite database.  It then runs the command, dumps the db state to a strinc, zips it up, and spreads it out across the available tabs.

[![comic about bad ideas](http://www.poorlydrawnlines.com/comic/an-idea/)](http://www.poorlydrawnlines.com/comic/an-idea/)

The code is awful- I hacked together the first version (which was ugly enough), then glued it onto typescript + react for fun.  I didn't go so far as to properly integrate the raw JS logic with react (eg via redux or something), so it's a mishmash of global variables, commented-out code, and TODO comments.  If this were production code, I'd deserve to be tarred and feathered.  Since it's just a silly one-off thing, I hope you won't judge it too harshly.
