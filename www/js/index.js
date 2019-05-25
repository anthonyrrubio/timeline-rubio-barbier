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

// ADD BUTON ACTIONS

function showSelectTypeOfArticle() {
  alert({
    title: 'Ajouter un article',
    message: 'Quel type d\'article ajouter ?',
    buttons: [{
        label: 'Texte',
        onclick: function () {
          window.location.replace("createTextArticle.html");
          closeAlert();
        }
      },
      {
        label: 'Photo',
        onclick: function () {
          cameraTakePicture()
          closeAlert();
        }
      },
      {
        label: 'Video',
        onclick: function () {
          cameraTakeVideo()
          closeAlert();
        }
      },
      {
        label: 'Position',
        onclick: function () {
          getCurrentLocation()
          closeAlert();
        }
      },
      {
        label: 'Annuler',
        onclick: function () {
          closeAlert();
        }
      },
    ]
  });
}

// RETRIEVING INFOS FROM PLUGINS (PHOTOS, VIDEOS, LOCATION...) AND SAVING IT INTO LOCAL STORAGE

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
  navigator.device.capture.captureVideo(onSuccessVideo, onFail, {
    limit: 1
  })

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

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(onSuccessLocation, onFail)

  function onSuccessLocation(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    timestamp = position.timestamp;

    let r = Math.random().toString(36).substring(7) + "location"
    let location = {
      longitude: longitude,
      latitude: latitude,
      date: timestamp
    }
    let locationJSON = JSON.stringify(location);
    localStorage.setItem(r, locationJSON);
    showLocalStorage()
  }
}

function onFail(error) {
  alert('Code d\'erreur: ' + error.code +
    'Message d\'erreur:' + error.message);
}

function setLocalStorage(name, src) {
  const localStorage = window.localStorage;
  localStorage.setItem(name, src);
}

// SHOWING LOCAL STORAGE DATA AT INITIALIZATION

