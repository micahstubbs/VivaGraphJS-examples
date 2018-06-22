const fs = require('fs')
const writeJSON = require('./write-json')

async function readFileParseJSON(filepath) {
  let data
  try {
    data = await JSON.parse(fs.readFileSync(filepath, 'utf8'))
  } catch (e) {
    console.log(`error reading ${filepath}`)
    console.log(e)
  }
  return data
}

async function loadData() {
  const nodePositions = await readFileParseJSON('node-positions.json')
  const graph = await readFileParseJSON('miserables.json')
  const data = {
    nodePositions,
    graph
  }
  return parse(data)
}

function parse(data) {
  const { nodePositions, graph } = data

  nodePositions.forEach(node => {
    const { index, x, y } = node
    graph.nodes[index].x = x
    graph.nodes[index].y = y
  })

  // write out result
  writeJSON(graph, '.', 'miserables-with-positions.json')
}

loadData()
