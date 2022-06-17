const path = require('path')
const fs = require('fs')

var dir = __dirname.split(/[\\"]/g)
const isDev = dir[dir.length-1] != "app.asar"

const NOTIFICATION_TITLE = "API"
const API_PATH = isDev ? path.join(__dirname, 'api_config.json') : path.join(process.resourcesPath, 'api_config.json')
const ICON_PATH = isDev ? path.join(__dirname, 'api_icon.png') : path.join(process.resourcesPath, 'api_icon.png')

async function readAPIConfigs(){
  
  fs.readFile(API_PATH, 'utf8', (err, data) => {
    if(err){
      console.error(err)
      return
    }
    let apiConfigs = JSON.parse(data).API
    let notificationBody = "Nome: "+apiConfigs.name+"\nIP: "+apiConfigs.address+"\nPorta: "+apiConfigs.port
    new Notification(NOTIFICATION_TITLE, { body : notificationBody, icon : ICON_PATH })
      .onclick = () => document.getElementById("output").innerText = notificationBody
  })
}