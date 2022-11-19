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
    handle: signupForm['signup-hash'].value,
    very: '<div style="diaply: none;"></div>',
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
    store.collection('status').add({
        content: postForm['post'].value,
        handle: handle,
        image: image,
        username: xyzname,
        very: veryvery,
        pin: '<div style="display: none;">Yes. Seriously.</div>',
        date: d.toDateString()
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        postForm.reset();
    }).catch(err => {
        document.getElementById('create-form').innerHTML = `<div><b style="color: red;">${err}</b></div>`
    })
})

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
e.preventDefault();
auth.signOut();
setTimeout(function(){location.reload()}, 700);
});