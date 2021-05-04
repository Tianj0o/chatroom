module.exports = {
    outputDir:__dirname+'/server/chatroom',
    publicPath: process.env.NODE_ENV === 'production'
      ? '/chatroom/'
      : '/'
  }
 
