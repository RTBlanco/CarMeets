document.addEventListener('DOMContentLoaded', ()=> {
  const meetForm = document.getElementById('new-meet-form');

  meetForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(formData(e))
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
function createMeet(){

}

function createComment(){

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