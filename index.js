const http = require('http')
const fs = require('fs')
const url = require('url')


http.createServer((req, res) => {
    let urlObj = url.parse(req.url, true)
    let weather = ['雷阵雨', '多云', '晴', '多云', '阴', '小雨', '大雪', '雾']
    let city = ['北京', '上海', '广州', '深圳', '海南', '广东', '台湾', '澳门', '杭州', '山西', '新疆', '四川', '重庆']

    switch (urlObj.pathname) {
        case '/getWeather':

            res.end(JSON.stringify({
                city: urlObj.query.city || city[parseInt(Math.random() * city.length)],
                weather: weather[parseInt(Math.random() * weather.length)]
            }))

            break
        default:
            try {
                let pathname = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname
                res.end(fs.readFileSync(__dirname + pathname))
            } catch (e) {
                res.writeHead(404, '404 Not Found')
                res.end('<h1>404 Not Found</h1>')
            }
    }

}).listen(3000)
console.log('open http://localhost:3000')