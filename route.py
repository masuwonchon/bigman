#!/usr/bin/python
#
# BIGMAN
# Author: suwonchon <masuwonchon@gmail.com>
#

from flask import Flask, flash, redirect, render_template, request, session, abort, url_for, app, make_response, jsonify
from datetime import timedelta
from flaskext.mysql import MySQL
from json2html import *
import json, csv, os, subprocess, requests
import time
import datetime

_FAIL = -1
_SUCCESS = 1

LOG_FILE   = './bigman.log'

app = Flask(__name__)
app.secret_key = 'random string'
mysql = MySQL()

app.permanent_session_lifetime = timedelta(minutes=60)

menus = []
menus.append(['dashboard','fa fa-dashboard fa-fw','Dashboard'])
menus.append(['view','fa fa-dashboard fa-fw','view'])
DOMAIN="poloniex.com"
mysql.init_app(app)

# main
# http://10.50.10.104:5011/dashboard
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', menu=menus)

# [{"date":1405699200,"high":0.0045388,"low":0.00403001,"open":0.00404545,"close":0.00427592,"volume":44.11655644,"quoteVolume":10259.29079097,"weightedAverage":0.00430015}, ...]
def make_chart():
	str="['Mon',20,28,38,45]"
	return str

@app.route('/view')
def view():
  stime = "00/23/14/07/09/2017"
  etime = "59/32/14/07/09/2017"
  command = "returnChartData"
  currencyPair = "BTC_XMR"
  period = "300"
  start = str(int(time.mktime(datetime.datetime.strptime(stime,"%S/%M/%H/%d/%m/%Y").timetuple())))
  end = str(int(time.mktime(datetime.datetime.strptime(etime,"%S/%M/%H/%d/%m/%Y").timetuple())))
  url = "https://"+DOMAIN+"/public?command="+command+"&currencyPair="+currencyPair+"&start="+start+"&end="+end+"&period="+period
  resp = requests.get(url)
  jsonString = json.dumps(resp.text)
#  print("jsonString")
#  print(jsonString)
  dic = json.loads(resp.text)
#  dic = {'date':'', 'high':'0', 'low': '0', 'open': '0', 'close': '0'}

  index=0
  for i in dic:
#    print(i['date'])
#    print(time.asctime(time.localtime(i['date'])))
#    print(dict[index]['date'])
#    dict[index]['date'] = time.asctime(time.localtime(i['date']))
#    print (time.asctime(time.localtime(i['date'])))
    dic[index]['date'] = "170907142500"
    index=index+1

  print "DICT:"+str(dic[0]['date'])
  print "DICT:"+str(dic[1]['date'])
  return render_template('view.html', menu=menus, text=dic)

# main 
if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(debug=True, host='0.0.0.0', port=5012, threaded=True);
