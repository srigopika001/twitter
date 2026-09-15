/* =====================================================
   VIBEBLOG - WORKING MICRO BLOGGING APPLICATION
===================================================== */


/* =====================================================
   DATABASE
===================================================== */

let users =
    JSON.parse(
        localStorage.getItem("vibeUsers")
    ) || [];


let posts =
    JSON.parse(
        localStorage.getItem("vibePosts")
    ) || [];


let currentUser =
    localStorage.getItem(
        "vibeCurrentUser"
    );


let selectedImage = "";

let activeView = "home";



/* =====================================================
   DEFAULT USERS
===================================================== */

function createDefaultUsers() {

    if (users.length > 0) {
        return;
    }


    users = [

        {
            id: 1,

            name: "Ananya Sharma",

            username: "ananya",

            password: "1234",

            bio:
                "Designer • Creator • Dreamer ✨",

            avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",

            followers: [],

            following: []

        },


        {
            id: 2,

            name: "Arjun Kumar",

            username: "arjun",

            password: "1234",

            bio:
                "Developer & Coffee Lover ☕",

            avatar:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",

            followers: [],

            following: []

        },


        {
            id: 3,

            name: "Meera Raj",

            username: "meera",

            password: "1234",

            bio:
                "Learning something new every day 💻",

            avatar:
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",

            followers: [],

            following: []

        }

    ];


    saveUsers();

}



/* =====================================================
   INITIALIZATION
===================================================== */

createDefaultUsers();

checkLogin();



function checkLogin() {

    if (currentUser) {

        showApp();

    }

    else {

        showAuth();

    }

}



/* =====================================================
   STORAGE
===================================================== */

function saveUsers() {

    localStorage.setItem(
        "vibeUsers",
        JSON.stringify(users)
    );

}


function savePosts() {

    localStorage.setItem(
        "vibePosts",
        JSON.stringify(posts)
    );

}



/* =====================================================
   AUTH PAGE
===================================================== */

function showAuth() {

    document
        .getElementById("authPage")
        .classList
        .remove("hidden");


    document
        .getElementById("app")
        .classList
        .add("hidden");

}



function showApp() {

    document
        .getElementById("authPage")
        .classList
        .add("hidden");


    document
        .getElementById("app")
        .classList
        .remove("hidden");


    updateProfile();

    renderPosts();

    renderSuggestions();

}



/* =====================================================
   LOGIN
===================================================== */

function login() {

    const username =
        document
            .getElementById(
                "loginUsername"
            )
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById(
                "loginPassword"
            )
            .value;


    const user =
        users.find(
            u =>
                u.username === username &&
                u.password === password
        );


    if (!user) {

        showToast(
            "Invalid username or password ❌"
        );

        return;

    }


    currentUser = user.id;


    localStorage.setItem(
        "vibeCurrentUser",
        currentUser
    );


    showToast(
        "Login successful! 🎉"
    );


    setTimeout(
        () => {

            showApp();

        },
        500
    );

}



/* =====================================================
   REGISTER
===================================================== */

