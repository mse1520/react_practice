const path = require('path');
//process.env.NODE_ENV = 'production';

module.exports = {
    name: 'WordRelay-setting',
    mode: 'development', //실서비스는 production
    devtool: 'eval', //실서비스는 hidden-source-map
    resolve: {
        extensions: ['.jsx', '.js']
    },//entry 부분에서 합쳐질 파일의 확장자를 알아서 붙여준다.
    entry: {
        //client.jsx 안에 연결할 파일이 서로 연결된경우 알아서 찾아주기 때문에 client.jsx 파일만 입력해준다.
        app: ['./client']
    },//입력
    module: {
        rules: [{
            //test는 어떤 파일이 함쳐지는지에 대한 내용입니다.
            test: /\.jsx?$/, //$는 붙여줘도 되고 안해도되는듯??
            // 바벨은 js 최신문법을 안정적인 과거의 문법으로 변환해주는 역활을 합니다.
            loader: 'babel-loader',
            options: {
                //presets까지 설치후 추가설치가 필요한것만 설치하는것이 좋다.
                presets:
                    [
                        ['@babel/preset-env', {
                            targets: {
                                // https://github.com/browserslist/browserslist#full-list
                                browsers: ['> 5% in KR']//지원하고싶은 브라우저의 종류
                            },
                            // debug: true 시 실행했을 때 터미널에서 내용을 볼수있다.
                            debug: true
                        }],
                        '@babel/preset-react'
                    ],
                // ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    //'react-hot-loader/babel'
                ]
            }
        }
        // 설치하지 않았습니다
        // 나중에 설치해서 실험해봅시다.
        // , {
        //     test: /\.css$/,
        //     use: ['style-loader', 'css-loader']
        // }
    ]
    },//webpack 설정
    plugins: [],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        //publicPath: '/dist/'
    }//출력
};