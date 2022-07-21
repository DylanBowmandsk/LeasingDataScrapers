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
        for deal in soup.find_all("div", id="alldeals"):
            car = model
            monthly = deal.find("div" , class_="price").text
            print(car,monthly)
            
        return rows
    elif response.status_code == 403:
        print("forbidden")

    elif response.status_code == 404:
        print("not found")
