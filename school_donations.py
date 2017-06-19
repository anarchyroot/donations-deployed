from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = '51.255.83.181'
MONGODB_PORT = 27017
DBS_NAME = 'Blockchain'

@app.route("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")


@app.route("/transactionspersecond")
def transactionspersec():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    COLLECTION_NAME = 'transactions-per-second'

    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False, 'Date': True, 'Value': True,
    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        projects = collection.find(projection=FIELDS, limit=55000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))

@app.route("/transactionsfeesusd")
def transactionsfees():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    COLLECTION_NAME = 'transaction-fees-usd'

    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False, 'Date': True, 'Value': True,
    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        projects = collection.find(projection=FIELDS, limit=55000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))


if __name__ == "__main__":
    app.run(host='51.255.83.181', port=5000, debug=True)