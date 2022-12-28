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
            console.log(postId)
            document.getElementById(`like-count-${postId}`).innerHTML = `<img src="https://firebasestorage.googleapis.com/v0/b/shnitters.appspot.com/o/like.png?alt=media&token=b212b954-864b-4e5f-9258-3f234863c3d6&format=webp" style="height: 18px; width: 18px;"> ${likeCount} Love`;
        } else {
            // The user has not liked the post, add their like
            postRef.update({
            likes: firebase.firestore.FieldValue.increment(1),
            likers: firebase.firestore.FieldValue.arrayUnion(userId)
            });
            console.log(postId)
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
