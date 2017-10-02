app.factory('unicornFactory', function ($http) {
    var uni = {
        list : [],
        tmp : {
                name : "",
                color: "",
                gender: "",
                age: "",
                show: false,
                mate: false
            },
        addUnicorn : function(name, color, gender, age) {
            if ((gender != "male" && gender != "female") || Number(age) < 18) {
                gender = "other";
            }
            if (!this.isHexaColor(color)) {
                color = "FFFFFF";
            }
            this.tmp = {
                name : name,
                color: color,
                gender: gender,
                age: age,
                show: false,
                mate: false
            };
            this.list.push(this.tmp);
            this.setUnicorn();
        },
        getUnicorn : function() {
            if (!localStorage.getItem("list")) {
                localStorage.setItem("list", "");
                localStorage.setItem("index", String(0));
                return;
            }
            var array = [];
            array = localStorage.getItem("list").split(";");
            var i = 0;
            while (i < array.length) {
                if (array[i] == i / 5) {
                    this.tmp = {
                        name : array[i+1],
                        color: array[i+2],
                        gender: array[i+3],
                        age: array[i+4],
                        show: false,
                        mate: false
                    };
                    this.list.push(this.tmp);
                    i += 5;
                } else {
                    i ++;
                }
            }
        },
        setUnicorn : function() {
            var j = 0;
            var s = "";
            if (localStorage.getItem("index")) {
                j = Number(localStorage.getItem("index"));
            } else {
                localStorage.setItem("list", "");
                localStorage.setItem("index", String(0));
            }
            s = j + ";" + this.list[this.list.length - 1].name + ";" + this.list[this.list.length - 1].color + ";" + this.list[this.list.length - 1].gender +
                ";" + this.list[this.list.length - 1].age + ";";
            j++;
            localStorage.setItem("list", localStorage.getItem("list") + s);
            localStorage.setItem("index", String(j));
        },
        showInfo : function(index) {
           this.list[index].show = !this.list[index].show;
        },
        showMate : function(index) {
           this.list[index].mate = !this.list[index].mate;
        },
        mate : function(parentIndex, index) {
           if ((this.list[parentIndex].gender == "male" && this.list[index].gender == "female") || (this.list[index].gender == "male" && this.list[parentIndex].gender == "female")) {
                this.addUnicorn((this.list[parentIndex].name + this.list[index].name).toString() ,parseInt(((Number(parseInt(this.list[parentIndex].color, 16)) + Number(parseInt(this.list[index].color, 16))) / 2),10).toString(16), "other", "0");
           }
        },
        isHexaColor : function (sNum){
          return (typeof sNum === "string") && sNum.length === 6 
                 && ! isNaN( parseInt(sNum, 16) );
        }
    };
    return uni;
});