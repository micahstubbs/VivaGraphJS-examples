/*global Viva*/
const graphGenerator = Viva.Graph.generator();

// var graph = graphGenerator.randomNoLinks(500);
// var graph = graphGenerator.completeBipartite(100, 1);
// var graph = graphGenerator.complete(2);
// var graph = graphGenerator.grid(100, 100);
const graph = graphGenerator.balancedBinTree(10);
// var graph = graphGenerator.ladder(1000);
// var graph = Viva.Graph.graph();
//graph.addLink(1, 2);

console.log('graph', graph)
console.log('nodes', graph.getNodesCount())
console.log('links', graph.getLinksCount())

const layout = Viva.Graph.Layout.forceDirected(graph, {
  springLength: 30,
  springCoeff: 0.0008,
  dragCoeff: 0.01,
  gravity: -1.2,
  theta: 1
});

const graphics = Viva.Graph.View.webglGraphics();

const renderer = Viva.Graph.View.renderer(graph, {
  layout,
  graphics,
  renderLinks: true,
  prerender: true
});

renderer.run()
