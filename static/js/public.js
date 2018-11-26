var publicModel = {

	data:{

	},
	fun:{
		 //转换时分秒
	    formatSeconds:function (value) { 
	    var secondTime = parseInt(value);// 秒
        var minuteTime = 0;// 分
        var hourTime = 0;// 小时

        if(secondTime >= 60) {
            minuteTime = parseInt(secondTime / 60);
            secondTime = parseInt(secondTime % 60);
            if(minuteTime >= 60) {
                hourTime = parseInt(minuteTime / 60);
                minuteTime = parseInt(minuteTime % 60);
            }
        }

        var result ='';

        if(secondTime < 10)  secondTime = "0" + secondTime;

        if(minuteTime < 10) minuteTime = "0" + minuteTime;

        if(hourTime < 10)   hourTime = "0" + hourTime;

        result =  hourTime+':'+minuteTime+':'+secondTime;


        return result;
	    },

		dynamicLoadJs:function(url, callback) {
		        var head = document.getElementsByTagName('head')[0];
		        var script = document.createElement('script');
		        script.type = 'text/javascript';
		        script.src = url;
		        if(typeof(callback)=='function'){
		            script.onload = script.onreadystatechange = function () {
		                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
		                    callback();
		                    script.onload = script.onreadystatechange = null;
		                }
		            };
		        }
		        head.appendChild(script);
		},

		dynamicLoadCss:function(url, callback) {
				var head = document.getElementsByTagName('head')[0];
		        var script = document.createElement('link');
		        script.type = 'text/css';
		        script.rel = 'stylesheet';
		        script.href = url;
		        if(typeof(callback)=='function'){
		            script.onload = script.onreadystatechange = function () {
		                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
		                    callback();
		                    script.onload = script.onreadystatechange = null;
		                }
		            };
		        }
		        head.insertBefore(script,document.getElementsByTagName('title')[0]);
		}		



	}


}