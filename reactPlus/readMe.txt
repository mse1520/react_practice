react를 설치하고 webpack을 사용하기위한 셋팅방법

1. 터미널에서 react를 실행할 위치폴더로 이동후 npm init을 터미널에서 실행해줍니다.
npm init은 npm을 쓰기위한 기본 명령어입니다.
author는 자신의 이름이나 id를 입력하고
license는 MIT나 SCI를 설정해줍니다.
name은 폴더이름과 같이주는게 좋을듯 합니다.

2. react와 react-dom을 설치합니다.
터미널에서 npm i react react-dom을 실행시켜줍니다.
설치가 되면 package-lock.json과 mode_modules 폴더가 생성이됩니다.
설치된것은 package.json에서 확인할 수 있습니다.

3. webpack을 설치합니다.
webpack은 여러파일을 하나의 파일로 합쳐주는 역활을 합니다.
터미널에서 npm i -D webpack webpack-cli를 실행해줍니다.
-D 개발용으로만 webpack을 사용한다는 의미입니다.
설치된것은 package.json에서 확인할 수 있습니다.

4. webpack.config.js 파일을 자신의 폴더에 생성해줍니다.
client.jsx과 index.html 파일도 만들어줍니다.
client.jsx에 자신이 만든 component(.jsx 파일)를 연결하여줍니다.
만들어진 파일내부에 작성된 내용대로 작성하여 저장해줍니다.
자세한 내용은 파일내부에 주석으로 설명하였습니다.

5. babel 설치하기
babel은 최신문법을 과거의 안정적인 문법으로 교체해줍니다.
뇌피셜 -> 태그형 언어를 .jsx파일이 인식할 수 있게 babel을 설치합니다.
파일 내부의 주석내용에도 설명을 붙였기에 함께 보면서 설치를하여야한다.
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader 
@babel/plugin-proposal-class-properties << 추가설치 내용
설치후 npx webpack을 실행해줍니다.

6. 터미널에서 webpack명령어를 바로 실행시키고자 할 때 package.json에서 설정을 해야합니다.
package.json 파일의 scrips 부분의 test 부분을 "dev": "webpack"로 교체하여줍니다.
실행 명령은 npm run dev
바꾸기 전 내용은 "test": "echo \"Error: no test specified\" && exit 1" 입니다.

7. react router 설치하기
npm i react-router
npm i react-router-dom //웹에서 사용할때
※ 추가지식 입니다.
    npm i react-router-native //앱에서 사용할때

8. webpack-dev-server 설치하기
서버로서 webpack을 돌리기위한 것입니다.
react-router를 사용하기위한 준비단계 정도로 생각하면 됩니다.
npm i -D webpack-dev-server
package.json에서 dev를 "webpack-dev-server" 변경해줍시다.

9. react-hot-loader 설치방법입니다. webpack-dev-server 설치방법도 섞여있습니다.
수정시 자동 빌드하기 위해 터미널에서 npm i -D react-hot-loader webpack-dev-server 명령어를 실행해줍니다.
package.json에서 dev를 "webpack-dev-server --hot"으로 변경해줍니다.
webpack-dev-server은 서버를 돌리기 위한것입니다.
--hot 설정을 위해 client.jsx 파일을 다음과 같이 수정합니다.
const { hot } = require('react-hot-loader/root');
const Hot = hot(WordRelay);
ReactDom.render(<Hot />, document.querySelector('root'));
client.jsx 파일 내부에 주석으로도 설명하였습니다.
webpack.config.js 파일도 다음과 같이 수정합니다.
webpack( module > options > plugins )부분에 'react-hot-loader/babel' 을 추가한다.
webpack.config.js 파일 내부에 주석으로도 설명하였습니다.
9번을 사용할 경우 webpack 설정에서 output의 경로가 먹지 않습니다.
경로 설정을 위해 publicPath: '/dist/' 를 설정해줍니다.


8. 번외
알아두면 좋은 자바스크립트 함수들
setTimeout, clearTimeout, setInterval