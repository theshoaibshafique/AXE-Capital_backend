import pandas as pd
import numpy as np
import keras
import tensorflow as tf
from keras.preprocessing.sequence import TimeseriesGenerator
import yfinance as yf
from datetime import date
from keras.models import Sequential
from keras.layers import LSTM, Dense

START = "2010-01-01"
TODAY = date.today().strftime("%Y-%m-%d")

df = yf.download('TSLA', START, TODAY)
df.reset_index(inplace=True)
df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')


df.set_axis(df['Date'], inplace=True)
df.drop(columns=['Open', 'High', 'Low', 'Volume'], inplace=True)

close_data = df['Close'].values
close_data = close_data.reshape((-1,1))

ticker="TSLA"

look_back = 15
model=keras.models.load_model('{}_Model'.format(ticker))

def predict(num_prediction, model):
    prediction_list = close_data[-look_back:]
    
    for _ in range(num_prediction):
        x = prediction_list[-look_back:]
        x = x.reshape((1, look_back, 1))
        out = model.predict(x)[0][0]
        prediction_list = np.append(prediction_list, out)
    prediction_list = prediction_list[look_back-1:]
        
    return prediction_list
    
def predict_dates(num_prediction):
    last_date = df['Date'].values[-1]
    prediction_dates = pd.date_range(last_date, periods=num_prediction+1)
    return prediction_dates
        
def forecast_data(ticker):

    num_prediction = 30
    forecast = predict(num_prediction, model)
    forecast_dates = predict_dates(num_prediction)
    res = dict(zip(forecast_dates, forecast))
    return res 