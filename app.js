// ===================================================================================
// CRONOSERIES V5.4 - APLICACIÓN PRINCIPAL
// ===================================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================================
    // --- CONSTANTES Y REFERENCIAS AL DOM ---
    // ===================================================================================
    const DB_NAME = 'CronoSeriesDB';
    const DB_VERSION = 1;
    const IMAGE_STORE_NAME = 'images';
    const DAYS_OF_WEEK = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const GENRES = [
        'Acción', 'Aventura', 'Comedia', 'Drama', 'Ecchi', 'Fantasía', 'Terror',
        'Mahou Shoujo', 'Mecha', 'Música', 'Misterio', 'Psicológico', 'Romance',
        'Ciencia Ficción', 'Recuentos de la Vida', 'Deportes', 'Sobrenatural', 'Thriller', 'Hentai'
    ];
    const STATUSES = ['En Emisión', 'Finalizado', 'En Pausa', 'Próximamente'];
    const THEMES = {
        'default': 'Claro',
        'theme-dark': 'Oscuro',
        'theme-ocean': 'Océano',
        'theme-retro': 'Retro',
        'theme-pixel': 'Pixel'
    };
    const DEFAULT_GENRE_COLORS = {
        'Acción': '#FFADAD', 'Aventura': '#FFD6A5', 'Comedia': '#FDFFB6', 'Drama': '#CAFFBF',
        'Fantasía': '#9BF6FF', 'Ciencia Ficción': '#A0C4FF', 'Misterio': '#BDB2FF',
        'Recuentos de la Vida': '#FFC6FF', 'Romance': '#FFD1DC', 'Deportes': '#E4F1EE',
        'Musical': '#F3E5AB', 'Terror': '#D3D3D3', 'Ecchi': '#F5B7B1',
        'Mahou Shoujo': '#E6E6FA', 'Mecha': '#A2D2FF', 'Psicológico': '#C8A2C8',
        'Sobrenatural': '#FFB3BA', 'Thriller': '#FFDFBA', 'Hentai': '#FFFFBA'
    };
    const PASTEL_PALETTE = [
        '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF', '#E7C6FF', '#C6E7FF',
        '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#C9BAFF', '#E1BAFF', '#FFBAE1', '#FFB3B3', '#FFD1B3',
        '#FFFFB3', '#B3FFB3', '#B3D9FF', '#D9B3FF', '#FFB3D9', '#FFB3C4', '#FFC4B3', '#FFFFC4', '#C4FFC4', '#C4E1FF',
        '#E1C4FF', '#FFC4E1', '#FFC4C4', '#FFD9C4', '#FFFFD9', '#D9FFD9', '#D9ECFF', '#ECD9FF', '#FFD9EC', '#FFD9D9',
        '#FFE6D9', '#FFFFE6', '#E6FFE6', '#E6F2FF', '#F2E6FF', '#FFE6F2', '#FFE6E6', '#FFF2E6', '#FFFFF2', '#F2FFF2',
        '#F2F8FF', '#F8F2FF', '#FFF2F8', '#FFF2F2', '#FFF8F2', '#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC',
        '#BFBFBF', '#B3B3B3', '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959', '#4D4D4D',
        '#FADADD', '#FADDE2', '#FADFEA', '#FAE1F2', '#FAE3FA', '#F2E3FA', '#EAE3FA', '#E2E3FA', '#DDE3FA', '#DDE2FA',
        '#DDF0FA', '#DDF7FA', '#DDFADD', '#E2FADd', '#EAFADd', '#F2FADd', '#FAFADd', '#FADDE2', '#FADFEA', '#FAE1F2',
        '#FAE3FA', '#F2E3FA', '#EAE3FA', '#E2E3FA', '#DDE3FA', '#DDE2FA', '#DDF0FA', '#DDF7FA', '#DDFADD', '#E2FADd'
    ];
    const ANILIST_API_URL = 'https://graphql.anilist.co';

    const dom = {
        pages: document.querySelectorAll('.page'),
        homeSection: document.getElementById('home-section'),
        mainAppContainer: document.getElementById('main-app-container'),
        enterAppButton: document.getElementById('enter-app-button'),
        calendarSection: document.getElementById('calendar-section'),
        allAnimesGrid: document.getElementById('all-animes-grid'),
        shelfView: document.getElementById('shelf-view'),
        galleryGrid: document.getElementById('gallery-grid'),
        historyList: document.getElementById('history-list'),
        statsChart: document.getElementById('stats-chart'),
        addEntryModal: document.getElementById('add-entry-modal'),
        entryForm: document.getElementById('entry-form'),
        cancelButton: document.getElementById('cancel-button'),
        entryDayInput: document.getElementById('entry-day'),
        yearSelect: document.getElementById('ano'),
        statusSelect: document.getElementById('status'),
        genreCheckboxesContainer: document.getElementById('genre-checkboxes'),
        themeSelect: document.getElementById('theme-select'),
        searchBar: document.getElementById('search-bar'),
        genreFilterButtons: document.getElementById('genre-filter-buttons'),
        statusFilterButtons: document.getElementById('status-filter-buttons'),
        gridViewBtn: document.getElementById('grid-view-btn'),
        shelfViewBtn: document.getElementById('shelf-view-btn'),
        historySortButtons: document.querySelector('#history-section .filter-group'),
        exportBtn: document.getElementById('export-data-btn'),
        importInput: document.getElementById('import-file-input'),
        fileNameDisplay: document.getElementById('file-name-display'),
        messageModal: document.getElementById('message-modal'),
        messageText: document.getElementById('message-text'),
        messageOkBtn: document.getElementById('message-ok-btn'),
        confirmationModal: document.getElementById('confirmation-modal'),
        confirmationMessage: document.getElementById('confirmation-message'),
        confirmOkBtn: document.getElementById('confirm-ok-btn'),
        confirmCancelBtn: document.getElementById('confirm-cancel-btn'),
        detailsModal: document.getElementById('details-modal'),
        genreColorSelect: document.getElementById('genre-color-select'),
        genreColorPreview: document.getElementById('genre-color-preview'),
        colorPalette: document.getElementById('color-palette'),
        colorConflictMessage: document.getElementById('color-conflict-message'),
        saveColorSettingsBtn: document.getElementById('save-color-settings-btn'),
        homeAnimeBubblesContainer: document.getElementById('home-anime-bubbles'),
        homeTopNav: document.getElementById('home-top-nav'),
        homeSearchInput: document.getElementById('home-search-input'),
        searchResultsSection: document.getElementById('search-results-section'),
        searchQueryDisplay: document.getElementById('search-query-display'),
        searchResultsGrid: document.getElementById('search-results-grid'),
        mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
        mobileMenuPanel: document.querySelector('.mobile-menu-panel'),
        mobileMenuClose: document.querySelector('.mobile-menu-close'),
        desktopNav: document.querySelector('.desktop-nav'),
        mobileNav: document.querySelector('.mobile-nav'),
        navLogo: document.querySelector('.app-header .logo-title'),
        desktopNavLinks: document.querySelectorAll('.desktop-nav .nav-link[data-page]'),
        mobileNavLinks: document.querySelectorAll('.mobile-nav .nav-link-mobile[data-page]'),
        modalTabs: document.querySelector('.modal-tabs'),
        tabContents: document.querySelectorAll('.tab-content'),
        anilistSearchInput: document.getElementById('anilist-search-input'),
        anilistResultsContainer: document.getElementById('anilist-results'),
        anilistRecommendationsTitle: document.getElementById('anilist-recommendations-title'),
        imageUploadLabel: document.getElementById('image-upload-label'),
        imageUrlLabel: document.getElementById('image-url-label'),
        imageUrlInput: document.getElementById('imagen-url'),
        welcomeModal: document.getElementById('welcome-modal'),
        welcomeForm: document.getElementById('welcome-form'),
        notificationTimeInput: document.getElementById('notification-time'),
        notificationStatus: document.getElementById('notification-status'),
        saveNotificationBtn: document.getElementById('save-notification-settings-btn'),
        disableNotificationsBtn: document.getElementById('disable-notifications-btn')
    };

    // ===================================================================================
    // --- STATE MANAGEMENT ---
    // ===================================================================================
    let state = {
        db: null,
        homeBubbles: [],
        animationFrameId: null,
        calendarData: {},
        watchLog: [],
        genreColors: { ...DEFAULT_GENRE_COLORS },
        tempGenreColors: {},
        isCalendarCompact: true,
        historySortOrder: 'date',
        calendarSortOrder: 'creationDate',
        draggedItem: { day: null, id: null },
        anilistSearchResults: []
    };

    async function loadState() {
        state.calendarData = JSON.parse(localStorage.getItem('cronoseriesDataV4')) || {};
        state.watchLog = JSON.parse(localStorage.getItem('cronoseriesWatchLogV4')) || [];
        
        DAYS_OF_WEEK.forEach(day => {
            if (!state.calendarData[day]) state.calendarData[day] = [];
        });

        const savedColors = localStorage.getItem('customGenreColorsV4');
        if (savedColors) {
            state.genreColors = { ...DEFAULT_GENRE_COLORS, ...JSON.parse(savedColors) };
        }

        const allImagesInDB = await getAllImages();
        const existingImageIds = new Set(allImagesInDB.map(img => img.id));

        for (const day of DAYS_OF_WEEK) {
            for (const entry of state.calendarData[day]) {
                if (!entry.creationDate) {
                    entry.creationDate = new Date(0).toISOString();
                }

                if (!entry.imageId || !existingImageIds.has(entry.imageId)) {
                    const newImageId = crypto.randomUUID();
                    entry.imageId = newImageId;

                    if (entry.imagen && typeof entry.imagen === 'string' && (entry.imagen.startsWith('http') || entry.imagen.startsWith('data:image'))) {
                        try {
                            let blob;
                            let mimeType;
                            if (entry.imagen.startsWith('data:image')) {
                                const parts = entry.imagen.split(',');
                                mimeType = parts[0].match(/:(.*?);/)[1];
                                const byteString = atob(parts[1]);
                                const ab = new ArrayBuffer(byteString.length);
                                const ia = new Uint8Array(ab);
                                for (let i = 0; i < byteString.length; i++) {
                                    ia[i] = byteString.charCodeAt(i);
                                }
                                blob = new Blob([ab], { type: mimeType });
                            } else {
                                const response = await fetch(entry.imagen);
                                if (!response.ok) throw new Error('Failed to fetch old image from URL.');
                                blob = await response.blob();
                                mimeType = blob.type;
                            }
                            const base64 = await blobToBase64(blob);
                            await storeImage(newImageId, base64, mimeType);
                        } catch (error) {
                            console.error(`[MIGRATION] Error fetching/storing old image for ${entry.descripcion}:`, error);
                            await storeImage(newImageId, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'image/png');
                        }
                    } else {
                        await storeImage(newImageId, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'image/png');
                    }
                    delete entry.imagen;
                }
            }
        }
        saveData();
    }

    function saveData() {
        try {
            localStorage.setItem('cronoseriesDataV4', JSON.stringify(state.calendarData));
        } catch (e) {
            console.error("Error al guardar datos en localStorage:", e);
            showMessage("Error al guardar los datos. Es posible que el almacenamiento esté lleno.");
        }
    }

    function saveWatchLog() {
        localStorage.setItem('cronoseriesWatchLogV4', JSON.stringify(state.watchLog));
    }

    function logWatchedEpisodes(count) {
        const todayStr = new Date().toISOString().split('T')[0];
        const todayLog = state.watchLog.find(log => log.date === todayStr);
        if (todayLog) {
            todayLog.count += count;
        } else {
            state.watchLog.push({ date: todayStr, count });
        }
        saveWatchLog();
    }

    // ===================================================================================
    // --- DATABASE (IndexedDB) ---
    // ===================================================================================
    function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = e => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(IMAGE_STORE_NAME)) {
                    db.createObjectStore(IMAGE_STORE_NAME, { keyPath: 'id' });
                }
            };
            request.onsuccess = e => {
                state.db = e.target.result;
                resolve(state.db);
            };
            request.onerror = e => {
                console.error("Error al abrir IndexedDB:", e.target.error);
                reject(e.target.error);
            };
        });
    }

    function dbRequest(storeName, mode, action, data) {
        return new Promise((resolve, reject) => {
            if (!state.db) return reject(new Error("La base de datos no está inicializada."));
            try {
                const transaction = state.db.transaction([storeName], mode);
                const store = transaction.objectStore(storeName);
                let request;
                switch (action) {
                    case 'put': request = store.put(data); break;
                    case 'get': request = store.get(data); break;
                    case 'getAll': request = store.getAll(); break;
                    case 'delete': request = store.delete(data); break;
                    case 'clear': request = store.clear(); break;
                    default: return reject(new Error(`Acción de base de datos no válida: ${action}`));
                }
                transaction.oncomplete = () => resolve(request ? request.result : undefined);
                transaction.onerror = e => reject(e.target.error);
            } catch (error) {
                reject(error);
            }
        });
    }

    const storeImage = (id, base64, mimeType) => dbRequest(IMAGE_STORE_NAME, 'readwrite', 'put', { id, base64, mimeType });
    
    const getImage = async (id) => {
        const result = await dbRequest(IMAGE_STORE_NAME, 'readonly', 'get', id);
        if (result && result.base64 && result.mimeType) {
            const byteString = atob(result.base64.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: result.mimeType });
        }
        return null;
    };

    const getAllImages = () => dbRequest(IMAGE_STORE_NAME, 'readonly', 'getAll');
    const deleteImage = (id) => dbRequest(IMAGE_STORE_NAME, 'readwrite', 'delete', id);
    const clearImages = () => dbRequest(IMAGE_STORE_NAME, 'readwrite', 'clear');

    // ===================================================================================
    // --- UI RENDERING ---
    // ===================================================================================
    function renderAll() {
        renderWelcomePreview();
        renderCalendar();
        renderAllAnimes();
        renderGallery();
        renderHistory();
        renderStatsChart();
        renderNotificationSettings();
    }

    async function renderWelcomePreview() {
        const todayIndex = new Date().getDay();
        const todayName = DAYS_OF_WEEK[todayIndex];
        document.getElementById('home-day-of-week').textContent = `Hoy es ${todayName}`;
        
        let totalWatchedEpisodes = 0;
        Object.values(state.calendarData).forEach(dayList => {
            dayList.forEach(entry => {
                if (entry.watchedEpisodes) {
                    totalWatchedEpisodes += entry.watchedEpisodes.filter(Boolean).length;
                }
            });
        });
        document.getElementById('home-total-animes').textContent = totalWatchedEpisodes;

        await initializeHomeAnimeBubbles();
        if (!state.animationFrameId) {
            physicsLoop();
        }
    }

    async function initializeHomeAnimeBubbles() {
        dom.homeAnimeBubblesContainer.innerHTML = '';
        state.homeBubbles = [];
        const todayIndex = new Date().getDay();
        const todayName = DAYS_OF_WEEK[todayIndex];
        const animesToday = state.calendarData[todayName] || [];
        if (animesToday.length === 0) {
            dom.homeAnimeBubblesContainer.innerHTML = '<p style="text-align: center;">No hay animes para hoy.</p>';
            return;
        }
        const containerRect = dom.homeAnimeBubblesContainer.getBoundingClientRect();
        for (const entry of animesToday) {
            const bubbleEl = document.createElement('div');
            const radius = Math.random() * (75 - 30) + 30;
            const size = radius * 2;
            let x, y, hasOverlap, attempt = 0;
            do {
                hasOverlap = false;
                x = Math.random() * (containerRect.width - size) + radius;
                y = Math.random() * (containerRect.height - size) + radius;
                for (const other of state.homeBubbles) {
                    if (Math.hypot(x - other.x, y - other.y) < radius + other.radius) {
                        hasOverlap = true;
                        break;
                    }
                }
                attempt++;
            } while (hasOverlap && attempt < 100);
            bubbleEl.className = 'anime-bubble';
            bubbleEl.title = entry.descripcion;
            bubbleEl.style.width = `${size}px`;
            bubbleEl.style.height = `${size}px`;
            bubbleEl.style.transform = `translate(${x - radius}px, ${y - radius}px)`;
            if (entry.imageId) {
                try {
                    const imageBlob = await getImage(entry.imageId);
                    if (imageBlob) {
                        bubbleEl.style.backgroundImage = `url(${URL.createObjectURL(imageBlob)})`;
                    }
                } catch (error) { console.error("Fallo al cargar imagen para burbuja:", error); }
            }
            dom.homeAnimeBubblesContainer.appendChild(bubbleEl);
            state.homeBubbles.push({
                el: bubbleEl, x, y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius,
                mass: Math.PI * radius * radius,
            });
        }
    }

    function renderCalendar() {
        const todayIndex = new Date().getDay();
        let daysToRender = DAYS_OF_WEEK;
        if (state.isCalendarCompact) {
            const dayOrder = [(todayIndex - 1 + 7) % 7, todayIndex, (todayIndex + 1) % 7];
            daysToRender = dayOrder.map(i => DAYS_OF_WEEK[i]);
        }
        dom.calendarSection.innerHTML = `
        <div class="view-controls">
            <div class="sort-controls">
                <select class="calendar-sort-select">
                    <option value="creationDate">Ordenar por: Fecha</option>
                    <option value="name">Ordenar por: Nombre (A-Z)</option>
                    <option value="year">Ordenar por: Año</option>
                </select>
            </div>
            <button id="view-toggle-button" class="main-button small-button">${state.isCalendarCompact ? 'Ver Completo' : 'Ver Compacto'}</button>
        </div>` +
        daysToRender.map(day => {
            const isToday = day === DAYS_OF_WEEK[todayIndex];
            const originalSeries = state.calendarData[day] || [];
            
            let activeSeries = [...originalSeries.filter(entry => entry.status !== 'Finalizado')];

            switch(state.calendarSortOrder) {
                case 'name':
                    activeSeries.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
                    break;
                case 'year':
                    activeSeries.sort((a, b) => b.ano - a.ano);
                    break;
                case 'creationDate':
                default:
                    activeSeries.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
                    break;
            }
            
            const seriesHTML = activeSeries.map((entry) => createExpressiveCardHTML(entry, day)).join('');
            
            const addCardHTML = `
                <div class="add-card-button" data-day="${day}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Añadir Serie</span>
                </div>`;

            return `<div class="day-row">
                        <div class="day-header">
                            <h3>${day} ${isToday ? '(Hoy)' : ''} <span class="anime-count">${activeSeries.length}</span></h3>
                            ${activeSeries.length > 0 ? `<button class="main-button small-button mark-day-watched-btn" data-day="${day}">Marcar Visto</button>` : ''}
                        </div>
                        <div class="series-list-horizontal" data-day="${day}">
                            ${seriesHTML}
                            ${addCardHTML}
                        </div>
                    </div>`;
        }).join('');
        document.querySelector('.calendar-sort-select').value = state.calendarSortOrder;
        loadCardImages();
    }

    function renderAllAnimes(filter = {}) {
        let allEntries = [];
        Object.keys(state.calendarData).forEach(day => {
            state.calendarData[day].forEach((entry, index) => { allEntries.push({ ...entry, day, index }); });
        });
        if (filter.name) allEntries = allEntries.filter(e => e.descripcion.toLowerCase().includes(filter.name.toLowerCase()));
        if (filter.genre && filter.genre !== 'Todos') allEntries = allEntries.filter(e => e.genres.includes(filter.genre));
        if (filter.status && filter.status !== 'Todos') allEntries = allEntries.filter(e => e.status === filter.status);
        dom.allAnimesGrid.innerHTML = allEntries.length > 0 ? allEntries.map(e => createCardHTML(e, e.day)).join('') : `<p>No se encontraron animes.</p>`;
        dom.shelfView.innerHTML = allEntries.length > 0 ? allEntries.map(e => createSpineHTML(e)).join('') : `<p>No se encontraron animes.</p>`;
        loadCardImages();
    }

    function renderGallery() {
        const allEntries = new Map();
        Object.entries(state.calendarData).forEach(([day, entries]) => {
            entries.forEach(entry => {
                if (!allEntries.has(entry.imageId)) {
                    allEntries.set(entry.imageId, { ...entry, day });
                }
            });
        });

        const galleryHTML = Array.from(allEntries.values()).map(createGalleryCardHTML).join('');
        
        dom.galleryGrid.innerHTML = galleryHTML.length > 0 ? galleryHTML : `<p>No hay animes para mostrar en la galería.</p>`;
        loadCardImages();
    }

    function renderHistory() {
        let completedAnimes = [];
        Object.keys(state.calendarData).forEach(day => {
            state.calendarData[day].forEach(entry => {
                if (entry.completionDate) {
                    completedAnimes.push({ ...entry, originalDay: day });
                }
            });
        });
        if (state.historySortOrder === 'date') {
            completedAnimes.sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate));
        } else if (state.historySortOrder === 'name') {
            completedAnimes.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
        }
        dom.historyList.innerHTML = completedAnimes.length > 0 ? completedAnimes.map(createHistoryCardHTML).join('') : `<p>Aún no has completado ningún anime.</p>`;
        loadCardImages();
    }

    function renderStatsChart() {
        const last7DaysData = {};
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            last7DaysData[dateStr] = { count: 0, day: DAYS_OF_WEEK[d.getDay()], genres: [] };
        }
        state.watchLog.forEach(log => {
            if (last7DaysData[log.date]) {
                last7DaysData[log.date].count += log.count;
            }
        });
        Object.keys(state.calendarData).forEach(day => {
            state.calendarData[day].forEach(entry => {
                if (entry.watchedEpisodes) {
                    const genres = entry.genres || [];
                    Object.values(last7DaysData).forEach(data => {
                        if (!data.genres.some(g => genres.includes(g))) {
                            data.genres.push(...genres);
                        }
                    });
                }
            });
        });
        const maxCount = Math.max(1, ...Object.values(last7DaysData).map(d => d.count));
        dom.statsChart.innerHTML = Object.entries(last7DaysData).reverse().map(([date, data]) => {
            const backgroundStyle = getBackgroundProperties({ genres: data.genres });
            return `<div class="chart-bar-wrapper">
                        <div class="y-axis-label">${data.day}</div>
                        <div class="bar" style="width: ${(data.count / maxCount) * 100}%; ${backgroundStyle}"></div>
                        <div class="bar-value">${data.count}</div>
                    </div>`;
        }).join('');
    }

    function createExpressiveCardHTML(entry, day) {
        const watchedCount = entry.watchedEpisodes ? entry.watchedEpisodes.filter(Boolean).length : 0;
        const totalEpisodes = entry.totalEpisodios;
        const progressPercentage = totalEpisodes > 0 ? (watchedCount / totalEpisodes) * 100 : 0;
        
        const cardBorderStyle = getBorderStyle(entry);
        const backgroundProperties = getBackgroundProperties(entry);

        return `
            <div class="card expressive-card" draggable="true" data-day="${day}" data-id="${entry.imageId}" data-image-id="${entry.imageId}" ${cardBorderStyle}>
                <div class="card-overlay">
                    <div class="card-status">${entry.status}</div>
                    <div class="card-info">
                        <h4>${entry.descripcion}</h4>
                        <p>${entry.ano}</p>
                    </div>
                    <div class="progress-wrapper">
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${progressPercentage}%; ${backgroundProperties}"></div>
                        </div>
                        <p class="progress-text-expressive">${watchedCount} / ${totalEpisodes}</p>
                    </div>
                </div>
            </div>`;
    }

    function createCardHTML(entry, day) {
        const watchedCount = entry.watchedEpisodes ? entry.watchedEpisodes.filter(Boolean).length : 0;
        const totalEpisodes = entry.totalEpisodios;
        const progressPercentage = totalEpisodes > 0 ? (watchedCount / totalEpisodes) * 100 : 0;
        const cardBorderStyle = getBorderStyle(entry);
        const backgroundProperties = getBackgroundProperties(entry);
        return `<div class="card" data-day="${day}" data-id="${entry.imageId}" ${cardBorderStyle}>
                    <div class="card-image-container" style="${backgroundProperties}">
                        <div class="card-image-wrapper">
                            <img data-image-id="${entry.imageId}" alt="${entry.descripcion}" src="https://placehold.co/120x120/cccccc/000000?text=Cargando..." onerror="this.src='https://placehold.co/120x120/cccccc/000000?text=No+Image';">
                        </div>
                    </div>
                    <h4>${entry.descripcion}</h4>
                    <p>${entry.ano}</p>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${progressPercentage}%; ${backgroundProperties}"></div>
                    </div>
                    <p class="progress-text">${watchedCount} / ${totalEpisodes}</p>
                </div>`;
    }
    
    function createHistoryCardHTML(entry) {
        const cardBorderStyle = getBorderStyle(entry);
        const imageContainerBackground = getBackgroundProperties(entry);
        const displayDay = entry.originalDay.charAt(0).toUpperCase() + entry.originalDay.slice(1);
        return `<div class="history-card" data-day="${entry.originalDay}" data-id="${entry.imageId}" ${cardBorderStyle}>
                    <div class="card-image-container" style="${imageContainerBackground}">
                        <div class="card-image-wrapper">
                            <img data-image-id="${entry.imageId}" alt="${entry.descripcion}" src="https://placehold.co/120x120/cccccc/000000?text=Cargando..." onerror="this.src='https://placehold.co/120x120/cccccc/000000?text=No+Image';">
                        </div>
                    </div>
                    <div class="history-info">
                        <h4>${entry.descripcion}</h4>
                        <p><strong>Completado:</strong> ${new Date(entry.completionDate).toLocaleDateString()}</p>
                        <p><strong>Día de Emisión:</strong> ${displayDay}</p>
                        <p><strong>Episodios:</strong> ${entry.totalEpisodios}</p>
                    </div>
                </div>`;
    }

    function createSpineHTML(entry) {
        const borderStyle = getBorderStyle(entry);
        return `<div class="manga-spine" data-day="${entry.day}" data-id="${entry.imageId}" ${borderStyle}>
                    <div class="spine-cover-preview"><img data-image-id="${entry.imageId}" alt="${entry.descripcion}" onerror="this.src='https://placehold.co/40x40/cccccc/000000?text=No+Image';"></div>
                    <div class="spine-title">${entry.descripcion}</div>
                </div>`;
    }

    function createGalleryCardHTML(entry) {
        const genreColor = (entry.genres && entry.genres.length > 0) ? state.genreColors[entry.genres[0]] : 'var(--border-color)';
        const backgroundProperties = getBackgroundProperties(entry);

        return `
            <div class="gallery-item" style="--genre-color: ${genreColor};">
                <div class="gallery-item-inner" data-day="${entry.day}" data-id="${entry.imageId}">
                    <div class="gallery-item-front">
                        <img data-image-id="${entry.imageId}" alt="${entry.descripcion}" src="https://placehold.co/180x250/cccccc/000000?text=Cargando...">
                    </div>
                    <div class="gallery-item-back" style="${backgroundProperties}">
                        <h4 class="gallery-back-title">${entry.descripcion}</h4>
                        <div class="gallery-back-footer">
                            <span>${entry.ano}</span>
                            <span>${entry.totalEpisodios} Episodios</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async function loadCardImages() {
        const imagesToLoad = document.querySelectorAll('[data-image-id]');
        const defaultPlaceholder = 'https://placehold.co/120x120/cccccc/000000?text=No+Image';

        for (const el of imagesToLoad) {
            const imageId = el.dataset.imageId;
            
            if (!imageId) {
                if (el.tagName === 'IMG') {
                    el.src = defaultPlaceholder;
                } else {
                    el.style.backgroundImage = `url(${defaultPlaceholder})`;
                }
                continue;
            }

            try {
                const imageBlob = await getImage(imageId);
                if (imageBlob) {
                    const imageUrl = URL.createObjectURL(imageBlob);
                    if (el.tagName === 'IMG') {
                        el.src = imageUrl;
                        el.onload = () => URL.revokeObjectURL(imageUrl); // Revoke after load
                        el.onerror = () => el.src = defaultPlaceholder;
                    } else {
                        el.style.backgroundImage = `url(${imageUrl})`;
                    }

                    if (el.closest('.gallery-item-front')) {
                        const updateGalleryItemHeight = () => {
                            const parentInner = el.closest('.gallery-item-inner');
                            if (parentInner) {
                                let calculatedHeight = 200;
                                if (el.naturalWidth > 0 && el.naturalHeight > 0) {
                                    calculatedHeight = el.naturalHeight * (parentInner.offsetWidth / el.naturalWidth);
                                }
                                parentInner.style.height = `${Math.max(calculatedHeight, 150)}px`;

                                if (el.naturalHeight > el.naturalWidth) {
                                    parentInner.classList.add('is-vertical-image');
                                } else {
                                    parentInner.classList.remove('is-vertical-image');
                                }
                            }
                        };

                        if (el.complete && el.naturalWidth > 0) {
                            updateGalleryItemHeight();
                        } else {
                            el.onload = () => {
                                updateGalleryItemHeight();
                                URL.revokeObjectURL(imageUrl);
                            };
                        }
                    }
                } else {
                    if (el.tagName === 'IMG') {
                        el.src = defaultPlaceholder;
                    } else {
                        el.style.backgroundImage = `url(${defaultPlaceholder})`;
                    }
                }
            } catch (error) {
                console.error(`Error processing image for ID: ${imageId}:`, error);
                if (el.tagName === 'IMG') {
                    el.src = defaultPlaceholder;
                } else {
                    el.style.backgroundImage = `url(${defaultPlaceholder})`;
                }
            }
        }
    }


    function getBorderStyle(entry) {
        const cardGenres = entry.genres || [];
        const colors = cardGenres.map(g => state.genreColors[g]).filter(Boolean);
        if (colors.length === 1) return `style="border-color: ${colors[0]};"`;
        if (colors.length >= 2) {
            const gradientColors = colors.slice(0, 3).join(', ');
            return `style="border-image: linear-gradient(45deg, ${gradientColors}) 1;"`;
        }
        return '';
    }

    function getBackgroundProperties(entry) {
        const cardGenres = entry.genres || [];
        const colors = cardGenres.map(g => state.genreColors[g]).filter(Boolean);
        if (colors.length === 1) return `background: ${colors[0]};`;
        if (colors.length >= 2) {
            const gradientColors = colors.slice(0, 3).join(', ');
            return `background: linear-gradient(90deg, ${gradientColors});`;
        }
        return `background: var(--text-color);`;
    }

    // ===================================================================================
    // --- EVENT LISTENERS & HANDLERS ---
    // ===================================================================================
    function setupEventListeners() {
        dom.enterAppButton.addEventListener('click', () => navigateTo('calendar-section'));
        dom.homeTopNav.addEventListener('click', (e) => {
            const button = e.target.closest('.home-icon[data-page]');
            if (button) navigateTo(button.dataset.page);
        });
        dom.homeSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && dom.homeSearchInput.value.trim() !== '') {
                const query = dom.homeSearchInput.value.trim();
                navigateTo('search-results-section');
                renderSearchResults(query);
                dom.homeSearchInput.value = '';
            }
        });

        const handleNavClick = (e) => {
            const target = e.target.closest('[data-page]');
            if (target) {
                navigateTo(target.dataset.page);
                dom.mobileMenuPanel.classList.remove('is-open');
            }
        };
        dom.mobileMenuToggle.addEventListener('click', () => dom.mobileMenuPanel.classList.add('is-open'));
        dom.mobileMenuClose.addEventListener('click', () => dom.mobileMenuPanel.classList.remove('is-open'));
        dom.desktopNav.addEventListener('click', handleNavClick);
        dom.mobileNav.addEventListener('click', handleNavClick);
        dom.navLogo.addEventListener('click', handleNavClick);

        dom.cancelButton.addEventListener('click', closeModal);
        dom.addEntryModal.addEventListener('click', (e) => e.target === dom.addEntryModal && closeModal());
        dom.entryForm.addEventListener('submit', handleFormSubmit);
        dom.messageOkBtn.addEventListener('click', () => dom.messageModal.classList.remove('active'));

        dom.themeSelect.addEventListener('change', handleThemeChange);
        dom.searchBar.addEventListener('input', debounce(handleFilterChange, 300));
        dom.genreFilterButtons.addEventListener('click', handleFilterClick);
        dom.statusFilterButtons.addEventListener('click', handleFilterClick);
        dom.gridViewBtn.addEventListener('click', () => toggleAllAnimesView('grid'));
        dom.shelfViewBtn.addEventListener('click', () => toggleAllAnimesView('shelf'));
        dom.historySortButtons.addEventListener('click', handleHistorySort);
        
        dom.mainAppContainer.addEventListener('click', handleMainAppClick);
        dom.shelfView.addEventListener('click', handleMainAppClick);
        
        dom.mainAppContainer.addEventListener('dragstart', handleDragStart);
        dom.mainAppContainer.addEventListener('dragend', handleDragEnd);
        dom.mainAppContainer.addEventListener('dragover', handleDragOver);
        dom.mainAppContainer.addEventListener('drop', handleDrop);
        dom.mainAppContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('calendar-sort-select')) {
                handleCalendarSortChange(e);
            }
        });

        dom.exportBtn.addEventListener('click', exportData);
        dom.importInput.addEventListener('change', handleImportFileSelect);

        document.getElementById('details-close-btn').addEventListener('click', () => dom.detailsModal.classList.remove('active'));
        document.getElementById('details-edit-episodes-btn').addEventListener('click', handleEditEpisodesClick);
        document.getElementById('mark-all-episodes-btn').addEventListener('click', handleMarkAllEpisodesClick);
        document.getElementById('details-save-btn').addEventListener('click', handleSaveProgressClick);
        document.getElementById('details-delete-btn').addEventListener('click', handleDeleteEntryClick);

        dom.genreColorSelect.addEventListener('change', updateColorEditorUI);
        dom.colorPalette.addEventListener('click', handlePaletteClick);
        dom.saveColorSettingsBtn.addEventListener('click', saveColorSettings);

        dom.modalTabs.addEventListener('click', (e) => {
            const tabButton = e.target.closest('.tab-button');
            if (tabButton) {
                activateTab(tabButton.dataset.tab);
            }
        });
        dom.anilistSearchInput.addEventListener('input', debounce(() => {
            const query = dom.anilistSearchInput.value.trim();
            if (query.length > 2) {
                dom.anilistRecommendationsTitle.style.display = 'none';
                searchAniList(query);
            } else if (query.length === 0) {
                dom.anilistRecommendationsTitle.style.display = 'block';
                searchAniList('popular');
            }
        }, 500));

        dom.anilistResultsContainer.addEventListener('click', handleAniListResultClick);

        dom.welcomeForm.addEventListener('submit', handleWelcomeFormSubmit);
        dom.saveNotificationBtn.addEventListener('click', handleSaveNotificationSettings);
        dom.disableNotificationsBtn.addEventListener('click', handleDisableNotifications);
    }
    
    async function handleMainAppClick(e) {
        const target = e.target;
        const expressiveCard = target.closest('.expressive-card');
        const galleryItem = target.closest('.gallery-item-inner');
        const card = target.closest('.card:not(.expressive-card), .manga-spine, .history-card');
        const addCard = target.closest('.add-card-button');

        if (target.matches('#view-toggle-button')) {
            toggleCalendarView();
        } else if (addCard) {
            openModal(addCard.dataset.day);
        } else if (target.matches('.mark-day-watched-btn')) {
            handleMarkDayAsWatched(target.dataset.day);
        } else if (expressiveCard) {
            const { day, id } = expressiveCard.dataset;
            if (day && id) {
                openDetailsModal(day, id);
            }
        } else if (galleryItem) {
            const frontEl = galleryItem.querySelector('.gallery-item-front');
            const backEl = galleryItem.querySelector('.gallery-item-back');
            const imgEl = frontEl.querySelector('img');

            let targetHeight;
            if (galleryItem.parentElement.classList.contains('is-flipped')) {
                targetHeight = imgEl.naturalHeight * (frontEl.getBoundingClientRect().width / imgEl.naturalWidth);
            } else {
                const tempDiv = document.createElement('div');
                tempDiv.style.cssText = `
                    position: absolute;
                    visibility: hidden;
                    height: auto;
                    width: ${galleryItem.offsetWidth}px;
                    padding: ${window.getComputedStyle(backEl).paddingTop} ${window.getComputedStyle(backEl).paddingRight} ${window.getComputedStyle(backEl).paddingBottom} ${window.getComputedStyle(backEl).paddingLeft};
                    box-sizing: border-box;
                `;
                tempDiv.innerHTML = backEl.innerHTML;
                document.body.appendChild(tempDiv);
                targetHeight = tempDiv.offsetHeight;
                document.body.removeChild(tempDiv);
            }

            targetHeight = Math.max(targetHeight, 150);
            galleryItem.style.height = `${targetHeight}px`;

            setTimeout(() => {
                galleryItem.parentElement.classList.toggle('is-flipped');
            }, 50);

        } else if (card) {
            const { day, id } = card.dataset;
            if (day && id) {
                openDetailsModal(day, id);
            }
        }
    }

    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const day = dom.entryDayInput.value;
        const localImageFile = document.getElementById('imagen').files[0];
        const imageUrl = dom.imageUrlInput.value.trim();

        let imageIdToUse = '';
        let imageBase64 = '';
        let imageMimeType = '';

        if (imageUrl) {
            try {
                showMessage('Descargando imagen desde URL...');
                const response = await fetch(imageUrl);
                if (!response.ok) throw new Error('Failed to fetch image from URL.');
                const blob = await response.blob();
                
                imageBase64 = await blobToBase64(blob);
                imageMimeType = blob.type;
                imageIdToUse = crypto.randomUUID();
                showMessage('Imagen desde URL cargada.');
            } catch (error) {
                console.error("Error al descargar imagen desde URL:", error);
                showMessage("No se pudo cargar la imagen desde la URL proporcionada. Intenta con un archivo local.");
                return;
            }
        } else if (localImageFile) {
            if (localImageFile.size === 0) {
                showMessage('El archivo de imagen seleccionado está vacío o es inválido.');
                return;
            }
            imageBase64 = await blobToBase64(localImageFile);
            imageMimeType = localImageFile.type;
            imageIdToUse = crypto.randomUUID();
        } else {
            showMessage('Por favor, selecciona una imagen de portada, introduce una URL o busca una en AniList.');
            return;
        }

        try {
            if (imageBase64 && imageMimeType) {
                await storeImage(imageIdToUse, imageBase64, imageMimeType);
            } else {
                imageIdToUse = '';
            }
            
            const totalEpisodios = parseInt(document.getElementById('totalEpisodios').value);
            const newEntry = {
                imageId: imageIdToUse,
                descripcion: document.getElementById('descripcion').value,
                synopsis: document.getElementById('synopsis').value,
                status: dom.statusSelect.value,
                ano: dom.yearSelect.value,
                genres: Array.from(document.querySelectorAll('#genre-checkboxes input:checked')).map(cb => cb.value),
                totalEpisodios: totalEpisodios,
                watchedEpisodes: new Array(totalEpisodios).fill(false),
                creationDate: new Date().toISOString()
            };
            state.calendarData[day].push(newEntry);
            saveData();
            renderAll();
            closeModal();
        } catch (error) {
            console.error("Error al guardar la nueva entrada:", error);
            showMessage("No se pudo guardar la serie. Revisa la consola para más detalles.");
        }
    }
    
    function handleFilterChange() {
        const activeGenreFilter = dom.genreFilterButtons.querySelector('.active')?.dataset.filterValue;
        const activeStatusFilter = dom.statusFilterButtons.querySelector('.active')?.dataset.filterValue;
        renderAllAnimes({ name: dom.searchBar.value, genre: activeGenreFilter, status: activeStatusFilter });
    }
    
    function handleFilterClick(e) {
        if (e.target.tagName !== 'BUTTON') return;
        const btn = e.target;
        const filterGroup = btn.parentElement;
        if (btn.classList.contains('active') && btn.dataset.filterValue !== 'Todos') {
            btn.classList.remove('active');
            filterGroup.querySelector('[data-filter-value="Todos"]').classList.add('active');
        } else {
            filterGroup.querySelectorAll('.main-button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        handleFilterChange();
    }
    
    function handleHistorySort(e) {
        if (e.target.tagName !== 'BUTTON') return;
        state.historySortOrder = e.target.dataset.sort;
        dom.historySortButtons.querySelectorAll('.main-button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderHistory();
    }
    
    function handleMarkDayAsWatched(day) {
        showConfirmation(`¿Marcar el siguiente episodio no visto de todos los animes de ${day}?`, () => {
            const seriesForDay = state.calendarData[day];
            if (!seriesForDay || seriesForDay.length === 0) return;
            let episodesMarked = 0;
            seriesForDay.forEach(entry => {
                if (entry.status !== 'Finalizado' && entry.watchedEpisodes) {
                    const firstUnwatchedIndex = entry.watchedEpisodes.indexOf(false);
                    if (firstUnwatchedIndex !== -1) {
                        entry.watchedEpisodes[firstUnwatchedIndex] = true;
                        episodesMarked++;
                        if (!entry.watchedEpisodes.includes(false)) {
                                if (!entry.completionDate) entry.completionDate = new Date().toISOString();
                            entry.status = 'Finalizado';
                        }
                    }
                }
            });
            if (episodesMarked > 0) {
                logWatchedEpisodes(episodesMarked);
                saveData();
                renderAll();
                showMessage(`${episodesMarked} episodio(s) marcado(s) como visto(s).`);
            } else {
                showMessage(`No había episodios sin ver para marcar en ${day}.`);
            }
        });
    }

    const handleEditEpisodesClick = () => {
        document.getElementById('episode-editor').style.display = 'block';
        document.getElementById('details-edit-episodes-btn').style.display = 'none';
        document.getElementById('details-save-btn').style.display = 'inline-flex';
    };
    const handleMarkAllEpisodesClick = () => {
        dom.detailsModal.querySelectorAll('.episode-checkbox-hidden').forEach(box => box.checked = true);
    };
    const handleSaveProgressClick = () => {
        const { day, id } = dom.detailsModal.dataset;
        saveEpisodeProgress(day, id);
    };
    const handleDeleteEntryClick = () => {
        const { day, id } = dom.detailsModal.dataset;
        dom.detailsModal.classList.remove('active');
        deleteEntry(day, id);
    };

    // ===================================================================================
    // --- DRAG & DROP AND SORTING LOGIC ---
    // ===================================================================================
    function handleCalendarSortChange(e) {
        state.calendarSortOrder = e.target.value;
        renderCalendar();
    }

    function handleDragStart(e) {
        const target = e.target.closest('.expressive-card');
        if (!target) return;
        
        state.draggedItem.day = target.dataset.day;
        state.draggedItem.id = target.dataset.id;
        
        setTimeout(() => {
            target.classList.add('dragging');
        }, 0);
    }

    function handleDragEnd(e) {
        const target = e.target.closest('.expressive-card');
        if (target) {
            target.classList.remove('dragging');
        }
        document.querySelectorAll('.series-list-horizontal.drag-over').forEach(list => {
            list.classList.remove('drag-over');
        });
    }

    function handleDragOver(e) {
        e.preventDefault();
        const targetList = e.target.closest('.series-list-horizontal');
        if (targetList) {
            document.querySelectorAll('.series-list-horizontal.drag-over').forEach(list => {
                list.classList.remove('drag-over');
            });
            targetList.classList.add('drag-over');
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        const targetList = e.target.closest('.series-list-horizontal');
        if (!targetList) return;

        const targetDay = targetList.dataset.day;
        const { day: sourceDay, id: sourceId } = state.draggedItem;

        if (targetDay && sourceDay && sourceId) {
            const sourceIndex = state.calendarData[sourceDay].findIndex(entry => entry.imageId === sourceId);
            if (sourceIndex > -1) {
                const [itemToMove] = state.calendarData[sourceDay].splice(sourceIndex, 1);
                
                if (targetDay === sourceDay) {
                    const targetCard = e.target.closest('.expressive-card');
                    if (targetCard) {
                        const targetId = targetCard.dataset.id;
                        const targetIndex = state.calendarData[targetDay].findIndex(entry => entry.imageId === targetId);
                        state.calendarData[targetDay].splice(targetIndex, 0, itemToMove);
                    } else {
                        state.calendarData[targetDay].push(itemToMove);
                    }
                } else {
                    state.calendarData[targetDay].push(itemToMove);
                }

                saveData();
                renderCalendar();
            }
        }

        state.draggedItem = { day: null, id: null };
        targetList.classList.remove('drag-over');
    }


    // ===================================================================================
    // --- NAVIGATION & VIEWS ---
    // ===================================================================================
    function navigateTo(pageId) {
        if (state.animationFrameId) {
            cancelAnimationFrame(state.animationFrameId);
            state.animationFrameId = null;
        }
        if (pageId === 'home-section') {
            dom.mainAppContainer.classList.remove('active');
            dom.homeSection.classList.add('active');
            renderWelcomePreview();
        } else {
            dom.mainAppContainer.classList.add('active');
            dom.homeSection.classList.remove('active');
            dom.pages.forEach(p => p.classList.remove('active'));
            const targetPage = document.getElementById(pageId);
            if (targetPage) targetPage.classList.add('active');
        }
        dom.desktopNavLinks.forEach(b => b.classList.toggle('active', b.dataset.page === pageId));
        dom.mobileNavLinks.forEach(b => b.classList.toggle('active', b.dataset.page === pageId));
        if (pageId === 'settings-section') renderColorEditor();
        if (pageId === 'calendar-section') renderCalendar();
        if (pageId === 'gallery-section') renderGallery();
        if (pageId === 'history-section') renderHistory();
    }

    function renderSearchResults(query) {
        dom.searchQueryDisplay.textContent = query;
        const lowerCaseQuery = query.toLowerCase();
        let allEntries = [];
        Object.keys(state.calendarData).forEach(day => {
            state.calendarData[day].forEach((entry, index) => {
                allEntries.push({ ...entry, day, index });
            });
        });
        const filteredEntries = allEntries.filter(entry => 
            entry.descripcion.toLowerCase().includes(lowerCaseQuery) ||
            (entry.genres && entry.genres.some(genre => genre.toLowerCase().includes(lowerCaseQuery)))
        );
        dom.searchResultsGrid.innerHTML = filteredEntries.length > 0
            ? filteredEntries.map(e => createCardHTML(e, e.day)).join('')
            : `<p>No se encontraron resultados para "<strong>${query}</strong>".</p>`;
        loadCardImages();
    }
    
    function toggleCalendarView() {
        state.isCalendarCompact = !state.isCalendarCompact;
        renderCalendar();
    }

    function toggleAllAnimesView(view) {
        if (view === 'grid') {
            dom.allAnimesGrid.style.display = 'grid';
            dom.shelfView.style.display = 'none';
            dom.gridViewBtn.classList.add('active');
            dom.shelfViewBtn.classList.remove('active');
        } else {
            dom.allAnimesGrid.style.display = 'none';
            dom.shelfView.style.display = 'flex';
            dom.gridViewBtn.classList.remove('active');
            dom.shelfViewBtn.classList.add('active');
        }
    }

    // ===================================================================================
    // --- MODALS & MESSAGES ---
    // ===================================================================================
    function showMessage(message) {
        dom.messageText.textContent = message;
        dom.messageModal.classList.add('active');
    }
    
    function showConfirmation(message, onConfirm, onCancel = () => {}) {
        dom.confirmationMessage.textContent = message;
        dom.confirmationModal.classList.add('active');
        const confirmHandler = () => { onConfirm(); cleanup(); };
        const cancelHandler = () => { onCancel(); cleanup(); };
        const cleanup = () => {
            dom.confirmOkBtn.removeEventListener('click', confirmHandler);
            dom.confirmCancelBtn.removeEventListener('click', cancelHandler);
            dom.confirmationModal.classList.remove('active');
        };
        dom.confirmOkBtn.addEventListener('click', confirmHandler, { once: true });
        dom.confirmCancelBtn.addEventListener('click', cancelHandler, { once: true });
    }
    
    async function openModal(day) {
        dom.entryForm.reset();
        dom.entryDayInput.value = day;
        document.getElementById('imagen').value = '';
        dom.imageUrlInput.value = '';

        dom.addEntryModal.classList.add('active');
        activateTab('anilist-tab');
        dom.anilistSearchInput.value = '';
        dom.anilistResultsContainer.innerHTML = '';
        dom.anilistRecommendationsTitle.style.display = 'block';

        await searchAniList('popular');
    }

    function closeModal() { dom.addEntryModal.classList.remove('active'); }

    async function openDetailsModal(day, id) {
        const entryIndex = state.calendarData[day].findIndex(e => e.imageId === id);
        if (entryIndex === -1) return;
        const entry = state.calendarData[day][entryIndex];

        if (!entry) return;
        document.getElementById('details-modal-title').textContent = entry.descripcion;
        document.getElementById('details-modal-meta').textContent = `${entry.ano}`;
        document.getElementById('details-modal-status').textContent = entry.status;
        document.getElementById('details-modal-synopsis').textContent = entry.synopsis || 'No disponible.';
        document.getElementById('details-modal-genres').innerHTML = (entry.genres || []).map(g => {
            const bgColor = state.genreColors[g] || 'var(--card-bg)';
            return `<span style="background-color: ${bgColor}; color: #000; border-color: ${bgColor};">${g}</span>`;
        }).join('');
        try {
            const imageBlob = await getImage(entry.imageId);
            document.getElementById('details-modal-img').src = imageBlob ? URL.createObjectURL(imageBlob) : '';
        } catch(e) {
            document.getElementById('details-modal-img').src = '';
        }
        
        document.getElementById('details-modal-episodes').innerHTML = Array.from({ length: entry.totalEpisodios }, (_, i) => {
            const epNum = i + 1;
            const isChecked = entry.watchedEpisodes && entry.watchedEpisodes[i];
            const episodeId = `ep-check-${day.replace(/[^a-zA-Z0-9]/g, '')}-${entry.imageId}-${epNum}`;
            return `
                <div>
                    <input type="checkbox" id="${episodeId}" class="episode-checkbox-hidden" data-ep-num="${epNum}" ${isChecked ? 'checked' : ''}>
                    <label for="${episodeId}" class="episode-tag">
                        Ep ${epNum}
                    </label>
                </div>
            `;
        }).join('');

        document.getElementById('episode-editor').style.display = 'none';
        document.getElementById('details-edit-episodes-btn').style.display = 'inline-flex';
        document.getElementById('details-save-btn').style.display = 'none';
        dom.detailsModal.dataset.day = day;
        dom.detailsModal.dataset.id = id;
        dom.detailsModal.classList.add('active');
    }

    async function translateSynopsis(text) {
        if (!text) return '';
        
        const synopsisTextarea = document.getElementById('synopsis');
        synopsisTextarea.value = 'Traduciendo sinopsis...';

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            const prompt = `Directly translate the following anime synopsis to Spanish. Do not include any introductory text, just the translation itself:\n\n${text}`;
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({ error: { message: 'Respuesta de la API no válida.' } }));
                throw new Error(`Error de la API: ${errorBody.error.message}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const translatedText = result.candidates[0].content.parts[0].text;
                const cleanedText = translatedText.replace(/^"|"$/g, '').trim();
                synopsisTextarea.value = cleanedText;
                return cleanedText;
            } else {
                console.warn('La respuesta de la traducción estaba vacía o mal formada.', result);
                throw new Error('La API no devolvió una traducción válida.');
            }
        } catch (error) {
            clearTimeout(timeoutId);
            console.error('Error al traducir la sinopsis:', error);
            let errorMessage = 'Error al traducir. Por favor, inténtalo de nuevo más tarde.';
            if (error.name === 'AbortError') {
                errorMessage = 'La traducción tardó demasiado. Revisa tu conexión a internet e inténtalo de nuevo.';
            } else if (error.message.includes('API')) {
                errorMessage = `Hubo un problema con el servicio de traducción. Inténtalo más tarde.`;
            }
            synopsisTextarea.value = `${errorMessage}\n\nOriginal:\n${text}`;
            return text;
        }
    }

    function activateTab(tabId) {
        dom.modalTabs.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        dom.tabContents.forEach(content => {
            content.classList.remove('active');
        });

        document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(tabId).classList.add('active');

        if (tabId === 'anilist-tab') {
            dom.imageUploadLabel.style.display = 'none';
            document.getElementById('imagen').style.display = 'none';
            dom.imageUrlLabel.style.display = 'none';
            dom.imageUrlInput.style.display = 'none';
            dom.anilistRecommendationsTitle.style.display = 'block';
            document.getElementById('imagen').value = ''; 
            dom.imageUrlInput.value = ''; 
        } else { // manual-tab
            dom.imageUploadLabel.style.display = 'block';
            document.getElementById('imagen').style.display = 'block';
            dom.imageUrlLabel.style.display = 'block';
            dom.imageUrlInput.style.display = 'block';
            dom.anilistRecommendationsTitle.style.display = 'none';
        }
    }

    async function searchAniList(query, type = 'ANIME') {
        dom.anilistResultsContainer.innerHTML = '<p style="text-align: center;">Cargando...</p>';
        let graphqlQuery;
        let variables;

        if (query === 'popular') {
            graphqlQuery = `
                query {
                    Page(perPage: 10, page: 1) {
                        media(type: ${type}, sort: POPULARITY_DESC, season: ${getCurrentSeason()}, seasonYear: ${new Date().getFullYear()}) {
                            id
                            title { romaji english native }
                            coverImage { large }
                            startDate { year }
                            genres
                            description
                            episodes
                            status
                        }
                    }
                }
            `;
            variables = {};
        } else {
            graphqlQuery = `
                query ($search: String, $type: MediaType) {
                    Page(perPage: 10) {
                        media(search: $search, type: $type, sort: POPULARITY_DESC) {
                            id
                            title { romaji english native }
                            coverImage { large }
                            startDate { year }
                            genres
                            description
                            episodes
                            status
                        }
                    }
                }
            `;
            variables = { search: query, type };
        }

        try {
            const response = await fetch(ANILIST_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ query: graphqlQuery, variables }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            state.anilistSearchResults = data.data.Page.media;
            renderAniListResults(state.anilistSearchResults);
        } catch (error) {
            console.error("Error al buscar en AniList:", error);
            dom.anilistResultsContainer.innerHTML = '<p style="text-align: center;">Error al cargar resultados. Intenta de nuevo.</p>';
        }
    }

    function createAniListResultCardHTML(anime) {
        const mappedGenres = anime.genres.filter(g => GENRES.includes(g));
        const genreColor = (mappedGenres.length > 0) ? state.genreColors[mappedGenres[0]] : 'var(--border-color)';
        const backgroundProperties = getBackgroundProperties({ genres: mappedGenres });

        const title = anime.title.romaji || anime.title.english || anime.title.native || 'Título Desconocido';
        const year = anime.startDate.year || 'N/A';
        const status = mapAniListStatus(anime.status);
        const totalEpisodes = anime.episodes || '?';
        const progressPercentage = 0;

        return `
            <div class="card expressive-card anilist-result-card" data-anilist-id="${anime.id}" style="border-color: ${genreColor};">
                <div class="card-overlay" style="background-image: url(${anime.coverImage.large || 'https://placehold.co/180x250/cccccc/000000?text=No+Image'}); background-size: cover; background-position: center;">
                    <div class="card-status">${status}</div>
                    <div class="card-info">
                        <h4>${title}</h4>
                        <p>${year} - ${totalEpisodes} Episodios</p>
                    </div>
                    <div class="progress-wrapper">
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${progressPercentage}%; ${backgroundProperties}"></div>
                        </div>
                        <p class="progress-text-expressive">0 / ${totalEpisodes}</p>
                    </div>
                </div>
            </div>
        `;
    }

    function renderAniListResults(results) {
        if (!results || results.length === 0) {
            dom.anilistResultsContainer.innerHTML = '<p style="text-align: center;">No se encontraron resultados.</p>';
            return;
        }
        dom.anilistResultsContainer.innerHTML = results.map(createAniListResultCardHTML).join('');
    }

    async function handleAniListResultClick(e) {
        const card = e.target.closest('.anilist-result-card');
        if (!card) return;

        const anilistId = parseInt(card.dataset.anilistId); 
        const selectedAnime = state.anilistSearchResults.find(anime => anime.id === anilistId);

        if (selectedAnime) {
            document.getElementById('descripcion').value = selectedAnime.title.romaji || selectedAnime.title.english || selectedAnime.title.native;
            
            const originalSynopsis = selectedAnime.description ? selectedAnime.description.replace(/<br>/g, '\n').replace(/<\/?i>/g, '') : '';
            translateSynopsis(originalSynopsis);

            dom.yearSelect.value = selectedAnime.startDate.year || new Date().getFullYear();
            dom.statusSelect.value = mapAniListStatus(selectedAnime.status);
            document.getElementById('totalEpisodios').value = selectedAnime.episodes || 0;
            
            GENRES.forEach(genre => {
                const checkbox = document.getElementById(`genre-check-${genre.replace(/[^a-zA-Z0-9]/g, '-')}`);
                if (checkbox) {
                    checkbox.checked = selectedAnime.genres.includes(genre);
                }
            });
            
            if (selectedAnime.coverImage && selectedAnime.coverImage.large) {
                dom.imageUrlInput.value = selectedAnime.coverImage.large;
            } else {
                dom.imageUrlInput.value = '';
            }
            
            document.getElementById('imagen').value = '';
            activateTab('manual-tab');
        }
    }

    function mapAniListStatus(anilistStatus) {
        switch (anilistStatus) {
            case 'FINISHED': return 'Finalizado';
            case 'RELEASING': return 'En Emisión';
            case 'NOT_YET_RELEASED': return 'Próximamente';
            case 'CANCELLED': 
            case 'HIATUS': return 'En Pausa';
            default: return 'En Emisión';
        }
    }

    function getCurrentSeason() {
        const month = new Date().getMonth() + 1;
        if (month >= 3 && month <= 5) return 'SPRING';
        if (month >= 6 && month <= 8) return 'SUMMER';
        if (month >= 9 && month <= 11) return 'FALL';
        return 'WINTER';
    }

    // ===================================================================================
    // --- CORE LOGIC ---
    // ===================================================================================
    function saveEpisodeProgress(day, id) {
        const entryIndex = state.calendarData[day].findIndex(e => e.imageId === id);
        if (entryIndex === -1) return;
        const entry = state.calendarData[day][entryIndex];
        
        const oldWatchedCount = entry.watchedEpisodes.filter(Boolean).length;
        
        dom.detailsModal.querySelectorAll('.episode-checkbox-hidden').forEach((box, i) => {
            entry.watchedEpisodes[i] = box.checked;
        });

        const newWatchedCount = entry.watchedEpisodes.filter(Boolean).length;
        if (newWatchedCount > oldWatchedCount) {
            logWatchedEpisodes(newWatchedCount - oldWatchedCount);
        }
        if (newWatchedCount === entry.totalEpisodios) {
            if (!entry.completionDate) entry.completionDate = new Date().toISOString();
            entry.status = 'Finalizado';
        } else {
            delete entry.completionDate;
            if (entry.status === 'Finalizado') entry.status = 'En Emisión';
        }
        saveData();
        renderAll();
        showMessage('Progreso guardado!');
        dom.detailsModal.classList.remove('active');
    }

    async function deleteEntry(day, id) {
        showConfirmation('¿Estás seguro de que quieres eliminar esta serie?', async () => {
            try {
                const entryIndex = state.calendarData[day].findIndex(e => e.imageId === id);
                if (entryIndex > -1) {
                    const entry = state.calendarData[day][entryIndex];
                    if (entry.imageId) await deleteImage(entry.imageId);
                    state.calendarData[day].splice(entryIndex, 1);
                    saveData();
                    renderAll();
                    showMessage('Serie eliminada correctamente.');
                }
            } catch (e) {
                showMessage("Hubo un error al eliminar la serie.");
            }
        });
    }

    function physicsLoop() {
        const containerRect = dom.homeAnimeBubblesContainer.getBoundingClientRect();
        if (containerRect.width === 0) {
            state.animationFrameId = requestAnimationFrame(physicsLoop);
            return;
        }
        state.homeBubbles.forEach((bubble, index) => {
            bubble.x += bubble.vx; bubble.y += bubble.vy;
            if (bubble.x - bubble.radius <= 0) { bubble.x = bubble.radius; bubble.vx *= -1; }
            if (bubble.x + bubble.radius >= containerRect.width) { bubble.x = containerRect.width - bubble.radius; bubble.vx *= -1; }
            if (bubble.y - bubble.radius <= 0) { bubble.y = bubble.radius; bubble.vy *= -1; }
            if (bubble.y + bubble.radius >= containerRect.height) { bubble.y = containerRect.height - bubble.radius; bubble.vy *= -1; }
            for (let i = index + 1; i < state.homeBubbles.length; i++) {
                const otherBubble = state.homeBubbles[i];
                const distance = Math.hypot(otherBubble.x - bubble.x, otherBubble.y - bubble.y);
                const minDistance = bubble.radius + otherBubble.radius;
                if (distance < minDistance) {
                    const angle = -Math.atan2(otherBubble.y - bubble.y, otherBubble.x - bubble.x);
                    const m1 = bubble.mass, m2 = otherBubble.mass;
                    const u1 = { x: bubble.vx * Math.cos(angle) - bubble.vy * Math.sin(angle), y: bubble.vx * Math.sin(angle) + bubble.vy * Math.cos(angle) };
                    const u2 = { x: otherBubble.vx * Math.cos(angle) - otherBubble.vy * Math.sin(angle), y: otherBubble.vx * Math.sin(angle) + otherBubble.vy * Math.cos(angle) };
                    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
                    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };
                    const vFinal1 = { x: v1.x * Math.cos(-angle) - v1.y * Math.sin(-angle), y: v1.x * Math.sin(-angle) + v1.y * Math.cos(-angle) };
                    const vFinal2 = { x: v2.x * Math.cos(-angle) - v2.y * Math.sin(-angle), y: v2.x * Math.sin(-angle) + v2.y * Math.cos(-angle) };
                    bubble.vx = vFinal1.x; bubble.vy = vFinal1.y;
                    otherBubble.vx = vFinal2.x; otherBubble.vy = vFinal2.y;
                    const overlap = 0.5 * (minDistance - distance + 1);
                    bubble.x -= overlap * (otherBubble.x - bubble.x) / distance;
                    bubble.y -= overlap * (otherBubble.y - bubble.y) / distance;
                    otherBubble.x += overlap * (otherBubble.y - bubble.y) / distance;
                    otherBubble.y += overlap * (otherBubble.y - bubble.y) / distance;
                }
            }
        });
        state.homeBubbles.forEach(bubble => {
            bubble.el.style.transform = `translate(${bubble.x - bubble.radius}px, ${bubble.y - bubble.radius}px)`;
        });
        state.animationFrameId = requestAnimationFrame(physicsLoop);
    }

    function renderColorEditor() {
        state.tempGenreColors = { ...state.genreColors };
        dom.genreColorSelect.innerHTML = GENRES.map(g => `<option value="${g}">${g}</option>`).join('');
        dom.colorPalette.innerHTML = PASTEL_PALETTE.map(color => `<div class="color-swatch" data-color="${color}" style="background-color: ${color};"></div>`).join('');
        updateColorEditorUI();
    }

    function updateColorEditorUI() {
        const selectedGenre = dom.genreColorSelect.value;
        const currentColor = state.tempGenreColors[selectedGenre];
        dom.genreColorPreview.style.backgroundColor = currentColor;
        dom.colorConflictMessage.textContent = '';
        dom.colorPalette.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.classList.remove('selected', 'in-use');
            swatch.removeAttribute('title');
            const color = swatch.dataset.color;
            const genreUsingColor = Object.keys(state.tempGenreColors).find(g => state.tempGenreColors[g] === color);
            if (genreUsingColor) {
                swatch.classList.add('in-use');
                swatch.title = `En uso por: ${genreUsingColor}`;
            }
            if (color === currentColor) {
                swatch.classList.add('selected');
            }
        });
    }
    
    function handlePaletteClick(e) {
        if (!e.target.matches('.color-swatch')) return;
        const selectedColor = e.target.dataset.color;
        const selectedGenre = dom.genreColorSelect.value;
        const genreUsingColor = Object.keys(state.tempGenreColors).find(g => state.tempGenreColors[g] === selectedColor);
        if (genreUsingColor && genreUsingColor !== selectedGenre) {
            dom.colorConflictMessage.textContent = `¡Error! El color ya está en uso por "${genreUsingColor}".`;
            return;
        }
        state.tempGenreColors[selectedGenre] = selectedColor;
        updateColorEditorUI();
    }
    
    function saveColorSettings() {
        state.genreColors = { ...state.tempGenreColors };
        localStorage.setItem('customGenreColorsV4', JSON.stringify(state.genreColors));
        showMessage('¡Colores guardados con éxito!');
        
        // Re-render components that use genre colors
        renderAll(); // This already calls everything needed
        populateCheckboxes(dom.genreCheckboxesContainer, GENRES); // Explicitly update modal checkboxes
        populateFilterButtons(); // Explicitly update filter buttons
    }
    
    async function exportData() {
        try {
            const images = await getAllImages(); // Esto ahora devuelve {id, base64, mimeType}
            const backupData = {
                calendarData: state.calendarData,
                watchLog: state.watchLog,
                images: images, // Las imágenes ya están en Base64
                genreColors: state.genreColors
            };
            const jsonString = JSON.stringify(backupData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `crono-series-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showMessage('¡Datos exportados con éxito!');
        } catch (error) {
            showMessage("Hubo un error al exportar los datos.");
        }
    }
    
    function handleImportFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;
        dom.fileNameDisplay.textContent = `Archivo: ${file.name}`;
        showConfirmation(
            `¿Importar desde "${file.name}"? Se borrarán todos los datos actuales.`,
            () => importData(file),
            () => {
                dom.importInput.value = '';
                dom.fileNameDisplay.textContent = '';
            }
        );
    }

    async function importData(file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const backupData = JSON.parse(e.target.result);
                if (typeof backupData !== 'object' || backupData === null || !backupData.calendarData) {
                    throw new Error("El archivo de respaldo no tiene el formato correcto.");
                }
                
                // Clear all current data
                await clearImages();
                localStorage.clear();

                // Load data from backup
                state.calendarData = backupData.calendarData || {};
                state.watchLog = backupData.watchLog || [];
                
                // --- FIX START ---
                // Handle genre colors correctly
                let importedColors = backupData.genreColors || {};
                // Merge with defaults to ensure all genres have a color, preserving customizations
                state.genreColors = { ...DEFAULT_GENRE_COLORS, ...importedColors }; 
                localStorage.setItem('customGenreColorsV4', JSON.stringify(state.genreColors));
                // --- FIX END ---

                if (backupData.images && Array.isArray(backupData.images)) {
                    for (const img of backupData.images) {
                        if (img && img.id && img.base64 && img.mimeType) {
                            await storeImage(img.id, img.base64, img.mimeType);
                        }
                    }
                }
                
                saveData();
                saveWatchLog();
                
                showMessage('¡Datos importados con éxito! La página se recargará.');
                setTimeout(() => window.location.reload(), 1500);
            } catch (error) {
                showMessage(`Error al importar: ${error.message}.`);
            } finally {
                dom.importInput.value = '';
                dom.fileNameDisplay.textContent = '';
            }
        };
        reader.readAsText(file);
    }
    
    // ===================================================================================
    // --- THEME SYSTEM ---
    // ===================================================================================
    function applyTheme(themeName) {
        document.body.className = '';
        if (themeName && themeName !== 'default') {
            document.body.classList.add(themeName);
        }
        dom.themeSelect.value = themeName;
    }

    function handleThemeChange(e) {
        const selectedTheme = e.target.value;
        applyTheme(selectedTheme);
        localStorage.setItem('themeV4', selectedTheme);
    }
    
    // ===================================================================================
    // --- INITIALIZATION ---
    // ===================================================================================
    function setupInitialUI() {
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i);
        populateSelect(dom.yearSelect, years);
        populateSelect(dom.statusSelect, STATUSES);
        populateCheckboxes(dom.genreCheckboxesContainer, GENRES);
        populateFilterButtons();
        
        dom.themeSelect.innerHTML = Object.entries(THEMES)
            .map(([value, text]) => `<option value="${value}">${text}</option>`)
            .join('');
        
        const savedTheme = localStorage.getItem('themeV4') || 'default';
        applyTheme(savedTheme);

        // --- NUEVO: Lógica de Bienvenida y Notificaciones ---
        if (!localStorage.getItem('hasVisited')) {
            dom.welcomeModal.classList.add('active');
        } else {
            navigateTo('home-section');
        }
        setInterval(checkAndSendNotification, 60000); // Revisar cada minuto
    }

    function populateSelect(selectElement, options) {
        selectElement.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
    }
    
    function populateCheckboxes(container, options) {
        container.innerHTML = options.map(option => {
            const color = state.genreColors[option] || '#cccccc';
            const optionId = `genre-check-${option.replace(/[^a-zA-Z0-9]/g, '-')}`;
            return `
                <div>
                    <input type="checkbox" id="${optionId}" name="genres" value="${option}" class="genre-checkbox-hidden">
                    <label for="${optionId}" class="genre-tag" style="background-color: ${color}; color: #433a3f;">
                        ${option}
                    </label>
                </div>
            `;
        }).join('');
    }

    function populateFilterButtons() {
        dom.genreFilterButtons.innerHTML = ['Todos', ...GENRES].map(g => {
            if (g === 'Todos') return `<button class="main-button small-button active" data-filter-type="genre" data-filter-value="${g}">${g}</button>`;
            const bgColor = state.genreColors[g] || 'var(--card-bg)';
            return `<button class="main-button small-button" data-filter-type="genre" data-filter-value="${g}" style="background-color: ${bgColor}; color: #000;">${g}</button>`;
        }).join('');
        dom.statusFilterButtons.innerHTML = ['Todos', ...STATUSES].map(s => `<button class="main-button small-button ${s === 'Todos' ? 'active' : ''}" data-filter-type="status" data-filter-value="${s}">${s}</button>`).join('');
    }

    // ===================================================================================
    // --- NOTIFICATION LOGIC ---
    // ===================================================================================
    function handleWelcomeFormSubmit(e) {
        e.preventDefault();
        const time = document.getElementById('welcome-notification-time').value;
        saveNotificationTime(time);
        localStorage.setItem('hasVisited', 'true');
        dom.welcomeModal.classList.remove('active');
        navigateTo('home-section');
    }

    function handleSaveNotificationSettings() {
        const time = dom.notificationTimeInput.value;
        saveNotificationTime(time);
    }

    function handleDisableNotifications() {
        localStorage.removeItem('notificationTime');
        showMessage('Notificaciones desactivadas.');
        renderNotificationSettings();
    }

    function saveNotificationTime(time) {
        if (!time) {
            showMessage('Por favor, selecciona una hora válida.');
            return;
        }
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                localStorage.setItem('notificationTime', time);
                showMessage(`Recordatorios guardados para las ${time}.`);
            } else {
                showMessage('No se pudo obtener permiso para las notificaciones.');
            }
            renderNotificationSettings();
        });
    }

    function renderNotificationSettings() {
        const savedTime = localStorage.getItem('notificationTime');
        if (savedTime) {
            dom.notificationTimeInput.value = savedTime;
            dom.notificationStatus.textContent = `Notificaciones activadas para las ${savedTime}.`;
        } else {
            dom.notificationTimeInput.value = '';
            dom.notificationStatus.textContent = 'Las notificaciones están desactivadas.';
        }
    }

    function checkAndSendNotification() {
        const notificationTime = localStorage.getItem('notificationTime');
        const lastNotificationDate = localStorage.getItem('lastNotificationDate');
        const todayStr = new Date().toISOString().split('T')[0];

        if (!notificationTime || Notification.permission !== 'granted' || lastNotificationDate === todayStr) {
            return;
        }

        const now = new Date();
        const [hours, minutes] = notificationTime.split(':');
        
        if (now.getHours() === parseInt(hours) && now.getMinutes() === parseInt(minutes)) {
            const todayIndex = now.getDay();
            const todayName = DAYS_OF_WEEK[todayIndex];
            const animesToday = state.calendarData[todayName] || [];
            
            let title, body;
            if (animesToday.length > 0) {
                title = '¡Tus animes para hoy!';
                body = animesToday.map(a => a.descripcion).join(', ');
                if (body.length > 100) {
                    body = body.substring(0, 97) + '...';
                }
            } else {
                title = 'Día libre de animes';
                body = 'Hoy no hay animes en tu calendario. ¡Disfruta tu día!';
            }

            new Notification(title, { body });
            localStorage.setItem('lastNotificationDate', todayStr);
        }
    }
    
    async function main() {
        try {
            await initDB();
            await loadState();
            setupInitialUI();
            setupEventListeners();
        } catch (error) {
            console.error("Fallo crítico al inicializar la aplicación:", error);
            document.body.innerHTML = `<div style="padding: 2rem; text-align: center; font-family: monospace;">
                <h1>Error Crítico</h1>
                <p>No se pudo iniciar la aplicación. Es posible que tu navegador no sea compatible con IndexedDB o que esté en modo de navegación privada.</p>
                <p>Por favor, intenta recargar la página o usa un navegador diferente.</p>
                <p><em>Detalles del error: ${error.message}</em></p>
            </div>`;
        }
    }

    // ===================================================================================
    // --- UTILITIES ---
    // ===================================================================================
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // --- PWA (Progressive Web App) SETUP ---
    function setupPWA() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('Service Worker registrado con éxito:', registration);
                })
                .catch(error => {
                    console.log('Fallo en el registro del Service Worker:', error);
                });
        }
    }

    main();
    setupPWA();
});
