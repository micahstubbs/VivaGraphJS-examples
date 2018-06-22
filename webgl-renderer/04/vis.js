/* global Viva */
d3.json('miserables.json', (error, data) => {
  draw(error, data)
})

function draw(error, data) {
  if (error) console.error(error)
  const populateGraphFromStaticData = () => {
    const g = Viva.Graph.graph()
    g.Name = 'Sample graph from d3 library'

    // be flexible, accept datasets that have
    // edges instead of links
    if (
      typeof graph.links === 'undefined' &&
      typeof graph.edges !== 'undefined'
    ) {
      graph.links = graph.edges
      delete graph.edges
    }

    for (var i = 0; i < data.nodes.length; ++i) {
      g.addNode(i, data.nodes[i])
    }

    for (i = 0; i < data.links.length; ++i) {
      const link = data.links[i]
      g.addLink(link.source, link.target, link.value)
    }

    return g
  }

  const colors = [
    '#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c',
    '#98df8a',
    '#d62728',
    '#ff9896',
    '#9467bd',
    '#c5b0d5',
    '#8c564b',
    '#c49c94',
    '#e377c2',
    '#f7b6d2',
    '#7f7f7f',
    '#c7c7c7',
    '#bcbd22',
    '#dbdb8d',
    '#17becf',
    '#9edae5'
  ]

  const example = (() => {
    const graph = populateGraphFromStaticData()

    console.log('graph', graph)
    console.log('nodes', graph.getNodesCount())
    console.log('links', graph.getLinksCount())

    const layout = Viva.Graph.Layout.forceDirected(graph, {
      springLength: 30,
      springCoeff: 0.0008,
      dragCoeff: 0.01,
      gravity: -1.2,
      theta: 1
    })

    const graphics = Viva.Graph.View.webglGraphics()

    const renderer = Viva.Graph.View.renderer(graph, {
      layout,
      graphics,
      renderLinks: true,
      prerender: true
    })

    renderer.run(70)
  })()
}