function register() {

    const name =
        document
            .getElementById(
                "registerName"
            )
            .value
            .trim();


    const username =
        document
            .getElementById(
                "registerUsername"
            )
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById(
                "registerPassword"
            )
            .value;


    if (
        !name ||
        !username ||
        !password
    ) {

        showToast(
            "Please fill all fields"
        );

        return;

    }


    if (username.length < 3) {

        showToast(
            "Username must have 3+ characters"
        );

        return;

    }


    if (
        users.some(
            u =>
                u.username === username
        )
    ) {

        showToast(
            "Username already exists"
        );

        return;

    }


    const newUser = {

        id: Date.now(),

        name: name,

        username: username,

        password: password,

        bio:
            "Welcome to my VibeBlog profile ✨",

        avatar:
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff`,

        followers: [],

        following: []

    };


    users.push(newUser);

    saveUsers();


    currentUser =
        newUser.id;


    localStorage.setItem(
        "vibeCurrentUser",
        currentUser
    );


    showToast(
        "Account created successfully! 🚀"
    );


    setTimeout(
        () => {

            showApp();

        },
        500
    );

}



/* =====================================================
   SWITCH LOGIN / REGISTER
===================================================== */

function showRegister() {

    document
        .getElementById(
            "loginForm"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "registerForm"
        )
        .classList
        .remove("hidden");

}



function showLogin() {

    document
        .getElementById(
            "registerForm"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "loginForm"
        )
        .classList
        .remove("hidden");

}



/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "vibeCurrentUser"
    );


    currentUser = null;


    showAuth();


    showToast(
        "Logged out successfully"
    );

}



/* =====================================================
   CURRENT USER
===================================================== */

function getCurrentUser() {

    return users.find(
        u =>
            u.id == currentUser
    );

}



/* =====================================================
   PROFILE
===================================================== */

function updateProfile() {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    document
        .getElementById(
            "profileName"
        )
        .textContent =
        user.name;


    document
        .getElementById(
            "profileUsername"
        )
        .textContent =
        "@" + user.username;


    document
        .getElementById(
            "profileBio"
        )
        .textContent =
        user.bio;


    document
        .getElementById(
            "profileAvatar"
        )
        .src =
        user.avatar;


    document
        .getElementById(
            "navAvatar"
        )
        .src =
        user.avatar;


    document
        .getElementById(
            "createAvatar"
        )
        .src =
        user.avatar;


    document
        .getElementById(
            "navUsername"
        )
        .textContent =
        user.name;


    const myPosts =
        posts.filter(
            p =>
                p.userId == user.id
        );


    document
        .getElementById(
            "postCount"
        )
        .textContent =
        myPosts.length;


    document
        .getElementById(
            "followerCount"
        )
        .textContent =
        user.followers.length;


    document
        .getElementById(
            "followingCount"
        )
        .textContent =
        user.following.length;

}



/* =====================================================
   CREATE POST
===================================================== */

function createPost() {

    const textarea =
        document.getElementById(
            "postText"
        );


    const text =
        textarea.value.trim();


    if (
        !text &&
        !selectedImage
    ) {

        showToast(
            "Write something or add an image!"
        );

        return;

    }


    const newPost = {

        id: Date.now(),

        userId:
            Number(currentUser),

        text: text,

        image: selectedImage,

        likes: [],

        comments: [],

        reposts: [],

        bookmarks: [],

        createdAt:
            new Date().toISOString()

    };


    posts.unshift(
        newPost
    );


    savePosts();


    textarea.value = "";


    removeImage();


    updateCharacterCount();


    updateProfile();


    renderPosts();


    showToast(
        "Post published successfully! 🎉"
    );

}



/* =====================================================
   RENDER POSTS
===================================================== */

function renderPosts() {

    const container =
        document.getElementById(
            "postsContainer"
        );


    let visiblePosts =
        [...posts];


    /* MY POSTS */

    if (
        activeView === "my"
    ) {

        visiblePosts =
            visiblePosts.filter(
                p =>
                    p.userId ==
                    currentUser
            );

    }


    /* FOLLOWING */

    if (
        activeView === "following"
    ) {

        const me =
            getCurrentUser();


        visiblePosts =
            visiblePosts.filter(
                p =>
                    me.following.includes(
                        p.userId
                    )
            );

    }


    /* SEARCH */

    const search =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .trim()
            .toLowerCase();


    if (search) {

        visiblePosts =
            visiblePosts.filter(
                post => {

                    const user =
                        users.find(
                            u =>
                                u.id ==
                                post.userId
                        );


                    return (

                        post.text
                            .toLowerCase()
                            .includes(search)

                        ||

                        user.name
                            .toLowerCase()
                            .includes(search)

                        ||

                        user.username
                            .toLowerCase()
                            .includes(search)

                    );

                }
            );

    }


    container.innerHTML = "";


    if (
        visiblePosts.length === 0
    ) {

        container.innerHTML = `

            <div
                class="post"
                style="
                    text-align:center;
                    padding:40px;
                ">

                <h3>
                    No posts found 😔
                </h3>

                <p
                    style="
                        font-size:12px;
                        color:#777;
                        margin-top:5px;
                    ">

                    Create a post or
                    follow someone.

                </p>

            </div>

        `;

        return;

    }


    visiblePosts.forEach(
        post => {

            container.innerHTML +=
                createPostHTML(
                    post
                );

        }
    );

}



/* =====================================================
   CREATE POST HTML
===================================================== */

function createPostHTML(
    post
) {

    const user =
        users.find(
            u =>
                u.id ==
                post.userId
        );


    if (!user) {

        return "";

    }


    const liked =
        post.likes.includes(
            Number(currentUser)
        );


    const saved =
        post.bookmarks.includes(
            Number(currentUser)
        );


    const reposted =
        post.reposts.includes(
            Number(currentUser)
        );


    const isMine =
        post.userId ==
        currentUser;


    const time =
        getTimeAgo(
            post.createdAt
        );


    let commentsHTML = "";


    post.comments.forEach(
        comment => {

            const commentUser =
                users.find(
                    u =>
                        u.id ==
                        comment.userId
                );


            commentsHTML += `

                <div class="comment">

                    <strong>

                        ${escapeHTML(
                            commentUser
                                ? commentUser.username
                                : "User"
                        )}

                    </strong>

                    ${escapeHTML(
                        comment.text
                    )}

                </div>

            `;

        }
    );


    return `

        <article
            class="post">


            <!-- HEADER -->

            <div
                class="post-header">


                <img
                    class="post-avatar"
                    src="${user.avatar}"
                    alt="${escapeHTML(user.name)}">


                <div
                    class="post-user">


                    <strong>

                        ${escapeHTML(
                            user.name
                        )}

                    </strong>


                    <span>

                        @${escapeHTML(
                            user.username
                        )}

                        ·

                        ${time}

                    </span>


                </div>


                ${
                    isMine

                    ?

                    `

                    <button
                        class="delete-btn"
                        onclick="deletePost(${post.id})">

                        <i
                            class="fa-solid fa-trash">
                        </i>

                    </button>

                    `

                    :

                    ""

                }


            </div>



            <!-- CONTENT -->

            <div
                class="post-content">


                ${
                    post.text

                    ?

                    `

                    <p>

                        ${escapeHTML(
                            post.text
                        )}

                    </p>

                    `

                    :

                    ""

                }


                ${
                    post.image

                    ?

                    `

                    <img
                        src="${post.image}"
                        alt="Post image">

                    `

                    :

                    ""

                }


            </div>



            <!-- ACTIONS -->

            <div
                class="post-actions">


                <!-- LIKE -->

                <button
                    class="${liked ? "liked" : ""}"
                    onclick="toggleLike(${post.id})">


                    <i
                        class="fa-${
                            liked
                            ? "solid"
                            : "regular"
                        } fa-heart">
                    </i>


                    ${post.likes.length}


                </button>



                <!-- COMMENT -->

                <button
                    onclick="
                        toggleComments(
                            ${post.id}
                        )
                    ">


                    <i
                        class="fa-regular fa-comment">
                    </i>


                    ${post.comments.length}


                </button>



                <!-- REPOST -->

                <button
                    class="${reposted ? "reposted" : ""}"
                    onclick="
                        toggleRepost(
                            ${post.id}
                        )
                    ">


                    <i
                        class="fa-solid fa-retweet">
                    </i>


                    ${post.reposts.length}


                </button>



                <!-- BOOKMARK -->

                <button
                    class="${saved ? "saved" : ""}"
                    onclick="
                        toggleBookmark(
                            ${post.id}
                        )
                    ">


                    <i
                        class="fa-${
                            saved
                            ? "solid"
                            : "regular"
                        } fa-bookmark">
                    </i>


                </button>



                <!-- SHARE -->

                <button
                    onclick="
                        sharePost(
                            ${post.id}
                        )
                    ">


                    <i
                        class="fa-solid fa-share">
                    </i>


                </button>


            </div>



            <!-- COMMENTS -->

            <div
                id="comments-${post.id}"
                class="comments hidden">


                ${commentsHTML}


                <div
                    class="comment-input">


                    <input
                        id="commentInput-${post.id}"
                        placeholder="Write a comment..."
                        onkeydown="
                            if(event.key === 'Enter')
                            addComment(${post.id})
                        ">


                    <button
                        onclick="
                            addComment(
                                ${post.id}
                            )
                        ">


                        <i
                            class="fa-solid fa-paper-plane">
                        </i>


                    </button>


                </div>


            </div>


        </article>

    `;

}



/* =====================================================
   LIKE
===================================================== */

function toggleLike(
    postId
) {

    const post =
        posts.find(
            p =>
                p.id ==
                postId
        );


    const userId =
        Number(currentUser);


    const index =
        post.likes.indexOf(
            userId
        );


    if (
        index === -1
    ) {

        post.likes.push(
            userId
        );


        showToast(
            "Liked ❤️"
        );

    }

    else {

        post.likes.splice(
            index,
            1
        );


        showToast(
            "Like removed"
        );

    }


    savePosts();

    renderPosts();

}



/* =====================================================
   COMMENTS
===================================================== */

function toggleComments(
    postId
) {

    const box =
        document.getElementById(
            `comments-${postId}`
        );


    box.classList.toggle(
        "hidden"
    );

}



function addComment(
    postId
) {

    const input =
        document.getElementById(
            `commentInput-${postId}`
        );


    const text =
        input.value.trim();


    if (!text) {

        return;

    }


    const post =
        posts.find(
            p =>
                p.id ==
                postId
        );


    post.comments.push({

        userId:
            Number(currentUser),

        text:
            text

    });


    savePosts();

    renderPosts();


    setTimeout(
        () => {

            document
                .getElementById(
                    `comments-${postId}`
                )
                ?.classList
                .remove(
                    "hidden"
                );

        },
        20
    );


    showToast(
        "Comment added 💬"
    );

}



/* =====================================================
   REPOST
===================================================== */

function toggleRepost(
    postId
) {

    const post =
        posts.find(
            p =>
                p.id ==
                postId
        );


    const userId =
        Number(currentUser);


    const index =
        post.reposts.indexOf(
            userId
        );


    if (
        index === -1
    ) {

        post.reposts.push(
            userId
        );


        showToast(
            "Post reposted 🔁"
        );

    }

    else {

        post.reposts.splice(
            index,
            1
        );


        showToast(
            "Repost removed"
        );

    }


    savePosts();

    renderPosts();

}



/* =====================================================
   BOOKMARK
===================================================== */

function toggleBookmark(
    postId
) {

    const post =
        posts.find(
            p =>
                p.id ==
                postId
        );


    const userId =
        Number(currentUser);


    const index =
        post.bookmarks.indexOf(
            userId
        );


    if (
        index === -1
    ) {

        post.bookmarks.push(
            userId
        );


        showToast(
            "Post saved 🔖"
        );

    }

    else {

        post.bookmarks.splice(
            index,
            1
        );


        showToast(
            "Removed from saved"
        );

    }


    savePosts();

    renderPosts();

}



/* =====================================================
   DELETE POST
===================================================== */

function deletePost(
    postId
) {

    const answer =
        confirm(
            "Are you sure you want to delete this post?"
        );


    if (!answer) {

        return;

    }


    posts =
        posts.filter(
            p =>
                !(
                    p.id ==
                    postId &&
                    p.userId ==
                    currentUser
                )
        );


    savePosts();

    updateProfile();

    renderPosts();


    showToast(
        "Post deleted 🗑️"
    );

}



/* =====================================================
   FOLLOW / UNFOLLOW
===================================================== */

function toggleFollow(
    userId
) {

    const me =
        getCurrentUser();


    if (
        userId ==
        me.id
    ) {

        return;

    }


    const target =
        users.find(
            u =>
                u.id ==
                userId
        );


    const index =
        me.following.indexOf(
            userId
        );


    if (
        index === -1
    ) {

        me.following.push(
            userId
        );


        target.followers.push(
            me.id
        );


        showToast(
            `Following @${target.username} ✨`
        );

    }

    else {

        me.following.splice(
            index,
            1
        );


        target.followers =
            target.followers.filter(
                id =>
                    id != me.id
            );


        showToast(
            `Unfollowed @${target.username}`
        );

    }


    saveUsers();

    updateProfile();

    renderSuggestions();

    renderPosts();

}



/* =====================================================
   SUGGESTIONS
===================================================== */

function renderSuggestions() {

    const container =
        document.getElementById(
            "suggestions"
        );


    const me =
        getCurrentUser();


    if (!me) {

        return;

    }


    const suggestions =
        users
            .filter(
                u =>
                    u.id != me.id
            )
            .slice(
                0,
                4
            );


    container.innerHTML = "";


    suggestions.forEach(
        user => {

            const following =
                me.following.includes(
                    user.id
                );


            container.innerHTML += `

                <div
                    class="suggestion">


                    <img
                        src="${user.avatar}"
                        alt="${user.name}">


                    <div
                        class="suggestion-info">


                        <strong>

                            ${escapeHTML(
                                user.name
                            )}

                        </strong>


                        <span>

                            @${escapeHTML(
                                user.username
                            )}

                        </span>


                    </div>


                    <button
                        class="
                            follow-btn
                            ${
                                following
                                ? "following"
                                : ""
                            }
                        "
                        onclick="
                            toggleFollow(
                                ${user.id}
                            )
                        ">


                        ${
                            following
                            ? "Following"
                            : "Follow"
                        }


                    </button>


                </div>

            `;

        }
    );

}



/* =====================================================
   SEARCH
===================================================== */

function searchContent() {

    activeView = "home";


    document
        .getElementById(
            "pageTitle"
        )
        .textContent =
        "Search Results";


    document
        .getElementById(
            "pageSubtitle"
        )
        .textContent =
        "Posts and users matching your search";


    renderPosts();

}



/* =====================================================
   HOME
===================================================== */

function showHome() {

    activeView = "home";


    document
        .getElementById(
            "pageTitle"
        )
        .textContent =
        "Home Feed";


    document
        .getElementById(
            "pageSubtitle"
        )
        .textContent =
        "See what people are sharing";


    clearSearch();


    setActiveMenu(
        0
    );


    renderPosts();

}



/* =====================================================
   MY POSTS
===================================================== */

function showMyPosts() {

    activeView = "my";


    document
        .getElementById(
            "pageTitle"
        )
        .textContent =
        "My Posts";


    document
        .getElementById(
            "pageSubtitle"
        )
        .textContent =
        "Everything you have shared";


    clearSearch();


    setActiveMenu(
        1
    );


    renderPosts();

}



/* =====================================================
   FOLLOWING
===================================================== */

function showFollowing() {

    activeView =
        "following";


    document
        .getElementById(
            "pageTitle"
        )
        .textContent =
        "Following";


    document
        .getElementById(
            "pageSubtitle"
        )
        .textContent =
        "Posts from people you follow";


    clearSearch();


    setActiveMenu(
        2
    );


    renderPosts();

}



/* =====================================================
   ACTIVE MENU
===================================================== */

function setActiveMenu(
    index
) {

    const buttons =
        document.querySelectorAll(
            ".menu-btn"
        );


    buttons.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    if (buttons[index]) {

        buttons[index]
            .classList
            .add("active");

    }

}



/* =====================================================
   CLEAR SEARCH
===================================================== */

function clearSearch() {

    document
        .getElementById(
            "searchInput"
        )
        .value = "";

}



/* =====================================================
   IMAGE UPLOAD
===================================================== */

function previewSelectedImage() {

    const file =
        document
            .getElementById(
                "imageInput"
            )
            .files[0];


    if (!file) {

        return;

    }


    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        showToast(
            "Please select an image"
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function(event) {

            selectedImage =
                event.target.result;


            document
                .getElementById(
                    "previewImage"
                )
                .src =
                selectedImage;


            document
                .getElementById(
                    "imagePreview"
                )
                .classList
                .remove(
                    "hidden"
                );

        };


    reader.readAsDataURL(
        file
    );

}



function removeImage() {

    selectedImage = "";


    document
        .getElementById(
            "imageInput"
        )
        .value = "";


    document
        .getElementById(
            "imagePreview"
        )
        .classList
        .add(
            "hidden"
        );

}



/* =====================================================
   CHARACTER COUNT
===================================================== */

function updateCharacterCount() {

    const text =
        document
            .getElementById(
                "postText"
            )
            .value;


    document
        .getElementById(
            "characterCount"
        )
        .textContent =
        `${text.length}/280`;

}



/* =====================================================
   EDIT PROFILE
===================================================== */

function openEditProfile() {

    const user =
        getCurrentUser();


    document
        .getElementById(
            "editName"
        )
        .value =
        user.name;


    document
        .getElementById(
            "editBio"
        )
        .value =
        user.bio;


    document
        .getElementById(
            "editAvatar"
        )
        .value =
        user.avatar;


    document
        .getElementById(
            "profileModal"
        )
        .classList
        .remove(
            "hidden"
        );

}



function closeEditProfile() {

    document
        .getElementById(
            "profileModal"
        )
        .classList
        .add(
            "hidden"
        );

}



function saveProfile() {

    const user =
        getCurrentUser();


    const name =
        document
            .getElementById(
                "editName"
            )
            .value
            .trim();


    const bio =
        document
            .getElementById(
                "editBio"
            )
            .value
            .trim();


    const avatar =
        document
            .getElementById(
                "editAvatar"
            )
            .value
            .trim();


    if (!name) {

        showToast(
            "Name cannot be empty"
        );

        return;

    }


    user.name =
        name;


    user.bio =
        bio ||
        "Welcome to my VibeBlog profile ✨";


    if (avatar) {

        user.avatar =
            avatar;

    }


    saveUsers();


    updateProfile();


    renderPosts();


    renderSuggestions();


    closeEditProfile();


    showToast(
        "Profile updated successfully! ✨"
    );

}



/* =====================================================
   FOCUS POST BOX
===================================================== */

function focusPostBox() {

    const box =
        document.getElementById(
            "postText"
        );


    box.focus();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/* =====================================================
   SHARE
===================================================== */

function sharePost(
    postId
) {

    const url =
        window.location.href +
        "#post-" +
        postId;


    if (
        navigator.clipboard
    ) {

        navigator.clipboard
            .writeText(
                url
            );


        showToast(
            "Post link copied 🔗"
        );

    }

}



/* =====================================================
   TIME AGO
===================================================== */

function getTimeAgo(
    dateString
) {

    const seconds =
        Math.floor(

            (
                Date.now() -
                new Date(
                    dateString
                ).getTime()

            ) / 1000

        );


    if (
        seconds < 60
    ) {

        return "just now";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    if (
        minutes < 60
    ) {

        return minutes + "m";

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (
        hours < 24
    ) {

        return hours + "h";

    }


    const days =
        Math.floor(
            hours / 24
        );


    return days + "d";

}



/* =====================================================
   SECURITY
===================================================== */

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}



/* =====================================================
   TOAST
===================================================== */

function showToast(
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.querySelector(
        "span"
    ).textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}