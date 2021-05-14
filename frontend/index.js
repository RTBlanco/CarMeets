document.addEventListener('DOMContentLoaded', ()=> {
  const meetForm = document.getElementById('new-meet-form');
  const meetsDiv = document.getElementById('all-meets');

  meetsDiv.addEventListener('click', (e)=> {
    if(e.target.innerText === "delete" && e.target.tagName === "BUTTON"){
      showScrCode(e)
      if (hideActive(e)){
        const delInp = document.getElementById(e.target.parentNode.id).children[2]
        let meet = Meet.findByID(getIdNum(e))
        delInp.addEventListener('keypress', (del)=>{
          console.log('enter')
          if (del.key === "Enter"){
            if (delInp.value === meet.secretCode){
              meet.remove()
              deleteMeet(meet)
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

    console.log(e)
    console.log('comment =>',e.target.parentNode.id);
    const comment = { ...formInfo(e), meetId: getIdNum(e)}
    console.log(comment);
    createComment(comment);
  })
  
  meetForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const meetData = new FormData(e.target)
    console.log(meetData)
    createMeet(meetData);
  })

  fetchMeets();

});
const BASE_URL = 'http://localhost:3000'

function hideActive(e){
  const input = document.getElementById(e.target.parentNode.id).children[2];
  return !input.classList.contains('hide')
}

function showScrCode(e){
  const button = document.getElementById(e.target.parentNode.id).children[1]
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

function saveOwnerName(){
  // this will save the owner name in the cache 
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
  .then(meet => meet.json())
  .then(meet => {
    let m = new Meet(meet.id, meet.location, meet.title, meet.image, meet.owner, meet.secret_code, meet.date_time)
    m.render();
  })
  .catch(error=> console.log(error))

}

function createComment(obj){
  const body = {
    meet_id: obj.meetId,
    owner: obj.owner,
    content: obj.content
  }
  console.log(body)

  fetch(`${BASE_URL}/meets/${obj.meetId}/comments`,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Accept" : "application/json",
    },
    body: JSON.stringify(body)
  })
  .then(comment => comment.json())
  .then(comment => {
    let c = new Comment(comment.id, comment.owner, comment.content, comment.meet_id)
    const meet = document.getElementById(`meet${c.meetId}-comment`)
    meet.prepend(c.render())
  })
  .catch(error=> console.log(error))
}

// update 
function updateMeet(){

}

function updateComment(){

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

function deleteComment(){

}