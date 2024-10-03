function toggleMenu(menuHeader) {
    const submenu = menuHeader.nextElementSibling;
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

function loadContent(page) {
    const content = {
        overview: `
            <h3 class="sidebar-title">Version : 3 octobre 2024 </h3>
            <h3 class="sidebar-title">Auteurs : Mohamed Sillah Kanu, Sammy Oppong, Jaline Gerardin </h3>
            <h2>Aperçu</h2>
            <h3>Motivation</h3>
            <p>SNT est là pour rester : de nombreux NMCP l'ont trouvé utile et continuent à l'adopter et à le développer davantage pour leurs besoins analytiques. Depuis 2019, plusieurs individus ont soutenu les portions d'analyse du SNT. Dans la plupart des cas, des individus ont construit leur propre code dans une variété de langages (Stata, R et Python), parfois en s'appuyant sur le code précédent d'autres et parfois en le redéveloppant indépendamment.
           
Au fur et à mesure que le SNT mûrit, plus d'assurance qualité est nécessaire pour que les NMCP puissent être confiants que l'analyse qu'ils utilisent pour informer leurs décisions est de haute qualité, quel que soit l'analyste de soutien. Le déploiement continu du SNT signifie également que l'analyse peut devenir plus efficace si les analystes sont mieux à même de s'appuyer sur le travail des autres plutôt que d'être tentés de réinventer ce qui a déjà été développé. Enfin, l'analyse SNT peut devenir beaucoup plus accessible s'il existe une ressource commune disponible pour aider ceux qui ont des compétences en codage intermédiaire à accéder rapidement aux connaissances collectives de la communauté des analystes SNT.
.</p>

            <h3>Objectifs</h3>
            <p>Nous construirons une bibliothèque de code pour l'analyse SNT afin de :
            <p>1. Améliorer la qualité et la reproductibilité de l'analyse SNT en veillant à ce que les analystes utilisent des approches similaires et correctes.</p>
            <p>2. Améliorer l'efficacité de l'analyse SNT en minimisant la duplication des efforts.</p>
            <p>3. Promouvoir l'accessibilité de l'analyse SNT en abaissant les barrières à l'entrée.</p>


            <h3>Public cible</h3>
            <p>Quiconque effectuant ce type de travail. Nous supposons une connaissance de base de R, une certaine compréhension des données et un lien fort avec le NMCP.</p>


            <h3>Portée</h3>
            <p>Toutes les étapes d'analyse du SNT jusqu'à mais pas y compris la modélisation mathématique ; certaines analyses connexes.</p>
        `,
        shapefiles: `
        
            <h2>A. Assemblage et gestion des données>A.1 Shapefiles</h2>
            <h3>Approche étape par étape</h3>
            <p>Cette section explique le flux de travail de l'importation et de la gestion des shapefiles en utilisant R.</p>

            <h3>Étape 1 : Installer les bibliothèques nécessaires</h3>
            <p>Avant de commencer, assurez-vous d'avoir les packages R requis installés. Cela peut être fait en utilisant le code suivant :</p>
            <pre><code>
# Installer les bibliothèques nécessaires
install.packages(c("sf", "ggplot2", "dplyr"))


            </code><button class="copy-button" onclick="copyCode()">Copier le code</button></pre>
            <p>Ce code installe le package <code>sf</code> pour la gestion des données spatiales, <code>ggplot2</code> pour la visualisation des données et <code>dplyr</code> pour la manipulation des données.</p>

            <h3>Étape 2 : Charger les bibliothèques nécessaires</h3>
            <p>Après avoir installé les bibliothèques, vous devez les charger dans votre environnement R :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button><code>
# Charger les bibliothèques nécessaires
library(sf)
library(dplyr)
library(ggplot2)
            </code></pre>
            <p>Cette étape rend les fonctions de ces bibliothèques disponibles pour utilisation dans votre script.</p>

            <h3>Étape 3 : Importer des shapefiles</h3>
            <p>Vous pouvez importer des shapefiles en utilisant la fonction <code>st_read</code> du package <code>sf</code>. Voici une fonction pour cela :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button><code>
# Importer des shapefiles
import_shapefile <- function(filepath) {
    shapefile <- st_read(filepath)  # Lire le shapefile
    return(shapefile)  # Retourner le shapefile chargé
}
            </code></pre>
            <p>Cette fonction prend un chemin de fichier en entrée, lit le shapefile et le retourne en tant qu'objet spatial.</p>

            <h3>Étape 4 : Renommer et faire correspondre les noms</h3>
            <p>Parfois, les colonnes de votre shapefile peuvent devoir être renommées pour plus de clarté ou pour correspondre à d'autres ensembles de données. Vous pouvez le faire comme suit :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button><code>
# Renommer et faire correspondre les noms
rename_shapefile_columns <- function(shapefile, new_names) {
    colnames(shapefile) <- new_names  # Renommer les colonnes
    return(shapefile)  # Retourner le shapefile renommé
}
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button></pre>
            <p>Cette fonction prend un shapefile et un vecteur de nouveaux noms, renommant les colonnes en conséquence.</p>

            <h3>Étape 5 : Lier les shapefiles aux échelles pertinentes</h3>
            <p>Liez votre shapefile aux échelles ou métadonnées pertinentes en le fusionnant avec un autre cadre de données :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button><code>
# Lier les shapefiles aux échelles pertinentes
link_shapefiles_to_scales <- function(shapefile, scales_df, link_col) {
    linked_shapefile <- shapefile %>%
        left_join(scales_df, by = link_col)  # Fusionner le shapefile avec les échelles
    return(linked_shapefile)  # Retourner le shapefile lié
}
            </code></pre>
            <p>Cette fonction effectue une jointure à gauche entre le shapefile et un cadre de données contenant des informations d'échelle basées sur une colonne de liaison spécifiée.</p>

            <h3>Étape 6 : Visualiser les shapefiles et réaliser des cartes de base</h3>
            <p>Enfin, vous pouvez visualiser le shapefile en utilisant <code>ggplot2</code>. Voici une fonction pour cela :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button><code>
# Visualiser les shapefiles et réaliser des cartes de base
visualize_shapefile <- function(shapefile) {
    ggplot(data = shapefile) +
        geom_sf(aes(fill = some_variable)) +  # Visualiser le shapefile
        theme_minimal() +
        labs(title = "Visualisation du shapefile", fill = "Variable")  # Définir le titre et la légende
}
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button></pre>
            <p>Cette fonction crée une simple visualisation cartographique utilisant les données spatiales. Remplacez <code>some_variable</code> par le nom de la variable que vous souhaitez visualiser dans l'esthétique de remplissage.</p>

            <h3>Code complet</h3>
            <pre id="codeBlock">
                <code>

# Installer les bibliothèques nécessaires
install.packages(c("sf", "ggplot2", "dplyr"))

# Charger les bibliothèques nécessaires
library(sf)
library(dplyr)
library(ggplot2)

# Importer des shapefiles
import_shapefile <- function(filepath) {
    shapefile <- st_read(filepath)  # Lire le shapefile
    return(shapefile)  # Retourner le shapefile chargé
}

# Renommer et faire correspondre les noms
rename_shapefile_columns <- function(shapefile, new_names) {
    colnames(shapefile) <- new_names  # Renommer les colonnes
    return(shapefile)  # Retourner le shapefile renommé
}

# Lier les shapefiles aux échelles pertinentes
link_shapefiles_to_scales <- function(shapefile, scales_df, link_col) {
    linked_shapefile <- shapefile %>%
        left_join(scales_df, by = link_col)  # Fusionner le shapefile avec les échelles
    return(linked_shapefile)  # Retourner le shapefile lié
}

# Visualiser les shapefiles et réaliser des cartes de base
visualize_shapefile <- function(shapefile) {
    ggplot(data = shapefile) +
        geom_sf(aes(fill = some_variable)) +  # Visualiser le shapefile
        theme_minimal() +
        labs(title = "Visualisation du shapefile", fill = "Variable")  # Définir le titre et la légende
}

                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code</button>
            </pre>
            
        
    };

    document.getElementById('content').innerHTML = content[page];
}

// Load the overview content when the page opens
window.onload = function() {
    loadContent('overview');
};

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




