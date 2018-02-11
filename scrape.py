import sys

#writing on stdout i.e. sys.stdout.write flushes strings to parent process
#101 is special signal attached to errors
try:
	html_doc = ""

	for inp in sys.stdin:#read from parent process
		html_doc += inp

	try:
		from bs4 import BeautifulSoup, SoupStrainer
	except:
		raise Exception("Beautiful Soup needs to be installed")
	
	#only concerned with portions that encapsulate article headers
	strainer = SoupStrainer("h3", attrs={"class": "r"})
	soup = BeautifulSoup(html_doc, 'html.parser', parse_only=strainer)

	
	#extract article title and link
	#python cannot parse \U string character so converting string to bytes first and replacing \u
	articleHeaders = soup.find_all("h3")
	titlesAndLinks = [
		[	tag.a.attrs['href'].encode("utf8").replace(b"\u", b"").replace(b"\U", b"").decode(),
			tag.get_text().encode("utf8").replace(b"\u", b"").replace(b"\U", b"").decode()
		]
		for tag in articleHeaders if tag.a and tag.get_text()
	]

	if (len(titlesAndLinks) == 0):
		raise Exception("Could not search anything")
	else:	
		for i in range(len(titlesAndLinks)):
			href = "Link:    "+titlesAndLinks[i][0][7:]
			title = "Title:  "+titlesAndLinks[i][1]
			print(title + "\n" + href + "\n\n")
		
except BaseException as err:
	sys.stdout.write("101"+str(err))