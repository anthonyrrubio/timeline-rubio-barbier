
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {    
    
    document.getElementById("validate-text-note").addEventListener("click", createTextArticle);
    function createTextArticle() {
        let r = Math.random().toString(36).substring(8) + "note"
        const localStorage = window.localStorage;
        currentDate = new Date()
        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()
        let noteDate = year + "/" + month + "/" + day;

        let note = {
            titre : document.getElementById("title_input").value,
            text : document.getElementById("text_input").value,
            date : noteDate,
        }
        let noteJSON = JSON.stringify(note)
        localStorage.setItem(r, noteJSON)
        window.location = "index.html"
    }
}