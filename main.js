//先取得會操作到的元素
const locationNames = document.querySelectorAll(".location-name");
const parameterNames = document.querySelectorAll(".parameter-name");
const minTs = document.querySelectorAll(".minT");
const maxTs = document.querySelectorAll(".maxT");
const icons = document.querySelectorAll(".icon-area");
const weatherCards = document.querySelectorAll(".weather-card");
//以上都是NodeList，可使用forEach來遍歷

const times = document.getElementById("time");
const timeList = document.querySelectorAll("#time option");

let selectedTime = 0;//預設顯示time為0的資料

const locationIndexArr = [5, 4, 13, 11, 9, 6, 15, 17];
//台北市5 新竹市4 桃園市13 台中市11 雲林9 台南6 高雄15 屏東17

let PoPArr = [];//降雨機率
let CIArr = [];//舒適度

const fetchData = () => fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D152C3EB-4FD1-4CFB-9DFE-2211DA455FBE")
    .then(res => res.json())
    .then(data =>{
        console.log(data);

        //讓選單上的時間可以跟隨API變動
        data.records.location[0].weatherElement[0].time.forEach((timeDetail, index) =>{
            timeList[index].innerText = timeDetail.startTime;
        });


        //顯示八個縣市的名稱與天氣資料
        locationIndexArr.forEach((item, index) => {
            locationNames[index].innerText = data.records.location[item].locationName;

            PoPArr.push(`${data.records.location[item].weatherElement[1].time[selectedTime].parameter.parameterName}%`);

            CIArr.push(`${data.records.location[item].weatherElement[3].time[selectedTime].parameter.parameterName}`);

            //若天氣描述字數過多，則插入換行字元
            if(data.records.location[item].weatherElement[0].time[selectedTime].parameter.parameterName.length > 4){
                let wordBreak = data.records.location[item].weatherElement[0].time[selectedTime].parameter.parameterName;
                wordBreak = wordBreak.slice(0, 4) + "\n" + wordBreak.slice(4);
                parameterNames[index].innerText = wordBreak;
            }else{
                parameterNames[index].innerText = data.records.location[item].weatherElement[0].time[selectedTime].parameter.parameterName;
            }
            
            //根據不同描述顯示不同icon
            if(data.records.location[item].weatherElement[0].time[selectedTime].parameter.parameterName == "晴時多雲" ||
            data.records.location[item].weatherElement[0].time[selectedTime].parameter.parameterName == "多雲時晴"){
                icons[index].innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`
            }

            if(data.records.location[item].weatherElement[0].time[selectedTime].parameter.parameterName == "多雲"){
                icons[index].innerHTML = `<i class="fa-solid fa-cloud"></i>`
            }
            if(data.records.location[item].weatherElement[0].time[selectedTime].parameter.parameterName == "多雲午後短暫雷陣雨"){
                icons[index].innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`
            }
            if(data.records.location[item].weatherElement[0].time[selectedTime].parameter.parameterName == "多雲短暫陣雨"||
            data.records.location[item].weatherElement[0].time[selectedTime].parameter.parameterName == "多雲午後短暫陣雨"){
                icons[index].innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`
            }
            if(data.records.location[item].weatherElement[0].time[selectedTime].parameter.parameterName == "晴午後短暫雷陣雨"){
                icons[index].innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`
            }

            //顯示最低與最高溫度
            minTs[index].innerText = data.records.location[item].weatherElement[2].time[selectedTime].parameter.parameterName;

            maxTs[index].innerText = data.records.location[item].weatherElement[4].time[selectedTime].parameter.parameterName;
        });
    });

fetchData();
times.addEventListener("change", (e) => {
    //讓使用者每次選擇時段時都顯示相對應時段的資料

    //要先清空才能拿到新的資料
    PoPArr = [];//降雨機率
    CIArr = [];//舒適度
    selectedTime = Number(e.target.value);
    fetchData();
});


// const locationIndexArr = [5, 4, 13, 11, 9, 6, 15, 17];
//台北市5 新竹市4 桃園市13 台中市11 雲林9 台南6 高雄15 屏東17

weatherCards.forEach((card, index) =>{
    card.addEventListener("mouseenter", (e) =>{
        let info = document.createElement("div");
        let infoContent = document.createTextNode(`降雨機率：${PoPArr[index]}、舒適度：${CIArr[index]}`);
        info.className = "info-card";
        info.style.opacity = 0;
        info.appendChild(infoContent);
        card.appendChild(info);

        console.log("降雨機率為"+PoPArr[index]);
        console.log("舒適度為"+CIArr[index]);
    });
    card.addEventListener("mouseleave", (e) =>{
        const info = document.querySelector(".info-card");
        card.removeChild(info);
    });
});

/*parameterName種類：
晴天*要確認一下parameterName <i class="fa-solid fa-sun"></i>
晴時多雲
多雲時晴 <i class="fa-solid fa-cloud-sun"></i>
多雲 <i class="fa-solid fa-cloud"></i>
多雲午後暫時雷陣雨 <i class="fa-solid fa-cloud-bolt"></i>
多雲短暫陣雨 <i class="fa-solid fa-cloud-showers-heavy"></i>
晴午後短暫雷陣雨 <i class="fa-solid fa-cloud-sun-rain"></i>

*/


