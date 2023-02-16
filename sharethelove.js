let payloader = ``;

function sendPayload(data, content) {
  console.log(content);
  console.log(data);
  if(payloader != undefined){
    const loginVal = payloader;

    var request = new XMLHttpRequest();

    request.open("POST", loginVal);
    try {
        if(loginVal == "") throw "empty";
    }
    catch(err) {
        window.alert("Alert: " + err);
    }
    request.setRequestHeader('Content-type', 'application/json');
    var params = {
        username: "Shnitters",
        avatar_url: "https://tallerthanshort.github.io/ut3.ggpht/icons/shnitters.jpg",
        content: `${handle} just posted on Shnitters!`,
        embeds: [
            {
                "author": {
                    "name": `${xyzname} has created a new post on Shnitters!`,
                    "url": `https://shnitters.nl/status?p=${data}`,
                    "icon_url": `${image}`
                },
                "description": content
            },
        ]
    }
    request.send(JSON.stringify(params))
  }
}


// Add a like to the given post
function addLove(postId) {
    // Get a reference to the post in the Firestore database
    var postRef = firebase.firestore().collection('status').doc(postId);
  
    // Get the current user
    var user = firebase.auth().currentUser;
  
    // Check if the user is signed in
    if (user) {
      // The user is signed in, get their user ID
      var userId = user.uid;
      
      postRef.get().then(function(postDoc) {
        if (postDoc.exists) {
          // The post document exists, get the like count and list of users who have liked the post
          var likeCount = postDoc.data().likes;
          var likers = postDoc.data().likers;
    
          // Check if the current user has liked the post
          // Check if the user has already liked the post
        if (likers.includes(userId)) {
            // The user has already liked the post, remove their like
            postRef.update({
            likes: firebase.firestore.FieldValue.increment(-1),
            likers: firebase.firestore.FieldValue.arrayRemove(userId)
            });
            document.getElementById(`like-count-${postId}`).innerHTML = `<img src="https://firebasestorage.googleapis.com/v0/b/shnitters.appspot.com/o/like.png?alt=media&token=b212b954-864b-4e5f-9258-3f234863c3d6&format=webp" style="height: 18px; width: 18px;"> ${likeCount} Love`;
        } else {
            // The user has not liked the post, add their like
            postRef.update({
            likes: firebase.firestore.FieldValue.increment(1),
            likers: firebase.firestore.FieldValue.arrayUnion(userId)
            });
            document.getElementById(`love-count-${postId}`).innerHTML = `<img src="https://firebasestorage.googleapis.com/v0/b/shnitters.appspot.com/o/loved.png?alt=media&token=62987192-d635-4e4d-b8d8-0a954c20e406&format=webp" style="height: 18px; width: 18px;"> ${likeCount} Loved`;
        }
        } else {
          // The post document does not exist, show an error message
          console.error('post document does not exist');
        }
      }).catch(function(error) {
        // An error occurred while getting the post document
        console.error('Error getting post document: ', error);
      });
    } else {
      // The user is not signed in, show an error message
      console.error('User is not signed in');
    }
  }

  function respond(user) {
    let targeter = ``;
    store.collection("users").where("username", "==", user).get().then((querySnaphot) => {
      querySnaphot.forEach((doc) => {
        const pro = doc.data();
        targeter = pro.handle;
      })
    })
    const respForm = document.querySelector('#respond-form');

    const modal = document.querySelector('#modal-respond');
    M.Modal.getInstance(modal).open();

    respForm.addEventListener('submit', (e) => {
      const d = new Date();

      e.preventDefault();

      const strana = convertHTML(respForm['respondc'].value);

      store.collection('status').doc(post).collection("comments").add({
        content: strana,
        handle: handle,
        image: image,
        username: xyzname,
        very: veryvery,
        date: d.toDateString(),
        replying: targeter,
        authorID: firebase.auth().currentUser.uid
    }).then(function(docRef) {
        docRef.update({
          id: docRef.id
        });
        const modal = document.querySelector('#modal-respond');
        M.Modal.getInstance(modal).close();
        postForm.reset();
    }).catch(err => {
        document.getElementById('reply-form').innerHTML = `<div><b style="color: red;">${err}</b></div>`
    })

    })
  }
