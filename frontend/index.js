document.addEventListener('DOMContentLoaded', ()=> {
  const meetForm = document.getElementById('new-meet-form');
  const meetsDiv = document.getElementById('all-meets');
  const arrowButton = document.getElementById('open-button').firstElementChild;

  meetsDiv.addEventListener('click', (e)=> {
    if(e.target.innerText === "delete" && e.target.tagName === "BUTTON"){
      showScrCode(e)
      if (hideActive(e)){
        const delInp = document.getElementById(e.target.parentNode.id).children[2]
        let meet = Meet.findByID(getIdNum(e))
        delInp.addEventListener('keypress', (del)=>{
          if (del.key === "Enter"){
            if (delInp.value === meet.secretCode){
              meet.remove()
              deleteMeet(meet)
            } else {
              // console.log(e)
              // console.log(e.path[1].childNodes[4])
              throwError(e.path[1].childNodes[4], "incorrect code")
            }
          }
        })
      }
    } else if (e.target.innerText === "show comments" && e.target.tagName === "BUTTON"){
      testShowComments(e)
    }
  })

  meetsDiv.addEventListener('submit', (e)=>{
    e.preventDefault();

    let data = formInfo(e)
    if (data['owner'] === "" && sessionStorage.getItem('owner')){
      data['owner'] = sessionStorage.getItem('owner')
    } else {
      sessionStorage.setItem('owner', data['owner'])
    }
    const comment = { ...data, meetId: getIdNum(e)}
    if(validateComment(e)) {createComment(comment)}
  })
  
  meetForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(e)
    if(validateMeet(e)){
      const meetData = new FormData(e.target)
      createMeet(meetData);
    }
    
  })

  arrowButton.addEventListener('click', hideFormArea)

  fetchMeets();

});

const BASE_URL = 'http://localhost:3000'


function validateComment(e){
  const name = e.target[0].value
  const comment = e.target[1].value
  if (name === "" || comment === ""){
    console.log("invalid")
    throwError(e.target)
    return false
  } else {
    console.log("valid")
    return true
  }
}

function validateMeet(e){
  const name = e.target[0].value
  const location = e.target[1].value
  const timeDate = e.target[2].value
  const title = e.target[3].value
  const secretCode = e.target[4].value
  const image = e.target[5].value

  if (name === '' || location === '' || timeDate === ''|| title === '' || secretCode === '' || image === ""){
    console.log("invalid")
    throwError(e.target)
    return false
  } else {
    console.log("valid")
    return true
  }
}

function throwError(e, message='all feilds must be filled'){
  e.style.border = "2px solid red"
  let errorMsg = document.createElement("p");
  errorMsg.innerText = message
  errorMsg.style.color = "red"
  e.parentNode.insertBefore(errorMsg, e)

  setTimeout(()=> {
    e.style.border = ""
    errorMsg.remove();
  }, 5000)
}
function hideFormArea(){
  const formDiv = document.getElementById("new-meet-form")
  const arrowBtn = document.getElementById('arrow-button')

  if (formDiv.style.display === 'none'){
    formDiv.style.display = 'flex'
    formDiv.className = 'open'
    arrowBtn.className = 'turn'
  } else {
    formDiv.classList.remove('open')
    arrowBtn.classList.remove('turn')
    arrowBtn.className = 'turn-back'
    formDiv.className = 'close'
    setTimeout(()=> formDiv.style.display = 'none', 500)
  }
}

function hideActive(e){
  const input = document.getElementById(e.target.parentNode.id).children[2];
  return !input.classList.contains('hide')
}

function showScrCode(e){
  const input = document.getElementById(e.target.parentNode.id).children[2];
  if (input.classList.contains('hide')){
    input.classList.remove('hide')
  } else {
    input.classList.add('hide')  
  }
}

function formInfo(e){
  const formInfo = {};
    for(const i of e.target){
      if (i.name != ''){
        formInfo[i.name] = i.value
      }
    }
  return formInfo
}

function getIdNum(e){
  return e.target.parentNode.id.slice(4)
}


function testShowComments(e){
  const comments = document.getElementById(`${e.target.parentNode.id}-comment`)
  if (comments.classList.contains('hide')){
    comments.classList.remove('hide')
  } else {
    comments.classList.add('hide')
  }
}
// Read 

function fetchMeets(){ 
  fetch(`${BASE_URL}/meets`)
  .then(resp => resp.json())
  .then(meets => {
    for( const meet of meets){
      let m = new Meet(meet.id, meet.location, meet.title, meet.image, meet.owner, meet.secret_code, meet.date_time)
      for(const comment of meet.comments){
        let c = new Comment(comment.id, comment.owner, comment.content, comment.meet_id)
        m.comments.push(c)
      }
      m.render();
    }
  })
}

function createMeet(obj){
  fetch(`${BASE_URL}/meets`,{
    method: "POST",
    headers: {
      "Accept" : "application/json",
    },
    body: obj
  })
  .then(meet => {
    if(meet.ok){
      return meet.json()
    } else {
      throw new Error("invalid information")
    }
  })
  .then(meet => {
    let m = new Meet(meet.id, meet.location, meet.title, meet.image, meet.owner, meet.secret_code, meet.date_time)
    m.render();
  })
  .catch(error=> console.error(error))

}

function createComment(obj){
  const body = {
    meet_id: obj.meetId,
    owner: obj.owner,
    content: obj.content
  }

  fetch(`${BASE_URL}/meets/${obj.meetId}/comments`,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Accept" : "application/json",
    },
    body: JSON.stringify(body)
  })
  .then(comment => {
    if(comment.ok){
      return comment.json()
    } else {
      throw new Error("invalid information")
    }
  })
  .then(comment => {
    let c = new Comment(comment.id, comment.owner, comment.content, comment.meet_id)
    const meet = document.getElementById(`meet${c.meetId}-comment`)
    meet.prepend(c.render())
  })
  .catch(error=> console.log(error))
}

// delete
function deleteMeet(obj){
  fetch(`${BASE_URL}/meets/${obj.id}`,{
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      "Accept" : "application/json",
    }
  })
  .then(meet => console.log(meet))
  .catch(error=> console.log(error))
}
