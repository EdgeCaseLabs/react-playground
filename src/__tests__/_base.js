

/* Setup all the mocking globals */
import 'isomorphic-fetch'
import 'fetch-mock'

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};


var fs = require('fs')

const logDebug = (file, content) => {
  const s = fs.createWriteStream(file)
  s.once('open', (fd) => {
    s.write(content)
    s.end()
  })
}

global.log = (wrapper) => {
  const pth = "__debug"
  fs.access(pth, fs.constants.F_OK, (err) => {
    const doLog = () => {
      logDebug(pth+"/debug.html", wrapper.html())
    }
    if(err){
        fs.mkdir(pth, (err) => {
          if(err){
            console.log(err)
          }else{
            doLog()
          }
        })
    }else{
      doLog()
      console.log("DEBUG: "+process.cwd()+"/"+pth+"/debug.html")
    }
  })


}
