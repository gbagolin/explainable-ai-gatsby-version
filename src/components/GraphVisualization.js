import React, { useEffect } from "react"
import cytoscape from "cytoscape"

export function GraphVisualization() {
  function createGraph() {
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

    cy.add([
      {
        group: "nodes",
        data: { id: "n1", name: "n11" },
        position: { x: 50, y: 200 },
      },
      { group: "nodes", data: { id: "n2" }, position: { x: 131, y: 226 } },
      { group: "nodes", data: { id: "n3" }, position: { x: 128, y: 143 } },
      { group: "nodes", data: { id: "n4" }, position: { x: 249, y: 142 } },
      { group: "nodes", data: { id: "n5" }, position: { x: 191, y: 62 } },
      { group: "nodes", data: { id: "n6" }, position: { x: 66, y: 83 } },
      {
        group: "edges",
        data: { id: "e0", source: "n1", target: "n2", label: 7 },
      },
      {
        group: "edges",
        data: { id: "e1", source: "n2", target: "n3", label: 10 },
      },
      {
        group: "edges",
        data: { id: "e2", source: "n1", target: "n6", label: 14 },
      },
      {
        group: "edges",
        data: { id: "e3", source: "n1", target: "n3", label: 9 },
      },
      {
        group: "edges",
        data: { id: "e4", source: "n2", target: "n4", label: 15 },
      },
      {
        group: "edges",
        data: { id: "e5", source: "n3", target: "n4", label: 11 },
      },
      {
        group: "edges",
        data: { id: "e6", source: "n3", target: "n6", label: 2 },
      },
      {
        group: "edges",
        data: { id: "e7", source: "n6", target: "n5", label: 9 },
      },
      {
        group: "edges",
        data: { id: "e8", source: "n5", target: "n4", label: 6 },
      },
    ])
    cy.on("click", "node", function (evt) {
      var node = evt.target
      console.clear()
      console.log(node.position())
    })
    cy.userZoomingEnabled(false)
    cy.userPanningEnabled(false)
  }
  useEffect(() => {
    createGraph()
  }, [])

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
