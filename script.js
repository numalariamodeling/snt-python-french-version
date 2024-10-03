function toggleMenu(menuHeader) {
    const submenu = menuHeader.nextElementSibling;
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

function loadContent(page) {
    const content = {
        overview: `
            <h3 class="sidebar-title">Version: 27 September 2024 </h3>
            <h3 class="sidebar-title">Authors: Mohamed Sillah Kanu, Sammy Oppong, Jaline Gerardin </h3>
            <h2>Overview</h2>
            <h3>Motivation</h3>
            <p>SNT is here to stay: many NMCPs have found it useful and are continuing to embrace it and further develop it for their analytical needs. Since 2019, multiple individuals have supported the analysis portions of SNT. In most cases, individuals have built their own code in a variety of languages (Stata, R, and Python), sometimes building on others’ previous code and sometimes re-developed independently.
           
As SNT matures, more quality assurance is needed such that NMCPs can be confident that the analysis they use to inform their decisions is of high quality regardless of the individual supporting analyst. The continued rollout of SNT also means that analysis can become more efficient if analysts are better able to build on each other’s work rather than tempted to reinvent what has already been developed. Lastly, SNT analysis can become much more accessible if there is a common resource available to help those with intermediate coding skills quickly access the collective knowledge of the SNT analyst community.
.</p>

            <h3>Objectives</h3>
            <p>We will build a code library for SNT analysis to:

1. Improve quality and reproducibility of SNT analysis by ensuring that analysts are using similar, correct approaches
2. Improve efficiency of SNT analysis by minimizing duplication of effort
3. Promote accessibility of SNT analysis by lowering barriers to entry.</p>


            <h3>Target audience</h3>
            <p>Anyone doing this kind of work. We assume some basic knowledge of R, some understanding of the data, and a strong connection to the NMCP.</p>


            <h3>Scope</h3>
            <p>All analysis steps of SNT up to but not including mathematical modeling; some related analysis..</p>
        `,
        shapefiles: `

            <h2>Step by step approach</h2>
            <p>This section explains the workflow of importing and managing shapefiles using R.</p>

            <h3>Step 1: Install Necessary Libraries</h3>
            <p>Before starting, ensure you have the required R packages installed. This can be done using the following code:</p>
            <pre><code>
# Install necessary libraries
install.packages(c("sf", "ggplot2", "dplyr"))
            </code></pre>
            <p>This code installs the <code>sf</code> package for handling spatial data, <code>ggplot2</code> for data visualization, and <code>dplyr</code> for data manipulation.</p>

            <h3>Step 2: Load Necessary Libraries</h3>
            <p>After installing the libraries, you need to load them into your R environment:</p>
            <pre><code>
# Load necessary libraries
library(sf)
library(dplyr)
library(ggplot2)
            </code></pre>
            <p>This step makes the functions from these libraries available for use in your script.</p>

            <h3>Step 3: Import Shapefiles</h3>
            <p>You can import shapefiles using the <code>st_read</code> function from the <code>sf</code> package. Here’s a function to do that:</p>
            <pre><code>
# 1. Import Shapefiles
import_shapefile <- function(filepath) {
    shapefile <- st_read(filepath)  # Read the shapefile
    return(shapefile)  # Return the loaded shapefile
}
            </code></pre>
            <p>This function takes a file path as input, reads the shapefile, and returns it as a spatial object.</p>

            <h3>Step 4: Rename and Match Names</h3>
            <p>Sometimes, the columns in your shapefile may need to be renamed for clarity or to match other datasets. You can do this as follows:</p>
            <pre><code>
# 2. Rename and Match Names
rename_shapefile_columns <- function(shapefile, new_names) {
    colnames(shapefile) <- new_names  # Rename columns
    return(shapefile)  # Return the renamed shapefile
}
            </code></pre>
            <p>This function takes a shapefile and a vector of new names, renaming the columns accordingly.</p>

            <h3>Step 5: Link Shapefiles to Relevant Scales</h3>
            <p>Link your shapefile to relevant scales or metadata by merging it with another data frame:</p>
            <pre><code>
# 3. Link Shapefiles to Relevant Scales
link_shapefiles_to_scales <- function(shapefile, scales_df, link_col) {
    linked_shapefile <- shapefile %>%
        left_join(scales_df, by = link_col)  # Merge shapefile with scales
    return(linked_shapefile)  # Return the linked shapefile
}
            </code></pre>
            <p>This function performs a left join between the shapefile and a data frame containing scale information based on a specified linking column.</p>

            <h3>Step 6: Visualizing Shapefiles and Making Basic Maps</h3>
            <p>Finally, you can visualize the shapefile using <code>ggplot2</code>. Here’s a function to do that:</p>
            <pre><code>
# 4. Visualizing Shapefiles and Making Basic Maps
visualize_shapefile <- function(shapefile) {
    ggplot(data = shapefile) +
        geom_sf(aes(fill = some_variable)) +  # Visualize the shapefile
        theme_minimal() +
        labs(title = "Shapefile Visualization", fill = "Variable")  # Set title and legend
}
            </code></pre>
            <p>This function creates a simple map visualization using the spatial data. Replace <code>some_variable</code> with the name of the variable you want to visualize in the fill aesthetic.</p>

            <h2>Full code</h2>
            <pre id="codeBlock">
                <code>

# Install  necessary libraries
install.packages(c("sf", "ggplot2", "dplyr"))

# Load necessary libraries
library(sf)
library(dplyr)
library(ggplot2)

# 1. Import Shapefiles
import_shapefile <- function(filepath) {
    shapefile <- st_read(filepath)  # Read the shapefile
    return(shapefile)  # Return the loaded shapefile
}

# 2. Rename and Match Names
rename_shapefile_columns <- function(shapefile, new_names) {
    colnames(shapefile) <- new_names  # Rename columns
    return(shapefile)  # Return the renamed shapefile
}

# 3. Link Shapefiles to Relevant Scales
link_shapefiles_to_scales <- function(shapefile, scales_df, link_col) {
    linked_shapefile <- shapefile %>%
        left_join(scales_df, by = link_col)  # Merge shapefile with scales
    return(linked_shapefile)  # Return the linked shapefile
}

# 4. Visualizing Shapefiles and Making Basic Maps
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
            <h2>Page 2 Content</h2>
            <p>This is the content for Page 2.</p>
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
