const nbranks = 5;

const nbStudentsPerRank = [
    7,
    8,
    8,
    8,
    4
];

// Make sure the sum is equal to student's number

function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + ";charset=utf-8," + strData;


    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */



    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
}

Array.prototype.shuffle = function() {
    var j, x, i;
    for (i = this.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this[i];
        this[i] = this[j];
        this[j] = x;
    }
}

Array.prototype.swap = function(x, y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}

Array.prototype.returnPresentation = function(varName) {
    var str = "var " + varName + " = [\n"
    for (let i = 0; i < this.length; i++) {
        str += "    '" + this[i] + "',\n";
        console.log(this[i]);
    }
    str += "];"
    return str;
}

function generate() {
    $("#class").html("");
    $("#class").append("<div id='prof'>Professeur</div><br/>");
    var z = 0;
    for (let i = 0; i < nbranks; i++) {
        for (let j = 0; j < nbStudentsPerRank[i]; j++) {
            if (j % 2 == 0) { //si élève de gauche
                $("#class").append("<div class='student left'>" + student_list[z] + "</div>");
            } else { //si élève de droite
                $("#class").append("<div class='student right'>" + student_list[z] + "</div>");
            }
            z++;
        }
        $("#class").append("<br/>");
    }
}
generate();

$("#rand").on("click", e => { student_list.shuffle(), generate() });

var currentStudent = null;
$(".student").on("click", function(e) {
    if (currentStudent == null) {
        currentStudent = $(this);
        $("#currentStudent").text(currentStudent.text());
    } else {
        a = $(this).text();
        student_list.swap(student_list.indexOf($(this).text()), student_list.indexOf(currentStudent.text()));
        $(this).text(currentStudent.text());
        currentStudent.text(a);
        currentStudent = null;
        $("#currentStudent").text("Aucun");
    }
});

$("body").on("contextmenu", e => {
    e.preventDefault();
    $("#currentStudent").text("Aucun");
    currentStudent = null;
});

$("#dl").on("click", e => {
    download(student_list.returnPresentation("student_list"), "LIST.js", "text/plain");
})