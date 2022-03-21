// Student Name: Lam Wai To Keith
// SID: 1155133260

//function that scrolls the window to about me session
function scrollToAboutMe() {
    let aboutMeContainer = document.getElementById("about-me-container");
    let navBarHeight = document.getElementById("navbar").offsetHeight;
    let scrollTop = aboutMeContainer.getBoundingClientRect().top + window.scrollY - navBarHeight;
    window.scrollTo({top: scrollTop});
}

//function that scrolls the window to my courses session
function scrollToCourses() {
    let coursesContainer = document.getElementById("courses-container");
    let navBarHeight = document.getElementById("navbar").offsetHeight;
    let scrollTop = coursesContainer.getBoundingClientRect().top + window.scrollY - navBarHeight;
    window.scrollTo({top: scrollTop});
}

//function that scrolls the window to responsive web session
function scrollToResponsiveWeb() {
    let responsiveWebContainer = document.getElementById("responsive-web-container");
    let navBarHeight = document.getElementById("navbar").offsetHeight;
    let scrollTop = responsiveWebContainer.getBoundingClientRect().top + window.scrollY - navBarHeight;
    window.scrollTo({top: scrollTop});
}

function scrollToLinks() {
    let footer = document.getElementById("links-footer");
    let navBarHeight = document.getElementById("navbar").offsetHeight;
    let scrollTop = footer.getBoundingClientRect().top + window.scrollY - navBarHeight;
    window.scrollTo({top: scrollTop});
}

//on click event for showing the task bar
let firstToggle = true;
function showTaskbar() {
    let taskbar = document.getElementById("taskbar");
    if (taskbar.style.display == "none" || firstToggle){
        firstToggle = false;
        taskbar.style.display = "block";
    } else {
        taskbar.style.display = "none";
    }
}

//task1: alignment of headings
function align() {
    let elementList = document.getElementsByTagName("h3");
    let currentTextAlign = window.getComputedStyle(document.getElementById("about-me")).getPropertyValue("text-align");
    let nextTextAlign = ""
    switch (currentTextAlign) {
        case "left": 
            nextTextAlign = "center";
            break;
        case "center":
            nextTextAlign = "right";
            break;
        case "right":
            nextTextAlign = "left";
            break;
    }
    for (let i = 0; i < elementList.length; i++){
        elementList[i].style.textAlign = nextTextAlign;
    }
}

//task2: prompt hobby and add to table
function promptHobby() {
    let hobbyTable = document.getElementById("hobbies-list");
    let hobby = prompt("What are your new hobbies?");
    if (hobby == "" || hobby == null){
        return window.alert("You have to enter something.");
    }
    let newEntry = document.createElement("li");
    newEntry.className = 'list-group-item';
    newEntry.textContent = hobby;
    hobbyTable.appendChild(newEntry);
}

//task3: showing the scroll progress bar
function showScrollProgressBar() {
    let progressBarContainer = document.getElementById("progress-bar-container");
    if (progressBarContainer.style.display == "none") {
        progressBarContainer.style.display = "block";
    } else {
        progressBarContainer.style.display = "none";
    }
}

function setProgress() {
    let progressBar = document.getElementById("scroll-progress-bar")
    let windowHeight = window.innerHeight;
    let clientHeight = document.body.clientHeight;  
    let progress = ((window.scrollY / (clientHeight - windowHeight)) * 100);
    progressBar.style.width = `${progress}%`
}

//set progress bar on load so variables are initialized
window.addEventListener("load", function() {
    setProgress();
    window.onscroll = ()=>setProgress();
    showScrollProgressBar();
  });

//check comment input validity, return true if valid, false otherwise
function checkValidity() {
    let valid = true;

    //verfify email
    let emailInput = document.querySelector("#new-email");
    if (emailInput.value == "") {
        if (emailInput.classList.contains("is-valid")){
            emailInput.classList.remove("is-valid");
        }
        document.getElementById("empty-email-message").style.display = "block";
        emailInput.classList.add("is-invalid");
        valid = false;
    } else if (!emailInput.value.includes("@")){
        //check invalid email
        if (emailInput.classList.contains("is-valid")){
            document.getElementById("empty-email-message").style.display = "none";
            emailInput.classList.remove("is-valid");
        }
        document.getElementById("invalid-email-message").style.display = "block";
        emailInput.classList.add("is-invalid");
        valid = false;
    }
    else {
        if (emailInput.classList.contains("is-invalid")){
            document.getElementById("empty-email-message").style.display = "none";
            document.getElementById("invalid-email-message").style.display = "none";
            emailInput.classList.remove("is-invalid");
        }
        emailInput.classList.add("is-valid");
    }

    //verify comment
    let commentInput = document.querySelector("#new-comment");
    if (commentInput.value == "") {
        if (commentInput.classList.contains("is-valid")){
            commentInput.classList.remove("is-valid");
        }
        document.getElementById("empty-comment-message").style.display = "block";
        commentInput.classList.add("is-invalid");
        valid = false;
    } else {
        if (commentInput.classList.contains("is-invalid")){
            document.getElementById("empty-comment-message").style.display = "none";
            commentInput.classList.remove("is-invalid");
        }
        commentInput.classList.add("is-valid");
    }

    //verify color
    if (document.querySelectorAll("input[name=new-color]:checked")[0] == null) {
        window.alert("Pick a color!");
        valid = false;
    }

    return valid;
}

