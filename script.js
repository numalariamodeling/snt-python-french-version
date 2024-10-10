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
           
            <div class="fixed-buttons">
                <button class="text-button" onclick="scrollToSection('stepByStep')">Étape par étape</button>
                <button class="text-button" onclick="scrollToSection('fullCode')">Code complet</button>
            </div>
        
            <h3>A. Assemblage et gestion des données>A.1 Fichiers Shapefiles</h3>
            <h3 id="stepByStep">Approche étape par étape</h3>
            <p>Cette section explique le flux de travail d'importation et de gestion des shapefiles avec Python.</p>

            <h3>Étape 1 : Installer les bibliothèques nécessaires</h3>
            <p>Avant de commencer, assurez-vous que vous avez installé les packages Python nécessaires.</p>
            <p>Cela peut être fait en utilisant le code suivant :</p>
            <pre><code>
# Installer les bibliothèques nécessaires

pip install geopandas matplotlib pandas      
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --></pre>
            <p>Ce code installe le package <code>geopandas</code> pour manipuler les données spatiales, <code>matplotlib</code> pour la visualisation de données, et <code>pandas</code> pour la manipulation de données.</p>
            <h3>Étape 2 : Charger les bibliothèques nécessaires</h3>
            <p>Après avoir installé les bibliothèques, vous devez les charger dans votre environnement Python :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Charger les bibliothèques nécessaires
import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt
            </code></pre>
            <p>Cette étape rend les fonctions de ces bibliothèques disponibles pour votre script.</p>
            <h3>Étape 3 : Importer les shapefiles</h3>
            <p>Vous pouvez importer des shapefiles en utilisant la fonction <code>read_file</code> du package <code>geopandas</code>. Voici une fonction pour le faire :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Importer des shapefiles
def import_shapefile(filepath):
    shapefile = gpd.read_file(filepath)  # Lire le shapefile
    return shapefile  # Retourner le shapefile chargé
            </code></pre>
            <p>Cette fonction prend un chemin de fichier en entrée, lit le shapefile et le retourne comme un objet spatial.</p>
            <h3>Étape 4 : Renommer et correspondre les noms</h3>
            <p>Parfois, les colonnes de votre shapefile peuvent devoir être renommées pour plus de clarté ou pour correspondre à d'autres jeux de données. Vous pouvez le faire ainsi :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Renommer et correspondre les noms
def rename_shapefile_columns(shapefile, new_names):
    shapefile.columns = new_names  # Renommer les colonnes
    return shapefile  # Retourner le shapefile renommé
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --></pre>
            <p>Cette fonction prend un shapefile et une liste de nouveaux noms, renommant les colonnes en conséquence.</p>

            <h3>Étape 5 : Lier les shapefiles aux échelles pertinentes</h3>
            <p>Liez votre shapefile aux échelles ou métadonnées pertinentes en le fusionnant avec un autre DataFrame :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Lier les shapefiles aux échelles pertinentes
def link_shapefiles_to_scales(shapefile, scales_df, link_col):
    linked_shapefile = shapefile.merge(scales_df, on=link_col)  # Fusionner le shapefile avec les échelles
    return linked_shapefile  # Retourner le shapefile lié
            </code></pre>
            <p>Cette fonction effectue une fusion entre le shapefile et un DataFrame contenant les informations d'échelle basées sur une colonne de liaison spécifiée.</p>

            <h3>Étape 6 : Visualiser les shapefiles et créer des cartes de base</h3>
            <p>Enfin, vous pouvez visualiser le shapefile en utilisant <code>matplotlib</code> et <code>geopandas</code>. Voici une fonction pour cela :</p>
            <pre><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --><code>
# Visualiser les shapefiles et créer des cartes de base
def visualize_shapefile(shapefile, variable):
    shapefile.plot(column=variable, cmap='viridis', legend=True)
    plt.title(f'Visualisation du shapefile : {variable}')
    plt.show()
            </code><button class="copy-button" onclick="copyCode()">Copier le code</button> <!-- Copy button positioned here --></pre>
            <p>Cette fonction crée une simple visualisation cartographique en utilisant les données spatiales. Remplacez <code>variable</code> par le nom de la variable que vous souhaitez visualiser dans l'esthétique de remplissage.</p>

            <h3 id="fullCode">Code complet</h3>
          
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
        
            <h3>C. Stratification d'autres déterminants>C.1 Accès aux soins</h3>
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
        
            <h3>C. Stratification d'autres déterminants>C.2 Saisonnalité</h3>
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
        
            <h3>D. Examen des interventions passées>D.1 Couverture et taux d'abandon du PEV</h3>
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
        
            <h3>D. Examen des interventions passées>D.2 Couverture du TPIg et des CPN</h3>
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
        
            <h3>D. Examen des interventions passées>D.3 CPM (Chimioprévention du paludisme pérenne)</h3>
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
        
            <h3>D. Review of Past Interventions>D.4 CPS (Chimioprévention du paludisme saisonnier)</h3>
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
        
            <h3>D. Review of Past Interventions>D.5 Vaccin contre le paludisme</h3>
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
        
            <h3>D. Examen des interventions passées>D.6 Couverture, possession, accès, utilisation et type de MII</h3>
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
        
            <h3>D. Examen des interventions passées>D.7 ASP (Aspersion intra-domiciliaire)</h3>
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
        
            <h3>D. Examen des interventions passées>D.8 Distribution massive de médicaments (DMM)</h3>
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
        
            <h3>D. Examen des interventions passées>D.9 TPIe (Traitement préventif intermittent du paludisme chez les enfants en âge scolaire)</h3>
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
        
            <h3>D. Examen des interventions passées>D.10 CPMS (Chimioprévention du paludisme post-sortie)</h3>
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
        
            <h3>D. Examen des interventions passées>D.11 GSL (Gestion des sources larvaires)</h3>
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
        
            <h3>D. Examen des interventions passées>D.12 Évaluation de la qualité de la gestion des cas</h3>
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





