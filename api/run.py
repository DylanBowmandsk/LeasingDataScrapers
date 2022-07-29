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
    data = []
    cars = []
    uniqueCars = []

    for row in csvreader:
        data.append(row)

    for make, model in data:
        if make not in uniqueCars:
            uniqueCars.append(make)
    
    for uniqueCar in uniqueCars:
        temp = {"make" : uniqueCar,
                "cars" : []}
        for make, model in data:
            if make == uniqueCar:
                temp["cars"] += [model]
        cars.append(temp)
   
            
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