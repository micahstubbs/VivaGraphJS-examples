const graphGenerator = Viva.Graph.generator()
const graph = graphGenerator.grid(20, 20)

const layout = d3Force(graph, {
  springLength: 20,
  springCoeff: 1,
  gravity: -30,
  springIterations: 10
})

const graphics = Viva.Graph.View.webglGraphics()

const renderer = Viva.Graph.View.renderer(graph, {
  layout,
  graphics,
  renderLinks: true,
  prerender: true
})

renderer.run()

// TODO: extract into module
function d3Force(graph, options) {
  // todo: check input
  const nodes = []

  const links = []
  const nodeIdToIdx = Object.create(null)
  const linkIdToD3Link = Object.create(null)

  graph.forEachNode(n => {
    const index = nodes.length
    nodeIdToIdx[n.id] = index
    const node = {
      index
    }
    nodes.push(node)
  })

  graph.forEachLink(l => {
    const source = nodeIdToIdx[l.fromId]
    const target = nodeIdToIdx[l.toId]

    const index = links.length
    const link = { source, target, index }
    links.push(link)
    linkIdToD3Link[l.id] = link
  })

  const simulation = d3
    .forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(options.gravity))
    .force(
      'link',
      d3
        .forceLink(links)
        .strength(options.springCoeff)
        .distance(options.springLength)
        .iterations(options.springIterations)
    )

  simulation.stop()

  return {
    step() {
      simulation.tick()
    },

    getNodePosition,

    getLinkPosition(linkId) {
      const link = linkIdToD3Link[linkId]
      return {
        from: link.source,
        to: link.target
      }
    },

    getGraphRect() {
      let minX = Number.POSITIVE_INFINITY
      let minY = Number.POSITIVE_INFINITY
      let maxX = Number.NEGATIVE_INFINITY
      let maxY = Number.NEGATIVE_INFINITY

      nodes.forEach(node => {
        if (node.x < minX) minX = node.x
        if (node.x > maxX) maxX = node.x

        if (node.y < minY) minY = node.y
        if (node.y > maxY) maxY = node.y
      })

      return {
        x1: minX,
        x2: maxX,
        y1: minY,
        y2: maxY
      }
    },

    isNodePinned() {
      // TODO: implement
      return false
    },

    pinNode() {
      // TODO: implement me
    },

    dispose() {},

    setNodePosition(nodeId, x, y) {
      const pos = getNodePosition(nodeId)
      pos.x = x
      pos.y = y
    }
  }

  function getNodePosition(nodeId) {
    return nodes[nodeIdToIdx[nodeId]]
  }
}
