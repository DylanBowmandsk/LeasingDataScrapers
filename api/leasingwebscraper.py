import requests 
#Imports the beautiful soup library for scraping
from bs4 import BeautifulSoup


def scrapeModel(brand,model):
    url = "https://leasing.com/car-leasing/"+brand+"/"+model+"/?finance=personal"

    header = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        rows = []
        dealsdiv = soup.find("div", id="alldeals")
        deals = dealsdiv.find_all("div", class_="deal-panel-card")
        for deal in deals:
            car = brand
            price = deal.find("div", class_="price").text
            print(car,price)
            
        return rows
    elif response.status_code == 403:
        print("forbidden")

    elif response.status_code == 404:
        print("not found")
