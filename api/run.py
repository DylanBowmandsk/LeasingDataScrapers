from ast import arg
from flask import Flask, jsonify
from flask_cors import CORS
import leasingScraper
import leaseLocoScraper
import selectLeasingScraper
import json
import urllib.parse
import sqlconnector
import csv
from threading import Thread


app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False

@app.route("/")
def index():
    return "API ENTRY"

@app.route("/get/makes")
def getPvMakes():
    db = sqlconnector.initialiseDB()
    cursor = db.cursor()
    makes = []
    for row in cursor.execute("select distinct manufacturer from [LeasingPrices] where not manufacturer = '' and manufacturer not like '%IVECO%' and manufacturer not like '%MAN%'"):
        if(len(row) > 0):
            for x in row:
                makes.append(x)
    return jsonify(makes)

@app.route("/get/models/<make>")
def getPvModels(make):
    db = sqlconnector.initialiseDB()
    cursor = db.cursor()
    models = []
    for row in cursor.execute("select distinct range from [LeasingPrices] where manufacturer ='"+make+"' and range not like '%TRANSIT%'"):
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

@app.route("/get/all")
def getLocalData():
    data = []
    with open('list.csv', newline='', encoding="utf-8") as listReader:
        listReader = csv.reader(listReader, delimiter=',')
        for row in listReader:
             data.append(row)

    return jsonify(data)

@app.route("/scrape/all")
def scrapeEverything():
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
                    profiles = [["24","6","10000"], ["36","6","10000"], ["48","6","10000"],["48","1","5000"]]
                    for profile in profiles:
                        print(profile[0],profile[1],profile[2])
                        pvData = (json.loads(getAllPvPrice(model,variant,profile[0], profile[1], profile[2]).data)) 
                        llt =CustomThread(target=scrapeAllLeaseLoco, args=[make,model,variant,profile[0], profile[1], profile[2]])
                        lt = CustomThread(target=scrapeAllLeasingcom, args=[make,model,variant,profile[0], profile[1], profile[2]])
                        llt.start()
                        lt.start()
                        llt.join()
                        lt.join()
                        leaseLocoData = llt.value
                        leasingData = lt.value

                        derivatives = []

                        for element in pvData:
                            if element["derivative"] not in derivatives:
                                derivatives.append(element["derivative"])    
                        for derivative in derivatives:
                            f = open('./list.csv', 'a', encoding='UTF8', newline='')
                            writer = csv.writer(f)
                            pvPrice = ""
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

                            writer.writerow([make, model, variant ,derivative, profile[0], profile[1], profile[2], "£"+pvPrice+"p/m", locoPrice+"p/m", leasingPrice])
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

class CustomThread(Thread):
    def __init__(self, target,args ):
        Thread.__init__(self)
        self.target = target
        self.make = args[0]
        self.model = args[1]
        self.variant = args[2]
        self.term = args[3]
        self.initial = args[4]
        self.mileage = args[5]
    def run(self):
        with app.app_context():
            self.value = (json.loads(self.target(self.make,self.model,self.variant,self.term,self.initial,self.mileage).data))
    