//the following code are referenced and modified from lab 3
function processForm() {
    if(!checkValidity())
        return 0;
    let newComment = document.createElement("div");
    let element = '<div><svg height="100" width="100"><circle cx="50" cy="50" r="40"></svg></div><div><h5></h5><p></p></div>';
    newComment.innerHTML = element;

    newComment.className = "d-flex";
    newComment.querySelectorAll("div")[0].className = "flex-shrink-0"; // 1st div
    newComment.querySelectorAll("div")[1].className = "flex-grow-1"; // 2nd div

    let lastComment = document.querySelector("#comments").lastElementChild; // instead of lastChild for div element
    newComment.id = 'c' + (Number(lastComment.id.substring(1)) + 1);

    newComment.querySelector("h5").innerHTML = document.querySelector("#new-email").value;
    newComment.querySelector("p").innerHTML = document.querySelector("#new-comment").value;

    //add email, comment and color classnames to all tags for references later
    newComment.querySelector("h5").classList.add("email")
    newComment.querySelector("p").classList.add("comments");
    newComment.querySelector("circle").classList.add("color");

    let color = document.querySelectorAll("input[name=new-color]:checked")[0].value;
    // look for checked radio buttons

    newComment.querySelector("circle").setAttribute("fill", color);

    document.querySelector("#comments").appendChild(newComment);

    document.querySelector("form").reset();
    document.querySelector("#new-comment").classList.remove("is-valid");
    document.querySelector("#new-email").classList.remove("is-valid");

    saveFile();
}

//create comment class
class Comment {
    constructor(email, commentText, color) {
        this.email = email;
        this.comment = commentText;
        this.color = color;
    }
}

//loading comments from comment.json
function loadFile() {
    fetch('comment.json')
        .then(res => res.text())
        .then(txt => JSON.parse(txt))
        .then((obj) => {
            let oldComment = document.querySelector("#comments");
            while (oldComment.firstChild) {
                oldComment.removeChild(oldComment.firstChild)
            }

            //the code below is again referencing lab 3
            obj.forEach(item => {
                let newComment = document.createElement("div");
                let element = '<div><svg height="100" width="100"><circle cx="50" cy="50" r="40"></svg></div><div><h5></h5><p></p></div>';
                newComment.innerHTML = element;

                newComment.className = "d-flex";
                newComment.querySelectorAll("div")[0].className = "flex-shrink-0"; // 1st div
                newComment.querySelectorAll("div")[1].className = "flex-grow-1"; // 2nd div

                //handling the case where the first comment is loaded
                let lastComment = ''
                if (document.querySelector("#comments") == null){
                    lastComment = '<div></div>'
                    lastComment.class
                }
                else {
                    lastComment = document.querySelector("#comments").lastElementChild;
                 }

                newComment.querySelector("h5").innerText = item.email;
                newComment.querySelector("p").innerText = item.comment;
                newComment.querySelector("circle").setAttribute("fill", item.color);

                //add email, comment and color classnames to all tags for references later
                newComment.querySelector("h5").classList.add("email")
                newComment.querySelector("p").classList.add("comments");
                newComment.querySelector("circle").classList.add("color");

                document.querySelector("#comments").appendChild(newComment);

            });
        });
}

//save the comments to comment.json
function saveFile() {
    //get all emails from comment session
    let allEmails = document.querySelectorAll(".email");
    let emailArray = Array.from(allEmails);
    emailArray = emailArray.map(item => item.innerText);
    
    //get all comments from comment session
    let allComments = document.querySelectorAll(".comments");
    let commentArray = Array.from(allComments);
    commentArray = commentArray.map(item => item.innerText);

    //get all colors from comment session
    let allColors = document.querySelectorAll(".color")
    let colorArray = Array.from(allColors);
    colorArray = colorArray.map(item => item.getAttribute("fill"));

    //create JSON object to store in comment.json
    let commentCount = emailArray.length;
    let commentObjectArray = new Array(commentCount);
    for (let i = 0; i < commentCount; i++) {
        commentObjectArray[i] = new Comment(emailArray[i], commentArray[i], colorArray[i]);
    }
    let commentJSON = JSON.stringify(commentObjectArray);

    //store commentJSON to JSON file
    fetch('comment.json', {
        method: 'PUT',
        body: commentJSON
    });
}

//add loading comment function on load
window.addEventListener("load", function() {
    loadFile();
})