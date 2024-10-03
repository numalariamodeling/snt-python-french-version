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
            <p>SNT est là pour rester : de nombreuses NMCP l'ont trouvé utile et continuent à l'adopter et à le développer davantage pour leurs besoins analytiques. Depuis 2019, plusieurs individus ont soutenu les parties analyse de SNT. Dans la plupart des cas, les individus ont construit leur propre code dans divers langages (Stata, R et Python), parfois en s'appuyant sur le code précédent d'autres et parfois en le redéveloppant indépendamment.
           
À mesure que SNT mûrit, plus d'assurance qualité est nécessaire afin que les NMCP puissent être confiantes que l'analyse qu'elles utilisent pour informer leurs décisions est de haute qualité, quel que soit l'analyste de soutien individuel. Le déploiement continu de SNT signifie également que l'analyse peut devenir plus efficace si les analystes peuvent mieux s'appuyer sur le travail des autres plutôt que d'être tentés de réinventer ce qui a déjà été développé. Enfin, l'analyse SNT peut devenir beaucoup plus accessible s'il existe une ressource commune disponible pour aider ceux ayant des compétences en codage intermédiaires à accéder rapidement aux connaissances collectives de la communauté des analystes SNT.
.</p>

            <h3>Objectifs</h3>
            <p>Nous allons construire une bibliothèque de code pour l'analyse SNT afin de :
            <p>1. Améliorer la qualité et la reproductibilité de l'analyse SNT en veillant à ce que les analystes utilisent des approches similaires et correctes.</p>
            <p>2. Améliorer l'efficacité de l'analyse SNT en minimisant la duplication des efforts.</p>
            <p>3. Promouvoir l'accessibilité de l'analyse SNT en abaissant les barrières à l'entrée.</p>


            <h3>Public cible</h3>
            <p>Toute personne faisant ce type de travail. Nous supposons une connaissance de base de R, une certaine compréhension des données et un lien solide avec la NMCP.</p>


            <h3>Portée</h3>
            <p>Toutes les étapes d'analyse de SNT jusqu'à, mais sans inclure, la modélisation mathématique ; certaines analyses connexes.</p>
        `,
        shapefiles: `
        
            <h2>A. Assemblage et gestion des données > A.1 Shapefiles</h2>
            <h3>Approche étape par étape</h3>
            <p>Cette section explique le flux de travail d'importation et de gestion des shapefiles en utilisant R.</p>

            <h3>Étape 1 : Installer les bibliothèques nécessaires</h3>
            <p>Avant de commencer, assurez-vous d'avoir les packages R requis installés. Cela peut être fait en utilisant le code suivant :</p>
            <pre><code>
# Installer les bibliothèques nécessaires
install.packages(c("sf", "ggplot2", "dplyr"))

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --></pre>
            <p>Ce code installe le package <code>sf</code> pour gérer les données spatiales, <code>ggplot2</code> pour la visualisation des données, et <code>dplyr</code> pour la manipulation des données.</p>

            <h3>Étape 2 : Charger les bibliothèques nécessaires</h3>
            <p>Après avoir installé les bibliothèques, vous devez les charger dans votre environnement R :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Charger les bibliothèques nécessaires
library(sf)
library(dplyr)
library(ggplot2)
            </code></pre>
            <p>Cette étape rend les fonctions de ces bibliothèques disponibles pour une utilisation dans votre script.</p>

            <h3>Étape 3 : Importer les shapefiles</h3>
            <p>Vous pouvez importer des shapefiles en utilisant la fonction <code>st_read</code> du package <code>sf</code>. Voici une fonction pour cela :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Importer des Shapefiles
import_shapefile <- function(filepath) {
    shapefile <- st_read(filepath)  # Lire le shapefile
    return(shapefile)  # Retourner le shapefile chargé
}
            </code></pre>
            <p>Cette fonction prend un chemin de fichier comme entrée, lit le shapefile et le renvoie en tant qu'objet spatial.</p>

            <h3>Étape 4 : Renommer et faire correspondre les noms</h3>
            <p>Parfois, les colonnes de votre shapefile peuvent devoir être renommées pour plus de clarté ou pour correspondre à d'autres ensembles de données. Vous pouvez le faire comme suit :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Renommer et faire correspondre les noms
rename_shapefile_columns <- function(shapefile, new_names) {
    colnames(shapefile) <- new_names  # Renommer les colonnes
    return(shapefile)  # Retourner le shapefile renommé
}
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --></pre>
            <p>Cette fonction prend un shapefile et un vecteur de nouveaux noms, renommant les colonnes en conséquence.</p>

            <h3>Étape 5 : Lier les shapefiles aux échelles pertinentes</h3>
            <p>Reliez votre shapefile à des échelles pertinentes ou à des métadonnées en le fusionnant avec un autre cadre de données :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Lier les Shapefiles aux Échelles Pertinentes
