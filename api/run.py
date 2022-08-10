from flask import Flask, jsonify
from flask_cors import CORS
import leasingScraper
import leaseLocoScraper
import selectLeasingScraper
import csv

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "hello world!"

@app.route("/get/makes")
def getPvMakes():
    data = []
    file = open('pv-master-cars.csv')
    csvreader = csv.reader(file)
    for row in csvreader:
        data.append(row)
    uniqueCars = getPVUniqueCarsList(data)
    cars = generatePVInputList(uniqueCars,data)  
    return jsonify(cars)

@app.route("/leasingcom/get/makes")
def getLeasingcomBrands():
    return jsonify(leasingScraper.scrapeMakeList())

@app.route("/leasingcom/get/<make>/model")
def getLeasingcomRange(make):
    return jsonify(leasingScraper.scrapeModelList(make))

@app.route("/leasingcom/scrape/<make>/<model>")
def scrapeLeasingcom(make,model):
    return jsonify(leasingScraper.scrape(make,model))

@app.route("/leaseloco/scrape/<make>/<model>")
def scrapeLeaseLoco(make, model):
    return jsonify(leaseLocoScraper.scrape(make, model))

@app.route("/selectleasing/scrape/<make>/<model>")
def scrapeSelectLeasing(make,model):
    return jsonify(selectLeasingScraper.scrape(make, model))

def getPVUniqueCarsList(data):
    uniqueCars = []
    for make, model in data:
        if make not in uniqueCars:
            uniqueCars.append(make)
    return uniqueCars

def generatePVInputList(uniqueCars, data):
    cars = []
    for uniqueCar in uniqueCars:
        temp = {"make" : uniqueCar,
                "cars" : []}
        for make, model in data:
            if make == uniqueCar and model not in temp:
                temp["cars"] += [model]
        cars.append(temp)
    return cars