import requests 
#Imports the beautiful soup library for scraping
from bs4 import BeautifulSoup

def scrape(make, modelTrim):
    url = f"https://selectcarleasing.co.uk/car-leasing/bmw/1-series/hatchback"
    rows = []
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        rows = collateData(soup ,make, modelTrim)
        return rows
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")

    return rows
def collateData(soup, make,  modelTrim):
    table = soup.find_all("tr", "c-derivatives-row")
    for row in table:
        print(row.find("span", "c-derivatives-row__link-text").text)
        
