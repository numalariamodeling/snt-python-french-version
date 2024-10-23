function toggleMenu(menuHeader) {
    const submenu = menuHeader.nextElementSibling;
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

function loadContent(page) {
    const content = {
        overview: `
            <h3 class="sidebar-title">Version: 3 octobre 2024 </h3>
            <h3 class="sidebar-title">Auteurs: Mohamed Sillah Kanu, Sammy Oppong, Jaline Gerardin </h3>
            <h2>Aperçu</h2>
            <h3>Motivation</h3>
            <p>Le SNT est là pour rester : de nombreux PNLP l'ont trouvé utile et continuent de l'adopter et de le développer pour répondre à leurs besoins analytiques. Depuis 2019, plusieurs personnes ont contribué aux parties analytiques du SNT. Dans la plupart des cas, ces individus ont développé leur propre code dans différentes langues (Stata, R, et Python), parfois en s'appuyant sur le code d'autres personnes, parfois en redéveloppant des parties indépendamment.
           
À mesure que le SNT mûrit, un contrôle de qualité accru est nécessaire pour que les PNLP puissent être sûrs que les analyses qu'ils utilisent pour prendre des décisions sont de haute qualité, quel que soit l'analyste impliqué. Le déploiement continu du SNT signifie également que l'analyse peut devenir plus efficace si les analystes sont capables de construire sur le travail des autres au lieu de réinventer ce qui a déjà été développé. Enfin, l'analyse du SNT peut devenir beaucoup plus accessible s'il existe une ressource commune permettant à ceux qui possèdent des compétences en codage intermédiaires d'accéder rapidement aux connaissances collectives de la communauté des analystes SNT.
.</p>

            <h3>Objectifs</h3>
            <p>Nous construirons une bibliothèque de code pour l'analyse SNT afin de :
            <p>1. Améliorer la qualité et la reproductibilité de l'analyse SNT en veillant à ce que les analystes utilisent des approches similaires et correctes.</p>
            <p>2. Améliorer l'efficacité de l'analyse SNT en minimisant les efforts en double.</p>
            <p>3. Promouvoir l'accessibilité de l'analyse SNT en réduisant les obstacles à l'entrée.</p>


            <h3>Public cible</h3>
            <p>Quiconque fait ce genre de travail. Nous supposons une connaissance de base de Python, une compréhension des données, et un lien étroit avec le PNLP.</p>


            <h3>Portée</h3>
            <p>Toutes les étapes d'analyse du SNT jusqu'à, mais sans inclure, la modélisation mathématique ; certaines analyses connexes.</p>
        `,

        shapefiles: `

           
            <div class="fixed-buttons" id="fixedButtons">
                <button class="text-button">On this page:</button>
                <button class="text-button" data-section="stepByStep" onclick="scrollToSection('stepByStep')">Étape par étape</button>
                <button class="text-button" data-section="fullCode" onclick="scrollToSection('fullCode')">Code complet</button>
                <button class="text-button" data-section="sampleR" onclick="scrollToSection('sampleR')">Exemple de sortie</button>
            </div>
        
            <h5>Assemblage et gestion des données/Fichiers</h5>
            <h3 style="color: #47B5FF;">Fichiers</h3>
            <p><em>Cette section explique le flux de travail d'importation et de gestion des shapefiles avec Python.</em></p>


            <div class="round-buttons">
                <button class="rect-button" onclick="window.location.href='https://numalariamodeling.github.io/snt-code-library-french-version/#shapefiles';">Vue R FR</button>
                <button class="rect-button" onclick="window.location.href='https://numalariamodeling.github.io/snt-python-english-version/#shapefiles';">Vue py EN</button>
                <button class="rect-button" onclick="window.location.href='https://numalariamodeling.github.io/snt-code-library-english-version/#shapefiles';">Vue R En</button>
                <button class="rect-button" onclick="window.location.href='https://numalariamodeling.github.io/snt-python-english-version/#shapefiles';">Vue St EN</button>
                <button class="rect-button" onclick="window.location.href='https://numalariamodeling.github.io/snt-code-library-english-version/#shapefiles';">Vue St En</button>

            </div>
           
            <h4 id="stepByStep">Étape par étape</h4>
            <h5 style="color: #ADD8E6;">Étape 1 : Installer les bibliothèques nécessaires</h5>
            
            <p>Avant de commencer, assurez-vous que vous avez installé les packages Python nécessaires.</p>
            <p>Cela peut être fait en utilisant le code suivant :</p>
            <pre><code>
# Installer les bibliothèques nécessaires

pip install geopandas matplotlib pandas      
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --></pre>
            <p>Ce code installe le package <code>geopandas</code> pour manipuler les données spatiales, <code>matplotlib</code> pour la visualisation de données, et <code>pandas</code> pour la manipulation de données.</p>
            <h5 style="color: #ADD8E6;">Étape 2 : Charger les bibliothèques nécessaires</h5>
            <p>Après avoir installé les bibliothèques, vous devez les charger dans votre environnement Python :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Charger les bibliothèques nécessaires
import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt
            </code></pre>
            <p>Cette étape rend les fonctions de ces bibliothèques disponibles pour votre script.</p>
            <h5 style="color: #ADD8E6;">Étape 3 : Importer les shapefiles</h5>
            <p>Vous pouvez importer des shapefiles en utilisant la fonction <code>read_file</code> du package <code>geopandas</code>. Voici une fonction pour le faire :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Importer des shapefiles
def import_shapefile(filepath):
    shapefile = gpd.read_file(filepath)  # Lire le shapefile
    return shapefile  # Retourner le shapefile chargé
            </code></pre>
            <p>Cette fonction prend un chemin de fichier en entrée, lit le shapefile et le retourne comme un objet spatial.</p>
            <h5 style="color: #ADD8E6;">Étape 4 : Renommer et correspondre les noms</h5>
            <p>Parfois, les colonnes de votre shapefile peuvent devoir être renommées pour plus de clarté ou pour correspondre à d'autres jeux de données. Vous pouvez le faire ainsi :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Renommer et correspondre les noms
def rename_shapefile_columns(shapefile, new_names):
    shapefile.columns = new_names  # Renommer les colonnes
    return shapefile  # Retourner le shapefile renommé
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --></pre>
            <p>Cette fonction prend un shapefile et une liste de nouveaux noms, renommant les colonnes en conséquence.</p>

            <h5 style="color: #ADD8E6;">Étape 5 : Lier les shapefiles aux échelles pertinentes</h5>
            <p>Liez votre shapefile aux échelles ou métadonnées pertinentes en le fusionnant avec un autre DataFrame :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Lier les shapefiles aux échelles pertinentes
def link_shapefiles_to_scales(shapefile, scales_df, link_col):
    linked_shapefile = shapefile.merge(scales_df, on=link_col)  # Fusionner le shapefile avec les échelles
    return linked_shapefile  # Retourner le shapefile lié
            </code></pre>
            <p>Cette fonction effectue une fusion entre le shapefile et un DataFrame contenant les informations d'échelle basées sur une colonne de liaison spécifiée.</p>

            <h5 style="color: #ADD8E6;">Étape 6 : Visualiser les shapefiles et créer des cartes de base</h5>
            <p>Enfin, vous pouvez visualiser le shapefile en utilisant <code>matplotlib</code> et <code>geopandas</code>. Voici une fonction pour cela :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Visualiser les shapefiles et créer des cartes de base
def visualize_shapefile(shapefile, variable):
    shapefile.plot(column=variable, cmap='viridis', legend=True)
    plt.title(f'Visualisation du shapefile : {variable}')
    plt.show()
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --></pre>
            <p>Cette fonction crée une simple visualisation cartographique en utilisant les données spatiales. Remplacez <code>variable</code> par le nom de la variable que vous souhaitez visualiser dans l'esthétique de remplissage.</p>

            <h4 id="fullCode">Code complet</h4>
          
            <pre id="codeBlock">
                <code>
# Installer les bibliothèques nécessaires
pip install geopandas matplotlib pandas

# Charger les bibliothèques nécessaires
import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt

# Importer des shapefiles
def import_shapefile(filepath):
    shapefile = gpd.read_file(filepath)  # Lire le shapefile
    return shapefile  # Retourner le shapefile chargé

# Renommer et correspondre les noms
def rename_shapefile_columns(shapefile, new_names):
    shapefile.columns = new_names  # Renommer les colonnes
    return shapefile  # Retourner le shapefile renommé

# Lier les shapefiles aux échelles pertinentes
def link_shapefiles_to_scales(shapefile, scales_df, link_col):
    linked_shapefile = shapefile.merge(scales_df, on=link_col)  # Fusionner le shapefile avec les échelles
    return linked_shapefile  # Retourner le shapefile lié

# Visualiser les shapefiles et créer des cartes de base
def visualize_shapefile(shapefile, variable):
    shapefile.plot(column=variable, cmap='viridis', legend=True)
    plt.title(f'Visualisation du shapefile : {variable}')
    plt.show()
                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here -->
            </pre>

            <h4 id="sampleR">Exemple de sortie</h4>
            <img src="https://raw.githubusercontent.com/numalariamodeling/snt-code-library-english-version/a204dc53be5209fc170acbfbb5db8900930a80fa/MAP_PYTHON.png" alt="Sample Results">;
           
        `,

              
        
    };

    document.getElementById('content').innerHTML = content[page];
}

window.onload = function() {
    // Get the current URL
    const currentUrl = window.location.href;

    // Example 1: Load 'overview' if URL contains '#Overview'
    if (currentUrl.includes('#Overview')) {
        loadContent('overview');
    }

    // Example 2: Load 'shapefiles' if URL contains '#Shapefiles'
    if (currentUrl.includes('#shapefiles')) {
        loadContent('shapefiles');
    }

    // Example 3: Load 'data-management' if URL contains '#DataManagement'
    if (currentUrl.includes('#hf')) {
        loadContent('hf');
    }
};



// Function to scroll to the section when the button is clicked
function scrollToSection(sectionId) {
    // Scroll to the specific section smoothly
    document.getElementById(sectionId).scrollIntoView({ behavior: 'auto' });
    
    // Remove the 'active' class from all buttons
    document.querySelectorAll('.text-button').forEach(button => button.classList.remove('active'));
    
    // Add the 'active' class to the clicked button
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// Function to check which section is at the top and update the active button
function handleScroll() {
    const sections = ['stepByStep', 'sampleR', 'fullCode'];
    let activeSection = null;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const rect = section.getBoundingClientRect();
        
        // Check if the section is exactly at the top of the viewport
        if (rect.top <= 0 && rect.bottom >= 0) {
            activeSection = sectionId;
        }
    });

    // Remove the 'active' class from all buttons
    document.querySelectorAll('.text-button').forEach(button => button.classList.remove('active'));

    // Add the 'active' class to the button corresponding to the section at the top
    if (activeSection) {
        document.querySelector(`[data-section="${activeSection}"]`).classList.add('active');
    }
}

