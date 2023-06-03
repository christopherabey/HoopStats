import requests
from bs4 import BeautifulSoup

url = "https://basketball.realgm.com/nba/players"
response = requests.get(url)

soup = BeautifulSoup(response.content, "html.parser")

# Find the table that holds the player information
table = soup.find("table", class_="tablesaw")

# Find all the rows in the table
rows = table.find_all("tr")

# Iterate over the rows and extract player names
player_names = []
for row in rows[1:]:  # Exclude the header row
    player_name = row.find_all("td")[1].text
    player_names.append(player_name)

# Print the list of player names
for name in player_names:
    print(name)


with open('../frontend/src/allPlayers.js', 'w') as fp:
    for name in player_names:
        fp.write('"' + name + '",\n')
