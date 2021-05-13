document.addEventListener('DOMContentLoaded', ()=> {
  const meetForm = document.getElementById('new-meet-form');
  const meetsDiv = document.getElementById('all-meets');

  meetsDiv.addEventListener('click', (e)=> {
    if(e.target.innerText === "edit" && e.target.tagName === "BUTTON"){
      console.log('edit =>',e.target.parentNode.id);
      // this is for the edit button
    } else if (e.target.innerText === "show comments" && e.target.tagName === "BUTTON"){
      testShowComments(e)
    }
  })

  meetsDiv.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log('comment =>',e.target.parentNode.id);
    const comment = { ...formData(e), meetId: getIdNum(e)}
    console.log(comment);
    createComment(comment);
  })
  
  meetForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(formData(e))
    // create new meet
    createMeet(formData(e));
  })

  fetchMeets();

});
const BASE_URL = 'http://localhost:3000'

function formData(e){
  const formData = {};
    for(const i of e.target){
      if (i.name != ''){
        formData[i.name] = i.value
      }
    }
  return formData
}

function getIdNum(e){
  return e.target.parentNode.id.slice(4)
}

function saveOwnerName(){
  // this will save the owner name in the cache 
}

function testShowComments(e){
  console.log('running')
  const comments = document.getElementById(`${e.target.parentNode.id}-comment`)
  if (comments.classList.contains('show')){
    comments.classList.remove('show')
  } else {
    comments.classList.add('show')
  }
}
// Read 

function fetchMeets(){
  // this gets the meets 
  fetch(`${BASE_URL}/meets`)
  .then(resp => resp.json())
  .then(meets => {
    for( const meet of meets){
      // console.log('rails', meet );
      let m = new Meet(meet.id, meet.location, meet.title, meet.image, meet.owner, meet.secret_cdode, meet.date_time)
      for(const comment of meet.comments){
        let c = new Comment(comment.id, comment.owner, comment.content, comment.meet_id)
        m.comments.push(c)
        // console.log(c)
      }
      // console.log(m)
      m.render();
    }
  })
}

// create 
function createMeet(obj){
  const body = {
    location: obj.location,
    title: obj.title,
    image: obj.image,
    owner: obj.owner,
    secret_code: obj.secretCode,
    date_time: obj.dateTime
  }
  console.log(body)

  fetch(`${BASE_URL}/meets`,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Accept" : "application/json",
    },
    body: JSON.stringify(body)
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
    console.log(c);
  })
  .catch(error=> console.log(error))
}

// update 
function updateMeet(){

}

function updateComment(){

}

// delete
function deleteMeet(){

}

function deleteeComment(){

}