d3.json('miserables-with-positions.json', (error, data) => {
  draw(error, data)
})

function draw(error, data) {
  if (error) console.error(error)

  const graph = Viva.Graph.graph()
  graph.Name = 'Les Miserables sample graph from the d3 library'

  const nodesCount = data.nodes.length
  let i
  for (i = 0; i < data.nodes.length; ++i) {
    graph.addNode(i, data.nodes[i])
  }

  for (i = 0; i < data.links.length; ++i) {
    const link = data.links[i]
    graph.addLink(link.source, link.target, link.value)
  }

  const layout = Viva.Graph.Layout.constant(graph)

  const renderer = Viva.Graph.View.renderer(graph, {
    layout // use our custom 'constant' layout
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
