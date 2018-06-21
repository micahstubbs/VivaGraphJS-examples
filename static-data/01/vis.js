/* global Viva */
d3.json('miserables.json', (error, data) => {
  draw(error, data)
})

function draw(error, data) {
  if (error) console.error(error)
  const populateGraphFromStaticData = () => {
    const g = Viva.Graph.graph();
    g.Name = 'Sample graph from d3 library'

    for (var i = 0; i < data.nodes.length; ++i) {
      g.addNode(i, data.nodes[i])
    }

    for (i = 0; i < data.links.length; ++i) {
      const link = data.links[i];
      g.addLink(link.source, link.target, link.value)
    }

    return g
  };

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
  ];

  const example = ((() => {
    const graph = populateGraphFromStaticData();

    const layout = Viva.Graph.Layout.forceDirected(graph, {
      springLength: 35,
      springCoeff: 0.00055,
      dragCoeff: 0.09,
      gravity: -1
    });

    const svgGraphics = Viva.Graph.View.svgGraphics();
    svgGraphics
      .node(node => {
        const groupId = node.data.group;
        const circle = Viva.Graph.svg('circle')
          .attr('r', 7)
          .attr('stroke', '#fff')
          .attr('stroke-width', '1.5px')
          .attr('fill', colors[groupId ? groupId - 1 : 5]);

        circle.append('title').text(node.data.name)

        return circle
      })
      .placeNode((nodeUI, pos) => {
        nodeUI.attr('cx', pos.x).attr('cy', pos.y)
      })

    svgGraphics.link(link => Viva.Graph.svg('line')
      .attr('stroke', '#999')
      .attr('stroke-width', Math.sqrt(link.data)))

    const renderer = Viva.Graph.View.renderer(graph, {
      container: document.getElementById('graph1'),
      layout,
      graphics: svgGraphics,
      prerender: 20,
      renderLinks: true
    });

    renderer.run(500)
  }))();
}
