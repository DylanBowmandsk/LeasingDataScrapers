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

        mileageli = soup.find("li", class_="mileage")
        mileage = mileageli.find("span").text

        for deal in deals:
            price = deal.find("div", class_="price").text
            rows.append([brand+ " " + range,
             price,
             mileage])
            
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
    

