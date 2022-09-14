from flask import Flask, jsonify
from flask_cors import CORS
import leasingScraper
import leaseLocoScraper
import selectLeasingScraper
import json
import urllib.parse
import sqlconnector
import csv


app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "API ENTRY"

@app.route("/get/makes")
def getPvMakes():
    db = sqlconnector.initialiseDB()
    cursor = db.cursor()
    makes = []
    for row in cursor.execute("select distinct manufacturer from [LeasingPrices] where not manufacturer = ''"):
        if(len(row) > 0):
            for x in row:
                makes.append(x)
    return jsonify(makes)

@app.route("/get/models/<make>")
def getPvModels(make):
    db = sqlconnector.initialiseDB()
    cursor = db.cursor()
    models = []
    for row in cursor.execute("select distinct range from [LeasingPrices] where manufacturer ='"+make+"'"):
        if(len(row) > 0):
            for x in row:
                models.append(x)
    return jsonify(models)


@app.route("/get/variants/<make>/<model>")
def getPvVariants(make, model):
    db = sqlconnector.initialiseDB()
    cursor = db.cursor()
    variants = []
    for row in cursor.execute("SELECT Distinct model  FROM [dbo].[LeasingPrices] where range like '" + model + "%' and manufacturer = '"+make+"'"):
       for x in row:
            if(len(row) > 0):
                variants.append(x)
    return jsonify(variants)

@app.route("/get/derivatives/<model>/<variant>")
def getPvDerivatives(model ,variant):
    db = sqlconnector.initialiseDB()
    cursor = db.cursor()
    derivatives = []
    for row in cursor.execute(f"SELECT Distinct derivative  FROM [dbo].[LeasingPrices] where model like '{variant}'"):
        for x in row:
            derivatives.append(x)
    return jsonify(derivatives)

@app.route("/scrape/all")
def scrapeEverything():
    allData = []
    leaseLocoData = []
    selectData = []
    leasingData = []
    pvData = []
    

    makes = json.loads(getPvMakes().data)
    for make in makes:
        models = (json.loads(getPvModels(make).data))
        for model in models:
            variants = json.loads(getPvVariants(make,model).data)
            print(make)
            print(model)
            if variants != []:
                print(variants)
                for variant in variants:
                    pvData = (json.loads(getAllPvPrice(model,variant,"36", "6", "5000").data))
                    leaseLocoData = (json.loads(scrapeAllLeaseLoco(make,model,variant,"36", "6", "5000").data))
                    leasingData = (json.loads(scrapeAllLeasingcom(make,model,variant,"36", "6", "5000").data))
                    #selectData = (json.loads(scrapeAllSelectLeasing(make,model,variant,"36", "6", "5000").data))

                    derivatives = []

                    for element in pvData:
                        if element["derivative"] not in derivatives:
                            derivatives.append(element["derivative"])    
                    for derivative in derivatives:
                        f = open('./list.csv', 'a', encoding='UTF8', newline='')
                        writer = csv.writer(f)
                        name = f"{make} {variant}"
                        pvPrice = ""
                        selectPrice = ""
                        locoPrice = ""
                        leasingPrice = ""

                        for pvCar in pvData:
                            if derivative == pvCar["derivative"]:
                                pvPrice = pvCar["price"]
                        for locoCar in leaseLocoData:
                            if derivative == locoCar["derivative"]:
                                locoPrice = locoCar["price"]
                        for leasingCar in leasingData:
                            if derivative == leasingCar["derivative"]:
                                leasingPrice = leasingCar["price"]
                        for selectCar in selectData:
                            if derivative == selectCar["derivative"]:
                                selectPrice = selectCar["price"]

                        row = {"name" : name,
                            "derivative": derivative,
                            "pvPrice": pvPrice}
                        allData.append(row)  
                        writer.writerow([name, derivative, "£"+pvPrice+"p/m", locoPrice+"p/m", leasingPrice])
                        f.close()

    return "Building List"
    

@app.route("/pv/scrape/<derivative>/<term>/<initialTerm>/<mileage>")
def getPvPrice(derivative,term,initialTerm,mileage):
    db = sqlconnector.initialiseDB()
    cursor = db.cursor()
    lowest = 0
    cars =[]
    derivative = derivative.replace("+","/")
    for derivative, price, upfront in cursor.execute(f"SELECT [derivative], [monthly_rental], [initial_profile] FROM [dbo].[LeasingPrices] where derivative = '{derivative}' and term = {term} and initial_profile = {initialTerm} and type = 'Personal' and mileage = {mileage}"):
        if(lowest == 0 or lowest > price): lowest = price
        cars.append({"price": lowest,
        "derivative": derivative,
        "upfrontCost": upfront})
    if (len(cars) == 0):
        cars.append({"price": "No Data",
        "derivative": derivative,
        "upfrontCost": "No Data"})
        return(jsonify(cars))
    return jsonify(cars)  
    
