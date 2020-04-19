# Import the functions we need from flask
from flask import Flask,request
from flask import render_template 
from flask import jsonify
import sqlite3 as lite
import json
import pandas as pd



# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

con = lite.connect("olympics.db")
df_Host_City = pd.read_sql_query("SELECT *  FROM Host_City", con)
df_Winners = pd.read_sql_query("SELECT * FROM Winners", con)
df_Events = pd.read_sql_query("SELECT Year,Country_Cd,Event,Gender,Medal FROM Winners", con)
df_Host_City_json = df_Host_City.to_json(orient='records')
df_Winners_json =df_Winners.to_json(orient='records')
df_Host_City.to_json("./static/data/Host_City.json",orient='records')
df_Winners.to_json("./static/data/Winners.json",orient='records')
df_Events.to_json("./static/data/Events.json",orient='records')

con.close()     

#print(df_Host_City_json)


# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes ...
@app.route("/")
def homepage():    
    webpage = render_template("index.html")  
    return  webpage

@app.route("/other")
def OtherRoute():
    ''' This function runs when the user clicks the link for the other page.
        Note that the html file must be located in a folder called templates. '''

    # Note that this call to render template passes in the title parameter. 
    # That title parameter is a 'Shirley' variable that could be called anything 
    # we want. But, since we're using it to specify the page title, we call it 
    # what we do. The name has to match the parameter used in other.html. 
    webpage = render_template("other.html", title_we_want="Shirley")
    return webpage

@app.route("/fighteraircraft")
def QueryFighterAircraft():
    ''' Query the database for fighter aircraft and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.country, table.iso3, table.fighteraircraft).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    all_aircraft = []
    for country, iso3, fighteraircraft in results:
        dict = {}
        dict["country"] = country
        dict["iso3"] = iso3
        dict["fighteraircraft"] = fighteraircraft
        all_aircraft.append(dict)

    # Return the jsonified result. 
    return jsonify(all_aircraft)

@app.route("/population")
def QueryPopulation():
    ''' Query the database for population numbers and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.country, table.iso3, table.totalpopulation).all()
    session.close 

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    all_population = []
    for country, iso3, totalpopulation in results:
        dict = {}
        dict["country"] = country
        dict["iso3"] = iso3
        dict["totalpopulation"] = totalpopulation
        all_population.append(dict)

    # Return the jsonified result. 
    return jsonify(all_population)

@app.route("/test")
def TestRoute():
    ''' This function returns a simple message, just to guarantee that
        the Flask server is working. '''

    return "This is the test route!"

@app.route("/Animated_Bar")
def get_my_jsonified_data():

    #''' This function returns a jsonified dictionary. Ideally we'd create 
    #that dictionary from a database query. '''    
    #with lite.connect('olympics.db') as conn:
    #    key = 1980
    #    cursor = conn.cursor()
    #    cursor.execute("SELECT Year as Year,Num_Par_Countries as Num_Par_Countries  FROM Host_City #WHERE year=?;", [key]);
    # 
    #    data = cursor.fetchall()
    #return json.dumps(data)
 
    return df_Host_City_json
    #,df_Host_City_json
    

@app.route("/Winners_Bar")
def get_my_jsonified_data_winners():
    ''' This function returns a jsonified dictionary. Ideally we'd create 
        that dictionary from a database query. '''    
    
    return (df_Winners_json)    

# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)