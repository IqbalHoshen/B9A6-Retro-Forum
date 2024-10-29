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
        console.log(element);

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