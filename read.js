const loadCards = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const allPosts = data.posts;

    console.log(allPosts);
    displayCardDetails(allPosts);
}
loadCards();
const displayCardDetails = allPosts => {

    const cardcontainer = document.getElementById('allcardshow');

    allPosts.forEach(element => {
        console.log(element);
        const eachCard = document.createElement('div')
        eachCard.classList = `flex justify-start space-x-10 mb-8`;
        eachCard.innerHTML = `
        <div class="mb-4 w-3/5">
                <div class="flex justify-start space-x-10 bg-gray-300 p-8 rounded-2xl">
                    <div>
                        <div class="avatar online">
                            <div class="w-24 rounded-xl">
                                <img src="${element.image}" />
                            </div>
                        </div>
                    </div>

                    <div>
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

                                    <div>
                                        <img class="w-8" src="images/icons8-email-24.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="bg-gray-300 p-8 rounded-2xl w-2/5">
                <div class="flex justify-between items-center">
                    <h3 class="text-2xl font-bold">Title</h3>
                    <h4>Mark as read (4)</h4>
                </div>

                <div class="flex justify-between bg-white p-7 rounded-lg mt-5 mb-2">
                    <div>
                        <h3 class="font-semibold text-lg">10 Kids Unaware of Their Halloween Costume</h3>
                    </div>
                    <div>
                        <div class="flex justify-start items-center space-x-2">
                            <img class="w-6" src="images/icons8-view-16.png" alt="">
                            <p>250</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardcontainer.appendChild(eachCard);
    });
}

const searchingFild = () => {

}