# Kento Tanaka
# To get artist from wiki by scraping

import requests
from bs4 import BeautifulSoup
import csv

db_artists=[]

# 個人アーティスト一覧を取得

URL = 'https://ja.wikipedia.org/wiki/%E3%83%9D%E3%83%94%E3%83%A5%E3%83%A9%E3%83%BC%E9%9F%B3%E6%A5%BD%E3%81%AE%E9%9F%B3%E6%A5%BD%E5%AE%B6%E4%B8%80%E8%A6%A7_(%E6%97%A5%E6%9C%AC%E3%83%BB%E5%80%8B%E4%BA%BA)'
res = requests.get(URL)
soup = BeautifulSoup(res.text, 'html.parser')
data = soup.select('.mw-parser-output > ul > li > a')
for d in data[3:]:
  db_artists.append(d.string)

# 団体アーティスト一覧を取得

URL = 'https://ja.wikipedia.org/wiki/%E3%83%9D%E3%83%94%E3%83%A5%E3%83%A9%E3%83%BC%E9%9F%B3%E6%A5%BD%E3%81%AE%E9%9F%B3%E6%A5%BD%E5%AE%B6%E4%B8%80%E8%A6%A7_(%E6%97%A5%E6%9C%AC%E3%83%BB%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97)'
res = requests.get(URL)
soup = BeautifulSoup(res.text, 'html.parser')
data = soup.select('.mw-parser-output > ul > li > a')
for d in data[2:]:
  db_artists.append(d.string)

# 海外個人アーティスト一覧
URL = "https://ja.wikipedia.org/w/index.php?title=%E3%83%9D%E3%83%94%E3%83%A5%E3%83%A9%E3%83%BC%E9%9F%B3%E6%A5%BD%E3%81%AE%E9%9F%B3%E6%A5%BD%E5%AE%B6%E4%B8%80%E8%A6%A7_(%E5%80%8B%E4%BA%BA)&action=edit&section=3"
res = requests.get(URL)
soup = BeautifulSoup(res.text, 'html.parser')
data = soup.select('.mw-parser-output > ul > li > a')
for d in data[2:]:
  db_artists.append(d.string)


# 海外団体アーティスト一覧

URL = "https://ja.wikipedia.org/wiki/%E3%83%9D%E3%83%94%E3%83%A5%E3%83%A9%E3%83%BC%E9%9F%B3%E6%A5%BD%E3%81%AE%E9%9F%B3%E6%A5%BD%E5%AE%B6%E4%B8%80%E8%A6%A7_(%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97)"
res = requests.get(URL)
soup = BeautifulSoup(res.text, 'html.parser')
data = soup.select('.mw-parser-output > ul > li > a')
for d in data[2:]:
  db_artists.append(d.string)


# 高校生に人気アーティスト
URL = "https://sakky.tokyo/highschool-music-popular/"
res = requests.get(URL)
soup = BeautifulSoup(res.text, 'html.parser')
data = soup.select('.l-wrapper > .l-main > section > h3')
for d in data:
  db_artists.append(d.string)


with open('pop_artists.csv', 'w') as f:
    writer = csv.writer(f)
    for artists in db_artists:
      writer.writerow([artists])