// Attach the scroll event listener to update the active button based on scroll position
window.addEventListener('scroll', handleScroll);


function copyCode() {
    const codeBlock = document.getElementById("codeBlock").innerText;
    navigator.clipboard.writeText(codeBlock).then(() => {
        alert("Code copied to clipboard!");
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

document.querySelector('.search-bar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-link, .menu-header');
    
    menuItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'block'; // Show matching items
        } else {
            item.style.display = 'none'; // Hide non-matching items
        }
    });
});

// Function to handle link selection
function selectLink(selectedLink) {
    // Remove 'selected' class from all links
    var links = document.getElementsByClassName('menu-link');
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('selected');
    }
    // Add 'selected' class to the clicked link
    selectedLink.classList.add('selected');
}

function toggleMenu(menuHeader) {
    var submenu = menuHeader.nextElementSibling; // Get the submenu
    if (submenu.style.display === "none" || submenu.style.display === "") {
        submenu.style.display = "block"; // Show the submenu
        menuHeader.querySelector('.menu-indicator').textContent = 'v'; // Change indicator to 'v'
    } else {
        submenu.style.display = "none"; // Hide the submenu
        menuHeader.querySelector('.menu-indicator').textContent = '>'; // Change indicator back to '>'
    }
}

// Add styles for rectangular buttons
const styles = `
    .rect-buttons {
        display: flex;
        gap: 10px; /* Adds space between the buttons */
        margin-top: 10px;
    }

    .rect-button {
        width: 100px;  /* Set width to make the button rectangular */
        height: 40px;  /* Set height for better visibility */
        border-radius: 5px; /* Small radius for slightly rounded corners, or set to 0 for sharp edges */
        border: none;
        background-color: #47B5FF;
        color: white;
        font-size: 14px;
        cursor: pointer;
    }
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);     





document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.fixed-buttons');

    function changeButtonColorOnScroll() {
        if (window.scrollY > 50) { // Change '100' to the scroll distance you want
            button.classList.add('scrolled');
        } else {
            button.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', changeButtonColorOnScroll);
});
















document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.text-button');
    const headings = document.querySelectorAll('h3'); // All headings to track

    function updateButtonState() {
        // Get the current scroll position
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        // Loop through all headings
        headings.forEach((heading) => {
            const headingTop = heading.offsetTop;

            if (scrollPosition >= headingTop) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateButtonState);
    updateButtonState(); // Initial call in case already scrolled
});
