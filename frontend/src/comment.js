class Comment {
  constructor(id, owner, content, meetId){
    this.id = id;
    this.owner = owner;
    this.content = content;
    this.meedId = meetId;
  }

  render(){
    const comment = document.createElement('div')
    comment.classList.add('comment')
    comment.innerHTML =
    `${this.owner}
    <ul>
      <li>${this.content}</li>
    </ul>`
    
    return comment
  }
}