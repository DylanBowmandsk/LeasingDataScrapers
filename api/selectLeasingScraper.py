import requests 
#Imports the beautiful soup library for scraping
from bs4 import BeautifulSoup
import urllib

def scrape(make, model, variant):
    print(make)
    url = (f"https://selectcarleasing.co.uk/car-leasing/{make}/{model.replace(' ', '-')}/{variant.replace(' ', '-')}".lower())
    rows = []
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        rows = collateData(soup)
        return rows
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")

    return rows
def collateData(soup):
    table = soup.find_all("tr", "c-derivatives-row")
    for row in table:
        print(row.find("span", "c-derivatives-row__link-text").text)
        price = row.find("div", "c-derivatives-row__price").text[15:22]
        print(price)
        
