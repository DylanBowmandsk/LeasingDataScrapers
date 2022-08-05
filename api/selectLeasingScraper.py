import requests 
#Imports the beautiful soup library for scraping
from bs4 import BeautifulSoup

def scrape(make,range):
    url = f"https://selectcarleasing.co.uk/car-leasing/{make}/1-series/hatchback"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        rows = collateData(soup,make,range)
        return rows
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")

def collateData():
    print()