document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dataForm');
  const chartContainer = document.getElementById('chartContainer');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const plotOption = document.getElementById('plotOptions').value;
    fetchDataAndPlot(plotOption);
  });

  const fetchDataAndPlot = (plotOption) => {
    fetchData()
      .then((data) => {
        const plotData = processData(data, plotOption);
        plotChart(plotData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const processData = (countries, plotOption) => {
    const plotOptions = {
      population: () => countries.map((country) => ({ name: country.name, value: country.population })),
      borders: () => countries.map((country) => ({ name: country.name, value: country.borders.length })),
      timezones: () => countries.map((country) => ({ name: country.name, value: country.timezones.length })),
      languages: () => countries.map((country) => ({ name: country.name, value: country.languages.length })),
      regionCountries: () => {
        const regions = {};

        countries.forEach((country) => {
          regions[country.region] = regions[country.region] || [];
          regions[country.region].push(country.name);
        });

        return Object.keys(regions).map((region) => ({ name: region, value: regions[region].length }));
      },
      regionTimezones: () => {
        const regions = {};

        countries.forEach((country) => {
          regions[country.region] = regions[country.region] || new Set();
          country.timezones.forEach((timezone) => regions[country.region].add(timezone));
        });

        return Object.keys(regions).map((region) => ({ name: region, value: regions[region].size }));
      },
    };

    if (!plotOptions[plotOption]) {
      return [];
    }

    return plotOptions[plotOption]();
  };

  const plotChart = (data) => {
    chartContainer.innerHTML = '';

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 70, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select('#chartContainer')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, innerWidth + margin.left])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([innerHeight, 0])
      .nice();

    const bubbleScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([5, 50]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight + margin.top})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);

    const bubbles = svg
      .selectAll('.bubble')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .attr('cx', (d) => xScale(d.name) + xScale.bandwidth() / 2)
      .attr('cy', (d) => yScale(d.value))
      .attr('r', (d) => bubbleScale(d.value))
      .style('fill', 'skyblue')
      .style('opacity', 0.7)
      .on('mouseover', (event, d) => {
        const [x, y] = d3.pointer(event);
        showPopup(x, y, d.name);
      });

    svg.on('mouseout', () => {
      hidePopup();
    });

    const table = document.createElement('table');
    table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      ${data.map((d) => `
        <tr>
          <td>${d.name}</td>
          <td>${d.value}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
    table.classList.add('styled-table');
    chartContainer.appendChild(table);
  };

  const showPopup = (x, y, name) => {
    fetchData()
      .then((data) => {
        const country = data.find((country) => country.name === name);
        if (country) {
          const popup = document.createElement('div');
          popup.classList.add('popup');
          popup.innerHTML = `
                        <p><strong>Name:</strong> ${country.name}</p>
                        <p><strong>Population:</strong> ${country.population}</p>
                        <p><strong>Borders:</strong> ${country.borders.join(', ')}</p>
                        <p><strong>Timezones:</strong> ${country.timezones.join(', ')}</p>
                    `;
          popup.style.position = 'absolute';
          popup.style.top = `${y}px`;
          popup.style.left = `${x}px`;
          document.body.appendChild(popup);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const hidePopup = () => {
    const popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  const fetchData = async () => {
    return fetch('data/countries.json')
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });
  };
});
