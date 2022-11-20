const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
let handle = ``
let image = ``
let xyzname = ``
let veryvery = ``


store.collection('status').get().then(snapshot => {
    liveReload(snapshot.docs);
});

const liveReload = (data) => {
    let html = ``;
    data.forEach(doc => {
        const rt = doc.data();
        const update = `
        <br>
        <div style="border: 3px solid; position: realative; right: 0;">
            <div style="position: relative; top: 6px; left: 10px; width: 100%;">
                <img src="${rt.image}" style="position: relative; top: 10px; left: 12px; width: 32px; height: 32px; border-radius: 50%;">
                <p onclick="location.href='/u/?u=${rt.handle}';" style="width: 10%; cursor: pointer; position: relative; top: -40px; left: 51px;">${rt.username}</p>
                <p onclick="location.href='/u/?u=${rt.handle}';" style="width: 10%; color: gray; font-size: 10px; position: relative; top: -49px; left: 52px; cursor: pointer;">@${rt.handle}</p>${rt.very}
                <p style="width: 8%; color: gray; position: relative; top: -90px; left: 78%;">${rt.date}</p>
            </div>
            ${rt.pin}
            <div style="position: relative;">
                <p style="width: 86.6%; cursor: default; position: relative; left: 10px;"><xmp>${rt.content}</xmp></p>
            </div>
        </div>
        `;
        html += update;
    });
    document.getElementById("feed").innerHTML = html;
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
