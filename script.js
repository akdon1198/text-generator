let togglebutton = false;
let addbutton = document.querySelector(".add-button");
let removebutton = document.querySelector(".remove-button");
let module = document.querySelector(".module");
let main = document.querySelector(".main-cont");
let text = document.querySelector("textarea");
let prioritycolor = document.querySelectorAll(".priority-col");
let toggelremoval = false;
let colorarray = ["red", "blue", "green", "black"]
let ticketarray = [];
let borderselection = document.querySelectorAll(".set-priority-col");
module.style.display = "none";
let modalcolor = "black";
// if(localStorage.getItem("jiraticket")){
//     createTicket()
//     JSON.parse("jiraticket");
// }
addbutton.addEventListener("click", (e) => {
    togglebutton = !togglebutton;
    if(togglebutton){
        module.style.display = "flex";
    }else{
        module.style.display = "none";
    }
})
prioritycolor.forEach((prioritycol) => {
    prioritycol.addEventListener("click", (e) => {
        let allticket = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < allticket.length; i++){
            allticket[i].remove();
        }
        let col = prioritycol.classList[1];
        ticketarray.forEach((ticketobj) => {
            if(col == ticketobj.ticketcolor)
            createTicket(ticketobj.ticketcolor, ticketobj.id, ticketobj.textvalue);
        })
    })
    prioritycol.addEventListener("dblclick", (e) => {
        let allticket = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < allticket.length; i++){
            allticket[i].remove();
        }
        ticketarray.forEach((ticketobj) => {
            createTicket(ticketobj.ticketcolor, ticketobj.id, ticketobj.textvalue);
        })
    })
})
removebutton.addEventListener("click", (e) => {
    toggelremoval = !toggelremoval;
    if(toggelremoval){
        handleremoval();
    }
})
borderselection.forEach((colorElem, idx) => {
    colorElem.addEventListener("click", (e) => {
        borderselection.forEach((colors, idx) => {
            colors.classList.remove("border");
        })
        colorElem.classList.add("border");
        modalcolor = colorElem.classList[0];
    })
})

module.addEventListener("keydown", (e) => {
    if(e.key == "Shift"){
        let Sample;
        // console.log(Sample)
        createTicket(modalcolor, Sample,text.value);
        setdefault();
    }
})

let lock = "fa-lock";
let unlock = "fa-lock-open";
function createTicket(ticketcolor, Sample,textvalue){
    let id = Sample || shortid();
    let div = document.createElement("div");
    div.setAttribute("class", "ticket-cont")
    div.innerHTML =` 
    <div class="ticket-color ${ticketcolor}"></div> 
    <div class="id-cont">#${id}</div>
    <div class="task-cont">${textvalue}</div>
    <div class="lock-icon">  
    <i class="fas fa-lock"></i>
    </div>
    `;
    main.appendChild(div);
    handlelock(div);
    handlecolor(div);
    if(!Sample)
    ticketarray.push({ticketcolor, id, textvalue});
    console.log(ticketarray.length);
    localStorage.setItem("jiraticket", JSON.stringify(ticketarray));
}
function handlecolor(div){
    let currcolorselctor = div.querySelector(".ticket-color");
    currcolorselctor.addEventListener("click", (e) => {
        let currcolor = currcolorselctor.classList[1];
        let currcoloridx = colorarray.findIndex((color) => {
            return currcolor === color 
        })
        currcoloridx++;
        currcoloridx = currcoloridx % 4;
        currcolorselctor.classList.remove(currcolor)
        currcolor = colorarray[currcoloridx];
        currcolorselctor.classList.add(currcolor)
    })
}
function handleremoval(){
        let allticket = document.querySelectorAll(".ticket-cont");
        allticket.forEach((singleticket) => {
            singleticket.addEventListener("click", (e) => {
                if(toggelremoval){
                    let id = singleticket.querySelector(".id-cont");
                    ticketarray.forEach((oneticket) => {
                        if(oneticket.id == id.innerText){
                            oneticket.remove();
                        }
                    })
                    singleticket.remove();
                }
            })
        })
}
function handlelock(div){
    let lockicon = div.querySelector(".lock-icon");
    let ticketlock = lockicon.children[0];
    let taskareaeditable = div.querySelector(".task-cont"); 
    lockicon.addEventListener("click", (e) => {
        if(ticketlock.classList.contains(lock)){
            ticketlock.classList.remove(lock)
            ticketlock.classList.add(unlock)
            taskareaeditable.setAttribute("contenteditable", "true");
        }else{
            ticketlock.classList.remove(unlock)
            ticketlock.classList.add(lock)
            taskareaeditable.setAttribute("contenteditable", "false");
        }
        
    })
}
function setdefault(){
    module.style.display = "none";
    togglebutton = false;
    text.value = "";
    modalcolor = "black";
    borderselection.forEach((colors, idx) => {
        if(colors.classList[0] != "black")
        colors.classList.remove("border");
        else colors.classList.add("border");
    })
}