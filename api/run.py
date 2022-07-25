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
    return jsonify(leasingwebscraper.scrapeBrandList())

@app.route("/get/<brand>/range")
def getRange(brand):
    return jsonify(leasingwebscraper.scrapeRangeList(brand))

@app.route("/scrape/<brand>/<range>")
def scrape(brand,range):
    return jsonify(leasingwebscraper.scrape(brand,range))