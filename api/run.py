from flask import Flask, jsonify
from flask_cors import CORS
import leasingwebscraper
import leaseLocoScraper
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
    return jsonify(leasingwebscraper.scrapeMakeList())

@app.route("/leasingcom/get/<make>/model")
def getLeasingcomRange(make):
    return jsonify(leasingwebscraper.scrapeModelList(make))

@app.route("/leasingcom/scrape/<make>/<model>")
def scrapeLeasingcom(make,model):
    return jsonify(leasingwebscraper.scrape(make,model))

@app.route("/leaseloco/scrape")
def scrapeLeaseLoco():
    return leaseLocoScraper.scrape()

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
            if make == uniqueCar:
                temp["cars"] += [model]
        cars.append(temp)
    return cars