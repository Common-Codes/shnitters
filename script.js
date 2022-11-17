store.collection('status').get().then(snapshot => {
    liveReload(snapshot.docs);
});

const liveReload = (data) => {
    let html = ``;
    data.forEach(doc => {
        const rt = doc.data();
        const update = `
        <br>
        <div style="border: 3px solid; position: realative; left: 0;">
            <div style="position: relative; top: 6px; left: 10px; width: 100%;">
                <img src="${rt.image}" style="position: relative; top: 10px; left: 12px; width: 32px; height: 32px;">
                <p onclick="location.href='/u/?u=${rt.handle}';" style="width: 50%; cursor: pointer; position: relative; top: -40px; left: 50px;">${rt.username}</p>
                <p onclick="location.href='/u/?u=${rt.handle}';" style="width: 50%; color: gray; font-size: 10px; position: relative; top: -49px; left: 52px; cursor: pointer;">@${rt.handle}</p>
            </div>
            <div style="position: relative;">
                <p style="width: 60%; cursor: default; position: relative; left: 10px;">${rt.content}</p>
            </div>
        </div>
        `;
        html += update;
    });
    document.getElementById("feed").innerHTML = html;
}

