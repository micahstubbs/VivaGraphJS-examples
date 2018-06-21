/*global Viva, $*/
function onLoad() {
  d3.json('miserables.json', (error, data) => {
    draw(error, data)
  })

  function draw(error, data) {
    if (error) console.error(error)
    var d3Sample = function() {
      var g = Viva.Graph.graph()
      g.Name = 'Sample graph from d3 library'

      for (var i = 0; i < data.nodes.length; ++i) {
        g.addNode(i, data.nodes[i])
      }

      for (i = 0; i < data.links.length; ++i) {
        var link = data.links[i]
        g.addLink(link.source, link.target, link.value)
      }

      return g
    }

    var colors = [
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

    var example = (function() {
      var graph = d3Sample()

      var layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength: 35,
        springCoeff: 0.00055,
        dragCoeff: 0.09,
        gravity: -1
      })

      var svgGraphics = Viva.Graph.View.svgGraphics()
      svgGraphics
        .node(function(node) {
          var groupId = node.data.group
          var circle = Viva.Graph.svg('circle')
            .attr('r', 7)
            .attr('stroke', '#fff')
            .attr('stroke-width', '1.5px')
            .attr('fill', colors[groupId ? groupId - 1 : 5])

          circle.append('title').text(node.data.name)

          return circle
        })
        .placeNode(function(nodeUI, pos) {
          nodeUI.attr('cx', pos.x).attr('cy', pos.y)
        })

      svgGraphics.link(function(link) {
        return Viva.Graph.svg('line')
          .attr('stroke', '#999')
          .attr('stroke-width', Math.sqrt(link.data))
      })

      var renderer = Viva.Graph.View.renderer(graph, {
        container: document.getElementById('graph1'),
        layout: layout,
        graphics: svgGraphics,
        prerender: 20,
        renderLinks: true
      })

      renderer.run(500)
    })()
  }
}