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
            title:'Créer un article',
            message:'Quel type d\'article créer ?',
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
                label:'Vidéo',
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

    function createTextArticle() {
      let title = $('#title').val()
      let note = $('#note').val()

      console.log('note')
    }

    function cameraTakePicture() {
        navigator.camera.getPicture(onSuccessPicture, onFail, {
        quality: 50
        });
    }

    function cameraTakeVideo() {
      // navigator.camera.getPicture(onSuccess, onFail, {
      // quality: 50,
      // destinationType: Camera.DestinationType.DATA_URL
      // });
      navigator.device.capture.captureVideo(onSuccess, onFail, {
        quality: 50,
        });
      
        function onSuccess(mediaFiles){
          let i, path, len
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath
            let r = Math.random().toString(36).substring(7);
            setLocalStorage(r, path)
          }
          showLocalStorage()
        }
  }

    function onSuccessPicture(imageData) {
        let r = Math.random().toString(36).substring(7);
        setLocalStorage(r, "data:image/jpeg;base64," + imageData)
        showLocalStorage()
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
        for (var i = 0; i < localStorage.length; i++){
            let imageExist = document.getElementById(localStorage.key(i))
            if(imageExist) {
                console.log('image already displayed')
            }
            else {
                const src = localStorage.getItem(localStorage.key(i))
                let img = document.createElement("img");
                img.setAttribute('src', src)
                img.setAttribute('width', 200)
                img.setAttribute('height', 250)
                img.setAttribute('id', localStorage.key(i))
                let imageDiv = document.getElementById('main-container')

                imageDiv.append(img)

            }
        }
    }

var app = {
    // Application Constructor
    initialize: function() {
        const localStorage = window.localStorage;
        localStorage.clear()
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById("selectTypeOfArticle").addEventListener("click", showSelectTypeOfArticle);
        document.getElementById("validate-text-note").addEventListener("click", createTextArticle);
        document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
        // document.getElementById("showLocalStorage").addEventListener("click", showLocalStorage);
        showLocalStorage()
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