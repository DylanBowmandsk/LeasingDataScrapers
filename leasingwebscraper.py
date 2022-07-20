# imports the standard library sys and the third part library requests
import sys, requests
# imports the BeautifulSoup webscraping module 
from bs4 import BeautifulSoup
#
import csv

# initiates the command line generated through the Webscraper class argument into a string
url = "https://leasing.com/car-leasing/?finance=personal"
header = {'User-Agent': 'Mozilla/5.0'}
response = requests.get(url)


# conditionals handle request status codes
if response.status_code == 200:
    soup = BeautifulSoup(response.content,"html.parser")
    with open('./leasing.csv', 'w',newline='') as f:
        rows = []
        for deal in soup.find_all("div", class_="deal-body"):
            car = deal.find("div" , class_="deal-vehicle").text
            monthly = deal.find("div" , class_="value").text
            rows.append([car,monthly])
        writer = csv.writer(f)
        writer.writerows(rows)
        print(rows)

elif response.status_code == 403:
    print("forbidden")
elif response.status_code == 404:
    print("not found")