@app.route("/pv/scrape/<model>/<variant>/all/<term>/<initialTerm>/<mileage>")
def getAllPvPrice(model, variant,term,initialTerm,mileage):
    db = sqlconnector.initialiseDB()
    cursor = db.cursor()
    derivatives = []
    cars = []
    for derivative in json.loads(getPvDerivatives(model, variant).data):
        derivatives.append(derivative)
    for derivative in derivatives:
        lowest = 0
        print(derivative)
        for derivative, price, upfront in cursor.execute(f"SELECT [derivative], [monthly_rental], [initial_profile] FROM [dbo].[LeasingPrices] where derivative = '{derivative}' and term = {term} and mileage = {mileage} and initial_profile = {initialTerm} and type = 'Personal'"):
            if(lowest == 0 or lowest > price): lowest = price
            cars.append({"price": lowest,
            "derivative": derivative,
            "upfrontCost": upfront})
        if (lowest == 0):
            cars.append({"price": "No Data",
            "derivative": derivative,
            "upfrontCost": "No Data"})
    return jsonify(cars)  
  
     
@app.route("/leasingcom/get/make")
def getLeasingcomMakes():
    return jsonify(leasingScraper.scrapeMakeList())

@app.route("/leasingcom/get/<make>/models")
def getLeasingcomModels(make):
    return jsonify(leasingScraper.scrapeModelList(make))
    
@app.route("/leasingcom/get/<make>/<model>/variants")
def getLeasingcomVariants(make, model):
    return jsonify(leasingScraper.scrapeVariantList(make, model))

@app.route("/leasingcom/get/<make>/<model>/<variant>/derivative")
def getLeasingcomDerivatives(make,model,variant):
    return jsonify(leasingScraper.scrapeDerivativeList(make,model,variant))

@app.route("/leasingcom/scrape/<make>/<model>/<variant>/<derivative>/<term>/<initialTerm>/<mileage>")
def scrapeLeasingcom(make,model,variant,derivative,term,initialTerm,mileage):
        return jsonify(leasingScraper.scrape(make,model,variant,derivative,term,initialTerm,mileage))

@app.route("/leasingcom/scrape/<make>/<model>/<variant>/all/<term>/<initialTerm>/<mileage>")
def scrapeAllLeasingcom(make,model,variant,term,initialTerm,mileage):
    derivatives = []
    data = json.loads(getPvDerivatives(model, variant).data)
    for derivative in data:
        derivatives.append(derivative)
    return jsonify(leasingScraper.scrapeAll(make,model,variant, derivatives, term, initialTerm, mileage))

@app.route("/leaseloco/scrape/<make>/<model>/<variant>/<derivative>/<term>/<initialTerm>/<mileage>")
def scrapeLeaseLoco(make,model,variant,derivative,term,initialTerm,mileage):
    return jsonify(leaseLocoScraper.scrape(make,model,variant,derivative,term,initialTerm,mileage))

@app.route("/leaseloco/scrape/<make>/<model>/<variant>/all/<term>/<initialTerm>/<mileage>")
def scrapeAllLeaseLoco(make,model,variant,term,initialTerm,mileage):
    
    derivatives = []
    data = json.loads(getPvDerivatives(model, variant).data)
    for derivative in data:
        derivatives.append(derivative)
    return jsonify(leaseLocoScraper.scrapeAllDerivatives(make,model,derivatives,term,initialTerm,mileage))

@app.route("/selectleasing/scrape/<make>/<model>/<variant>/<derivative>/<term>/<initialTerm>/<mileage>")
def scrapeSelectLeasing(make, model, variant,derivative,term,initialTerm,mileage):
    return jsonify(selectLeasingScraper.scrape(make, model, variant, derivative, term,initialTerm, mileage))

@app.route("/selectleasing/scrape/<make>/<model>/<variant>/all/<term>/<initialTerm>/<mileage>")
def scrapeAllSelectLeasing(make,model,variant,term,initialTerm,mileage):
    derivatives = []
    for derivative in json.loads(getPvDerivatives(model, variant).data):
        derivatives.append(derivative)
    return jsonify(selectLeasingScraper.scrapeAllDerivatives(make, model,variant, derivatives, term, initialTerm, mileage))


