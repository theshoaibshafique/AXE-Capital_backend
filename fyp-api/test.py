from fbprophet import Prophet, forecaster
from datetime import date
import yfinance as yf
import streamlit as st



START = "2010-01-01"
TODAY = date.today().strftime("%Y-%m-%d")
period = 7

st.title('Stock Forecast App')


stocks = ('GOOG', 'AAPL', 'MSFT', 'GME','TSLA','NFLX')
selected_stock = st.selectbox('Select dataset for prediction', stocks)

@st.cache
def load_data(ticker):
    data = yf.download(ticker, START, TODAY)
    data.reset_index(inplace=True)
    return data


data = load_data(selected_stock)

st.subheader('Raw data')
st.write(data.tail())

# print (data.tail())

df_train = data[['Date','Close']]
df_train = df_train.rename(columns={"Date": "ds", "Close": "y"})

m = Prophet()
m.fit(df_train)
future = m.make_future_dataframe(periods=period)
forecast = m.predict(future)
forecast['ds']=forecast['ds'].dt.strftime("%Y-%m-%d") 
st.subheader('Forecast data')
st.write(forecast)

# print(forecast.tail())