import React from 'react';
import ReactDOM from 'react-dom';
import TripsReport from './views/NearbyErv';
import 'antd/dist/antd.less';
import './assets/styles/global.less';
import './index.less';

ReactDOM.render(
  <>
    <div id="Hidden-Screen-Print" />
    <div className="ZiqitzaVTS">
      <div className="Layout__ProtectedPages" id="Layout__ProtectedPages">
        <div className="Layout__ProtectedPages__ContentWrap">
          <TripsReport
            locale="en"
            userConfig={{
              token: 'd31ad904-194f-47cc-8d68-f57b34e62ed5',
              config: {
                api: {
                  "baseUrl": "https://admin.ziqitza-api.ml/gateway/userdev",
                  "auditUrl": "https://admin.ziqitza-api.ml/gateway/auditdev",
                  "edsUrl": "https://admin.ziqitza-api.ml/gateway/edsdev",
                  "vtsUrl": "https://admin.ziqitza-api.ml/gateway/vtsdev",
                  "notificationUrl": "https://admin.ziqitza-api.ml/gateway/notificationdev",
                  "vtsHealthUrl": "https://admin.ziqitza-api.ml/gateway/vtshealthdev",
                  "mapUrl": "https://admin.ziqitza-api.ml/gateway/mapdev",
                  "reportUrl": "https://admin.ziqitza-api.ml/gateway/reportdev",
                  "vtsMatrixUrl": "https://admin.ziqitza-api.ml/gateway/vtsmatrixdev"
                  },
                locale: 'EN',
                mapMyIndiaKey: 'ksdmpwc4n5cj2w5t78caczlhoowjj6d3',
                hereMapKey: "1xAzO8zFp4GsbJV6QN14E3oGDtPjcX8aX9cMOLKzIsk",
                googleMapKey: "AIzaSyB1JvScmcnJi4PkFN5F0EH5wg4PgpkdGcI",
                webApiKey: "n53g9GMcoWzmnKV3XCrRbmrXl6P6Ngag",
                firebase: {
                  apiKey: 'AIzaSyD7yZhIRnEu9tdCtNceJf6TpdiZHw0udsA',
                  authDomain: 'test-project-f40e7.firebaseapp.com',
                  databaseURL: 'https://test-project-f40e7.firebaseio.com',
                  projectId: 'test-project-f40e7',
                  storageBucket: 'test-project-f40e7.appspot.com',
                  messagingSenderId: '1082255280395',
                  appId: '1:1082255280395:web:8fc07c5c3dde583e697a0e',
                  measurementId: 'G-8G7P99W6S8',
                },
                fcmVapidKey: 'BOYpn3c_W46BAlN0Ek2XJmfuPQqTBIr5FaKhv1-iF63oloJ2FrQe5Agoqcg8Z4DqjGNjLHbBcEBVU9kBpwaFFj8',
              },
              handleVtsInvalidToken: () => {},
            }}
          />
        </div>
      </div>
    </div>
  </>,
  document.getElementById('root'),
);
