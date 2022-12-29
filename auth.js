auth.onAuthStateChanged(user => {
    if(user) {
        store.collection('users').get().then(snapshot => {
            setupUI(user);
        })
    } else {
        setupUI();
    }
})

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
e.preventDefault();

const email = signupForm['signup-email'].value;
const password = signupForm['signup-password'].value;
const username = signupForm['signup-name'].value;

auth.createUserWithEmailAndPassword(email, password).then(cred => {
  return store.collection('users').doc(cred.user.uid).set({
    username: signupForm['signup-name'].value,
    pfp: 'https://tallerthanshort.github.io/ut3.ggpht/icons/shnitters.jpg',
    handle: `@${signupForm['signup-hash'].value}`,
    very: '<div style="display: none;"></div>',
  });
}).then(() => {
  //making people verify emails... maybe...
  firebase.auth().currentUser.sendEmailVerification();
  //ok, not quite there yet...
  const modal = document.querySelector('#modal-signup');
  M.Modal.getInstance(modal).close();
  signupForm.reset();
  setTimeout(function(){location.reload()}, 1900);
})
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
e.preventDefault();

const email = loginForm['login-email'].value;
const password = loginForm['login-password'].value;

auth.signInWithEmailAndPassword(email, password).then((cred) => {
  localStorage.setItem('login', Date.now())
  const modal = document.querySelector('#modal-login');
  M.Modal.getInstance(modal).close();
  loginForm.reset();
  setTimeout(function(){location.reload()}, 1000);
}).catch((error) => {
  document.getElementById("errtext").innerText = `${error}`
})
});

const postForm = document.querySelector('#create-form');
postForm.addEventListener('submit', (e) => {
    const d = new Date();
    /*  TO NOTE: I don't know the first thing about formatting Date obj in JS. This will show different times around the globe lmao.
        If you have a fix, please make a PR at https://codeberg.org/Common-Codes/Shnitters/pulls
    */
    e.preventDefault();

    // this changes raw HTML to it's respective HTML Entities before posting
    
    const strung = convertHTML(postForm['post'].value);

    store.collection('status').add({
        content: strung,
        handle: handle,
        image: image,
        username: xyzname,
        very: veryvery,
        date: d.toDateString(),
        timestamp: d.getTime(),
        authorID: firebase.auth().currentUser.uid
    }).then(function(docRef) {
      docRef.update({
        id: docRef.id
      });
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        postForm.reset();
    }).catch(err => {
        document.getElementById('create-form').innerHTML = `<div><b style="color: red;">${err}</b></div>`
    })
})

const replyForm = document.querySelector('#reply-form');
if(replyForm){
  replyForm.addEventListener('submit', (e) => {
      const d = new Date();
      /*  TO NOTE: as mentioned above, I don't know anything about formatting JS Dates.
          If you have a fix, please make a PR at https://codeberg.org/Common-Codes/Shnitters/pulls
      */
      e.preventDefault();
  
      // this changes raw HTML to it's respective HTML Entities before posting
      
      const strung = convertHTML(replyForm['replyc'].value);
  
      store.collection('status').doc(post).collection("comments").add({
          content: strung,
          handle: handle,
          image: image,
          username: xyzname,
          very: veryvery,
          date: d.toDateString(),
          replying: replito,
          authorID: firebase.auth().currentUser.uid
      }).then(function(docRef) {
          docRef.update({
            id: docRef.id
          });
          const modal = document.querySelector('#modal-reply');
          M.Modal.getInstance(modal).close();
          postForm.reset();
      }).catch(err => {
          document.getElementById('reply-form').innerHTML = `<div><b style="color: red;">${err}</b></div>`
      })
  })
} else {
  console.warn("no reply input")
}

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
e.preventDefault();
auth.signOut();
setTimeout(function(){location.reload()}, 700);
});

function convertHTML(str) {
  var HTML = ['&amp;', '&lt;', '&gt;', '&quot;', '&apos;'];
  // clone input string
  let result = str.slice(0);

  for(let i=0; i< str.length; i++) {
    if(str[i] == '&') {
      result = result.replace('&', HTML[0]);
    }
    if(str[i] == "<") {
      result = result.replace("<", HTML[1]);
    }
    if(str[i] == '>') {
      result = result.replace('>', HTML[2]);
    }
    if (str[i] == '"') {
      result = result.replace('"', HTML[3]);
    }
    if(str[i] == "'") {
      result = result.replace("'", HTML[4]);
    }
  }
  
  return result;
}
