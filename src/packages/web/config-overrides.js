const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

//MARK::Add Web Blocks
const appIncludes = [
resolveApp('../blocks/payments/src/'),
resolveApp('../blocks/studio-store-ecommerce-core/src/'),
resolveApp('../blocks/studio-store-ecommerce-components/src/'),
resolveApp('../blocks/studio-store-ecommerce-router/src/'),
resolveApp('../blocks/studio-store-ecommerce-services/src/'),
resolveApp('../blocks/studio-store-ecommerce-theme/src/'),
resolveApp('../blocks/studio-store-ecommerce-translations/src/'),
resolveApp('../blocks/scheduling/src/'),
resolveApp('../blocks/shoppingcart/src/'),
resolveApp('../blocks/email-account-registration/src/'),
resolveApp('../blocks/auth/src/'),
resolveApp('../blocks/login/src/'),
resolveApp('../blocks/signup/src/'),
resolveApp('../blocks/forgot-password/src/'),
resolveApp('../blocks/splashscreen/src/'),
resolveApp('../blocks/otp-input-confirmation/src/'),
resolveApp('../blocks/email-account-login/src/'),
resolveApp('../blocks/notifications/src/'),
resolveApp('../blocks/ordermanagement/src/'),
resolveApp('../blocks/dashboard/src/'),
resolveApp('../blocks/catalogue/src/'),
resolveApp('../blocks/helpcenter/src/'),
resolveApp('../blocks/interactivefaqs/src/'),
resolveApp('../blocks/profilebio/src/'),
resolveApp('../blocks/connectedaccounts/src/'),
resolveApp('../blocks/sorting/src/'),
resolveApp('../blocks/wishlist/src/'),
resolveApp('../blocks/filteritems/src/'),
resolveApp('../blocks/search/src/'),
resolveApp('../blocks/categoriessubcategories/src/'),
resolveApp('../blocks/productdescription/src/'),
resolveApp('../blocks/ordersummary/src/'),
resolveApp('../blocks/orderdetailview/src/'),
resolveApp('../blocks/contactus/src/'),
resolveApp('../blocks/BulkUploading/src/'),
resolveApp('../blocks/core/src/'),
resolveApp('../blocks/utilities/src/'),
resolveApp('../blocks/Share2/src/'),
resolveApp('../blocks/Sms2/src/'),
resolveApp('../blocks/AdminConsole3/src/'),
resolveApp('../blocks/UploadMedia2/src/'),
resolveApp('../blocks/EmailLists/src/'),
resolveApp('../blocks/TargetedFeed/src/'),
resolveApp('../blocks/CustomisedOrderStatus/src/'),
resolveApp('../blocks/LiveChat2/src/'),
resolveApp('../blocks/Reviews2/src/'),
resolveApp('../blocks/ApiIntegration19/src/'),
resolveApp('../blocks/AdHocReporting2/src/'),

  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/react-native-animatable'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src'),
  resolveApp('../blocks/studio-store-ecommerce-components/src'),
  resolveApp('../blocks/studio-store-ecommerce-router/src'),
  resolveApp('../blocks/studio-store-ecommerce-services/src'),
  resolveApp('../blocks/studio-store-ecommerce-theme/src'),
  resolveApp('../blocks/studio-store-ecommerce-translations')
]

const CompressionPlugin = require('compression-webpack-plugin'); //gzip
const BrotliPlugin = require('brotli-webpack-plugin'); //brotli
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  )
  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins)
  config.module.rules = config.module.rules.filter(Boolean)
  // config.plugins.push(
  //   new webpack.DefinePlugin({ __DEV__: env !== 'production' })
  // )
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    new BrotliPlugin({ //brotli plugin
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
   
  )
  return config
}