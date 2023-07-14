//先取得會操作到的元素
const locationNames = document.querySelectorAll(".location-name");
const parameterNames = document.querySelectorAll(".parameter-name");
const minTs = document.querySelectorAll(".minT");
const maxTs = document.querySelectorAll(".maxT");
const icons = document.querySelectorAll(".icon-area");
//以上都是NodeList，可使用forEach來遍歷

// locationNames[0].innerText = "貓貓";

const locationIndexArr = [5, 4, 13, 11, 9, 6, 15, 17];
//台北市5 新竹市4 桃園市13 台中市11 雲林9 台南6 高雄15 屏東17

fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D152C3EB-4FD1-4CFB-9DFE-2211DA455FBE")
    .then(res => res.json())
    .then(data =>{
        console.log(data.records.location);
        // console.log(data.records.location[6].weatherElement);
        // console.log(data.records.location[6].weatherElement[2]);
        // console.log(`台南市明日早上6點過後最低氣溫：${data.records.location[6].weatherElement[2].time[2].parameter.parameterName}`);

        //先當成time都拿最新的index = 2
        //之後加一個選單可以選擇時間?
        locationIndexArr.forEach((item, index) => {
            locationNames[index].innerText = data.records.location[item].locationName;

            parameterNames[index].innerText = data.records.location[item].weatherElement[0].time[2].parameter.parameterName;

            if(data.records.location[item].weatherElement[0].time[2].parameter.parameterName == "晴時多雲" ||
            data.records.location[item].weatherElement[0].time[2].parameter.parameterName == "多雲時晴"){
                icons[index].innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`
            }

            if(data.records.location[item].weatherElement[0].time[2].parameter.parameterName == "多雲"){
                icons[index].innerHTML = `<i class="fa-solid fa-cloud"></i>`
            }



            minTs[index].innerText = data.records.location[item].weatherElement[2].time[2].parameter.parameterName;

            maxTs[index].innerText = data.records.location[item].weatherElement[4].time[2].parameter.parameterName;
        });
    });

//天氣icon從fontawesome找
/*parameterName種類：
晴天*要確認一下parameterName <i class="fa-solid fa-sun"></i>
晴時多雲
多雲時晴 <i class="fa-solid fa-cloud-sun"></i>
多雲 <i class="fa-solid fa-cloud"></i>
多雲午後暫時雷陣雨 <i class="fa-solid fa-cloud-bolt"></i>
多雲暫時陣雨 <i class="fa-solid fa-cloud-showers-heavy"></i>


*/
