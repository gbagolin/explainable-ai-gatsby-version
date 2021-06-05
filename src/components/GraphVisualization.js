import React, { useEffect } from "react"
import cytoscape from "cytoscape"
import ProblemState from "../states/ProblemState"
import axios from "axios"
export function GraphVisualization() {
  const trace = ProblemState(state => state.trace)

  function createGraph(graph) {
    let cy = cytoscape({
      container: document.getElementById("graph"), // container to render in

      elements: [
        // list of graph elements to start with
        // { group: 'nodes',data: { id: 'n1' }, position: { x: 200, y: 100 } },
        // { group: 'nodes',data: { id: 'n2' }, position: { x: 100, y: 50 } },
        // { group: 'edges',data: { id: 'e0', source: 'n1', target: 'n2' } }
      ],

      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": "#69e",
            label: "data(id)",
          },
        },

        {
          selector: "edge",
          style: {
            width: 1,
            "line-color": "#369",
            "target-arrow-color": "#369",
            "target-arrow-shape": "triangle",
            label: "data(label)",
            "font-size": "14px",
            color: "#777",
          },
        },
      ],

      style: cytoscape
        .stylesheet()
        .selector("edge")
        .css({
          width: 3,
          "line-color": "black",
          "target-arrow-color": "black",
          "target-arrow-shape": "triangle",
          label: "data(label)",
          "font-size": "14px",
          color: "#777",
        })
        .selector("node")
        .css({
          content: "data(id)",
          "text-valign": "center",
          color: "black",
          "background-color": "white",
          "border-color": "black",
          "border-width": "2px",
        })
        .selector(":selected")
        .css({
          "background-color": "yellow",
          "line-color": "yellow",
          "target-arrow-color": "black",
          "source-arrow-color": "black",
          "text-outline-color": "black",
        }),

      layout: {
        name: "grid",
        rows: 1,
      },
    })

    const graphRendered = []
    let tmpNode = {}
    for(const node of graph.nodes){
      tmpNode = {}
      tmpNode['group'] = "nodes"
      tmpNode['data'] = {
        'id' : node.id
      }
      tmpNode['position'] = {
        'x' : (node['x']*50),
        'y' : (node['y']*50)
      }
      // console.log(node)
      graphRendered.push(tmpNode)
    }

    for(const edge of graph.edges){
      tmpNode = {}
      tmpNode['group'] = "edges"
      tmpNode['data'] = {
        'id' : edge.start+edge.stop, 
        'source': edge.start, 
        'target': edge.stop, 
      }
      // console.log(node)
      graphRendered.push(tmpNode)
    }

    console.log(graphRendered)

    cy.add(graphRendered)
    // cy.add([
    //   {
    //     group: "nodes",
    //     data: { id: "n1", name: "n11" },
    //     position: { x: 50, y: 200 },
    //   },
    //   { group: "nodes", data: { id: "n2" },  },
    //   { group: "nodes", data: { id: "n3" },  },
    //   { group: "nodes", data: { id: "n4" },  },
    //   { group: "nodes", data: { id: "n5" },  },
    //   { group: "nodes", data: { id: "n6" },  },
    //   {
    //     group: "edges",
    //     data: { id: "e0", source: "n1", target: "n2"},
    //   },
    //   {
    //     group: "edges",
    //     data: { id: "e1", source: "n2", target: "n3", label: 10 },
    //   },
    //   {
    //     group: "edges",
    //     data: { id: "e2", source: "n1", target: "n6", label: 14 },
    //   },
    //   {
    //     group: "edges",
    //     data: { id: "e3", source: "n1", target: "n3", label: 9 },
    //   },
    //   {
    //     group: "edges",
    //     data: { id: "e4", source: "n2", target: "n4", label: 15 },
    //   },
    //   {
    //     group: "edges",
    //     data: { id: "e5", source: "n3", target: "n4", label: 11 },
    //   },
    //   {
    //     group: "edges",
    //     data: { id: "e6", source: "n3", target: "n6", label: 2 },
    //   },
    //   {
    //     group: "edges",
    //     data: { id: "e7", source: "n6", target: "n5", label: 9 },
    //   },
    //   {
    //     group: "edges",
    //     data: { id: "e8", source: "n5", target: "n4", label: 6 },
    //   },
    // ])
    cy.on("click", "node", function (evt) {
      var node = evt.target
      console.clear()
      console.log(node.position())
    })
    cy.userZoomingEnabled(true)
    cy.userPanningEnabled(true)
    cy.fit();
  }

  async function fetchGraph() {
    const payload = {
      name: "velocity regulation 10 with graph",
    }
    try {
      const response = await axios.post(
        "http://localhost:8001/api/get_graph_from_trace/",
        payload
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
    return undefined
  }

  useEffect(async () => {
    console.log(trace)
    const graph = await fetchGraph()
    if(graph == undefined){
      console.log("There were problems in fetching graph information")
      return 
    }
    // console.log(graph)
    createGraph(graph)
  }, [trace])

  return (
    <div
      id="graph"
      className="border-2 rounded-lg shadow-lg w-auto h-auto m-5 p-3 text-lg"
    >
      <p className="text-center font-bold text-2xl">
        Graph state problem visualization
      </p>
    </div>
  )
}
