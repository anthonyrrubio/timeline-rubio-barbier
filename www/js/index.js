/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

    function showSelectTypeOfArticle() {
        alert({
            title:'Ajouter un article',
            message:'Quel type d\'article ajouter ?',
            buttons:[
              {
                label: 'Texte',
                onclick: function(){
                  window.location.replace("createTextArticle.html");
                  closeAlert();
                }
              },
              {
                label:'Photo',
                onclick: function(){
                  cameraTakePicture()
                  closeAlert();
                }
              },
              {
                label:'Video',
                onclick: function(){
                  cameraTakeVideo()
                  closeAlert();
                }
              },
              {
                label:'Annuler',
                onclick: function(){
                  closeAlert();
                }
              },
            ]
        });
    }

    function cameraTakePicture() {
        navigator.camera.getPicture(onSuccessPicture, onFail, {
        quality: 50
        })

        function onSuccessPicture(imageData) {
          let r = Math.random().toString(36).substring(7) + "photo"
          setLocalStorage(r, imageData)
          showLocalStorage()
      }
    }

    function cameraTakeVideo() {
      navigator.device.capture.captureVideo(onSuccessVideo, onFail, {limit:1})

      function onSuccessVideo(mediaFiles) {
        let i, len
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath
            let r = Math.random().toString(36).substring(7) + "video"
            setLocalStorage(r, path)
            showLocalStorage()
        }
      }
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    } 

    function setLocalStorage(name ,src) 
    {
        const localStorage = window.localStorage;
        localStorage.setItem(name, src);
    }

    function showLocalStorage() {
        const localStorage = window.localStorage;
        for (let i = 0; i < localStorage.length; i++){
            let noteExist = document.getElementById(localStorage.key(i))
            if(noteExist) {
                console.log('note already displayed')
            }
            else if (localStorage.key(i).includes('note')) {
              const json = JSON.parse(localStorage.getItem(localStorage.key(i)))
              const title = json.titre
              const note = json.text
              const date = json.date
              let rootNode = document.createElement("div")
              let titleNode = document.createElement("h2")  
              let noteNode = document.createElement("div")  
              let dateNode = document.createElement("div")  
              
              rootNode.setAttribute('id', localStorage.key(i))

              let titleTextnode = document.createTextNode(title)
              let noteTextnode = document.createTextNode(note)
              let dateTextnode = document.createTextNode("Le "+date)

              titleNode.appendChild(titleTextnode)
              noteNode.appendChild(noteTextnode)
              dateNode.appendChild(dateTextnode)

              rootNode.appendChild(titleNode) 
              rootNode.appendChild(noteNode)   
              rootNode.appendChild(dateNode)  

              let noteContainer = document.getElementById('note-container')
              noteContainer.append(rootNode)
            }
            else if (localStorage.key(i).includes('photo')) {
              const src = localStorage.getItem(localStorage.key(i))
              let img = document.createElement("img");
              img.setAttribute('src', src)
              img.setAttribute('width', 200)
              img.setAttribute('height', 250)
              img.setAttribute('id', localStorage.key(i))

              currentDate = new Date()
              let day = currentDate.getDate()
              let month = currentDate.getMonth()+1
              let year = currentDate.getFullYear()
              let noteDate = year + "/" + month + "/" + day
              let rootNode = document.createElement("div")
              let dateNode = document.createElement("div") 
              let dateTextnode = document.createTextNode("Le "+noteDate)
              dateNode.appendChild(dateTextnode)
              rootNode.appendChild(img)
              rootNode.appendChild(dateNode)

              let noteContainer = document.getElementById('note-container')
              noteContainer.append(rootNode)
            }
            else if (localStorage.key(i).includes('video')) {
              const src = localStorage.getItem(localStorage.key(i))
              let videoNode = document.createElement("video")
              videoNode.className = "video_display"
              videoNode.src = src
              videoNode.controls = "controls"
              videoNode.setAttribute('id', localStorage.key(i))

              currentDate = new Date()
              let day = currentDate.getDate()
              let month = currentDate.getMonth()+1
              let year = currentDate.getFullYear()
              let noteDate = year + "/" + month + "/" + day
              let rootNode = document.createElement("div")
              let dateNode = document.createElement("div") 
              let dateTextnode = document.createTextNode("Le "+noteDate)
              dateNode.appendChild(dateTextnode)
              
              rootNode.appendChild(videoNode)
              rootNode.appendChild(dateNode)

              let noteContainer = document.getElementById('note-container')
              noteContainer.append(rootNode)
            }
        }
    }

var app = {
    // Application Constructor
    initialize: function() {
      const localStorage = window.localStorage
      localStorage.clear()
      showLocalStorage()
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
      document.getElementById("selectTypeOfArticle").addEventListener("click", showSelectTypeOfArticle)
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

    },

}

app.initialize();