link_shapefiles_to_scales <- function(shapefile, scales_df, link_col) {
    linked_shapefile <- shapefile %>%
        left_join(scales_df, by = link_col)  # Fusionner le shapefile avec les échelles
    return(linked_shapefile)  # Retourner le shapefile lié
}
            </code></pre>
            <p>Cette fonction effectue une jointure à gauche entre le shapefile et un cadre de données contenant des informations sur les échelles en fonction d'une colonne de liaison spécifiée.</p>

            <h3>Étape 6 : Visualisation des Shapefiles et création de cartes de base</h3>
            <p>Enfin, vous pouvez visualiser le shapefile en utilisant <code>ggplot2</code>. Voici une fonction pour cela :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Visualisation des Shapefiles et création de cartes de base
visualize_shapefile <- function(shapefile) {
    ggplot(data = shapefile) +
        geom_sf(aes(fill = some_variable)) +  # Visualiser le shapefile
        theme_minimal() +
        labs(title = "Visualisation du Shapefile", fill = "Variable")  # Définir le titre et la légende
}
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --></pre>
            <p>Cette fonction crée une visualisation de carte simple utilisant les données spatiales. Remplacez <code>some_variable</code> par le nom de la variable que vous souhaitez visualiser dans l'esthétique de remplissage.</p>

            <h3>Code complet</h3>
            <pre id="codeBlock">
                <code>

# Installer les bibliothèques nécessaires
install.packages(c("sf", "ggplot2", "dplyr"))

# Charger les bibliothèques nécessaires
library(sf)
library(dplyr)
library(ggplot2)

# Importer des Shapefiles
import_shapefile <- function(filepath) {
    shapefile <- st_read(filepath)  # Lire le shapefile
    return(shapefile)  # Retourner le shapefile chargé
}

# Renommer et faire correspondre les noms
rename_shapefile_columns <- function(shapefile, new_names) {
    colnames(shapefile) <- new_names  # Renommer les colonnes
    return(shapefile)  # Retourner le shapefile renommé
}

# Lier les Shapefiles aux Échelles Pertinentes
link_shapefiles_to_scales <- function(shapefile, scales_df, link_col) {
    linked_shapefile <- shapefile %>%
        left_join(scales_df, by = link_col)  # Fusionner le shapefile avec les échelles
    return(linked_shapefile)  # Retourner le shapefile lié
}

# Visualisation des Shapefiles et création de cartes de base
visualize_shapefile <- function(shapefile) {
    ggplot(data = shapefile) +
        geom_sf(aes(fill = some_variable)) +  # Visualiser le shapefile
        theme_minimal() +
        labs(title = "Visualisation du Shapefile", fill = "Variable")  # Définir le titre et la légende
}


                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here -->
            </pre>
           
        `,
        hf: `
            <h2>A. Assemblage et gestion des données > A.2 Établissements de santé</h2>
            <h3>Approche étape par étape.</h3>
        `,
        quartoExample: `
            <h2>Exemple Quarto</h2>
            <p>Ceci est un exemple de Quarto.</p>
        `,
    };

    document.getElementById('content').innerHTML = content[page];
}

// Charger le contenu de l'aperçu lorsque la page s'ouvre
window.onload = function() {
    loadContent('overview');
};

function copyCode() {
    const codeBlock = document.getElementById("codeBlock").innerText;
    navigator.clipboard.writeText(codeBlock).then(() => {
        alert("Code copié dans le presse-papiers !");
    }).catch(err => {
        console.error('Erreur lors de la copie du texte : ', err);
    });
}

document.querySelector('.search-bar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-link, .menu-header');
    
    menuItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'block'; // Afficher les éléments correspondants
        } else {
            item.style.display = 'none'; // Masquer les éléments non correspondants
        }
    });
});

// Fonction pour gérer la sélection de lien
function selectLink(selectedLink) {
    // Retirer la classe 'selected' de tous les liens
    var links = document.getElementsByClassName('menu-link');
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('selected');
    }
    // Ajouter la classe 'selected' au lien cliqué
    selectedLink.classList.add('selected');
}

function toggleMenu(menuHeader) {
    var submenu = menuHeader.nextElementSibling; // Obtenir le sous-menu
    if (submenu.style.display === "none" || submenu.style.display === "") {
        submenu.style.display = "block"; // Afficher le sous-menu
        menuHeader.querySelector('.menu-indicator').textContent = 'v'; // Changer l'indicateur en 'v'
    } else {
        submenu.style.display = "none"; // Masquer le sous-menu
        menuHeader.querySelector('.menu-indicator').textContent = '>'; // Changer l'indicateur en '>'
    }
}
