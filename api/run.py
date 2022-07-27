from flask import Flask, jsonify
from flask_cors import CORS
import leasingwebscraper

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "hello world!"

@app.route("/get/makes")
def getBrands():
    return jsonify(leasingwebscraper.scrapeMakeList())

@app.route("/get/<make>/model")
def getRange(make):
    return jsonify(leasingwebscraper.scrapeModelList(make))

@app.route("/scrape/<make>/<model>")
def scrape(make,model):
    return jsonify(leasingwebscraper.scrape(make,model))