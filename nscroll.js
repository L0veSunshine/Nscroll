/**
 * @class Nscroll
 **/
class Nscroll {
    /**@constructor
     * @param {string} divname
     * @param {number} width
     * @param {number} fontsize
     **/
    constructor(divname, width, fontsize = 20) {
        this.ele = document.querySelector(divname);
        this.width = width;
        if (!this.ele) {
            throw Error("Don't find element.")
        }
        this.ele.style.overflowY = 'hidden';
        this.srollheight = parseInt(getComputedStyle(this.ele).height);
        if (this.srollheight < fontsize) {
            this.ele.style.height = fontsize + 'px';
            this.srollheight = fontsize
        }
        this.setWidth(width);
        this.originValue = 0;
    }

    /**
     * @description init
     * @param {number} width
     */
    setWidth(width) {
        let fragment = '';
        for (let i = 0; i < width; i++) {
            fragment += '<div class="num" style="float:left;height:100%;line-height:' + this.srollheight +
                'px;font-size:' + this.srollheight + 'px"><div>0</div></div>';
        }
        this.ele.innerHTML = fragment;
    }

    /**
     *
     * @param numStr
     */
    updateDiv(numStr) {
        let fragment = '';
        for (let i = 0; i < this.width; i++) {
            let x;
            if (i < this.width - numStr.length) {
                x = 0
            } else {
                x = numStr[i]
            }
            fragment += '<div class="num" style="float:left;height:100%;line-height:' + this.srollheight +
                'px;font-size:' + this.srollheight + 'px"><div>' + x + '</div></div>';
        }
        this.ele.innerHTML = fragment;
    }

    /**
     *@param {number} num
     */
    show(num) {
        let that = this;
        let numStr = num + '';
        if (numStr.length < that.width) {
            numStr = new Array(that.width - numStr.length + 1).join('0') + num
        } else if (numStr.length > that.width) {
            that.setWidth(numStr.length)
        }
        let elements = document.querySelectorAll('.num');
        let curValue = that.originValue;
        if (curValue === num) {
            return
        } else {
            that.rollUp = curValue < num;
        }
        let nums = new Array(that.width - (curValue + '').length + 1).join('0') + curValue;
        let maxTime = 0;
        elements.forEach((item, idx) => {
                let currentNum = parseInt(nums[idx]);
                let goalNum = parseInt(numStr[idx]);
                let gap = 0;
                let tranStr = '';
                if (currentNum === goalNum) {
                    tranStr = '<div>' + goalNum + '</div>';
                    gap = 0
                } else if (currentNum < goalNum) {
                    if (that.rollUp) {
                        gap = goalNum - currentNum;
                        for (let i = currentNum; i < goalNum + 1; i++) {
                            tranStr += '<div>' + i + '</div>'
                        }
                    } else {
                        gap = currentNum + 10 - goalNum;
                        for (let i = goalNum; i < 10; i++) {
                            tranStr += '<div>' + i + '</div>'
                        }
                        for (let i = 0; i < currentNum + 1; i++) {
                            tranStr += '<div>' + i + '</div>'
                        }
                    }
                } else if (currentNum > goalNum) {
                    if (that.rollUp) {
                        gap = 10 + goalNum - currentNum;
                        for (let j = currentNum; j < 10; j++) {
                            tranStr += '<div>' + j + '</div>'
                        }
                        for (let j = 0; j < goalNum + 1; j++) {
                            tranStr += '<div>' + j + '</div>'
                        }
                    } else {
                        gap = currentNum - goalNum;
                        for (let j = goalNum; j < currentNum + 1; j++) {
                            tranStr += '<div>' + j + '</div>'
                        }
                    }
                }
                let rollTime = that.getRandom();
                maxTime = Math.max(maxTime, rollTime);
                if (that.rollUp) {
                    this.initUp(item, tranStr);

                    function up() {
                        item.style.cssText += '-webkit-transition-duration:' + rollTime + 's;' +
                            '-webkit-transform:translateY(-' + that.srollheight * gap + 'px)';
                        item.style.cssText += '-webkit-transition-timing-function:ease-in-out';
                    }

                    setTimeout(up, 100);
                } else {
                    this.initDown(item, tranStr, gap);

                    function down() {
                        item.style.cssText += '-webkit-transition-duration:' + rollTime + 's;' +
                            '-webkit-transform:translateY(0)';
                        item.style.cssText += '-webkit-transition-timing-function:ease-in-out';
                    }

                    setTimeout(down, 100);
                }
            }
        );
        setTimeout(() => {
            that.updateDiv(numStr.toString())
        }, maxTime * 1000 + 100);
        that.originValue = num;
    }

    /**
     * @param item
     * @param {string} insertStr
     */
    initUp(item, insertStr) {
        item.style.cssText += '-webkit-transition-duration:0s;-webkit-transform:translateY(0)';
        item.innerHTML = insertStr;
    }

    /**
     * @param item
     * @param {string} insertStr
     * @param {number} gap
     */
    initDown(item, insertStr, gap) {
        let dis = gap * this.srollheight;
        item.style.cssText += '-webkit-transition-duration:0s;-webkit-transform:translateY(-' + dis + 'px)';
        item.innerHTML = insertStr;
    }

    /**
     * @return {number}
     */
    getRandom() {
        return (Math.floor(Math.random() * 5) + 11) / 10
    }
}