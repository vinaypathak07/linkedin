console.log("JavaScript is ready to run");
let feedModalParentRef = document.getElementById("feed-modal-container");
let likeButtonRef = document.getElementById("likeBtn");
let reactionsPopupContainerRef = document.getElementById("reactions-popup-container");
let reactionsPopupRef = document.getElementById("reactions-popup");
let reactionListConotainer = document.getElementById("vanilla1345");
// reactionListConotainer?.addEventListener("scroll", onScroll)
let threshhold = 100;
let counter =  1;
let idMap = {
};
let callbackFuncMap = {};
let reactionData;
let emojiMap = ['laugh-smallIcon','appreciate-smallIcon','celebrate-smallIcon', 'empathy-smallIcon', 'like-smallIcon', 'interest-smallIcon'];

likeButtonRef?.addEventListener("mouseenter", displayReactionsPopover);
likeButtonRef?.addEventListener("mouseleave", closeReactionsPopover);

function onScroll() {
    let scrollTop = reactionListConotainer?.scrollTop;
    let scrollHeight = reactionListConotainer?.scrollHeight;
    let clientHeight = reactionListConotainer?.clientHeight;

    console.log(scrollHeight, scrollTop, clientHeight);

    if(scrollHeight && scrollTop && clientHeight && ((scrollHeight - scrollTop - clientHeight) <= threshhold)) {
        fetchReaction();
    }
}

function fetchReaction() {
    // console.log("Fetching...");
}

function onInit() {
    generateRandomNumber(500, 9999);
    fetchPosts();
}

function getReactionImageMapper(key) {
    return {
        "likes": "./assets/like.svg",
        "empathy": "./assets/empathy.svg",
        "interest":"./assets/interest.svg",
        "praise":"./assets/praise.svg",
        "funny":"./assets/funny.svg",
        "appreciation":"./assets/appreciation.svg",
        "like":"./assets/likeA.svg",
        "comment":"./assets/commentA.svg",
        "repost":"./assets/repostA.svg",
        "send":"./assets/sendA.svg"
    }[key];
}

function getSvgMapper(key) {
    return {
        "like": `<svg width="26" height="26" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.81742 18H14.3544V6.48L8.38305 0L7.54535 0.6975C7.45943 0.7725 7.39499 0.8775 7.35203 1.0125C7.30907 1.1475 7.28759 1.3125 7.28759 1.5075V1.7325L8.25418 6.48H1.83174C1.48807 6.48 1.18735 6.615 0.929592 6.885C0.671837 7.155 0.542959 7.47 0.542959 7.83V9.67138C0.542959 9.77879 0.532219 9.88875 0.510738 10.0013C0.48926 10.1138 0.5 10.2225 0.542959 10.3275L3.2494 16.8525C3.37653 17.1713 3.58843 17.4422 3.88509 17.6653C4.18174 17.8884 4.49252 18 4.81742 18ZM13.0656 16.65H4.53819L1.83174 9.9225V7.83H9.84367L8.70525 2.2275L13.0656 7.0425V16.65ZM14.3544 6.48V7.83H17.2112V16.65H14.3544V18H18.5V6.48H14.3544Z" fill="black" fill-opacity="0.6"></path>
                </svg>`,
        "comment":`<svg width="25" height="22" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 5.5H16.5V6.5H6.5V5.5ZM6.5 9.5H13.5V8.5H6.5V9.5ZM22.5 7.5C22.5148 8.59493 22.2643 9.67716 21.7697 10.6541C21.2751 11.6311 20.5512 12.4738 19.66 13.11L11.5 18.5V14.5H7.5C5.64348 14.5 3.86301 13.7625 2.55025 12.4497C1.2375 11.137 0.5 9.35652 0.5 7.5C0.5 5.64348 1.2375 3.86301 2.55025 2.55025C3.86301 1.2375 5.64348 0.5 7.5 0.5H15.5C17.3565 0.5 19.137 1.2375 20.4497 2.55025C21.7625 3.86301 22.5 5.64348 22.5 7.5ZM20.5 7.5C20.5 6.17392 19.9732 4.90215 19.0355 3.96447C18.0979 3.02678 16.8261 2.5 15.5 2.5H7.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5C2.5 8.82608 3.02678 10.0979 3.96447 11.0355C4.90215 11.9732 6.17392 12.5 7.5 12.5H13.5V14.78L18.5 11.5C19.1336 11.0463 19.6469 10.4448 19.9955 9.74774C20.344 9.05069 20.5172 8.27913 20.5 7.5Z" fill="black" fill-opacity="0.6"></path>
                </svg>`,
        "repost": `<svg width="25" height="25" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.49998 0.0999756C4.3031 0.0999756 2.49998 1.9031 2.49998 4.09998V11.2L1.34998 10.05L0.224976 11.1875L3.29998 14.2625L6.37498 11.1875L5.24998 10.0625L4.09998 11.2V4.09998C4.09998 2.77654 5.17654 1.69998 6.49998 1.69998H10.9V0.0999756H6.49998ZM13.7 2.73748L10.6125 5.82498L11.75 6.94998L12.9 5.79998V12.9C12.9 14.2234 11.8234 15.3 10.5 15.3H6.09998V16.9H10.5C12.6969 16.9 14.5 15.0968 14.5 12.9V5.79998L15.65 6.94998L16.775 5.81248L13.7 2.73748Z" fill="black" fill-opacity="0.6"></path>
                </svg>`,
        "send": `<svg width="26" height="26" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 0L0 5.66667L6.20095 9.11524L12.9524 4.04762L7.88476 10.799L11.3333 17L17 0Z" fill="black" fill-opacity="0.6"></path>
                </svg>	`
    }[key]
}

