prediction1 = "";
prediction2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");
function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='capture_img' src='" + data_uri + "'/>";
    });
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/86NIkpx6k//model.json", model_loaded);

function model_loaded() {
    console.log("Model Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data_1 = "The first prediction is " + prediction1;
    var speak_data_2 = "and the second prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    var attach_img = document.getElementById("capture_img");
    classifier.classify(attach_img, got_result);
}

function got_result(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if (results[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128577;";
        }
        if (results[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
        if (results[1].label == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
        if (results[1].label == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128577;";
        }
        if (results[1].label == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }

    }
}