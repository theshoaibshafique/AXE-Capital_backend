from flask import Flask, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from fbprophet import Prophet
import yfinance as yf
from datetime import date

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*",
        "Access-Control-Allow-Origin":"*"
    }
})
api = Api(app)

START = "2010-01-01"
TODAY = date.today().strftime("%Y-%m-%d")
period = 30


class StockData(Resource):
    def get(self, ticker):
        # end = datetime.today().strftime('%Y-%m-%d')
        # df = web.DataReader(ticker, data_source='yahoo',
        #                     start='2010-07-02', end=end)
        df = yf.download(ticker, START, TODAY)
        df.reset_index(inplace=True)
        df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
         
        data = df.to_dict(orient='records')

        return data

class Model(Resource):
    def pro(self,ticker):
        data = yf.download(ticker, START, TODAY)
        data.reset_index(inplace=True)
        df_train = data[['Date','Close']]
        df_train = df_train.rename(columns={"Date": "ds", "Close": "y"})

        m = Prophet(changepoint_prior_scale=2.5)
        m.add_seasonality(name='monthly', period=21, fourier_order=10)
        m.fit(df_train)
        future = m.make_future_dataframe(periods=period)
        future['day'] = future['ds'].dt.weekday
        future = future[future['day']<=4]
        forecast = m.predict(future)
        forecast['predicted_value'] = forecast['yhat'] 
        forecast['ds']=forecast['ds'].dt.strftime("%Y-%m-%d")  
        res = forecast.to_dict(orient='records')
        return res
    def get(self, ticker):
        
        res = self.pro(ticker)
        return res


p1=Model();
p1.pro('TSLA')

api.add_resource(StockData, "/stockdata/<string:ticker>")
api.add_resource(Model,"/getdata/<string:ticker>")


if __name__ == "__main__":
    app.run(debug=True)
