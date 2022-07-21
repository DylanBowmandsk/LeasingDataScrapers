from flask import Flask, jsonify
from flask_cors import CORS
import leasingwebscraper

app = Flask(__name__)
CORS(app)

bmwlist =  ["1-series", "2-series"]
porschelist = ["cayenne", "panamera"] 


@app.route("/")
def index():
    return "hello world!"

@app.route("/get/brands")
def getBrands():
    return jsonify(["bmw","porsche"])

@app.route("/get/<brand>/models")
def getModels(brand):
    return jsonify(bmwlist if brand == "bmw" else porschelist)

@app.route("/scrape/<brand>/<model>")
def scrape(brand,model):
    return jsonify(leasingwebscraper.scrapeModel(brand,model))