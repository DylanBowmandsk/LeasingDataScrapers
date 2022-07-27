from flask import Flask, jsonify
from flask_cors import CORS
import leasingwebscraper
import csv

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "hello world!"

@app.route("/get/makes")
def getPvMakes():
    file = open('pv-master-cars.csv')
    csvreader = csv.reader(file)
    cars = []
    uniqueCars = []
    for make, model in csvreader:
        if make not in uniqueCars:
            uniqueCars.append(make)
    print(uniqueCars)
    file.seek(0)
    for makeL in uniqueCars:
        temp = {"make": makeL,
            "modelList" : []}
        
            
    return jsonify(cars)

@app.route("/leasingcom/get/makes")
def getLeasingcomBrands():
    return jsonify(leasingwebscraper.scrapeMakeList())

@app.route("/leasingcom/get/<make>/model")
def getLeasingcomRange(make):
    return jsonify(leasingwebscraper.scrapeModelList(make))

@app.route("/scrape/<make>/<model>")
def scrapeLeasingcom(make,model):
    return jsonify(leasingwebscraper.scrape(make,model))