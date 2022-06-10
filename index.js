
const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchQuote = form.elements.query.value.toUpperCase();


    const res = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchQuote}&apikey=6OFO4ANZJ1BKAUD0#`
    );
    console.log(res.data);

    const ar1 = [
        ["#shortName", "01. symbol", emptyf],
        ["#last-price", "05. price", convertFLoat],
        ["#change", "09. change", addSignAndColorChange],
        ["#change-percent", "10. change percent", addSignAndColorChangePercent],
        ["#timestamp", "07. latest trading day", emptyf],
        ["#low", "04. low", convertFLoat],
        ["#high", "03. high", convertFLoat],
        ["#open", "02. open", convertFLoat],
        ["#volume", "06. volume", convertMM]
    ];
    if (searchQuote == res.data["Global Quote"]["01. symbol"]) {
        for (let el1 of ar1) {
            document.querySelector(el1[0]).innerHTML = el1[2](
                res.data["Global Quote"][el1[1]]
            );
        }
    } else {
        alert("Invalid symbol entered!");
    }
});

function addSignAndColorChange(val1) {
    if (val1.charAt(0) === "-") {
        document.querySelector("#change").classList.add("red");
        return convertFLoat(val1);
    } else {
        document.querySelector("#change").classList.add("green");
        return "+" + convertFLoat(val1);
    }
}

function addSignAndColorChangePercent(val1) {
    if (val1.charAt(0) === "-") {
        document.querySelector(".change-percent").classList.add("red");
        return val1.slice(0, -3) + "%";
    } else {
        document.querySelector(".change-percent").classList.add("green");
        return "+" + (val1).slice(0, -3) + "%";
    }
}

function convertFLoat(val1) {
    return val1.slice(0, -2);
}
function emptyf(val1) {
    return val1;
}
function convertMM(val1) {
    return Math.round(val1 / 10 ** 4) / 100;
}
