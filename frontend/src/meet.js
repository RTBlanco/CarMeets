class Meet {
  constructor(id, location, title, image, owner, secretCode, dateTime){
    this.id = id;
    this.location = location;
    this.title = title;
    this.image = image;
    this.owner = owner;
    this.secretCode = secretCode; 
    this.dateTime = dateTime;
    this.comments = [];
  }

  // instance method 
  render(){
    // render the meet instance on the page 
    const meetsDiv = document.getElementById("all-meets");
    const meet = document.createElement('div');

    meet.id = `meet${this.id}`;
    meet.classList.add("meet")
    meet.innerHTML = this._meetInfo();
    // `<h1>${this.title}</h1>
    // <button>edit</button>
    // <ul>
    //   <li>location: ${this.location}</li>
    //   <li>Time and date: ${this.dateTime}</li>
    //   <li>image: ${this.image}</li>
    //   <li>Owner: ${this.Owner}</li>
    // </ul>
    // <form>
    //   <input type="textarea" placeholder="comment">
    // </from>
    // `
    meetsDiv.appendChild(meet)

  }

  _meetInfo(){
    return `<h1>${this.title}</h1>
    <button>edit</button>
    <ul>
      <li>location: ${this.location}</li>
      <li>Time and date: ${this.dateTime}</li>
      <li>image: ${this.image}</li>
      <li>Owner: ${this.Owner}</li>
    </ul>
    <form>
      <input type="textarea" placeholder="comment">
    </from>
    `
  }

  get date(){
    // split the dateTime
  }

  get time(){
    // split the dateTime
  }
}