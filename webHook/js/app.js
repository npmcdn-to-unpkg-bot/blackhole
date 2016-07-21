'use strict';

var app = angular.module('mainApp', ['nvd3'])

/**
 * Constants -------------------------------------------------------------------------
 */
    .constant('CHARTS', {
        lineChart: { path: '/lineChart', title: 'Line Chart', plunker: 'http://plnkr.co/edit/lBKFld?p=preview' },
        cumulativeLineChart: { path: '/cumulativeLineChart', title: 'Cumulative Line Chart', plunker: 'http://plnkr.co/edit/iIxJT3?p=preview' },
        stackedAreaChart: { path: '/stackedAreaChart', title: 'Stacked Area Chart', plunker: 'http://plnkr.co/edit/CIGW0o?p=preview' },
        multiBarChart: { path: '/multiBarChart', title: 'MultiBar Chart', plunker: 'http://plnkr.co/edit/zGc5Wp?p=preview' },
        discreteBarChart: { path: '/discreteBarChart', title: 'DiscreteBar Chart', plunker: 'http://plnkr.co/edit/6t5bky?p=preview' },
        historicalBarChart: { path: '/historicalBarChart', title: 'HistoricalBar Chart', plunker: 'http://plnkr.co/edit/U1wWbe?p=preview' },
        multiBarHorizontalChart: { path: '/multiBarHorizontalChart', title: 'MultiBar Horizontal Chart', plunker: 'http://plnkr.co/edit/UZGxhp?p=preview' },
        pieChart: { path: '/pieChart', title: 'Pie Chart', plunker: 'http://plnkr.co/edit/vtKWU0?p=preview' },
        scatterChart: { path: '/scatterChart', title: 'Scatter Chart', plunker: 'http://plnkr.co/edit/6hjwSA?p=preview' },
        lineWithFocusChart: { path: '/lineWithFocusChart', title: 'Line with Focus Chart', plunker: 'http://plnkr.co/edit/sWONMb?p=preview' },
        //linePlusBarChart: { path: '/linePlusBarChart', title: 'Line + Bar Chart', plunker: 'http://plnkr.co/edit/UASCUL?p=preview' },
        scatterPlusLineChart: { path: '/scatterPlusLineChart', title: 'Scatter + Line Chart', plunker: 'http://plnkr.co/edit/2MjNgj?p=preview' },
        linePlusBarWithFocusChart: { path: '/linePlusBarWithFocusChart', title: 'Line + Bar with Focus Chart', plunker: 'http://plnkr.co/edit/f0QET0?p=preview' },
        donutChart: { path: '/donutChart', title: 'Donut Chart', plunker: 'http://plnkr.co/edit/jOoJik?p=preview' },
        bulletChart: { path: '/bulletChart', title: 'Bullet Chart', plunker: 'http://plnkr.co/edit/Mb1cWN?p=preview' },
        sparklinePlus: { path: '/sparklinePlus', title: 'SparkLine Chart', plunker: 'http://plnkr.co/edit/9ARpl6?p=preview' },
        parallelCoordinates: { path: '/parallelCoordinates', title: 'Parallel Coordinates', plunker: 'http://plnkr.co/edit/rCQhcL?p=preview' },
        multiChart: { path: '/multiChart', title: 'Multi Chart', plunker: 'http://plnkr.co/edit/zsNxBJ?p=preview' },
        //lineWithFisheyeChart: { path: '/lineWithFisheyeChart', title: 'Line with Fisheye Chart', plunker: 'http://plnkr.co/edit/YFruJE?p=preview' }
        candlestickBarChart: { path: '/candlestickBarChart', title: 'Candlestick Chart', plunker: 'http://plnkr.co/edit/5vQOj9?p=preview' },
        sunburstChart: { path: '/sunburstChart', title: 'Sunburst Chart', plunker: 'http://plnkr.co/edit/emCcNv?p=preview' },
        ohlcBarChart: { path: '/ohlcBarChart', title: 'OHLC Chart', plunker: 'http://plnkr.co/edit/nevaIQ?p=preview' },
        boxPlotChart: { path: '/boxPlotChart', title: 'Box Plot Chart', plunker: 'http://plnkr.co/edit/7VHjgy?p=preview' },
        forceDirectedGraph: { path: '/forceDirectedGraph', title: 'Force Directed Graph', plunker: 'http://plnkr.co/edit/NRAu0k?p=preview' }
    })

    .constant('CONSTANTS', {
        version: '1.0.8',
        productionHostname: 'krispo.github.io',
        otherCharts: [
            { name: "Real-time chart updating", url: "http://plnkr.co/edit/yKFROu?p=preview" },
            { name: "Events handling in Discrete Bar Chart", url: "http://plnkr.co/edit/ZvfBDk?p=preview"},
            { name: "Dynamic chart synchronization with Firebase", url: "http://plnkr.co/edit/VYzmqk?p=preview" },
            { name: "Selecting series in Cumulative Line Chart ", url: "http://plnkr.co/edit/ZLcS6M?p=preview" },
            { name: "Charts in grid layout with FreewallJS", url: "http://plnkr.co/edit/6CUXlr?p=preview" },
            { name: "Custom xAxis labels in Line+Bar+Focus chart", url: "http://plnkr.co/edit/QiBdW7?p=preview" },
            { name: "Time delay while updating chart data", url: "http://plnkr.co/edit/xi8c2h?p=preview" },
            { name: "Compile charts dynamically", url: "http://plnkr.co/edit/0XtT0f?p=preview" },
            { name: "Creating multiple charts inside ng-repeat", url: "http://plnkr.co/edit/qFa4UL?p=preview"},
            { name: "Stacked Multi Bar chart with random barColor", url: "http://plnkr.co/edit/TwKry8?p=preview"},
            { name: "Pie Chart with custom legend position and size", url: "http://embed.plnkr.co/TJqjjkHaD2S0VjsGmN3c/preview"},
            { name: "Updating with Large Data", url: "http://plnkr.co/edit/PqepCg"},
            { name: "Ionic Framework demo", url: "http://plnkr.co/edit/e3HZQN?p=preview"},
            { name: "Gridster dashboard demo", url: "http://plnkr.co/edit/jEQMch?p=preview"},
            { name: "Highlight points in Line Chart", url: "http://plnkr.co/edit/WfcVzs?p=preview"},
            { name: "Gradient colors on Pie Chart", url: "http://plnkr.co/edit/8ALkDb?p=preview"},
            { name: "Custom Tooltip", url: "http://plnkr.co/edit/gUf5Yx?p=preview"}
        ]
    })

    .constant('DOCS', function(){
        return [{
            id: 'doc_install',
            title: 'Install',
            url: './docs/install.html'
        },{
            id: 'doc_basic',
            title: 'Basic usage',
            url: './docs/basic.html'
        },{
            id: 'doc_examples',
            title: 'Examples',
            url: './docs/examples.html'
        },{
            id: -1,
            caption: 'Configure Directive Attributes'
        },{
            id: 'doc_attributes',
            title: 'Attributes',
            url: './docs/attributes.html'
        },{
            id: -1,
            caption: 'Customize Chart Options'
        },{
            id: 'doc_options',
            title: 'Options',
            url: './docs/options.html'
        },{
            id: 'doc_events',
            title: 'Events',
            url: './docs/events.html'
        },{
            id: 'doc_wrapper',
            title: 'Wrapper',
            url: './docs/wrapper.html'
        },{
            id: 'doc_zooming',
            title: 'Zooming',
            url: './docs/zooming.html'
        },{
            id: -1,
            caption: 'More'
        },{
            id: 'doc_useCases',
            title: 'Use Cases',
            url: './docs/useCases.html'
        }]
    })
