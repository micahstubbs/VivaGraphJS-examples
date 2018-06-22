/* global Viva */
d3.json('miserables-with-positions.json', (error, data) => {
  draw(error, data)
})

function draw(error, data) {
  if (error) console.error(error)

  // be flexible, accept datasets that have
  // edges instead of links
  if (typeof data.links === 'undefined' && typeof data.edges !== 'undefined') {
    data.links = data.edges
    delete data.edges
  }

  const nodesCount = data.nodes.length

  const graph = Viva.Graph.graph()
  graph.Name = 'Sample graph from d3 library'

  for (var i = 0; i < data.nodes.length; ++i) {
    graph.addNode(i, data.nodes[i])
  }

  for (i = 0; i < data.links.length; ++i) {
    const link = data.links[i]
    graph.addLink(link.source, link.target, link.value)
  }

  console.log('data', data)
  console.log('graph', graph)
  console.log('nodes', graph.getNodesCount())
  console.log('links', graph.getLinksCount())

  const layout = Viva.Graph.Layout.constant(graph)

  const graphics = Viva.Graph.View.webglGraphics()

  const renderer = Viva.Graph.View.renderer(graph, {
    layout,
    graphics,
    renderLinks: true,
    prerender: true
  })

  // set custom node placement callback for layout.
  // if you don't do this, constant layout performs random positioning.
  layout.placeNode(
    (
      node // node.id - points to its position but you can do your
    ) =>
      // random logic here. E.g. read from specific node.data
      // attributes. This callback is expected to return object {x : .. , y : .. }
      data.nodes[node.id]
  )

  renderer.run()
}
