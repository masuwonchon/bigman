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
mysql = MySQL()

menus = []
menus.append(['dashboard','fa fa-dashboard fa-fw','Dashboard'])
menus.append(['view','fa fa-dashboard fa-fw','view'])
DOMAIN="poloniex.com"
mysql.init_app(app)
DATE_FORMAT="%Y/%m/%d/%H/%M/%S/"

# main
# http://10.50.10.104:5011/dashboard
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', menu=menus)

# [{"date":1405699200,"high":0.0045388,"low":0.00403001,"open":0.00404545,"close":0.00427592,"volume":44.11655644,"quoteVolume":10259.29079097,"weightedAverage":0.00430015}, ...]
def make_chart():
	str="['Mon',20,28,38,45]"
	return str

def get_data(command, currencyPair, start, end, period):
	print_param(command, currencyPair, start, end, period)
	st = str(int(time.mktime(datetime.datetime.strptime(start,DATE_FORMAT).timetuple())))
	et = str(int(time.mktime(datetime.datetime.strptime(end,DATE_FORMAT).timetuple())))
	url = "https://"+DOMAIN+"/public?command="+command+"&currencyPair="+currencyPair+"&start="+st+"&end="+et+"&period="+period
	resp = requests.get(url)
	jsonString = json.dumps(resp.text)
	DATA = json.loads(resp.text)

	if(len(DATA) == 1):
		print "[ERROR] "+DATA['error']
		return -1

	return DATA

def print_param(command, currencyPair, start, end, period):
	print "Date: "+start+" - "+end
	print "Curr: "+currencyPair
	print "Cmd : "+command
	print "Prod: "+period
	return True

@app.route('/view')
def view():
  #  seconds=1, 1min:60, 1hour: 3600, 1day: 14486400
  #  currencyPair = USDT_XRP, USDT_BTC
  #  stime = "00/23/14/07/09/2017"
  #  etime = "59/32/14/07/09/2017"
  #  period - 5M:300, 15M:900, 30M:1800, 2H:7200, 4H:14400, 1D:86400
	now = datetime.datetime.now()
	end = now.strftime(DATE_FORMAT)
	start_buf = now + datetime.timedelta(minutes=-120)
	start = start_buf.strftime(DATE_FORMAT)
	command = "returnChartData"
	period = "300"

	dic1 = get_data(command, "USDT_XRP", start, end, period)
	dic2 = get_data(command, "USDT_BTC", start, end, period)

	index = 0
	for i in dic1:
		converted_ticks = now + datetime.timedelta(microseconds = i['date']/10)
		dic1[index]['date'] = converted_ticks.strftime("%d:%H:%M:%S")
		index=index+1

	index = 0
#	print "dic1: "+str(dic1)
#	print "dic2: "+str(dic2)
	for j in dic2:
		converted_ticks = now + datetime.timedelta(microseconds = j['date']/10)
		dic2[index]['date'] = converted_ticks.strftime("%d:%H:%M:%S")
		index=index+1

	return render_template('view.html', menu=menus, text1=dic1, text2=dic2)

# main 
if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0', port=5012, threaded=True);
