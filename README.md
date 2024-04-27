# Country Data Visualization**

This project provides a web-based visualization tool for exploring various aspects of country data. Users can select different plot options from a dropdown menu and view corresponding visualizations and additional information about countries.

### Getting Started

To use this project, follow these steps:

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser.

Alternatively, you can run the project on a live server:

1. Install a live server extension or tool in your preferred code editor (e.g., Live Server for Visual Studio Code).
2. Open the project directory in your code editor.
3. Launch the live server from your code editor, which will automatically open the `index.html` file in your default web browser.

### Features

1. **Select Plot Option**: Users can choose from a variety of plot options, including population size, number of borders, number of timezones, number of languages, number of countries in a region, and number of unique timezones in a region.

2. **Interactive Visualization**: Upon selecting a plot option and clicking the "Plot" button, the tool generates an interactive visualization using D3.js. The visualization presents data in a bar chart format, with country/region names on the x-axis and corresponding values on the y-axis. Additionally, the size of bubbles within the chart represents the magnitude of the selected data.

3. **Extended Information**: Users can hover over data points in the visualization to view a pop-up window containing additional information about the selected country or region. This information includes the country/region name, population, list of borders, and list of timezones.

4. **Data Table**: Alongside the visualization, a data table is dynamically generated to display the selected data in tabular format. This table provides a comprehensive overview of the plotted data.

### Folder Structure

- **data**: Contains the `countries.json` file, which stores country data used for visualization and information display.
- **scripts**: Includes the JavaScript files (`script.js`) responsible for handling user interactions, data processing, and visualization.
- **styles**: Contains the CSS file (`styles.css`) for styling the web page.

### Technologies Used

- **HTML**: Markup language for structuring the web page.
- **CSS**: Stylesheet language for designing the user interface.
- **JavaScript**: Programming language for implementing interactivity and data manipulation.
- **D3.js**: JavaScript library for creating dynamic and interactive data visualizations in the web browser.

### Credits

- **Data Source**: The country data used in this project is sourced from `countries.json`.
- **D3.js**: The visualization library used for creating interactive charts.
