class Meet {
  static all = [];
  constructor(id, location, title, image, owner, secretCode, dateTime){
    this.id = id;
    this.location = location;
    this.title = title;
    this.image = image;
    this.owner = owner;
    this.secretCode = secretCode; 
    this.dateTime = new Date(dateTime);
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

  remove(){
    const meetDiv = document.getElementById(`meet${this.id}`)
    meetDiv.remove();
    Meet.delMeet(this)
  }

  _meetInfo(){
    return `<h1>${this.title}</h1>
    <button>delete</button>
    <input class="hide" type="text" placeholder="secret code">
    <img id="meet-image" src="${this.image}" alt="CarMeet">
    <ul>
      <li>location: ${this.location}</li>
      <li>Time and date: ${this.date} at ${this.time}</li>
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
    return this.dateTime.toDateString()
  }

  get time(){
    // split the dateTime
    let [hour, minute] = this.dateTime.toLocaleTimeString("en-US").split(/:| /)
    return `${hour}:${minute}`
  }

  static findByID(id){
    return Meet.all.find(m => m.id == id)
  }

  static delMeet(meet){
    let index = Meet.all.indexOf(meet)
    Meet.all.splice(index, 1)
  }
}