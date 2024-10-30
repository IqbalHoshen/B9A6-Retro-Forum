const loadCards = async (categoryName) => {
    let res;
    if (!categoryName) {
        res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    }
    else {
        res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    }

    const data = await res.json();
    const allPosts = data.posts;
    console.log(allPosts);
    displayCardDetails(allPosts);

}
loadCards(false);

const searchingFild = () => {
    const cgNameId = document.getElementById('searchitems');
    const takeinput = cgNameId.value;
    cgNameId.value = '';
    loadCards(takeinput);

}

const displayCardDetails = allPosts => {

    if (allPosts.length == 0) {
        loadCards(false);
    }

    const cardcontainer = document.getElementById('allcardshow');
    cardcontainer.textContent = '';
    let activeor;
    allPosts.forEach(element => {

        if (element.isActive == true) {
            activeor = 'online';
        }
        else {
            activeor = 'offline';
        }

        const eachCard = document.createElement('div')
        eachCard.classList = `flex justify-start space-x-10 bg-gray-300 p-8 rounded-2xl mb-2`;
        eachCard.innerHTML = `
                    <div>
                        <div class="avatar ${activeor}">
                            <div class="w-24 rounded-xl">
                                <img src="${element.image}" />
                            </div>
                        </div>
                    </div>

                    <div class="w-full">
                        <div>
                            <div class="flex justify-start space-x-4 mb-4">
                                <p># ${element.category}</p>
                                <p>Author: ${element.author.name}</p>
                            </div>
                            <div>
                                <h3 class="font-semibold text-2xl mb-2">${element.title}</h3>
                                <p class="text-slate-400">${element.description}</p>
                                <hr class="border-dashed border-gray-500 my-4">

                                <div class="flex justify-between">

                                    <div class="flex justify-start space-x-4">

                                        <div class="flex justify-start items-center space-x-2 w-auto">
                                            <img class="w-6" src="images/icons8-comments-16.png" alt="">
                                            <p>${element.comment_count}</p>
                                        </div>
                                        <div class="flex justify-start items-center space-x-2">
                                            <img class="w-6" src="images/icons8-view-16.png" alt="">
                                            <p>${element.view_count}</p>
                                        </div>
                                        <div class="flex justify-start items-center space-x-2">
                                            <img class="w-6" src="images/icons8-time-16.png" alt="">
                                            <p>${element.posted_time} min</p>
                                        </div>
                                    </div>

                                    <div onclick="selectItems(${element.id})" class="btn btn-circle btn-outline">
                                        <img class="w-8" src="images/icons8-email-24.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                

        `;
        cardcontainer.appendChild(eachCard);
    });


}

const selectItems = async (cardId) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/post/${cardId}`)
    const data = await res.json();
    const eachCard = data;
    console.log(eachCard);
    selectCardAppend(eachCard);
}

let num = 0;

const selectCardAppend = (eachCard) => {
    num += 1; // Increment num by 1
    const count = document.getElementById('numberOfRead');
    count.innerText = `${num}`;

    const var1 = document.getElementById('selectCardItems');

    const var2 = document.createElement('div');
    var2.classList = `flex justify-between bg-white p-7 rounded-lg mt-5 mb-2`;
    var2.innerHTML = `
                        <div>
                            <h3 class="font-semibold text-lg">${eachCard.title}</h3>
                        </div>
                        <div>
                            <div class="flex justify-start items-center space-x-2">
                                <img class="w-6" src="images/icons8-view-16.png" alt="">
                                            <p>${eachCard.view_count}</p>
                            </div>
                        </div>
`;
    var1.appendChild(var2);
}

const LatestPosts = async () => {

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);

    const data = await res.json();
    const latesCard = data;
    LatestPostsApp(latesCard);
}
LatestPosts();
const LatestPostsApp = latesCard => {
    const latest1 = document.getElementById('LatestCardId');

    latesCard.forEach(eachLatestcard => {
        const latest3 = document.createElement('div');
        // latest3.classList = `h-full`;
        latest3.innerHTML = `
    <div class="card bg-base-100 w-96 shadow-xl border-2 border-gray-300 border-solid h-full">
                    <figure class="px-10 pt-10">
                        <img src="${eachLatestcard.cover_image}"
                            alt="image" class="rounded-xl" />
                    </figure>

                    <div class="card-body">
                        <!--schedule -->
                        <div class="flex justify-start gap-3 items-center">
                            <img class="w-6 h-6" src="images/icons8-schedule-16.png" alt="no" srcset="">
                            <p class="text-base">${eachLatestcard?.author?.posted_date || 'No publish date'}</p>
                        </div>
                        <p class="text-xl font-bold">${eachLatestcard.title}</p>
                        <p class="text-lg">${eachLatestcard.description}</p>

                        <div class="flex justify-start items-center gap-4">
                            <div class="avatar">
                                <div class="w-10 h-10 rounded-full">
                                    <img
                                        src="${eachLatestcard.profile_image}" />
                                </div>
                            </div>
                            <div>
                                <p class="text-base font-bold">${eachLatestcard?.author?.name || 'No author name'}</p>
                                <p class="text-sm">${eachLatestcard?.author?.designation || 'Unknown'}</p>
                            </div>
                        </div>
                    </div>

                </div>
    `;
        latest1.appendChild(latest3);

    })


}