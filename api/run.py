from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

bmwlist =  ["1 Series", "2 Series"]
porschelist = ["Cayenne", "Panamera"] 


@app.route("/")
def index():
    return "hello world!"

@app.route("/bmw")
def getCarList():
    return jsonify(["bmw","porsche"])
