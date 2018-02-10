import sys
import time

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
	
	#h3 headers and hrefs
	articleHeaders = soup.find_all("h3")
	articleHeadersHrefs = [tag.a.attrs['href'] for tag in articleHeaders ]
	articleHeadersTitle = [tag.get_text() for tag in articleHeaders]

	if len(articleHeaders) == 0 or\
	len(articleHeadersHrefs) == 0 or\
	len(articleHeadersTitle) == 0:
		raise Exception("Could not search anything")
		
	else:
		for i in range(len(articleHeadersHrefs)):
			href = "Link:    "+articleHeadersHrefs[i][7:]
			title = "Title:  "+articleHeadersTitle[i]
			print(title + "\n" + href + "\n\n")
		
except BaseException as err:
	sys.stdout.write("101"+str(err))