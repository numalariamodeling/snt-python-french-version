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
            <p>SNT est là pour rester : de nombreux NMCP ont trouvé cela utile et continuent à l'adopter et à le développer davantage pour leurs besoins analytiques. Depuis 2019, plusieurs personnes ont soutenu les parties d'analyse de SNT. Dans la plupart des cas, les individus ont construit leur propre code dans une variété de langages (Stata, R et Python), construisant parfois sur le code précédent d'autres et parfois redéveloppant de manière indépendante.
            À mesure que SNT mûrit, davantage d'assurance qualité est nécessaire pour que les NMCP puissent être confiants que l'analyse qu'ils utilisent pour éclairer leurs décisions est de haute qualité, quel que soit l'analyste qui les soutient. Le déploiement continu de SNT signifie également que l'analyse peut devenir plus efficace si les analystes sont mieux en mesure de s'appuyer sur le travail des autres plutôt que d'être tentés de réinventer ce qui a déjà été développé. Enfin, l'analyse SNT peut devenir beaucoup plus accessible s'il existe une ressource commune disponible pour aider ceux qui ont des compétences en codage intermédiaires à accéder rapidement aux connaissances collectives de la communauté des analystes SNT.</p>

            <h3>Objectifs</h3>
            <p>Nous allons construire une bibliothèque de code pour l'analyse SNT afin de :
            <p>1. Améliorer la qualité et la reproductibilité de l'analyse SNT en veillant à ce que les analystes utilisent des approches similaires et correctes.</p>
            <p>2. Améliorer l'efficacité de l'analyse SNT en minimisant la duplication des efforts.</p>
            <p>3. Promouvoir l'accessibilité de l'analyse SNT en abaissant les barrières à l'entrée.</p>

            <h3>Public cible</h3>
            <p>Quiconque effectuant ce type de travail. Nous supposons une certaine connaissance de base de R, une certaine compréhension des données et un lien solide avec le NMCP.</p>

            <h3>Portée</h3>
            <p>Toutes les étapes d'analyse de SNT jusqu'à, mais n'incluant pas, la modélisation mathématique ; certaines analyses connexes.</p>

        `,
        shapefiles: `
            <h2>A. Assemblage et gestion des données > A.1 fichiers de forme</h2>
            <h3>Approche étape par étape</h3>
            <p>Cette section explique le flux de travail pour importer et gérer des shapefiles en utilisant R.</p>

            <h3>Étape 1 : Installer les bibliothèques nécessaires</h3>
            <p>Avant de commencer, assurez-vous d'avoir installé les packages R requis. Cela peut être fait en utilisant le code suivant :</p>
            <pre><code>
            # Installer les bibliothèques nécessaires
            install.packages(c("sf", "ggplot2", "dplyr"))
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Le bouton de copie est positionné ici --></pre>
            <p>Ce code installe le package <code>sf</code> pour manipuler des données spatiales, <code>ggplot2</code> pour la visualisation des données et <code>dplyr</code> pour la manipulation des données.</p>

            <h3>Étape 2 : Charger les bibliothèques nécessaires</h3>
            <p>Après avoir installé les bibliothèques, vous devez les charger dans votre environnement R :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Le bouton de copie est positionné ici --><code>
            # Charger les bibliothèques nécessaires
            library(sf)
            library(dplyr)
            library(ggplot2)
            </code></pre>
            <p>Cette étape rend les fonctions de ces bibliothèques disponibles pour utilisation dans votre script.</p>

# Load necessary libraries
library(sf)
library(dplyr)
library(ggplot2)
            </code></pre>
            <p>This step makes the functions from these libraries available for use in your script.</p>

            <h3>Step 3: Import Shapefiles</h3>
            <p>You can import shapefiles using the <code>st_read</code> function from the <code>sf</code> package. Here’s a function to do that:</p>
            <pre><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --><code>
# Import Shapefiles
import_shapefile <- function(filepath) {
    shapefile <- st_read(filepath)  # Read the shapefile
    return(shapefile)  # Return the loaded shapefile
}
            </code></pre>
            <p>This function takes a file path as input, reads the shapefile, and returns it as a spatial object.</p>

            <h3>Step 4: Rename and Match Names</h3>
            <p>Sometimes, the columns in your shapefile may need to be renamed for clarity or to match other datasets. You can do this as follows:</p>
            <pre><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --><code>
# Rename and Match Names
rename_shapefile_columns <- function(shapefile, new_names) {
    colnames(shapefile) <- new_names  # Rename columns
    return(shapefile)  # Return the renamed shapefile
}
            </code><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --></pre>
            <p>This function takes a shapefile and a vector of new names, renaming the columns accordingly.</p>

            <h3>Step 5: Link Shapefiles to Relevant Scales</h3>
            <p>Link your shapefile to relevant scales or metadata by merging it with another data frame:</p>
            <pre><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --><code>
# Link Shapefiles to Relevant Scales
link_shapefiles_to_scales <- function(shapefile, scales_df, link_col) {
    linked_shapefile <- shapefile %>%
        left_join(scales_df, by = link_col)  # Merge shapefile with scales
    return(linked_shapefile)  # Return the linked shapefile
}
            </code></pre>
            <p>This function performs a left join between the shapefile and a data frame containing scale information based on a specified linking column.</p>

            <h3>Step 6: Visualizing Shapefiles and Making Basic Maps</h3>
            <p>Finally, you can visualize the shapefile using <code>ggplot2</code>. Here’s a function to do that:</p>
            <pre><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --><code>
# Visualizing Shapefiles and Making Basic Maps
visualize_shapefile <- function(shapefile) {
    ggplot(data = shapefile) +
        geom_sf(aes(fill = some_variable)) +  # Visualize the shapefile
        theme_minimal() +
        labs(title = "Shapefile Visualization", fill = "Variable")  # Set title and legend
}
            </code><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --></pre>
            <p>This function creates a simple map visualization using the spatial data. Replace <code>some_variable</code> with the name of the variable you want to visualize in the fill aesthetic.</p>

            <h3>Full code</h3>
            <pre id="codeBlock">
                <code>

# Install  necessary libraries
install.packages(c("sf", "ggplot2", "dplyr"))

# Load necessary libraries
library(sf)
library(dplyr)
library(ggplot2)

# Import Shapefiles
import_shapefile <- function(filepath) {
    shapefile <- st_read(filepath)  # Read the shapefile
    return(shapefile)  # Return the loaded shapefile
}

# Rename and Match Names
rename_shapefile_columns <- function(shapefile, new_names) {
    colnames(shapefile) <- new_names  # Rename columns
    return(shapefile)  # Return the renamed shapefile
}

# Link Shapefiles to Relevant Scales
link_shapefiles_to_scales <- function(shapefile, scales_df, link_col) {
    linked_shapefile <- shapefile %>%
        left_join(scales_df, by = link_col)  # Merge shapefile with scales
    return(linked_shapefile)  # Return the linked shapefile
}

# Visualizing Shapefiles and Making Basic Maps
visualize_shapefile <- function(shapefile) {
    ggplot(data = shapefile) +
        geom_sf(aes(fill = some_variable)) +  # Visualize the shapefile
        theme_minimal() +
        labs(title = "Shapefile Visualization", fill = "Variable")  # Set title and legend
}


                </code>
                <button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here -->
            </pre>
           
        `,
        hf: `
            <h2>A. Data Assembly and Management>A.2 Health Facilities</h2>
            <h3>Step by step approach.</h3>
        `,
        quartoExample: `
            <h2>Quarto Example</h2>
            <p>This is an example of Quarto.</p>
        `,
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
