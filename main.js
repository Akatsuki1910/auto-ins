/*jshint esversion: 6 */
function loop(){
    try {
    this.name=$("input.inp").val();
    $.ajax('https://www.instagram.com/explore/tags/'+this.name+'/',
        {
        timeout: 2000,
        datatype: "html"
    }).then(function (data) {
        json_string = data.split(/window\._sharedData = (.*);<\/script>/g)[1].trim();
        this.Arrya_data = JSON.parse(json_string);
        let datas = this.Arrya_data.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;
        console.log(this.Arrya_data);
        $('.card-img').remove();
        $('.card-tex').remove();
        $("span.title").text(datas.length);
        $("span.time").text(getNow());
        for (var i in datas) {
            url = datas[i].node.display_url;
            tex = datas[i].node.edge_media_to_caption.edges[0].node.text;
            this.html = `<img src="${url}" class="card-img" style="width:200px; height:auto;"><p class="card-tex">`+tex+`</p>`;
            $(".insta-card").append(this.html);
        }
    },(error)=>{
        console.log(error);
    });
    } catch (error) {
        alert(error);
    }
}
setInterval(loop,5000);

function getNow() {
	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth()+1; //１を足すこと
	var day = now.getDate();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();

	//出力用
	var s = year + "年" + mon + "月" + day + "日" + hour + "時" + min + "分" + sec + "秒"; 
	return s;
}

function kou(){loop();}