/*global Viva*/
function onLoad() {
  var graphGenerator = Viva.Graph.generator()

  // var graph = graphGenerator.randomNoLinks(500);
  // var graph = graphGenerator.completeBipartite(100, 1);
  // var graph = graphGenerator.complete(2);
  // var graph = graphGenerator.grid(100, 100);
  var graph = graphGenerator.balancedBinTree(10)
  // var graph = graphGenerator.ladder(1000);
  // var graph = Viva.Graph.graph();
  //graph.addLink(1, 2);

  console.log('graph', graph)
  console.log('nodes', graph.getNodesCount())
  console.log('links', graph.getLinksCount())

  var layout = Viva.Graph.Layout.forceDirected(graph, {
    springLength: 30,
    springCoeff: 0.0008,
    dragCoeff: 0.01,
    gravity: -1.2,
    theta: 1
  })

  var graphics = Viva.Graph.View.webglGraphics()

  var renderer = Viva.Graph.View.renderer(graph, {
    layout: layout,
    graphics: graphics,
    renderLinks: true,
    prerender: true
  })

  renderer.run()
}
