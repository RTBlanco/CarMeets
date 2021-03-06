class Comment {
  constructor(id, owner, content, meetId){
    this.id = id;
    this.owner = owner;
    this.content = content;
    this.meetId = meetId;
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

  static renderFormComment(){
    return `<form class="comment-form">
      <input type="text" name="owner" placeholder="name">
      <input type="textarea" name="content" placeholder="comment">
      <input style="display: none;" type="submit" value="submit">
    </from>`
  }
}