import sys
import time

"""
from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc, 'html.parser')

for i in soup.find_all("div", attrs={"class":"rc"}):
	 sys.stdout.write(i.h3.a.string + "\n")

"""


"""
for i in sys.argv:
    sys.stdout.write(i +"\n")

for i in arr:
	sys.stdout.write(i +"\n")
"""

"""
sys.stdout.write("recieved")
for line in sys.stdin:
	sys.stdout.write("recieved")
"""

for i in sys.stdin:
	sys.stdout.write("recieved")