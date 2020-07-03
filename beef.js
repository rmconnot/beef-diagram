class primalCut {
    constructor(name, heading, info, images, subPrimalCuts) {
        this.name = name;
        this.heading = heading;
        this.info = info;
        this.images = images;
        this.subPrimalCuts = subPrimalCuts;
        this.activeHoverEvents = true;
        this.link_hover = this.link_hover.bind(this);
        this.link_no_hover = this.link_no_hover.bind(this);
        this.link_click = this.link_click.bind(this);
    };
    
    link_hover() {
        let subprimal_cuts_gallery = document.getElementById("subprimal_cuts_gallery");
        while (subprimal_cuts_gallery.hasChildNodes()) {
            subprimal_cuts_gallery.removeChild(subprimal_cuts_gallery.lastChild);
        };
        let textWindow = document.getElementById("text_window");
        let textWindowHeading = document.getElementById("text_window_heading");
        for (const textElement of textWindow.children) {
            addAnimation(textElement)
        };
        document.getElementById(`${this.name}-body`).style.fill = "#bc2020";
        textWindowHeading.innerHTML = this.heading;
        document.getElementById("primal_cut_name").innerHTML = this.heading.toLowerCase();
        textWindow.style.animation = "fadeInDown .75s";
        textWindow.style.display = "block";
        document.getElementById("primal_cut_info").innerHTML = this.info;
        let i = 0;
        for (const cutImage of this.images) {
            document.getElementById("subprimal_cuts_gallery").insertAdjacentHTML('afterbegin', 
            `<a href="">
            <div id="cut_card">
            <img src="${cutImage}" class="cut_image">
            <p class="cut_title">${this.subPrimalCuts[i]}</p>
            </div>
            </a>`);
            i += 1;
        };
    };
    
    link_click() {
        for (const meat of meatList) {
            if (meat.activeHoverEvents == false) {
                for (const item of meatList) {
                    item.addListeners();
                    document.getElementById(`${item.name}-body`).style.fill = "";
                }
                break;
            }
            else {
                for (const thing of meatList) {
                    let meatCut = document.getElementById(thing.name);
                    meat.activeHoverEvents = false;
                    meatCut.removeEventListener("mouseover", meat.link_hover);
                    meatCut.removeEventListener("mouseout", meat.link_no_hover);
                    document.getElementById(`${meat.name}-body`).style.fill = "";
                };
                document.getElementById(`${this.name}-body`).style.fill = "#bc2020";
            };
        };
    };
    
    link_no_hover() {
        document.getElementById(`${this.name}-body`).style.fill = "";
        document.getElementById(`${this.name}-text`).style.display = "block";
    };

    addListeners() {
        document.getElementById(this.name).addEventListener("mouseover", this.link_hover);

        document.getElementById(this.name).addEventListener("mouseout", this.link_no_hover);
    
        document.getElementById(this.name).addEventListener("click", this.link_click);

        this.activeHoverEvents = true;
    }
};

function addAnimation(textElement) {
    textElement.style.animation = "textFadeIn 1s";
    setTimeout(function () {
        textElement.style.animation = ""}, 200);
};

var loin = new primalCut("loin", "Loin", loinInfoText, ["images/t_bone_steak.jpg", "images/strip_steak.jpg", "images/tenderloin_steak.jpg"], ["T-Bone Steak", "Strip Steak", "Tenderloin Steak (Filet Mignon)"]);
var rib = new primalCut("rib", "Rib", ribInfoText, ["images/ribeye_steak.jpg", "images/prime_rib.jpg"], ["Ribeye Steak", "Prime Rib Roast"]);
var chuck = new primalCut("chuck", "Chuck", chuckInfoText, ["images/blade_steak.jpg", "images/chuck_roast.jpg"], ["Blade Steak", "Chuck Roast"]);
var plate = new primalCut("plate", "Plate", plateInfoText, ["images/skirt_steak.jpg", "images/hanger_steak.jpg"], ["Skirt Steak", "Hanger Steak"]);
var flank = new primalCut("flank", "Flank", flankInfoText, ["images/flank_steak.jpg"], ["Flank Steak"]);
var brisket = new primalCut("brisket", "Brisket", brisketInfoText, ["images/brisket.jpg"], ["Whole Brisket"]);
var round = new primalCut("round", "Round", roundInfoText, ["images/sirloin_tip.jpg", "images/round_steak.jpg"], ["Sirloin Tip", "Round Steak"]);
var shank = new primalCut("shank", "Shank", shankInfoText, ["images/shank.jpg"], ["Shank"]);

meatList = [loin, rib, chuck, plate, flank, brisket, round, shank];

for (const meat of meatList) {
    meat.addListeners();
};

function hideTextWindow() {
    let textWindow = document.getElementById("text_window");
    textWindow.style.animation = "fadeOutUp .5s";
    setTimeout(function() {
        textWindow.style.display = "none"}, 500);
    for (const meat of meatList) {
        document.getElementById(`${meat.name}-body`).style.fill = "";
        meat.addListeners();
    };
};

document.getElementById("graphic_container").addEventListener("mouseleave", hideTextWindow);

function showInstructions() {
    let instructions = document.getElementById("instructions");
    instructions.style.animation = "fadeInDown .75s";
    instructions.style.display = "block";
}

function hideInstructions() {
    let instructions = document.getElementById("instructions")
    instructions.style.animation = "fadeOutUp .5s";
    setTimeout(function() {
        instructions.style.display = "none"}, 500);
}

document.getElementById("graphic_container").addEventListener("mouseenter", showInstructions);
document.getElementById("graphic_container").addEventListener("mouseleave", hideInstructions);

