// let p = new Promise((resolve, reject)=> {
//     let a = 1 + 1
//     if (a == 2) {
//         resolve("Success")
//     }
//     else {
//         reject("Failed")
//     }
// })


// p.then((message) => {
//     console.log("This is in the then " + message)
// }).catch((message)=> {
//     console.log("This is in the catch " + message);
    
// })


///////////////////////////////////////////
// const userLeft = true
// const userWatchingCatMeme = false

// function watchTutorialPromise() {
//     return new Promise((resolve, reject) => {
//         if (userLeft) {
//             reject({
//                 name: "User left",
//                 message: ":("
//             })
//         } else if (userWatchingCatMeme) {
//             reject({
//                 name: "User Watching Cat Meme",
//                 message: "WebDevSimplified < Cat"
//             })
//         } else {
//             resolve('Thumbs up and Subscribe')
//         }
//     })
// }


// watchTutorialPromise().then((message)=> {
//     console.log("Sucess", message);
// }).catch((error) => {
//     console.log(error.name + '' + error.message);
    
// })


/////////////////////////////
// const recordVideoOne = new Promise((resolve, reject) => {
//     resolve("Video 1 Recorded")
// })

// const recordVideoTwo = new Promise((resolve, reject) => {
//     resolve("Video 2 Recorded")
// })

// const recordVideoThree = new Promise((resolve, reject) => {
//     resolve("Video 3 Recorded")
// })

// Promise.race([
//     recordVideoOne,
//     recordVideoTwo,
//     recordVideoThree
// ]).then((message) => {
//     console.log(message);
    
// })


///////////////////////////////////////////////////////
function makeRequest(location) {
    return new Promise((resolve, reject) => {
        console.log(`Making request to ${location}`);
        if (location === "Google") {
            resolve("Google says hi")
        } else {
            reject("We can only talk to Google!")
        }
    })
}

function processRequest(response) {
    return new Promise((resolve, reject) => {
        console.log("Processing response");
        resolve(`Extra Information + ${response}`)
    })
}

// makeRequest('Google').then(response => {
//     console.log("Response received");
//     return processRequest(response)
// }).then(processedResponse => {
//     console.log(processedResponse);
// }).catch(err => {
//     console.log(err);
// })

async function doWork() {
    try {
    const response = await makeRequest("Google")
    console.log("Response Received");
    const processedResponse = await processRequest(response)
    console.log(processedResponse);
    } catch (err) {
        console.log(err);
    }

}
doWork()