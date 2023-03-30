const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //  плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
  mode: 'development', // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ // rules — это массив правил, добавили в него объект правил для бабеля
      {
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      { // правило для обработки изображений 
        test: /\.(png|svg|jpg|gif|jpeg)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        }
      },
      { // правило для обработки шрифтов
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        }
      },
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [MiniCssExtractPlugin.loader, { // при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
            loader: 'css-loader',
            options: { importLoaders: 1 } //опция для использования директивы @import в css-файлах, 1 - некоторые трансформации PostCSS нужно применить до css-loader
          }, 
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ]
};
