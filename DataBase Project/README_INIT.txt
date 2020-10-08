
*********** INIT Script for Proxy project ***************

1) Install Postgress (v10) database 
2) Create a database e.g. test_proxy
3) Dump the proxy data using the enclosed file proxy_dumpfile.sql
	$ psql -U postgres test_proxy < proxy_dumpfile.sql
4) Now database is ready with all the data from 5 proxy providers and ~159 proxies

Important Note : 

Since database already has the proxy data from proxy providers and as described in the
term paper section 6.0 , application works only with the identified proxy providers because of
different parsing logics. So if the application needs to be tested for any reason by adding 
identified proxy providers, existing proxy providers has to be deleted and the same can be added 
again from fronend and be tested for functionalities.

5) Install NodeJS (v12.13.1)
6) Unzip the project and copy the contents to a new folder
7) $npm install ( Installs all the necessary packages from package.json )
8) Open .env ->  configure the database related information and server port
9) $node ./backend/server.js will start the server on the configured port in .env

**************************************************************
