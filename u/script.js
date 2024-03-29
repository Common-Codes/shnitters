const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const fragment = new URLSearchParams(window.location.search.slice(1));
const nuser = fragment.get('u');
let handle = ``
let image = ``
let xyzname = ``
let veryvery = ``

if(nuser != null){
    store.collection("users").where("handle", "==", nuser).get().then((querySnaphot) => {
        querySnaphot.forEach((doc) => {
            const pro = doc.data();
            document.title = `${pro.handle} | Shnitters`
            document.getElementById("profile").innerHTML += `
            <img src="${pro.pfp}" style="position: relative; top: 10px; left: 12px; width: 64px; height: 64px;">
            <b style="width: 50%; cursor: default; position: relative; top: -36px; left: 36px;">${pro.username}</b>
            <p style="width: 50%; color: gray; font-size: 10px; position: relative; top: -48px; left: 101px;">${pro.handle}</p>
            <p id="flowzer" style="width: 50%; color: gray; position relative; top: -48px; left: 101px;">${pro.followers} Followers</p>
            <button style="text-transform: uppercase; border: none; background-color: #c90076; color: white; width: 84px; height: 23px; font-weight: 550; cursor: pointer; position: relative; top: -93px; left: 69%;">follow</button>
            `
        })
    });

    store.collection("status").where("handle", "==", nuser).get().then((querySnaphot) => {
        querySnaphot.forEach((doc) => {
            const nob = doc.data();
            const statuses = `
            <br>
            <div style="border: 3px solid; position: realative; right: 0;">
                <div style="position: relative; top: 6px; left: 10px; width: 100%;">
                    <img src="${nob.image}" style="position: relative; top: 10px; left: 12px; width: 32px; height: 32px; border-radius: 50%;">
                    <p onclick="location.href='/u/?u=${nob.handle}';" style="width: 10%; cursor: pointer; position: relative; top: -40px; left: 51px;">${nob.username}</p>
                    <p onclick="location.href='/u/?u=${nob.handle}';" style="width: 10%; color: gray; font-size: 10px; position: relative; top: -49px; left: 52px; cursor: pointer;">${nob.handle}</p>${nob.very}
                    <p style="width: 8%; color: gray; position: relative; top: -90px; left: 78%;">${nob.date}</p>
                </div>
                <div style="position: relative;">
                    <pre style="width: 86.6%; cursor: default; position: relative; left: 10px;">${nob.content}</pre>
                </div>
                <div class="logged-in" style="position: relative; overflow: hidden;" id="fancy-icons">
                    <div style="float: left; display: block; text-align: center; padding: 14px; text-decoration: none; cursor: pointer;" onclick="location.href='/status/?p=${doc.id}';"><img src="https://firebasestorage.googleapis.com/v0/b/shnitters.appspot.com/o/reply.png?alt=media&token=5124acf4-60f7-4f53-bc6e-4803b534352d&format=webp" style="height: 18px; width: 18px;"> Reply</div>
                    <div style="float: left; display: block; text-align: center; padding: 14px; text-decoration: none; cursor: pointer;" onclick="location.href='/status/?p=${doc.id}';"><img src="https://firebasestorage.googleapis.com/v0/b/shnitters.appspot.com/o/like.png?alt=media&token=b212b954-864b-4e5f-9258-3f234863c3d6&format=webp" style="height: 18px; width: 18px;"> Love</div>
                    <div style="float: left; display: block; text-align: center; padding: 14px; text-decoration: none; cursor: pointer;" onclick="location.href='/status/?p=${doc.id}';"><img src="https://firebasestorage.googleapis.com/v0/b/shnitters.appspot.com/o/comment.png?alt=media&token=aef99c51-74c5-4482-9233-ce7524c3dfbc&format=webp" style="height: 18px; width: 18px;"> Conversation</div>
                </div>
            </div>
            `;

        document.getElementById("pistons").innerHTML += statuses;
        })
    });
}

const setupUI = (user) => {
    if(user){
        store.collection('users').doc(user.uid).get().then(doc => {
            handle = `${doc.data().handle}`;
            image = `${doc.data().pfp}`;
            xyzname = `${doc.data().username}`;
            veryvery = `${doc.data().very}`

            const html = `
                <div><img src="${doc.data().pfp}" title="Profile Image" style="height: 48px; width: 48px; border-radius: 50%;"></div>
                <div>Logged in as ${doc.data().username}</div>${doc.data().very}
                <div><p style="color: gray;">Email: ${user.email}</p></div>
            `;
            accountDetails.innerHTML = html;
        })
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        accountDetails.innerHTML = ''
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}


document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });