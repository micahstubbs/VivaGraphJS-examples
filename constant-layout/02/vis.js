d3.json('miserables-with-positions.json', (error, data) => {
  draw(error, data)
})

function draw(error, data) {
  if (error) console.error(error)

  const populateGraphFromStaticData = () => {
    const g = Viva.Graph.graph()
    g.Name = 'Les Miserables sample graph from the d3 library'

    for (var i = 0; i < data.nodes.length; ++i) {
      g.addNode(i, data.nodes[i])
    }

    for (i = 0; i < data.links.length; ++i) {
      const link = data.links[i]
      g.addLink(link.source, link.target, link.value)
    }

    return g
  }

  const graph = populateGraphFromStaticData()

  // predefined node positions
  // const nodePositions = [{ x: -50, y: 0 }, { x: 0, y: -50 }, { x: 50, y: 0 }]
  const nodePositions = data.nodes

  const layout = Viva.Graph.Layout.constant(graph)

  const renderer = Viva.Graph.View.renderer(graph, {
    layout // use our custom 'constant' layout
  })

  let i
  const nodesCount = nodePositions.length

  // Add nodes
  for (i = 0; i < nodesCount; ++i) {
    graph.addNode(i, nodePositions[i])
  }

  // and make them connected in cycle:
  for (i = 0; i < nodesCount; ++i) {
    graph.addLink(i % nodesCount, (i + 1) % nodesCount)
  }

  // set custom node placement callback for layout.
  // if you don't do this, constant layout performs random positioning.
  layout.placeNode(
    (
      node // node.id - points to its position but you can do your
    ) =>
      // random logic here. E.g. read from specific node.data
      // attributes. This callback is expected to return object {x : .. , y : .. }
      nodePositions[node.id]
  )

  renderer.run()
}