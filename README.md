# Olympics
This folder contains all the code for Project two: Integrate Flask with HTML and JavaScript code for Project two in Data Analytics and Visualization. 
# Setup_Related 
This folder conatins all the code and data to set up a database in SQLite 


Please clone this repository to your desktop and then do the following:

Steps to create the database:

1) download SQLite utility to create the database (https://www.sqlite.org/download.html option: A bundle of command-line tools for managing SQLite database files, including the command-line shell program, the sqldiff.exe program, and the sqlite3_analyzer.exe program.
(sha1: 84de665d28cff0f8c512889cd356712e17310637)
2) Go to the folder where SQLite utility is installed and copy the 3 csv files (summer, dictionary, and city_Lat_Long from Setup_Related)
3) Go to the Windows command prompt pointing to SQLite folder
4) Run all the comands mentioned on the create_table_statements.txt within the Setup_Related folder. At this point the olympics.db has been created.
5) Copy the olympics.db to the Olympics folder within the downloaded repository

Steps to run the application:

1. Make sure you add your Mapbox API Key to the config file
2. On the clone repository launch a GitBash (Windows) to the olympics folder
3. On teh GitBash window type source activate PythonData 
4. Type Python app.py 
5. Observe that the Flask server starts and tells you which port it's running on. Don't close this window.
6. With the Flask server running, enter this address in your Chrome browser: http://127.0.0.1:5000/. You'll see that it loads the index page. 
7. Enjoy!
