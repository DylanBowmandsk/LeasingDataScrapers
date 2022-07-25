from distutils.filelist import findall
import requests 
#Imports the beautiful soup library for scraping
from bs4 import BeautifulSoup


def scrape(brand,range):
    url = "https://leasing.com/car-leasing/"+brand+"/"+range+"/?finance=personal"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        rows = []
        
        dealsdiv = soup.find("div", id="alldeals")
        deals = dealsdiv.find_all("div", class_="deal-panel-card")

        for deal in deals:
            price = deal.find("div", class_="price").text
            mileageli = deal.find("li", class_="mileage")
            mileage = mileageli.find("span").text
            priceList = deal.find("ul", class_="price-list")
            liList = priceList.findAll("span", class_="data")
            initialRental = liList[0].text
            additionalFees = liList[1].text
            totalLease = liList[2].text

            rows.append({"brand": brand+ " " + range,
             "price" : price,
             "mileage" : mileage,
             "initial rental": initialRental,
             "additional fees": additionalFees,
             "total lease" : totalLease})
            
        return rows

    elif response.status_code == 403:
        print("forbidden")

    elif response.status_code == 404:
        print("not found")

def scrapeRangeList(brand):
    url = "https://leasing.com/car-leasing/"+brand
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        ranges = []

        tableBody = soup.findAll("tbody")
        for tables in tableBody:
            tableRows = tables.findAll("tr")
            for row in tableRows:
                range = row.find("a").text
                ranges.append(range)
        return ranges

    elif response.status_code == 403:
        print("forbidden")

    elif response.status_code == 404:
        print("not found")   

def scrapeBrandList():
    url = "https://leasing.com"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        brands = []
        brandSelect = soup.find("select", id="manList")
        brandList = brandSelect.findAll("option")
        for brand in brandList:
            brands.append(brand.text)
        del brands[0]
        return brands

    elif response.status_code == 403:
        print("forbidden")

    elif response.status_code == 404:
        print("not found")   
    

