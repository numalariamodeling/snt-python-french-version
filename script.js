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
                    <div class="fixed-buttons">
                        <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                        <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
                    </div>

        
                    <h3>A. Assemblage et gestion des données > A.1 fichiers de forme</h3>
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

                    <h3>Étape 3 : Importer des Shapefiles</h3>
                    <p>Vous pouvez importer des shapefiles en utilisant la fonction <code>st_read</code> du package <code>sf</code>. Voici une fonction pour le faire :</p>
                    <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Le bouton de copie est positionné ici --><code>
# Importer des Shapefiles
import_shapefile <- function(filepath) {
    shapefile <- st_read(filepath)  # Lire le shapefile
    return(shapefile)  # Retourner le shapefile chargé
}
                    </code></pre>
                    <p>Cette fonction prend un chemin de fichier en entrée, lit le shapefile et le renvoie en tant qu'objet spatial.</p>

                    <h3>Étape 4 : Renommer et faire correspondre les noms</h3>
                    <p>Parfois, les colonnes de votre shapefile doivent être renommées pour plus de clarté ou pour correspondre à d'autres ensembles de données. Vous pouvez le faire comme suit :</p>
                    <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Le bouton de copie est positionné ici --><code>
# Renommer et faire correspondre les noms
rename_shapefile_columns <- function(shapefile, new_names) {
    colnames(shapefile) <- new_names  # Renommer les colonnes
    return(shapefile)  # Retourner le shapefile renommé
}
                    </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Le bouton de copie est positionné ici --></pre>
                    <p>Cette fonction prend un shapefile et un vecteur de nouveaux noms, renommant les colonnes en conséquence.</p>

                    <h3>Étape 5 : Lier les Shapefiles aux Échelles Pertinentes</h3>
                    <p>Liez votre shapefile à des échelles ou des métadonnées pertinentes en le fusionnant avec un autre cadre de données :</p>
                    <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Le bouton de copie est positionné ici --><code>
# Lier les Shapefiles aux Échelles Pertinentes
link_shapefiles_to_scales <- function(shapefile, scales_df, link_col) {
    linked_shapefile <- shapefile %>%
        left_join(scales_df, by = link_col)  # Fusionner le shapefile avec les échelles
    return(linked_shapefile)  # Retourner le shapefile lié
}
                    </code></pre>
                    <p>Cette fonction effectue une jointure à gauche entre le shapefile et un cadre de données contenant des informations sur les échelles, en fonction d'une colonne de liaison spécifiée.</p>

                    <h3>Étape 6 : Visualiser les Shapefiles et Créer des Cartes de Base</h3>
                    <p>Enfin, vous pouvez visualiser le shapefile en utilisant <code>ggplot2</code>. Voici une fonction pour cela :</p>
                    <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Le bouton de copie est positionné ici --><code>
# Visualiser les Shapefiles et Créer des Cartes de Base
visualize_shapefile <- function(shapefile) {
    ggplot(data = shapefile) +
        geom_sf(aes(fill = some_variable)) +  # Visualiser le shapefile
        theme_minimal() +
        labs(title = "Visualisation du Shapefile", fill = "Variable")  # Définir le titre et la légende
}
                    </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Le bouton de copie est positionné ici --></pre>
                    <p>Cette fonction crée une simple visualisation cartographique en utilisant les données spatiales. Remplacez <code>some_variable</code> par le nom de la variable que vous souhaitez visualiser dans l'esthétique de remplissage.</p>

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

# Visualiser les Shapefiles et Créer des Cartes de Base
visualize_shapefile <- function(shapefile) {
    ggplot(data = shapefile) +
        geom_sf(aes(fill = some_variable)) +  # Visualiser le shapefile
        theme_minimal() +
        labs(title = "Visualisation du Shapefile", fill = "Variable")  # Définir le titre et la légende
}


                    </code>
                <button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Le bouton de copie est positionné ici -->
            </pre>
           
        `,

        hf: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>A. Assemblage et gestion des données>A.2 Établissements de santé</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,



        dhis2: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>A. Assemblage et gestion des données>A.3 Données de cas routiniers de DHIS2</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,



        dhs: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>A. Assemblage et gestion des données>A.4 Données DHS</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,



        pop: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>A. Assemblage et gestion des données>A.5 Données de population</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,


        climate: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>A. Assemblage et gestion des données>A.6 Données climatiques</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,



        lmis: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>A. Data Assembly and Manangement>A.7 Données LMIS</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,



        model: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>A. Assemblage et gestion des données>A.8 Données modélisées</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,


        reportingrate: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>B. Stratification épidémiologique.>B.1 Taux de notification par variable</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,


        groupmergedf: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>B. Stratification épidémiologique.>B.2 Regrouper et fusionner les DataFrame</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,      


        crudeincidence: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>B. Stratification épidémiologique.>B.3 Incidence brute par année</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  



        adjustedincidence: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>B. Stratification épidémiologique.>B.4 Incidence ajustée par année</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  



        optionincidence: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>B. Stratification épidémiologique.>B.5 Option de sélection de l'incidence</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  


        riskcategorization: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>B. Stratification épidémiologique.>B.6 Catégorisation des risques"</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  


        accesstocare: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>C. Stratification of Other Determinants>C.1 Access to Care</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  


       seasonality: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>C. Stratification of Other Determinants>C.2 Seasonality</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  



       epi: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.1 EPI Coverage and Dropout Rate</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  


       iptp: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.2 IPTp and ANC Coverage</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  


       pmc: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.3 PMC (Perennial Malaria Chemoprevention)</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  

       smc: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.4 SMC (Seasonal Malaria Chemoprevention)</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  




       vaccine: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.5 Malaria Vaccine</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  


       itn: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.6 ITN Coverage, Ownership, Access, Usage and Type</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  



       irs: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.7 IRS (Indoor Residual Spray)</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  




       mda: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.8 MDA (Mass Drug Administration)</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  




       iptsc: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.9 IPTsc (Intermittent Preventive Treatment of Malaria in School-aged Children)</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  




       pdmc: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>C. Stratification of Other Determinants>D.10 PDMC (Post-discharge Malaria Chemoprevention)</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  




       lsm: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.11 LSM (Larval Source Management)</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  




       assessingqualman: `
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('ÉtapeByÉtape')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>D. Review of Past Interventions>D.12 Assessing the quality of case management</h3>
            <h3 id="ÉtapeByÉtape">Approche étape par étape</h3>
            <p></p>

            <h3>Étape 1: </h3>
            <p></p>
            <pre><code>

Bloc de code.

            
            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 2: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>


Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 3: </h3>
            <p> </p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 4: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.

            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3>Étape 5: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>



Bloc de code.



            </code></pre>
            <p></p>

            <h3>Étape 6: </h3>
            <p></p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --><code>




Bloc de code.



            </code><button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here --></pre>
            <p></p>

            <h3 id="fullCode">Code complet</h3>
          
            <pre id="codeBlock">
                <code>











Bloc de code.
























                </code>
                <button class="copy-button" onclick="copyCode()">Copier le code.</button> <!-- Copy button positioned here -->
            </pre>


           
        `,  

 





        
        
    };

    document.getElementById('content').innerHTML = content[page];
}

// Load the overview content when the page opens
window.onload = function() {
    loadContent('overview');
};

// Scroll to the relevant section when buttons are clicked
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'auto' });
    }
}       


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





