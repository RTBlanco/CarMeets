class Meet {
  static all = [];
  constructor(id, location, title, image, owner, secretCode, dateTime){
    this.id = id;
    this.location = location;
    this.title = title;
    this.image = image;
    this.owner = owner;
    this.secretCode = secretCode; 
    this.dateTime = dateTime;
    this.comments = [];
    Meet.all.push(this)
  }

  // instance method 
  render(){
    // render the meet instance on the page 
    const meetsDiv = document.getElementById("all-meets");
    const meet = document.createElement('div');
    const commentDiv = document.createElement('div')
    const showBtn = document.createElement('button')

    meet.id = `meet${this.id}`;
    meet.classList.add("meet")
    meet.innerHTML = this._meetInfo();
    meetsDiv.prepend(meet)
    //comments  this could be made to a static method for comment object
    showBtn.innerText = "show comments"
    meet.appendChild(showBtn)

    commentDiv.id = `meet${this.id}-comment`
    commentDiv.classList.add('comment-section')
    commentDiv.classList.add('hide')
    meet.appendChild(commentDiv);

    this._showComments(commentDiv);
    // comments

  }

  _meetInfo(){
    return `<h1>${this.title}</h1>
    <button>delete</button>
    <input class="hide" type="text" placeholder="secret code">
    <ul>
      <li>location: ${this.location}</li>
      <li>Time and date: ${this.dateTime}</li>
      <li>image: ${this.image}</li>
      <li>Owner: ${this.Owner}</li>
    </ul>
    <form class='comment-form'>
      <input type='text' name="owner" placeholder="name">
      <input type="textarea" name="content" placeholder="comment">
      <input style="display: none;" type="submit" value="submit">
    </from>
    `
  }

  _showComments(div){
    for(const comment of this.comments){
      div.prepend(comment.render())
    }
  }

  get date(){
    // split the dateTime
  }

  get time(){
    // split the dateTime
  }

  static findByID(id){
    return Meet.all.find(m => m.id == id)
  }
}