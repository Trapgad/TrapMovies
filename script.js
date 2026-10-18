/* ==================================
   TRAP MOVIES — script.js
   Corrected search, featured buttons,
   and safe dynamic rendering.
================================== */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* TMDB CONFIG */
    window.API_KEY = "17a1834e273320eef8a2a36b38a11964";
    window.BASE_URL = "https://api.themoviedb.org/3";
    window.IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

    const movieContainers = document.querySelectorAll(".movie-container");
    const searchBtn = document.querySelector(".search-btn");
    const searchPage = document.querySelector(".search-page");
    const backSearch = document.querySelector(".back-search");
    const searchInput = document.querySelector("#searchInput");
    const searchResults = document.querySelector("#searchResults");
    const movieContent = document.querySelector(".movie-content");

    const FALLBACK_IMAGE = "assets/images/no-image.jpg";

    /* SAFE HELPERS */
    function makeElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) element.className = className;

        if (text !== undefined && text !== null) {
            element.textContent = String(text);
        }

        return element;
    }

    function safeImagePath(path) {
        if (
            typeof path !== "string" ||
            !/^\/[A-Za-z0-9._/-]+$/.test(path)
        ) {
            return FALLBACK_IMAGE;
        }

        return `${window.IMAGE_URL}${path}`;
    }

    function movieTitle(item) {
        return item?.title || item?.name || "Untitled";
    }

    function getMediaType(item, fallback = "movie") {
        if (item?.media_type) return item.media_type;
        return fallback;
    }

    /* TMDB FETCH SYSTEM */
    window.fetchTMDB = async function (endpoint) {
        try {
            const response = await fetch(
                `${window.BASE_URL}${endpoint}`
            );

            if (!response.ok) {
                throw new Error(
                    `TMDB request failed (${response.status})`
                );
            }

            return await response.json();
        } catch (error) {
            console.error("TMDB ERROR:", error);
            return null;
        }
    };

    window.getMovies = async function (endpoint) {
        const separator = endpoint.includes("?") ? "&" : "?";

        const data = await window.fetchTMDB(
            `${endpoint}${separator}api_key=${encodeURIComponent(window.API_KEY)}&language=en-US`
        );

        return data?.results || [];
    };

    /* SAFE MOVIE / SERIES / PERSON CARD */
    window.createMovieCard = function (item) {
        const type = getMediaType(item);
        const card = makeElement("div", "movie-card");

        card.dataset.id = String(item?.id ?? "");
        card.dataset.mediaType = type;

        const posterPath =
            type === "person"
                ? item?.profile_path
                : item?.poster_path;

        const image = makeElement("img");

        image.src = safeImagePath(posterPath);
        image.alt = `${movieTitle(item)} ${
            type === "person" ? "profile" : "poster"
        }`;
        image.loading = "lazy";

        image.onerror = () => {
            image.onerror = null;
            image.src = FALLBACK_IMAGE;
        };

        const title = makeElement("h3", "", movieTitle(item));

        const rating = makeElement(
            "p",
            "",
            type === "person"
                ? "Actor"
                : `⭐ ${
                    Number.isFinite(Number(item?.vote_average)) &&
                    item?.vote_average !== null
                        ? Number(item.vote_average).toFixed(1)
                        : "N/A"
                }`
        );

        card.append(image, title, rating);

        return card;
    };

    /* HOME MOVIES */
    async function loadMovies() {
        const sections = [
            "/trending/movie/week",
            "/movie/popular",
            "/movie/now_playing",
            "/movie/top_rated",
            "/movie/upcoming"
        ];

        for (let i = 0; i < movieContainers.length; i++) {
            if (!sections[i]) continue;

            const movies = await window.getMovies(sections[i]);
            const fragment = document.createDocumentFragment();

            movies.forEach(movie => {
                fragment.appendChild(
                    window.createMovieCard({
                        ...movie,
                        media_type: "movie"
                    })
                );
            });

            movieContainers[i].replaceChildren(fragment);
        }
    }

    /* CARD NAVIGATION */
    document.addEventListener("click", event => {
        const card = event.target.closest(".movie-card");

        if (!card) return;

        const id = card.dataset.id;
        const type = card.dataset.mediaType || "movie";

        if (!id) return;

        if (type === "movie" || type === "tv") {
            window.location.href =
                `movie.html?id=${encodeURIComponent(id)}&type=${encodeURIComponent(type)}`;
        } else if (type === "person") {
            window.open(
                `https://www.themoviedb.org/person/${encodeURIComponent(id)}`,
                "_blank",
                "noopener,noreferrer"
            );
        }
    });

    /* WATCH HISTORY */
    window.saveHistory = function (movie) {
        try {
            let history = JSON.parse(
                localStorage.getItem("watchHistory") || "[]"
            );

            if (!Array.isArray(history)) history = [];

            if (
                !history.some(
                    item => String(item.id) === String(movie.id)
                )
            ) {
                history.unshift({
                    id: movie.id,
                    title: movieTitle(movie),
                    poster: safeImagePath(movie.poster_path)
                });

                localStorage.setItem(
                    "watchHistory",
                    JSON.stringify(history.slice(0, 50))
                );
            }
        } catch (error) {
            console.error("Could not save watch history:", error);
        }
    };

    /* FAVORITES */
    window.addFavorite = function (movie) {
        try {
            let favorites = JSON.parse(
                localStorage.getItem("favorites") || "[]"
            );

            if (!Array.isArray(favorites)) favorites = [];

            if (
                !favorites.some(
                    item => String(item.id) === String(movie.id)
                )
            ) {
                favorites.push(movie);

                localStorage.setItem(
                    "favorites",
                    JSON.stringify(favorites)
                );
            }
        } catch (error) {
            console.error("Could not save favorite:", error);
        }
    };

    /* SIDE MENU */
    const menuBtn = document.querySelector(".menu-btn");
    const closeBtn = document.querySelector(".close-btn");
    const sideMenu = document.querySelector(".side-menu");
    const overlay = document.querySelector(".overlay-bg");

    function openMenu() {
        sideMenu?.classList.add("active");
        overlay?.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        sideMenu?.classList.remove("active");
        overlay?.classList.remove("active");

        if (!searchPage?.classList.contains("active")) {
            document.body.style.overflow = "";
        }
    }

    menuBtn?.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    overlay?.addEventListener("click", closeMenu);

    /* HERO SLIDER */
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".slider-dots span");

    let currentSlide = 0;
    let sliderTimer;

    function showSlide(index) {
        if (!slides.length) return;

        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle(
                "active",
                i === currentSlide
            );
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle(
                "active",
                i === currentSlide
            );
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startSlider() {
        if (slides.length < 2) return;

        clearInterval(sliderTimer);
        sliderTimer = setInterval(nextSlide, 5000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startSlider();
        });
    });

    startSlider();
        function startSlider() {
        clearInterval(sliderTimer);
        if (slides.length > 1) {
            sliderTimer = setInterval(nextSlide, 5000);
        }
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startSlider();
        });
    });

    if (slides.length) {
        showSlide(0);
        startSlider();
    }

    /* SEARCH PANEL */
    function openSearch() {
        searchPage?.classList.add("active");
        document.body.style.overflow = "hidden";
        searchInput?.focus();
    }

    function closeSearch() {
        searchPage?.classList.remove("active");

        if (!sideMenu?.classList.contains("active")) {
            document.body.style.overflow = "";
        }
    }

    searchBtn?.addEventListener("click", openSearch);
    backSearch?.addEventListener("click", closeSearch);

    /* SEARCH FILTERS */
    const filterButtons = document.querySelectorAll(
        "[data-filter], .search-filter button, .search-filters button, .filter-btn, .filter"
    );

    function normalizeFilter(button) {
        const raw = (
            button.dataset.filter ||
            button.textContent ||
            ""
        ).trim().toLowerCase();

        if (raw.includes("movie")) return "movies";

        if (
            raw.includes("series") ||
            raw.includes("tv") ||
            raw.includes("show")
        ) {
            return "series";
        }

        if (
            raw.includes("actor") ||
            raw.includes("person")
        ) {
            return "actors";
        }

        return "all";
    }

    let activeSearchFilter = "all";
    let searchTimer;
    let searchRequestId = 0;

    async function searchTMDB(query, filter) {
        const endpoints = {
            all: "/search/multi",
            movies: "/search/movie",
            series: "/search/tv",
            actors: "/search/person"
        };

        const params = new URLSearchParams({
            api_key: window.API_KEY,
            language: "en-US",
            query,
            include_adult: "false"
        });

        const response = await fetch(
            `${window.BASE_URL}${endpoints[filter] || endpoints.all}?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(`Search failed (${response.status})`);
        }

        const data = await response.json();

        return (data.results || [])
            .map(item => ({
                ...item,
                media_type: item.media_type || (
                    filter === "movies" ? "movie" :
                    filter === "series" ? "tv" :
                    filter === "actors" ? "person" : "movie"
                )
            }))
            .filter(item =>
                ["movie", "tv", "person"].includes(item.media_type)
            );
    }

    function setFilter(button) {
        activeSearchFilter = normalizeFilter(button);

        filterButtons.forEach(candidate => {
            const selected = candidate === button;

            candidate.classList.toggle("active", selected);
            candidate.setAttribute(
                "aria-pressed",
                String(selected)
            );
        });

        if (searchInput?.value.trim()) {
            searchInput.dispatchEvent(new Event("input"));
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            setFilter(button);
        });
    });

    searchInput?.addEventListener("input", () => {
        clearTimeout(searchTimer);

        const requestId = ++searchRequestId;
        const query = searchInput.value.trim();

        searchTimer = setTimeout(async () => {
            if (!searchResults) return;

            if (!query) {
                searchResults.replaceChildren();
                return;
            }

            searchResults.replaceChildren(
                makeElement("div", "loading", "Searching...")
            );

            try {
                const results = await searchTMDB(
                    query,
                    activeSearchFilter
                );

                if (requestId !== searchRequestId) return;

                if (!results.length) {
                    searchResults.replaceChildren(
                        makeElement(
                            "div",
                            "no-results",
                            "No results found."
                        )
                    );
                    return;
                }

                const fragment = document.createDocumentFragment();

                results.forEach(item => {
                    fragment.appendChild(
                        window.createMovieCard(item)
                    );
                });

                searchResults.replaceChildren(fragment);
            } catch (error) {
                if (requestId !== searchRequestId) return;

                console.error("SEARCH ERROR:", error);

                searchResults.replaceChildren(
                    makeElement(
                        "div",
                        "no-results",
                        "Search failed. Please try again."
                    )
                );
            }
        }, 350);
    });

    /* FEATURED SLIDE BUTTONS */
    document.querySelectorAll(".slide").forEach(slide => {
        const buttons = slide.querySelectorAll(
            ".watch, .info, .watch-now, .more-info, [data-action='watch'], [data-action='info']"
        );

        buttons.forEach(button => {
            button.addEventListener("click", async event => {
                event.preventDefault();

                const heading = slide.querySelector(
                    "h1, h2, .slide-title, [data-movie-title]"
                );

                const title = (
                    heading?.dataset.movieTitle ||
                    heading?.textContent ||
                    slide.dataset.movieTitle ||
                    ""
                ).trim();

                if (!title) {
                    console.warn(
                        "Featured slide has no movie title."
                    );
                    return;
                }

                if (button.dataset.busy === "true") return;

                button.dataset.busy = "true";
                button.setAttribute("aria-busy", "true");

                try {
                    const params = new URLSearchParams({
                        api_key: window.API_KEY,
                        language: "en-US",
                        query: title,
                        include_adult: "false"
                    });

                    const response = await fetch(
                        `${window.BASE_URL}/search/movie?${params.toString()}`
                    );

                    if (!response.ok) {
                        throw new Error(
                            `TMDB search failed (${response.status})`
                        );
                    }

                    const data = await response.json();
                    const results = data.results || [];

                    const normalize = value =>
                        String(value || "")
                            .toLowerCase()
                            .replace(/[^a-z0-9]/g, "");

                    const match = results.find(movie =>
                        normalize(movie.title) === normalize(title)
                    ) || results[0];

                    if (!match?.id) {
                        alert(`Could not find "${title}" on TMDB.`);
                        return;
                    }

                    window.location.href =
                        `movie.html?id=${encodeURIComponent(match.id)}&type=movie`;
                } catch (error) {
                    console.error(
                        "FEATURED BUTTON ERROR:",
                        error
                    );

                    alert(
                        "Could not load this movie. Please try again."
                    );
                } finally {
                    delete button.dataset.busy;
                    button.removeAttribute("aria-busy");
                }
            });
        });
    });

    /* REELS */
    const reels = document.querySelectorAll(".reel");

    function showHeart(reel) {
        const heart = makeElement(
            "div",
            "double-heart",
            "❤️"
        );

        reel.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
    }

    function increaseViews(reel) {
        const views = reel.querySelector(".views");

        if (!views || reel.dataset.viewed) return;

        const count = Number(views.dataset.views || 0) + 1;

        views.dataset.views = String(count);
        views.textContent = `${count} views`;
        reel.dataset.viewed = "true";
    }

    reels.forEach(reel => {
        reel.addEventListener("dblclick", () => {
            showHeart(reel);
            increaseViews(reel);
        });
    });
        /* REEL VIEW COUNTS */
    if (reels.length && "IntersectionObserver" in window) {
        const reelObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    increaseViews(entry.target);
                }
            });
        }, { threshold: 0.75 });

        reels.forEach(reel => reelObserver.observe(reel));
    }

    /* REEL LIKE BUTTONS */
    document.querySelectorAll(".like-btn").forEach(button => {
        button.addEventListener("click", event => {
            event.stopPropagation();

            button.classList.toggle("liked");
            button.textContent = button.classList.contains("liked")
                ? "❤️"
                : "🤍";
        });
    });

    /* DOUBLE-TAP TO LIKE */
    reels.forEach(reel => {
        let lastTap = 0;

        reel.addEventListener("click", event => {
            if (event.target.closest("button")) return;

            const now = Date.now();

            if (now - lastTap < 300) {
                const likeButton = reel.querySelector(".like-btn");

                if (likeButton) {
                    likeButton.classList.add("liked");
                    likeButton.textContent = "❤️";
                    showHeart(reel);
                }
            }

            lastTap = now;
        });
    });

    /* MOVIE / SERIES DETAILS — SAFE DOM RENDERING */
    async function loadMovieDetails() {
        if (!movieContent) return;

        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const type = params.get("type") === "tv" ? "tv" : "movie";

        if (!id || !/^\d+$/.test(id)) return;

        const item = await window.fetchTMDB(
            `/${type}/${encodeURIComponent(id)}?api_key=${encodeURIComponent(window.API_KEY)}&language=en-US`
        );

        if (!item) {
            movieContent.replaceChildren(
                makeElement(
                    "p",
                    "no-results",
                    "Unable to load details. Please try again."
                )
            );
            return;
        }

        const posterBox = makeElement("div", "movie-poster");
        const posterImage = makeElement("img");

        posterImage.src = safeImagePath(item.poster_path);
        posterImage.alt = `${movieTitle(item)} poster`;

        posterImage.onerror = () => {
            posterImage.onerror = null;
            posterImage.src = FALLBACK_IMAGE;
        };

        posterBox.appendChild(posterImage);

        const infoBox = makeElement("div", "movie-info-box");

        infoBox.appendChild(
            makeElement("h1", "", movieTitle(item))
        );

        infoBox.appendChild(
            makeElement(
                "p",
                "",
                item.overview || "No description available."
            )
        );

        const ratingValue = Number(item.vote_average);

        const ratingText =
            Number.isFinite(ratingValue) && item.vote_average !== null
                ? ratingValue.toFixed(1)
                : "N/A";

        const date =
            item.release_date ||
            item.first_air_date ||
            "Unknown";

        infoBox.appendChild(
            makeElement(
                "div",
                "movie-meta",
                `⭐ ${ratingText}\n📅 ${date}`
            )
        );

        const trailerButton = makeElement(
            "button",
            "trailer-btn",
            "▶ Watch Trailer"
        );

        trailerButton.type = "button";

        const watchlistButton = makeElement(
            "button",
            "watch-btn",
            "+ Add Watchlist"
        );

        watchlistButton.type = "button";

        infoBox.append(trailerButton, watchlistButton);
        movieContent.replaceChildren(posterBox, infoBox);

        window.saveHistory({
            ...item,
            id,
            title: movieTitle(item),
            poster_path: item.poster_path
        });

        loadTrailer(id, type);
        updateWatchlistButton(watchlistButton, id, item);
    }

    /* WATCH HISTORY COMPATIBILITY */
    function saveHistory(movie) {
        window.saveHistory(movie);
    }

    /* TRAILER SYSTEM */
    async function loadTrailer(id, type = "movie") {
        const button = document.querySelector(".trailer-btn");
        const modal = document.querySelector(".trailer-modal");
        const frame = document.getElementById("trailerFrame");

        if (!button) return;

        const data = await window.fetchTMDB(
            `/${type}/${encodeURIComponent(id)}/videos?api_key=${encodeURIComponent(window.API_KEY)}&language=en-US`
        );

        const videos = data?.results || [];

        const trailer = videos.find(video =>
            video.site === "YouTube" &&
            (
                video.type === "Trailer" ||
                video.type === "Teaser"
            ) &&
            video.key
        );

        if (!trailer) {
            button.disabled = true;
            button.title = "No trailer available";
            return;
        }

        button.addEventListener("click", () => {
            if (modal) modal.classList.add("active");

            if (frame) {
                frame.src =
                    `https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}?autoplay=1`;
            } else {
                window.open(
                    `https://www.youtube.com/watch?v=${encodeURIComponent(trailer.key)}`,
                    "_blank",
                    "noopener,noreferrer"
                );
            }
        });

        document.querySelector(".close-trailer")?.addEventListener(
            "click",
            () => {
                modal?.classList.remove("active");

                if (frame) frame.src = "";
            }
        );
    }

    /* WATCHLIST */
    function readWatchlist() {
        try {
            const list = JSON.parse(
                localStorage.getItem("watchlist") || "[]"
            );

            return Array.isArray(list) ? list : [];
        } catch {
            return [];
        }
    }

    function updateWatchlistButton(button, id, item) {
        const watchlist = readWatchlist();

        const isSaved = watchlist.some(
            movie => String(movie.id) === String(id)
        );

        button.textContent = isSaved
            ? "✓ Saved"
            : "+ Add Watchlist";

        button.classList.toggle("saved", isSaved);

        button.addEventListener("click", () => {
            let list = readWatchlist();

            const exists = list.some(
                movie => String(movie.id) === String(id)
            );

            if (exists) {
                list = list.filter(
                    movie => String(movie.id) !== String(id)
                );
            } else {
                list.push({
                    id: String(id),
                    title: movieTitle(item),
                    poster: safeImagePath(item.poster_path)
                });
            }

            try {
                localStorage.setItem(
                    "watchlist",
                    JSON.stringify(list)
                );

                const saved = list.some(
                    movie => String(movie.id) === String(id)
                );

                button.textContent = saved
                    ? "✓ Saved"
                    : "+ Add Watchlist";

                button.classList.toggle("saved", saved);
            } catch (error) {
                console.error(
                    "Could not update watchlist:",
                    error
                );

                alert(
                    "Could not update your watchlist on this device."
                );
            }
        });
    }

    /* BACK BUTTON */
    document.querySelector(".back-btn")?.addEventListener(
        "click",
        () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        }
    );

    /* ESCAPE KEY */
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
            closeSearch();

            document
                .querySelector(".trailer-modal")
                ?.classList.remove("active");

            const frame = document.getElementById("trailerFrame");

            if (frame) frame.src = "";
        }
    });

    /* START */
    loadMovies();
    loadMovieDetails();
});
    
    
    
    
    