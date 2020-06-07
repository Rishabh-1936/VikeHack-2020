
function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function traverse(items, loc) {
    let curlat = loc['curlat'];
    let curlng = loc['curlng'];
    var arr = [];

    items.forEach(ele => {
        arr.push({
            ele: ele,
            diff: distance(curlat, curlng, ele.user.location.lat, ele.user.location.lng)
        })
        arr.sort(function (a, b) {
            return a.diff - b.diff
        })

    });
    return arr;
}

function non_Auth_traverse(items) {

    var arr = [];

    items.forEach(ele => {
        arr.push({
            ele: ele,
        })
    });
    return arr;
}


// function traverse(items, userId) {

//     let location = {};
//     non_volunteerModel.findById(userId, "location", (err, loc) => {
//         location['curlat'] = loc.location['lat'];
//         location['curlng'] = loc.location.lng;
//         console.log('in', location)
//     })
//     // return location;
//     user_id(items, userId);
// }

// function user_id(items, userId) {

//     console.log('out');
//     // let curlat, curlng;
//     // non_volunteerModel.findById(userId, "location", (err, loc) => {
//     //     curlat = loc.location['lat'];
//     //     curlng = loc.location.lng;
//     //     console.log('in', curlng, curlat, loc)
//     // })
//     // console.log('out', )
//     let pointer = 0;
//     items.forEach(ele => {
//         console.log("pointer", pointer, ele.user.location.lat);

//         console.log("----------------------------");
//         console.log("+==============================================================");
//         ++pointer;
//     });
// }

// module.exports = traverse;

module.exports = { traverse, non_Auth_traverse }