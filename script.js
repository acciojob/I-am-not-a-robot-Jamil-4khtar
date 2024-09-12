//your code here
let imageClasses = ["img1", "img2", "img3", "img4", "img5"];
let duplicate = imageClasses[Math.floor(Math.random() * imageClasses.length)];
// console.log(duplicate);
imageClasses.push(duplicate);
// console.log(imageClasses);

for (let i = imageClasses.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [imageClasses[i], imageClasses[j]] = [imageClasses[j], imageClasses[i]];
}

let selectedImages = [];

let cont = document.querySelector("main");
let h1 = document.createElement("h1");
h1.innerText = "I'm not a robot";
cont.prepend(h1);

imageClasses.forEach((imgclass, i) => {
    let img = document.createElement("img");
    img.className = imgclass;
    img.id = "img" + i;
    img.addEventListener("click", onImgClick);
    cont.append(img);
});

let h3 = document.createElement("h3");
h3.id = "h";
h3.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";
cont.append(h3);

let s_img = document.querySelectorAll("img");

function onImgClick(event) {
    if (selectedImages.includes(event.target.id)) {
        return;
    }
    selectedImages.push(event.target.id);
    event.target.classList.add("selected");
    // console.log(selectedImages);
    let r_btn = document.createElement("button");
    if (selectedImages.length == 1 || (selectedImages == 2 && !r_btn)) {
        r_btn.innerHTML = "RESET";
        // console.log(r_btn);
        r_btn.id = "reset";
        cont.append(r_btn);
        r_btn.addEventListener("click", (e) => {
            e.preventDefault();
            // location.reload();
            selectedImages = [];
            let selected = document.querySelectorAll(".selected");
            selected.forEach((t) => t.classList.remove("selected"));
            let v_btn = document.getElementById("verify");
            if (v_btn) {
                v_btn.remove();
            }
            r_btn.remove();
            let p1 = document.getElementById("para");
            let p2 = document.getElementById("para2");
            if (p1) {
                p1.remove();
            }
            if (p2) {
                p2.remove();
            }
        });
    }

    let v_btn = document.getElementById("verify");
    if (selectedImages.length == 2 && !v_btn) {
        v_btn = document.createElement("button");
        v_btn.innerHTML = "VERIFY";
        v_btn.id = "verify";
        cont.append(v_btn);
        v_btn.addEventListener("click", (e) => {
            e.preventDefault();
            let img1 = document.getElementById(selectedImages[0]);
            let img2 = document.getElementById(selectedImages[1]);
            if (img1.className == img2.className) {
                // alert("Images match!");
                let p1 = document.getElementById("para");
                if (!p1) {
                    let p = document.createElement("p")
                    p.id = "para"
                    p.innerHTML = "You are a human. Congratulations!";
                    cont.append(p);
                }
            } else {
                // alert("Images do not match. Please try again.");
                let p2 = document.getElementById("para2");
                if (!p2) {
                    let p = document.createElement("p");
                    p.id = "para2";
                    p.innerHTML = "We can't verify you as a human. You selected the non-identical tiles."
                    cont.append(p);
                }
            }
            v_btn.remove();
        });
    } else if (selectedImages.length > 2 && v_btn) {
        v_btn.remove();
    }
}