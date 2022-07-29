import requests 
#Imports the beautiful soup library for scraping
from bs4 import BeautifulSoup


def scrape():
    url = "https://leaseloco.com/car-leasing/search"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content,"html.parser")
        div = soup.find("main", class_="container")
        print(div)
        return div
    elif response.status_code == 403:
        print("forbidden")
    elif response.status_code == 404:
        print("not found")