function generateRandomNumber(min,max) {
    let id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id;
}


async function fetchPosts() {
    try {
        let response = await fetch('linkedin.json');
        let responseJson = await response.json();
        setFeeds(responseJson?.feeds);
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}


async function fetchReactionCountData(idn) {
    try {
        let response = await fetch('reactions.json');
        // console.log("RESPONSE", response);
        let data = await response.json();
        // console.log("fetchReactionCountData",data);
        return data.reactions;
    } 
    catch(error) {
        console.log(error)
        throw error;    
    }
}


function mapClickCallbackEvents() {
    // console.log(callbackFuncMap);
    Object.keys(callbackFuncMap).forEach((key) => {
        // console.log("KEY", typeof(key));
        let callack = callbackFuncMap[key]["func"];
        let data = callbackFuncMap[key]["data"];
        let ele = document.getElementById(key);
        // console.log("ELEMENT",ele);
        ele?.addEventListener("click", function() {
            // console.log("hello");
            callack(data);
        })
    });
}


/**
 * Main driving function
 * @param {*} feedsList 
 */
 async function setFeeds(feedsList) {
     // document.addEventListener("DOMContentLoaded", function() {
         //  let div = document.createElement('div');
         for (const post of feedsList) {
            let postsListRef = document.getElementById('posts-list-container');
            let main,header,article;
            main = document.createElement('main');
            let classes = 'posts-list m-t-3'
            let classesArr = classes.split(" ");
            classesArr.forEach((addClass) => {
                main.classList.add(addClass);
            });
            header = createHeaderTemplate(post);
            article = await createArticleTemplate(post);
            if(header && article) {
                let combine = header + article;
                main.innerHTML = combine;
            }
            // div.appendChild(main);
            postsListRef?.appendChild(main);
            console.log(document.getElementById("vanilla1key4"));
         }
        // await feedsList.forEach(async (post) => {
        //     let postsListRef = document.getElementById('posts-list-container');
        //     let main,header,article;
        //     main = document.createElement('main');
        //     let classes = 'posts-list m-t-3'
        //     let classesArr = classes.split(" ");
        //     classesArr.forEach((addClass) => {
        //         main.classList.add(addClass);
        //     });
        //     header = createHeaderTemplate(post);
        //     article = await createArticleTemplate(post);
        //     if(header && article) {
        //         let combine = header + article;
        //         main.innerHTML = combine;
        //     }
        //     // div.appendChild(main);
        //     postsListRef?.appendChild(main);
        //     console.log(document.getElementById("vanilla1key4"));
        //     // console.log(postsListRef);
        // });
        console.log(this.callbackFuncMap);
        mapClickCallbackEvents();
    // console.log(postsListRef);
    // });
}

function getCounter() {
    return  counter++;
}



/**
 * 
 * @param {*} data 
 * @returns 
 */
function createHeaderTemplate(data) {
   let commenterName = data?.commenter?.profile?.title?.text || 'Got Error';
   let commenterTitle =  data?.commenter?.profile?.sub_title || 'Got Error';
   let commenterProfileImg = data?.commenter?.profile?.photo;
   let postTime =  getTimeForPostFromCurrentTime(data?.commentry?.created_at);
   let header = `<header class="d-flex ai-center">
            <img src="./assets/${commenterProfileImg}" width="48" heigth="48" style="border-radius: 50%;" />
            <div class="person-profile m-l-08">
                <p class="profile-name font-SSP-14 fw-600 color-000000">${commenterName}</p>
                <p class="profile-desig font-SSP-12 fw-600 color-00000099">${commenterTitle}</p>
                <p class="posts-time d-flex ai-center">
                    <span class="font-SSP-12 fw-600 color-00000099">${postTime} •</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="#8F8F8F" class="mercado-match" width="16" height="16" focusable="false">
                        <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
                        </svg> </span>
                </p>
            </div>
            </header>`;
    return header;
}



/**
 * 
 * @param {*} data 
 * @param {*} classes 
 * @returns 
 */
function getButtonForPostsReaction(data,callback, classes) {
    const button = document.createElement('button');
    // let id = getId(data.ele_id,'key4');
    let id = data.ele_id + 'key4';
    // console.log(id);
    button.id = id;
    callbackFuncMap[id]= {
        "func": callback,
        "data": data,
        "mapped": false,
    };
    let classesArr = classes?.split(" ");
    if(classesArr.length) {
        classesArr.forEach((addClass) => {
            button.classList.add(addClass);
        });
    }
    // console.log("Button",button)
    return button;
}


/**
 * 
 * @param {*} src 
 * @param {*} index 
 * @param {*} width 
 * @param {*} height 
 * @returns 
 */
function getImgEle(src, index, width, height) {
    const img = document.createElement('img');
    img.src = getReactionImageMapper(src.toLowerCase());
    img.width = width;
    img.height = height;
    if(index != 0) {
        img.style.margin = '0 0 0 -4px';
    }
    // console.log('Image Element', img);
    return img;
}

/**
 * 
 * @param {*} data 
 * @param {*} classes 
 * @returns 
 */
function getSpanEle(data, classes) {
    // return new Promise((resolve,reject)=> {
        let span = document.createElement('span');
        let classesArr = classes?.split(" ");
        if(classesArr.length) {
            classesArr.forEach((addClass) => {
                span.classList.add(addClass);
            });
        }
        // console.log(data);
        span.textContent = data ? data:'';
        // console.log("SPAN",span);
        // console.log("Span", span);
        // resolve(span);
        return span;
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
async function getReactionInfo(data) {
    const res = await fetchReactionCountData(0);
    // console.log("RESPONSE",res);
    let reactionCount = data?.commentry?.reaction_counts;
    let total = 0;
    if(Object.keys(reactionCount).length > 0) {
        total = Object.keys(reactionCount).reduce((acc,key)=>{
            return acc + reactionCount[key];
        },0)
    }
    // console.log("TOTAL",total);
    let content = "";
    if(res.length) {
        content = res[0].profile.text + (total>1 ? " and ": "") + (total>2 ? (total-1)+" "+"others" : total==0 ? '': 1+" "+"other");
    }
    return content;
}

/**
 * 
 * @param {*} data 
 * @param {*} callback 
 * @returns 
 */
async function getPostsReactionAction(data, callback) {
    // console.log("Get Button For Reaction Count On that Post!",data);
    let wrapper = getWrapperDivEle('');
    let btnElement = getButtonForPostsReaction(data,callback,'bare-button d-flex ai-center p-0');
    // console.log("BUTTON", btnElement);
    // btnElement.click();
    let countObj = data.commentry?.reaction_counts;
    if(Object.keys(countObj).length > 0) {
        Object.keys(countObj).forEach((key,index) => {
            if(countObj[key] > 0) {
                // console.log(key);
                let name = key?.split("_")[1];
                // console.log("Name", name);
                if(name !== 'comments' && name !== 'repost') {
                    let imgEle = getImgEle(name,index,18,18);
                    btnElement.appendChild(imgEle);
                }
            }
        });
    }
    let content = await getReactionInfo(data);

    // console.log("CONTENT",content);
    let spanEle = getSpanEle(content,'no-reactions link-underline font-SSP-12 color-00000099 m-l-1');
    // console.log(spanEle);
    btnElement.appendChild(spanEle);
    wrapper.append(btnElement);
    // console.log(wrapper);
    return wrapper;
}   

/**
 * 
 * @param {*} data 
 * @param {*} callback 
 * @returns 
 */
function getOpenCommentsLink(data, callback) {
    let wrapper = getWrapperDivEle('');
    let commentBtnEle = getButton(data, callback, 'bare-button p-0');
    if(data?.commentry?.reaction_counts?.num_comments > 0) {
        let content = data?.commentry?.reaction_counts?.num_comments + " " +  (data?.commentry?.reaction_counts?.num_comments > 1 ? "comments": "comment");
        let spanEle = getSpanEle(content,'comments link-underline font-SSP-12 color-00000099');
        commentBtnEle.appendChild(spanEle);
    }
    let dotSpan = getSpanEle('•','font-SSP-12 color-00000099 p-02');
    let repostBtnEle = getButton(data, callback, 'bare-button p-0');
    if(data?.commentry?.reaction_counts?.num_repost > 0) {
        let content = data?.commentry?.reaction_counts?.num_repost + " " +  (data?.commentry?.reaction_counts?.num_repost > 1 ? "reposts": "repost");
        let spanEle = getSpanEle(content,'reposts link-underline font-SSP-12 color-00000099');
        repostBtnEle.appendChild(spanEle);
    }
    wrapper.appendChild(commentBtnEle);
    wrapper.appendChild(dotSpan);
    wrapper.appendChild(repostBtnEle);
    return wrapper;
}


function onReactionClick() {

}

function onCommentsClick() {

}


/**
 * 
 * @param {*} data 
 * @param {*} callback 
 * @param {*} classes 
 * @returns 
 */
function getButton(data, callback, classes) {
    const button = document.createElement('button');
    // button.addEventListener("click", function(){
    //     callback(data);
    // });
    let classesArr = classes?.split(" ");
    if(classesArr.length) {
        classesArr.forEach((addClass) => {
            button.classList.add(addClass);
        })
    }
    // console.log('Button', button);
    return button;
}

/**
 * 
 * @param {*} classes 
 * @returns 
 */
function getWrapperDivEle(classes) {
    let wrapper = document.createElement('div');
    if(classes) {
        let classesArr = classes?.split(" ");
        if(classesArr.length) {
            classesArr.forEach((addClass) => {
                wrapper.classList.add(addClass);
            });
        }
    }
    return wrapper;
}


/**
 * 
 * @param {*} data 
 * @param {*} callback 
 * @returns 
 */
function getFooterForPost(data, callback) {
    let elements = ['Like','Comment', 'Repost', 'Send'];
    let wrapper =  getWrapperDivEle('d-flex jc-between p-t-05 p-t-05 p-b-0 p-b-0');
    elements?.forEach((ele) => {
        let buttonEle  = getButton(data, callback, 'bare-button button-hover d-flex jc-center ai-center br-4px p-t-07 p-r-4 p-b-07 p-l-4');
        // let svgIconSrc = getReactionImageMapper(ele.toLowerCase());
        // console.log(svgIconSrc);
        let img = getImgEle(ele,0, 25, 25);
        let spanEle = getSpanEle(ele, 'font-SSP-14 color-000000-60 fw-600 m-l-03');
        buttonEle.append(img);
        buttonEle.append(spanEle);
        wrapper.append(buttonEle);
    });
    // console.log("Footer wrpaper",wrapper);
    return wrapper;
}

async function createArticleTemplate(data) {
    let postTextContent = data?.commentry?.text;
    let articleImg = data?.commentry?.images;
    let getPostsReaction = (await getPostsReactionAction(data, openReactionsCountDetails)).outerHTML;
    let getCommentsLink = getOpenCommentsLink(data, onCommentsClick).outerHTML;
    let footer = getFooterForPost(data, onReactionClick).outerHTML;
    // console.log(getPostsReaction);
    // console.log("##################");
    // console.log(getCommentsLink);
    // console.log("###################");
    // console.log(footer);
    let article = `<article class="post-content m-t-1">
    <!-- Here the text will be truncated if the length of text is greater than certain limit -->
        <div class="pos-rel">
            <div id="${getId(data.ele_id,'key1')}" data-meta="${getCounter()}" class="not-seemore-btn">
                <p class="text-content font-SSP-14 lh-20px">
                    <span>
                        ${postTextContent}
                    </span>
                </p>
            </div>
            <!-- conditional rendering of see more button  -->
            <button id="${getId(data.ele_id,'key2')}" role="button" class="bare-button see-more-btn" onclick="onSeeMore(${getId(data.ele_id,'key1')},${getId(data.ele_id,'key2')})">
                <span class="font-SSP-14 color-8F8F8F link-underline">...see more</span>
            </button>
        </div>
    <!-- Image Will be conditionally rendered  -->
        <figure class="m-0 m-t-2">
            <img src="./assets/${articleImg}" loading="lazy" style="width:100%;height:100%"/>
        </figure>
    <!-- Reactions on the post  -->
    <!-- Based on the count of reactions of that emoji  -->
        <summary>
            <div id="${getId(data.ele_id,'key3')}" class="d-flex jc-between p-t-1 p-b-1 b-b-008">
                ${getPostsReaction}
                ${getCommentsLink}
            </div>
        </summary>
        <footer>
            ${footer}
        </footer>
    </article>`;
    // console.log("ARTICLE", article);
    return article;
}


/**
 * Generates random id for elements
 * @param {*} key 
 */
function getId(eleId,key) {
    let KEY = eleId+key;
    // console.log(KEY);
    if(idMap.hasOwnProperty(KEY)) {
        return idMap[KEY];
    }
    let id = generateRandomNumber(500, 9999);
    idMap[KEY] = id;
    return idMap[KEY];
}

/**
 * Return time elapsed from the current and time in params.
 * @param {*} timeInMilliSeconds 
 * @returns 
 */
function getTimeForPostFromCurrentTime(timeInMilliSeconds) {
    let currentTimeInMilliSeconds = Math.floor(Date.now()/1000)*1000;
    let unit = "";
    let timeElapsedInSeconds = Math.floor((currentTimeInMilliSeconds-timeInMilliSeconds)/1000);
    let timeElapsedInMinutes, timeElapsedInHours, timeElapsedInDays, timeElapsedInWeeks;
    if(timeElapsedInSeconds >= 60) {
        timeElapsedInMinutes = Math.floor(timeElapsedInSeconds/60);
        unit = "m";
    }
    if(timeElapsedInMinutes && timeElapsedInMinutes >= 60) {
        timeElapsedInHours = Math.floor(timeElapsedInMinutes/60);
        unit = "h"; 
    }
    if(timeElapsedInHours && timeElapsedInHours>=24) {
        timeElapsedInDays = Math.floor(timeElapsedInHours/24);
        unit = "d";
    }
    if(timeElapsedInDays && timeElapsedInDays >= 7) {
        timeElapsedInWeeks = Math.floor(timeElapsedInDays/7);
        unit = "w"
    }
    return (timeElapsedInDays || timeElapsedInHours || timeElapsedInMinutes || timeElapsedInSeconds) + unit;
}


function openFeedModal() {
    // console.log('Feed Modal Open');
    let feedModalRef = document.getElementById("feed-modal-container");
    // console.log(feedModalRef);
    if(feedModalRef) {
        feedModalRef.style.visibility = feedModalRef?.style?.visibility === 'visible'?'hidden':'visible';
    }
}

function closeFeedModal() {
    // console.log('Close Feed Modal');
    let feedModalRef = document.getElementById("feed-modal-container");
    if(feedModalRef) {
        feedModalRef.style.visibility = 'hidden';
    }
}

function openReactionsCountDetails(data) {
    console.log('Reaction Modal Open',data);
    let countReactionModalRef = document.getElementById("reactions-modal-container");
    // console.log(countReactionModalRef);
    if(countReactionModalRef) {
        countReactionModalRef.style.visibility = countReactionModalRef?.style?.visibility === 'visible'?'hidden':'visible';
    }
    initReactionPopover();
}

function closeReactionsCountDetails() {
    // console.log('Close Feed Modal');
    let countReactionModalRef = document.getElementById("reactions-modal-container");
    if(countReactionModalRef) {
        countReactionModalRef.style.visibility = 'hidden';
    }
}



function postFeed() {
    // console.log('Post Feed');
    let feedModalRef = document.getElementById("feed-modal-container");
    // console.log(feedModalRef);
    if(feedModalRef) {
        feedModalRef.style.visibility = 'hidden';
    }
}

function onSeeMore(id, btnId) {
    // console.log(id,btnId);
    // console.log("On see more!");
    let seeMoreContainerRef = document.getElementById(id);
    let seeMoreBtnRef = document.getElementById(btnId);

    if(seeMoreContainerRef) {
        seeMoreContainerRef.classList.add('content-see-more');
        seeMoreBtnRef?.classList.add('display-none');
    }
    // console.log('See More Button Click!');
}

function pullTextFromCommentEditor(event) {
    // console.log(event.srcElement.id);
    let id = event.srcElement.id;
    let commentTextContainerEle = document.getElementById(id);
    let btnId = id + '-btn';
    let postCmtBtnRef = document.getElementById(btnId);
    let text = commentTextContainerEle?.innerText;
    let idx=text?.indexOf('\n');
    // console.log('CHARACTER',text?.indexOf('\n'));
    // console.log("Inner Text", commentTextContainerEle?.innerText, text?.length);
    if(commentTextContainerEle) {
        const placeholder = commentTextContainerEle.getAttribute("data-placeholder");
        // let text = commentTextContainerEle?.firstElementChild?.innerHTML;
        // console.log("Text", text);
        if(text) {
            // text += 4;
            let len = text?.length;
            // console.log('LEN',len);
            // let length = text.trim().length - 4;
            // if (event.keyCode == 13) {
            //     // insert 2 br tags (if only one br tag is inserted the cursor won't go to the second line)
            //     document.execCommand('insertHTML', false, '<br><br>');
            //     // prevent the default behaviour of return key pressed
            //     return false;
            // }
            if(event.key == 'Backspace' && len<=1 && !idx && postCmtBtnRef) {
                // console.log("Backspace TRUE");
                postCmtBtnRef.style.display = 'none' ;
                commentTextContainerEle.setAttribute("data-placeholder","Add a comment...");
                commentTextContainerEle.classList.add("text-after");
                event.preventDefault();
                return;
            }
            if(len>0)  {
                commentTextContainerEle.setAttribute("data-placeholder","");
                if(postCmtBtnRef) {
                    postCmtBtnRef.style.display = 'inline-block';
                }
                commentTextContainerEle.classList.remove("text-after");
                return;
            }
        }
    }
    // console.log("Pull Text From Comment Editor Container!");

}

function pullTextFromReplyEditor(event) {
    let commentTextContainerEle = document.getElementById('comment-textContainer');
    let postCmtBtnRef = document.getElementById("post-cmt-btn-container");
    let text = commentTextContainerEle?.innerText;
    let idx=text?.indexOf('\n');
    // console.log('CHARACTER',text?.indexOf('\n'));
    // console.log("Inner Text", commentTextContainerEle?.innerText, text?.length);
    if(commentTextContainerEle) {
        const placeholder = commentTextContainerEle.getAttribute("data-placeholder");
        // let text = commentTextContainerEle?.firstElementChild?.innerHTML;
        // console.log("Text", text);
        if(text) {
            // text += 4;
            let len = text?.length;
            // console.log('LEN',len);
            // let length = text.trim().length - 4;
            // if (event.keyCode == 13) {
            //     // insert 2 br tags (if only one br tag is inserted the cursor won't go to the second line)
            //     document.execCommand('insertHTML', false, '<br><br>');
            //     // prevent the default behaviour of return key pressed
            //     return false;
            // }
            if(event.key == 'Backspace' && len<=1 && !idx && postCmtBtnRef) {
                // console.log("Backspace TRUE");
                postCmtBtnRef.style.display = 'none' ;
                commentTextContainerEle.setAttribute("data-placeholder","Add a comment...");
                commentTextContainerEle.classList.add("text-after");
                event.preventDefault();
                return;
            }
            if(len>0)  {
                // commentTextContainerEle.setAttribute("data-placeholder","");
                if(postCmtBtnRef) {
                    postCmtBtnRef.style.display = 'inline-block';
                }
                commentTextContainerEle.classList.remove("text-after");
                return;
            }
        }
    }
    // console.log("Pull Text From Comment Editor Container!");

}


// function fetchReactionCountData(idn) {
//     fetch('reactions.json')
//         .then(response => response.json())
//         .then(data => filterData(data.reactions,idn))
//         .catch(error => console.error(error));    

// }

function filterData(data,idn) {
    let filteredData;
    if(idn === 0) {
        filteredData = data;
    }
    if(idn !== 0) {
        filteredData = data.filter((ele) => ele.reaction_idn === idn);
    }
    // console.log("FILTERED DATA", filteredData);
    pushReactionListToModal(filteredData);
    return filteredData;
}

function pushReactionListToModal(data) {
    let listContainer = document.getElementById('vanilla1346-reactionList');
    if(listContainer) {
        listContainer.innerHTML = '';
    }
    // console.log(data);
    data.forEach((ele,index) => {
        let profileImgTemplate;
        if (ele?.profile?.image === 'profile_placeholder.jpeg') {
            profileImgTemplate = `<div class="reaction-list-noprofile">
            </div>`
        }

        if(ele?.profile?.image !== 'profile_placeholder.jpeg') {
            profileImgTemplate = `<div class="reaction-list-profile d-flex">
                     <img src="./assets/${ele?.profile?.image}" class="br-50" alt height="56" width="56" loading="lazy" />
            </div>`
        }

        const template = document.createElement('template');
        template.innerHTML =  `<li id="vanilla${1346+index}-count${index+1}" class="reaction-list-item list-item d-flex p-1">
            <div class="d-flex">
                <div class="pos-rel">
                    ${profileImgTemplate}
                    <img src="./assets/${emojiMap[ele?.reaction_idn]}.svg" width="16" height="16" class="reaction-icon-small br-50">
                </div>
                <div class="m-l-1 d-flex flex-column jc-center">
                    <p class="profile-name font-SSP-16 fw-600 color-000000E6">${ele?.profile?.text} <span class="font-SSP-14 fw-600 color-00000099"> ·&nbsp; ${ele?.connection_type} </span> </p>
                    <p class="profile-desig font-SSP-14 color-00000099"> ${ele?.profile?.sub_title} </p>
                </div>
            </div> 
        </li>`;
        
        listContainer?.append(template.content);
        listContainer?.children[0].classList.add('p-t-0');
    });
}


function initReactionPopover() {

    fetchReactionCountData(0);

    // console.log("Init Reaction Popover");
    let selectedTabId = "vanilla1344-count1";
    let tab = document.getElementById(selectedTabId);
    if(tab) {
        const isSelected = tab.getAttribute('aria-selected') === 'true';
        if(!isSelected) {
            // console.log(isSelected);
            tab.classList.add('active','reaction-tab--selected');
            tab.setAttribute('aria-selected', `${!isSelected}`);
        }
    }
}

function displayReactionsPopover() {
    // console.log('Reaction Modal Open');
    let reactionModalRef = document.getElementById("reactions-popup"); 
    if(reactionModalRef) {
        reactionModalRef.style.visibility = 'visible';
    //    reactionModalRef.classList.remove("reactions-popup");
    //    reactionModalRef.classList.add("reactions-popup--active");
    }
}

function closeReactionsPopover() {
    // console.log('Feed Modal Close');
    let reactionModalRef = document.getElementById("reactions-popup");
    if(reactionModalRef) {
        // setTimeout(()=> {
            // let reactionModalRef = document.getElementById("reactions-popup");
            reactionModalRef.style.visibility = 'hidden';
            // if(reactionModalRef) {
                // reactionModalRef.classList.remove("reactions-popup--active");
                // reactionModalRef.classList.add("reactions-popup");
            // }
        // },500)
    }
}



function loadMoreComments() {

}


function tabSelection(tabId) {
    let tab = document.getElementById(tabId);
    let parentElement = document.getElementById("vanilla1344-reactionsCount");
    let childNodes = parentElement?.children;

    if(childNodes) {
        for( let i=0; i< childNodes?.length; i++) {
            let ele = childNodes[i];
            if(ele && ele!=tab) {
                const isSelected = ele?.getAttribute('aria-selected') === 'true';
                if(isSelected) {
                    ele.classList.remove('active', 'reaction-tab--selected');
                    ele.setAttribute('aria-selected', `${!isSelected}`)
                }
            }
        }
    }

    if(tab) {
        const isSelected = tab.getAttribute('aria-selected') === 'true';
        if(!isSelected) {
            tab.classList.add('active','reaction-tab--selected');
            tab.setAttribute('aria-selected', `${!isSelected}`);
        }
    }
    // console.log("ID",+(tabId[tabId.length-1]-1));
    fetchReactionCountData(+(tabId[tabId.length-1]-1));
}

function openProfileViewers() {

}

onInit();

// init();
// openReactionsModal();

// function preventBackspace(event) {
//     let commentTextContainerEle = document.getElementById('comment-textContainer');
//     let text = commentTextContainerEle?.innerText;
//     // console.log(text?.indexOf('<br>'));
//     console.log("TEXT", text);
//     if(commentTextContainerEle) {
//         const placeholder = commentTextContainerEle.getAttribute("data-placeholder");
//         // let text = commentTextContainerEle?.firstElementChild?.innerHTML;
//         // console.log("Text", text);
//         if(text) {
//             let len = text?.length;
//             console.log("Length", len);
//             if(event.key == 'Backspace' && len<=0) {
//                 console.log("Backspace TRUE");
//                 commentTextContainerEle.setAttribute("data-placeholder","Add a comment...");
//                 commentTextContainerEle.classList.add("text-after");
//                 event.preventDefault();
//                 return false;
//             }
//             if(len>0)  {
//                 commentTextContainerEle.setAttribute("data-placeholder","");
//                 commentTextContainerEle.classList.remove("text-after");
//                 return true;
//             }
//         }
//     }
// }

// $('div[contenteditable=true]').keydown(function(e) {
//     // trap the return key being pressed
   
// });
// document.onclick = function(event) {
//     console.log('Document Click', event.target)
//     if(feedModalParentRef && feedModalParentRef.style.visibility == 'visible') {
//         let feedModalRef = document.getElementById("feedModalID");
//         let clickOutsideModal = false;
//         if(event && feedModalRef) {
//             clickOutsideModal = feedModalRef != event.target ? true: false;
//         }
//         console.log(clickOutsideModal);
//         if(clickOutsideModal && feedModalRef) {
//             feedModalRef.style.visibility = 'hidden';
//         }
//     }
    
// }



// likeButtonRef?.addEventListener("mouseout", closeReactionsPopover);
// likeButtonRef?.addEventListener("onfocus", displayReactionsPopover);
// likeButtonRef?.addEventListener("onblur", displayReactionsPopover);
// reactionsPopupContainerRef?.addEventListener("mouseenter", displayReactionsPopover);
// reactionsPopupContainerRef?.addEventListener("mouseleave", closeReactionsPopover);
// // reactionsPopupContainerRef?.addEventListener("onfocus", displayReactionsPopover);
// // reactionsPopupContainerRef?.addEventListener("onblur", displayReactionsPopover);
// reactionsPopupRef?.addEventListener("onfocus", displayReactionsPopover);
// reactionsPopupRef?.addEventListener("mouseleave", closeReactionsPopover);
// reactionsPopupContainerRef?.addEventListener("onfocus", displayReactionsPopover);
// reactionsPopupContainerRef?.addEventListener("onblur", displayReactionsPopover);