function showLocalStorage() {
  const localStorage = window.localStorage;
  for (let i = 0; i < localStorage.length; i++) {
    let noteExist = document.getElementById(localStorage.key(i))

    if (noteExist) {
      console.log('note already displayed')
    } 
    
    // DISPLAY NOTE

    else if (localStorage.key(i).includes('note')) {
      const json = JSON.parse(localStorage.getItem(localStorage.key(i)))
      const title = json.titre
      const note = json.text
      const date = json.date
      let timeline = document.getElementById('timeline')
      let rootNode = document.createElement("div")
      rootNode.classList.add('row')
      timeline.appendChild(rootNode)

      let iconNode = document.createElement("div")
      iconNode.classList.add('col-10')
      iconNode.classList.add('align-center')
      iconNode.classList.add('marker')
      rootNode.appendChild(iconNode)

      let iconWrapper = document.createElement("div")
      iconWrapper.classList.add('icon-circle-small')
      iconWrapper.classList.add('text-white')
      iconWrapper.style.backgroundColor = "#072F5F"
      iconNode.appendChild(iconWrapper)

      icon = document.createElement('i')
      icon.classList.add('icon')
      icon.classList.add('ion-document-text')
      iconWrapper.appendChild(icon)

      textWrapper = document.createElement('div')
      textWrapper.classList.add('col')
      textWrapper.classList.add('shadow')
      textWrapper.classList.add('radius')
      textWrapper.classList.add('margin')
      textWrapper.classList.add('white')
      rootNode.appendChild(textWrapper)

      textMargin = document.createElement('div')
      textMargin.classList.add('margin')
      textWrapper.append(textMargin)

      let titleNode = document.createElement("h2")
      textMargin.append(titleNode)

      let dateNode = document.createElement('span')
      dateNode.classList.add('text-bold')
      titleNode.appendChild(dateNode)

      let dateTextnode = document.createTextNode(date)
      dateNode.appendChild(dateTextnode)

      let titleTextnode = document.createTextNode(title)
      titleNode.appendChild(titleTextnode)

      rootNode.setAttribute('id', localStorage.key(i))

      let noteNode = document.createElement('div')
      noteNode.style.marginTop = "15px";
      textMargin.appendChild(noteNode)

      let noteTextNode = document.createTextNode(note)
      noteNode.appendChild(noteTextNode)
    }

    // DISPLAY PHOTO
    else if (localStorage.key(i).includes('photo')) {
      const src = localStorage.getItem(localStorage.key(i))
      let img = document.createElement("img");
      img.setAttribute('src', src)
      img.setAttribute('width', 200)
      img.setAttribute('height', 250)
      img.setAttribute('id', localStorage.key(i))

      let timeline = document.getElementById('timeline')
      let rootNode = document.createElement("div")
      rootNode.classList.add('row')
      timeline.appendChild(rootNode)

      //ICON

      let iconNode = document.createElement("div")
      iconNode.classList.add('col-10')
      iconNode.classList.add('align-center')
      iconNode.classList.add('marker')
      rootNode.appendChild(iconNode)

      let iconWrapper = document.createElement("div")
      iconWrapper.classList.add('icon-circle-small')
      iconWrapper.classList.add('text-white')
      iconWrapper.style.backgroundColor = "#1261A0"
      iconNode.appendChild(iconWrapper)

      icon = document.createElement('i')
      icon.classList.add('icon')
      icon.classList.add('ion-camera')
      iconWrapper.appendChild(icon)

      // PHOTO WRAPPER

      photoWrapper = document.createElement('div')
      photoWrapper.classList.add('col')
      photoWrapper.classList.add('shadow')
      photoWrapper.classList.add('radius')
      photoWrapper.classList.add('margin')
      photoWrapper.classList.add('white')
      photoWrapper.style.padding = '15px'
      rootNode.appendChild(photoWrapper)

      currentDate = new Date()
      let day = currentDate.getDate()
      let month = currentDate.getMonth() + 1
      let year = currentDate.getFullYear()
      let noteDate = year + "/" + month + "/" + day
      let dateNode = document.createElement("div")
      dateNode.classList.add('text-bold')
      let dateTextnode = document.createTextNode(noteDate)
      dateNode.appendChild(dateTextnode)

      photoWrapper.append(dateNode)
      photoWrapper.append(img)

    }

    // DISPLAY VIDEO
    else if (localStorage.key(i).includes('video')) {
      const src = localStorage.getItem(localStorage.key(i))
      let videoNode = document.createElement("video")
      videoNode.setAttribute('width', 200)
      videoNode.setAttribute('height', 250)
      videoNode.className = "video_display"
      videoNode.src = src
      videoNode.controls = "controls"
      videoNode.setAttribute('id', localStorage.key(i))

      currentDate = new Date()
      let day = currentDate.getDate()
      let month = currentDate.getMonth() + 1
      let year = currentDate.getFullYear()
      let noteDate = year + "/" + month + "/" + day

      let timeline = document.getElementById('timeline')
      let rootNode = document.createElement("div")
      rootNode.classList.add('row')
      timeline.appendChild(rootNode)

      //ICON

      let iconNode = document.createElement("div")
      iconNode.classList.add('col-10')
      iconNode.classList.add('align-center')
      iconNode.classList.add('marker')
      rootNode.appendChild(iconNode)

      let iconWrapper = document.createElement("div")
      iconWrapper.classList.add('icon-circle-small')
      iconWrapper.classList.add('text-white')
      iconWrapper.style.backgroundColor = "#1261A0"
      iconNode.appendChild(iconWrapper)

      icon = document.createElement('i')
      icon.classList.add('icon')
      icon.classList.add('ion-videocamera')
      iconWrapper.appendChild(icon)

      //VIDEO WRAPPER

      videoWrapper = document.createElement('div')
      videoWrapper.classList.add('col')
      videoWrapper.classList.add('shadow')
      videoWrapper.classList.add('radius')
      videoWrapper.classList.add('margin')
      videoWrapper.classList.add('white')
      videoWrapper.style.padding = '15px'
      rootNode.appendChild(videoWrapper)

      let dateNode = document.createElement("div")
      let dateTextnode = document.createTextNode(noteDate)
      dateNode.classList.add('text-bold')
      dateNode.appendChild(dateTextnode)

      videoWrapper.appendChild(dateNode)
      videoWrapper.appendChild(videoNode)
    }

    // DISPLAY LOCATION
    else if (localStorage.key(i).includes('location')) {
      const location = JSON.parse(localStorage.getItem(localStorage.key(i)))
      console.log(location)

      let timeline = document.getElementById('timeline')
      let rootNode = document.createElement("div")
      rootNode.classList.add('row')
      timeline.appendChild(rootNode)

      let iconNode = document.createElement("div")
      iconNode.classList.add('col-10')
      iconNode.classList.add('align-center')
      iconNode.classList.add('marker')
      rootNode.appendChild(iconNode)

      let iconWrapper = document.createElement("div")
      iconWrapper.classList.add('icon-circle-small')
      iconWrapper.classList.add('text-white')
      iconWrapper.style.backgroundColor = "#1261A0"
      iconNode.appendChild(iconWrapper)

      icon = document.createElement('i')
      icon.classList.add('icon')
      icon.classList.add('ion-location')
      iconWrapper.appendChild(icon)

      mapWrapper = document.createElement('div')
      mapWrapper.classList.add('col')
      mapWrapper.classList.add('shadow')
      mapWrapper.classList.add('radius')
      mapWrapper.classList.add('margin')
      mapWrapper.classList.add('white')
      rootNode.appendChild(mapWrapper)

      map = document.createElement('div');
      id = 'map' + Math.random()
      map.setAttribute('id', id)
      map.classList.add('map')
      mapWrapper.appendChild(map)
      map.style.width = mapWrapper.style.width
      map.style.height = '200px'

      var mymap = L.map(id).setView([location.latitude, location.longitude], 13);

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYW50b25pbi1za2VyeSIsImEiOiJjancyamczc24wMXdjM3lrbWU0Z3NzZTg5In0.4tq5tI_4wUxUW54quusVkw'
      }).addTo(mymap);

      var myIcon = L.icon({
        iconUrl: 'img/leaflet/marker-icon.png',
        shadowUrl: 'img/leaflet/marker-shadow.png',
    });
    L.marker([location.latitude, location.longitude], {icon: myIcon}).addTo(mymap);

    }
  }
}

var app = {
  // Application Constructor
  initialize: function () {
    const localStorage = window.localStorage
    console.log(localStorage)
    //localStorage.clear()
    showLocalStorage()
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {

  },

}

app.initialize();