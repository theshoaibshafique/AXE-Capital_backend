from flask import Flask, jsonify
from flask_restful import Api, Resource
import pandas_datareader.data as web
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
api = Api(app)


class StockData(Resource):
    def get(self, ticker):
        end = datetime.today().strftime('%Y-%m-%d')
        df = web.DataReader(ticker, data_source='yahoo',
                            start='2010-07-02', end=end)
        dates = []
        for x in range(len(df)):
            newdate = str(df.index[x])
            newdate = newdate[0:10]
            dates.append(newdate)

        df['Date'] = dates
        df = df.to_dict(orient='records')
        return df


api.add_resource(StockData, "/stockdata/<string:ticker>")


if __name__ == "__main__":
    app.run(debug=True)
