
var formatNumber = function(a, n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return a.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
var formatDollar = function(n) {
    return formatNumber(n, 0);//n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
var formatKrw = function(n) {
    return formatNumber(n, 0);
}

var insertHeader = function() {
    let headers = document.querySelector("#gamesbygenre > thead > tr");
    let totalIncomeHeader = document.createElement("th");

    totalIncomeHeader.width = "100px";
    totalIncomeHeader.style="width=100px";
    totalIncomeHeader.innerHTML = "Total Earning";
    headers.appendChild(totalIncomeHeader);
}
var updateTable = function() {    
    let items = document.querySelector("#gamesbygenre > tbody");

    for (let i=0;i<items.children.length;i++){
        let item = items.children[i];
        
        if (item.children[item.children.length - 1].id == "steamspyex_earn_td")
            return;

        let totalIncome = document.createElement("td");
        
        let price = item.children[3].innerText;
        let owners = item.children[5].innerText;

        let approx = owners.split(" ±")[0];
        let t = owners.split(" ±")[1];

        if (price == "Free") {
            totalIncome.innerHTML = "$0";
        }
        else {
            approx = approx.replace(/,/g, "");
            price = price.substr(1);

            let finalApproxDollar = approx * price;
            let finalApproxKrw = finalApproxDollar * 1200;

            totalIncome.innerHTML = "$" + formatDollar(finalApproxDollar) + "<br>" + formatKrw(finalApproxKrw) + "원";
        }

        totalIncome.style.textAlign="right";
        totalIncome.id = "steamspyex_earn_td";
        item.appendChild(totalIncome);
    }
}

insertHeader();
setInterval(function() {
    updateTable();
}, 1000);
