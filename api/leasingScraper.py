from operator import indexOf
from types import NoneType
import requests 
from bs4 import BeautifulSoup
import time

def scrape(make, model, variant, derivative, term, initialTerm, Mileage):
    derivativeURI = derivative.replace("[", "").replace("]", "").replace(" ", "-").replace(".", "-").replace("+", "-")
    if variant == "595C CONVERTIBLE" or variant == "695C CONVERTIBLE":
        variant = variant[len(model):]
    else:
        variant = variant[len(model) + 1:]
    url = f"https://leasing.com/car-leasing/{make}/{model.replace(' ', '-')}/{variant.replace(' ', '-')}/{derivativeURI}/?finance=personal&".lower()
    if term :
        url += f"term={int(term)-1}&"
    if initialTerm :
        url += f"upfront={initialTerm}&"
    if Mileage :
        url += f"mileage={Mileage}&"
    print(url)
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        rows = collateData(soup, make, model,derivative)
        return rows
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        return [{"name": make+ " " + model,
            "price" : "No Data",
            "mileage" : "No Data",
            "upfrontCost": "No Data",
            "additionalFees": "No Data",
            "totalLease" : "No Data",
            "term" : "No Data",
            "initialTerm" : "No Data",
            "derivative" : derivative}]

def scrapeAll(make, model, variant, derivatives, term, initialTerm, mileage):
    rows = []
    if variant == "595C CONVERTIBLE" or variant == "695C CONVERTIBLE":
        variant = variant[len(model):]
    else:
        variant = variant[len(model) + 1:]

    for derivative in derivatives:
        time.sleep(3.5)
        derivativeURI = derivative.replace("[", "").replace("]", "").replace(" ", "-").replace("/", "").replace(".", "-").replace("+", "-")
        url = f"https://leasing.com/car-leasing/{make}/{model.replace(' ', '-')}/{variant.replace(' ', '-')}/{derivativeURI}?finance=personal&".lower()
        if term :
            url += f"term={int(term)-1}&"
        if initialTerm :
            url += f"upfront={initialTerm}&"
        if mileage :
            url += f"mileage={mileage}&"
        print(url)
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content,"html.parser")
            rows += collateData(soup, make, model,derivative)
        elif response.status_code == 403:
            print("forbidden")
        elif response.status_code == 404:
            rows.append({"name": make+ " " + model,
            "price" : "No Data",
            "mileage" : "No Data",
            "upfrontCost": "No Data",
            "additionalFees": "No Data",
            "totalLease" : "No Data",
            "term" : "No Data",
            "initialTerm" : "No Data",
            "derivative" : derivative})
    return rows
        

def scrapeVariantList(make, model):
    url = f"https://leasing.com/car-leasing/{make}/{model}"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        variants = []
        tableBody = soup.findAll("tbody")
        for tables in tableBody:
            tableRows = tables.findAll("tr")
            for row in tableRows:
                variant = row.find("a").text
                model = model.lower()
                variant = variant.lower()
                variant  = variant[variant.index(model) + len(model) + 1: variant.index(model) + len(variant)].strip()
                variants.append(variant)
        return variants

    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found") 

def scrapeDerivativeList(make, model, variant):
    url = f"https://leasing.com/car-leasing/{make}/{model.replace(' ', '-')}/{variant.replace(' ', '-')}"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        derivatives = []
        tableBody = soup.findAll("tbody")
        for tables in tableBody:
            tableRows = tables.findAll("tr")
            for row in tableRows:
                if type(row.find("a")) is not NoneType:
                    derivative = row.find("a").text
                    derivatives.append(derivative.strip())
        return derivatives

    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found") 

def scrapeModelList(make):
    url = f"https://leasing.com/car-leasing/{make}"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        models = []
        tableBody = soup.findAll("tbody")
        for tables in tableBody:
            tableRows = tables.findAll("tr")
            for row in tableRows:
                model = row.find("a").text
                models.append(model)
        return models

    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")  

def scrapeMakeList():
    url = "https://leasing.com"
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        makes = []
        makeSelect = soup.find("select", id="manList")
        makeList = makeSelect.findAll("option")
        for make in makeList:
            makes.append(make.text)
        del makes[0]
        return makes

    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")   

def collateData(soup, make, model, derivative):
    rows = []
    try:
        dealsdiv = soup.find("div", id="alldeals")
        deal = dealsdiv.find_all("div", class_="deal-panel-card")[0]


        price = deal.find("div", class_="price").text
        derivative = deal.find("div", "derivative").text

        mileageLi = deal.find("li", class_="mileage")
        mileage = mileageLi.find("span").text

        termLi = deal.find("li", class_="term")
        term = termLi.find("span").text

        initialTermLi = deal.find("li", class_="initial-rental")
        initialTerm = initialTermLi.find("span").text
        
        priceList = deal.find("ul", class_="price-list")
        liList = priceList.findAll("span", class_="data")
        upfrontCost = liList[0].text
        additionalFees = liList[1].text
        totalLease = liList[2].text
        rows.append({"name": make+ " " + model,
            "price" : price,
            "mileage" : mileage,
            "upfrontCost": upfrontCost,
            "additionalFees": additionalFees,
            "totalLease" : totalLease,
            "term" : term,
            "initialTerm" : initialTerm,
            "derivative" : derivative})
    except:
        rows.append({"name": make+ " " + model,
            "price" : "No Data",
            "mileage" : "No Data",
            "upfrontCost": "No Data",
            "additionalFees": "No Data",
            "totalLease" : "No Data",
            "term" : "No Data",
            "initialTerm" : "No Data",
            "derivative" : derivative})

    return rows
