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
                <p style="width: 86.6%; cursor: default; position: relative; left: 10px;">${rt.content}</p>
            </div>
        </div>
        `;
        html += update;
    });
    document.getElementById("feed").innerHTML = html;
}


document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });
